/**
 * Vercel Blob helpers — permanent image storage.
 *
 * Replicate's CDN URLs expire after ~24h. To ensure users can always
 * access their headshots, we transfer images to Vercel Blob immediately
 * after generation. Vercel Blob is already configured (BLOB_READ_WRITE_TOKEN)
 * and the Hobby plan includes 5 GB free.
 */

const BLOB_RETRY_MAX = 3;
const BLOB_RETRY_BASE_DELAY = 1000; // ms

/**
 * Download an image from a URL and upload it to Vercel Blob.
 * Retries on transient failures. Returns the permanent Vercel Blob URL,
 * or the original Replicate URL as a last-resort fallback.
 */
export async function transferToBlob(
  sourceUrl: string,
  orderId: string,
  index: number,
): Promise<string> {
  // Only transfer if Blob is configured
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.warn("[OneTake] BLOB_READ_WRITE_TOKEN not set — keeping Replicate URL");
    return sourceUrl;
  }

  let lastError: unknown = null;

  for (let attempt = 0; attempt < BLOB_RETRY_MAX; attempt++) {
    try {
      // 1. Download from Replicate CDN
      const res = await fetch(sourceUrl, { signal: AbortSignal.timeout(30_000) });
      if (!res.ok) {
        throw new Error(`Download failed with status ${res.status}`);
      }

      const buffer = Buffer.from(await res.arrayBuffer());

      // 2. Upload to Vercel Blob
      const { put } = await import("@vercel/blob");
      const blob = await put(`outputs/${orderId}/${index}.jpg`, buffer, {
        access: "public",
        contentType: res.headers.get("content-type") ?? "image/jpeg",
      });

      console.log(
        `[OneTake] Transferred image to Blob: slot=${index} ${blob.url.slice(0, 80)}…`
      );
      return blob.url;
    } catch (err) {
      lastError = err;
      const msg = err instanceof Error ? err.message : String(err);
      console.error(
        `[OneTake] Blob transfer attempt ${attempt + 1}/${BLOB_RETRY_MAX} failed for slot ${index} order ${orderId}: ${msg}`
      );

      if (attempt < BLOB_RETRY_MAX - 1) {
        // Exponential backoff: 1s, 2s, 4s
        const delay = BLOB_RETRY_BASE_DELAY * Math.pow(2, attempt);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }

  // All retries exhausted — fall back to original Replicate CDN URL.
  // This URL will expire in ~24h, but it's better than an empty slot.
  // The error is logged above and should be investigated.
  console.error(
    `[OneTake] CRITICAL: Blob transfer exhausted all ${BLOB_RETRY_MAX} retries ` +
      `for slot ${index} order ${orderId}. Image will be served from expiring Replicate CDN. ` +
      `Last error: ${lastError instanceof Error ? lastError.message : String(lastError)}`
  );
  return sourceUrl;
}
