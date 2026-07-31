/**
 * Pricing preview samples.
 *
 * Each SampleSet represents one profession/role example with 30 images.
 *
 * ── Image folder structure ──────────────────────────────────────
 *
 *   public/images/samples/
 *   ├── starter/
 *   │   ├── software-engineer/
 *   │   │   ├── 01.jpg        ← 2-digit zero-padded, 01–30
 *   │   │   ├── 02.jpg
 *   │   │   ├── ...
 *   │   │   └── 30.jpg
 *   │   └── 5th-grade-teacher/
 *   │       ├── 01.jpg
 *   │       ├── 02.jpg
 *   │       ├── ...
 *   │       └── 30.jpg
 *   └── pro/
 *       └── finance-director/
 *           ├── 01.jpg
 *           ├── 02.jpg
 *           ├── ...
 *           └── 30.jpg
 *
 * ── Naming rules ────────────────────────────────────────────────
 *
 *   1. Each sample set gets its own folder under starter/ or pro/.
 *   2. Folder name: kebab-case profession or role (e.g. "software-engineer").
 *   3. Image files: 01.jpg, 02.jpg, …, 30.jpg (always 2-digit, zero-padded).
 *   4. Aspect ratio: 3:4 portrait recommended (matches headshot grid).
 *   5. Format: JPG or WebP (JPG preferred for compatibility).
 *
 * ── How to replace placeholder images ───────────────────────────
 *
 *   1. Generate real headshots for each profession/role set.
 *   2. Place 30 images per set into the matching folder above.
 *   3. Update the `images` array below to point to the new files.
 *   4. Build passes → deploy.
 */

export interface SampleSet {
  profession: string;
  specificRole: string;
  images: string[];
}

const SAMPLES_BASE = "/images/samples";

/**
 * Helper: generate an array of 30 image paths under a given folder.
 * Always uses 2-digit zero-padded numbering (01–30).
 */
function sampleImages(folder: string): string[] {
  return Array.from(
    { length: 30 },
    (_, i) => `${SAMPLES_BASE}/${folder}/${String(i + 1).padStart(2, "0")}.jpg`
  );
}

// Placeholder: cycle through existing 16 example images to fill 30 slots.
// Replace these with sampleImages("plan/folder") after placing real images.
function placeholder30(): string[] {
  return Array.from(
    { length: 30 },
    (_, i) => `/images/landing/example-${(i % 16) + 1}.jpg`
  );
}

// ── Free ────────────────────────────────────────────────────────
export const FREE_SAMPLE: SampleSet = {
  profession: "General Professional",
  specificRole: "",
  images: ["/images/landing/example-1.jpg"], // ← replace with your free sample
};

// ── Starter (2 sets) ────────────────────────────────────────────
export const STARTER_SAMPLES: SampleSet[] = [
  {
    profession: "Engineering & Technical",
    specificRole: "Software Engineer",
    // TODO: replace with → sampleImages("starter/software-engineer")
    images: placeholder30(),
  },
  {
    profession: "K-12 Education & Teaching",
    specificRole: "5th Grade Teacher",
    // TODO: replace with → sampleImages("starter/5th-grade-teacher")
    images: placeholder30(),
  },
];

// ── Pro (1 set) ─────────────────────────────────────────────────
export const PRO_SAMPLES: SampleSet[] = [
  {
    profession: "Finance & Accounting",
    specificRole: "Finance Director",
    // TODO: replace with → sampleImages("pro/finance-director")
    images: placeholder30(),
  },
];
