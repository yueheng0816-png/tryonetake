/**
 * Pricing preview samples.
 *
 * Each SampleSet represents one profession/role example with 30 images.
 * Replace the placeholder image paths with your own generated images.
 *
 * To swap images: place your files in public/images/samples/ and update
 * the `images` arrays below.
 */

export interface SampleSet {
  profession: string;
  specificRole: string;
  images: string[];
}

// Placeholder: cycle through existing 16 example images to fill 30 slots.
// Replace these paths with your own generated headshots.
function placeholder30(): string[] {
  return Array.from(
    { length: 30 },
    (_, i) => `/images/landing/example-${(i % 16) + 1}.jpg`
  );
}

export const FREE_SAMPLE: SampleSet = {
  profession: "General Professional",
  specificRole: "",
  images: ["/images/landing/example-1.jpg"],
};

export const STARTER_SAMPLES: SampleSet[] = [
  {
    profession: "Engineering & Technical",
    specificRole: "Software Engineer",
    images: placeholder30(),
  },
  {
    profession: "K-12 Education & Teaching",
    specificRole: "5th Grade Teacher",
    images: placeholder30(),
  },
];

export const PRO_SAMPLES: SampleSet[] = [
  {
    profession: "Finance & Accounting",
    specificRole: "Finance Director",
    images: placeholder30(),
  },
];
