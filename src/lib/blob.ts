/**
 * Vercel Blob helpers — permanent image storage.
 *
 * Replicate's CDN URLs expire after ~24h. To ensure users can always
 * access their headshots, we transfer images to Vercel Blob immediately
 * after generation. Vercel Blob is already configured (BLOB_READ_WRITE_TOKEN)
 * and the Hobby plan includes 5 GB free.
 */

/**
 * Download an image from a URL and upload it to Vercel Blob.
 * Returns the permanent Vercel Blob URL, or the original URL on failure.
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

  try {
    // 1. Download from Replicate CDN
    const res = await fetch(sourceUrl, { signal: AbortSignal.timeout(30_000) });
    if (!res.ok) {
      console.error(
        `[OneTake] Failed to download image for transfer (status ${res.status}): ${sourceUrl.slice(0, 80)}…`
      );
      return sourceUrl; // fallback to original URL
    }

    const buffer = Buffer.from(await res.arrayBuffer());

    // 2. Upload to Vercel Blob
    const { put } = await import("@vercel/blob");
    const blob = await put(`outputs/${orderId}/${index}.jpg`, buffer, {
      access: "public",
      contentType: res.headers.get("content-type") ?? "image/jpeg",
    });

    console.log(`[OneTake] Transferred image to Blob: slot=${index} ${blob.url.slice(0, 80)}…`);
    return blob.url;
  } catch (err) {
    console.error(`[OneTake] Blob transfer failed for slot ${index}:`, err);
    return sourceUrl; // fallback — better than losing the image entirely
  }
}
