import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

/**
 * POST /api/upload
 *
 * Accepts multipart/form-data with 1-10 photo files.
 * For local dev: saves to public/uploads/ (auto-served by Next.js).
 * For production: use Vercel Blob (set BLOB_READ_WRITE_TOKEN).
 *
 * Returns { urls: string[] }
 */
export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const formData = await req.formData();
    const files = formData.getAll("photos") as File[];

    if (!files || files.length === 0) {
      return new NextResponse("No photos provided", { status: 400 });
    }

    if (files.length > 10) {
      return new NextResponse("Maximum 10 photos allowed", { status: 400 });
    }

    const urls: string[] = [];
    const hasBlobToken = !!process.env.BLOB_READ_WRITE_TOKEN;

    if (hasBlobToken) {
      const { put } = await import("@vercel/blob");

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const buffer = Buffer.from(await file.arrayBuffer());
        const ext = file.name.split(".").pop() ?? "jpg";
        const blob = await put(
          `uploads/${userId}/${Date.now()}-${i}.${ext}`,
          buffer,
          { access: "public", contentType: file.type || "image/jpeg" }
        );
        urls.push(blob.url);
      }
    } else {
      // Local dev fallback
      const fs = await import("fs/promises");
      const path = await import("path");
      const uploadsDir = path.join(process.cwd(), "public", "uploads", userId);

      await fs.mkdir(uploadsDir, { recursive: true });

      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const buffer = Buffer.from(await file.arrayBuffer());
        const ext = file.name.split(".").pop() ?? "jpg";
        const filename = `${Date.now()}-${i}.${ext}`;
        const filepath = path.join(uploadsDir, filename);

        await fs.writeFile(filepath, buffer);

        urls.push(`${baseUrl}/uploads/${userId}/${filename}`);
      }
    }

    return NextResponse.json({ urls });
  } catch (error) {
    console.error("Upload failed:", error);
    return new NextResponse("Upload failed", { status: 500 });
  }
}
