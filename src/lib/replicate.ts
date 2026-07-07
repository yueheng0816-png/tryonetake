// ── Types ───────────────────────────────────────────────────

export interface PredictionResult {
  id: string;
  status: "starting" | "processing" | "succeeded" | "failed" | "canceled";
  output: string | string[] | null;
  error: string | null;
}

export interface BatchResult {
  predictionIds: string[];
  promptIds: string[];
  errors: string[];
}

// ── Constants ───────────────────────────────────────────────

const FLUX_PRO = "black-forest-labs/flux-2-pro" as const;
const FLUX_MAX = "black-forest-labs/flux-2-max" as const;

export { PHOTOS_PER_ORDER } from "./constants";

/** Max concurrent predictions across ALL users */
const MAX_CONCURRENT = 3;

/** Minimum interval between prediction submissions (ms) */
const MIN_SUBMIT_INTERVAL = 600;

/** Max retries on rate-limit / transient errors */
const MAX_RETRIES = 3;

/** Base delay for exponential backoff (ms) */
const RETRY_BASE_DELAY = 2000;

export function getModelVersion(plan: "starter" | "pro"): string {
  return plan === "starter" ? FLUX_PRO : FLUX_MAX;
}

// ── Dynamic Replicate client ─────────────────────────────────
// Must be lazy-loaded — the 'replicate' npm package references
// Node.js built-ins (fs) that break client-side compilation.

let _replicateClient: import("replicate").default | null = null;

async function getReplicateClient(): Promise<import("replicate").default> {
  if (!_replicateClient) {
    const { default: Replicate } = await import("replicate");
    _replicateClient = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });
  }
  return _replicateClient;
}

// ── Check if token is configured ───────────────────────────

export function isReplicateConfigured(): boolean {
  const token = process.env.REPLICATE_API_TOKEN;
  return !!token && token.length > 0;
}

// ── Image URL resolver ──────────────────────────────────────

/**
 * If the URL points to localhost, read the file from disk and
 * convert it to a base64 data URI so Replicate's cloud servers
 * can access it. Otherwise return the URL as-is.
 */
async function resolveImageUrl(url: string): Promise<string> {
  if (!url.includes("localhost") && !url.includes("127.0.0.1")) {
    return url;
  }
  try {
    const { readFile } = await import("fs/promises");
    const path = await import("path");
    const urlObj = new URL(url);
    const filePath = path.default.join(process.cwd(), "public", urlObj.pathname);
    const buffer = await readFile(filePath);
    const base64 = buffer.toString("base64");
    const ext = filePath.split(".").pop()?.toLowerCase() ?? "jpg";
    const mimeType = ext === "png" ? "image/png" : "image/jpeg";
    console.log(`[OneTake] Converted local file to data URI: ${filePath} (${(buffer.length / 1024).toFixed(0)} KB)`);
    return `data:${mimeType};base64,${base64}`;
  } catch (e) {
    console.error("[OneTake] Failed to read local photo, falling back to URL:", e);
    return url;
  }
}

// ── Global Concurrency Limiter ──────────────────────────────
//
// Ensures we never have more than MAX_CONCURRENT predictions
// running at once across ALL users. This prevents multi-user
// traffic from overwhelming Replicate's rate limits.
//
// Each submission is also spaced by MIN_SUBMIT_INTERVAL ms
// to avoid burst requests.

interface QueueEntry {
  fn: () => Promise<unknown>;
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
}

class PredictionRateLimiter {
  private queue: QueueEntry[] = [];
  private running = 0;
  private lastSubmitTime = 0;

  async enqueue<T>(fn: () => Promise<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({
        fn: fn as () => Promise<unknown>,
        resolve: resolve as (value: unknown) => void,
        reject,
      });
      this.process();
    });
  }

  private async process() {
    // Kick off as many as we can (up to MAX_CONCURRENT)
    while (this.running < MAX_CONCURRENT && this.queue.length > 0) {
      const entry = this.queue.shift()!;
      this.running++;
      // Don't await — let it run in background
      this.runEntry(entry);
    }
  }

  private async runEntry(entry: QueueEntry) {
    try {
      // Enforce minimum interval between submissions
      const now = Date.now();
      const wait = Math.max(0, this.lastSubmitTime + MIN_SUBMIT_INTERVAL - now);
      if (wait > 0) {
        await new Promise((r) => setTimeout(r, wait));
      }
      this.lastSubmitTime = Date.now();

      const result = await entry.fn();
      entry.resolve(result);
    } catch (e) {
      entry.reject(e);
    } finally {
      this.running--;
      // Try to process next item in queue
      this.process();
    }
  }

  /** Number of predictions waiting in queue */
  get pending(): number {
    return this.queue.length;
  }

  /** Number of predictions currently running */
  get active(): number {
    return this.running;
  }
}

const globalLimiter = new PredictionRateLimiter();

// ── Create a single prediction ──────────────────────────────

/**
 * Create a single prediction through the global rate limiter.
 * Retries on transient errors with exponential backoff.
 */
export async function createPrediction(params: {
  photoUrl: string;
  prompt: string;
  plan: "starter" | "pro";
  webhookUrl?: string;
}): Promise<{ prediction: PredictionResult } | { error: string }> {
  if (!isReplicateConfigured()) {
    return { error: "Replicate API token not configured" };
  }

  const model = getModelVersion(params.plan);
  const resolution = params.plan === "pro" ? "2 MP" : "1 MP";
  const imageUrl = await resolveImageUrl(params.photoUrl);

  // Go through the global concurrency limiter
  return globalLimiter.enqueue(async () => {
    let lastError = "";

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const replicate = await getReplicateClient();
        const prediction = (await replicate.predictions.create({
          model: model as `${string}/${string}:latest`,
          input: {
            input_images: [imageUrl],
            prompt: params.prompt,
            aspect_ratio: "2:3",
            resolution,
            output_format: "jpg",
            output_quality: 100,
            safety_tolerance: 5,
          },
          ...(params.webhookUrl ? { webhook: params.webhookUrl } : {}),
        })) as unknown as PredictionResult;

        return { prediction };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        lastError = message;

        // Only retry on rate-limit (429) or transient network errors
        const isRateLimit =
          message.includes("429") ||
          message.toLowerCase().includes("rate limit") ||
          message.toLowerCase().includes("too many requests");
        const isNetworkError =
          message.includes("ECONNRESET") ||
          message.includes("ETIMEDOUT") ||
          message.includes("fetch failed") ||
          message.includes("network");

        if ((isRateLimit || isNetworkError) && attempt < MAX_RETRIES) {
          const delay = RETRY_BASE_DELAY * Math.pow(2, attempt); // 2s, 4s, 8s
          console.warn(
            `[OneTake] Prediction attempt ${attempt + 1} failed (${isRateLimit ? "rate limit" : "network"}), ` +
              `retrying in ${delay / 1000}s...`
          );
          await new Promise((r) => setTimeout(r, delay));
          continue;
        }

        console.error(
          `[OneTake] Prediction creation failed (attempt ${attempt + 1}):`,
          message
        );
      }
    }

    return { error: lastError };
  });
}

// ── Get prediction status ───────────────────────────────────

export async function getPrediction(
  predictionId: string
): Promise<PredictionResult | null> {
  if (!isReplicateConfigured()) return null;

  try {
    const replicate = await getReplicateClient();
    const prediction = (await replicate.predictions.get(
      predictionId
    )) as unknown as PredictionResult;
    return prediction;
  } catch (error) {
    console.error("Replicate get prediction failed:", error);
    return null;
  }
}

// ── Generate all headshots for an order ─────────────────────

export async function startBatchGeneration(params: {
  photoUrls: string[];
  plan: "starter" | "pro";
  style: "natural" | "balanced" | "polished";
  webhookBaseUrl: string;
  orderId: string;
  gender?: "male" | "female";
  profession?: string;
}): Promise<BatchResult> {
  const { photoUrls, plan, style, webhookBaseUrl, orderId, gender, profession } = params;

  const { distributePromptsV3, buildFinalPrompt } = await import("./prompts");

  const assignments = distributePromptsV3(
    photoUrls.length,
    plan,
    gender ?? "male",
    (profession as import("./prompts").Profession) ?? "general"
  );
  const predictionIds: string[] = [];
  const promptIds: string[] = [];
  const errors: string[] = [];
  const webhookUrl = `${webhookBaseUrl}/api/webhook/replicate?orderId=${orderId}`;

  const total = assignments.length;
  console.log(
    `[OneTake] Starting ${total} predictions for order ${orderId} ` +
      `(model: ${plan === "pro" ? "FLUX.2 max" : "FLUX.2 pro"}, ` +
      `queue: ${globalLimiter.active} active / ${globalLimiter.pending} pending)`
  );

  let consecutiveFailures = 0;

  for (let i = 0; i < assignments.length; i++) {
    const a = assignments[i];
    const photoUrl = photoUrls[a.photoIndex];
    const finalPrompt = buildFinalPrompt(a.prompt, style);

    const isHttps = webhookUrl.startsWith("https://");
    const result = await createPrediction({
      photoUrl,
      prompt: finalPrompt,
      plan,
      webhookUrl: isHttps ? `${webhookUrl}&index=${i}` : undefined,
    });

    if ("prediction" in result) {
      consecutiveFailures = 0;
      predictionIds.push(result.prediction.id);
      promptIds.push(a.promptId);
      console.log(
        `[OneTake] Prediction ${i + 1}/${total}: ${result.prediction.id} ← ${a.promptId}`
      );
    } else {
      consecutiveFailures++;
      console.error(
        `[OneTake] Failed prediction ${i + 1}/${total} ` +
          `(${consecutiveFailures} consecutive): ${result.error}`
      );
      errors.push(`#${i + 1}: ${result.error}`);
      predictionIds.push("");
      promptIds.push(a.promptId);

      // Abort if 10 consecutive predictions fail (was 5, relaxed for rate limits)
      if (consecutiveFailures >= 10) {
        console.error(
          `[OneTake] Aborting batch — ${consecutiveFailures} consecutive failures`
        );
        break;
      }
    }
  }

  const succeeded = predictionIds.filter(Boolean).length;
  console.log(
    `[OneTake] Created ${succeeded}/${total} predictions for order ${orderId}`
  );

  return { predictionIds, promptIds, errors };
}

/** Expose queue stats for monitoring (admin/debug use) */
export function getQueueStats(): { active: number; pending: number } {
  return { active: globalLimiter.active, pending: globalLimiter.pending };
}
