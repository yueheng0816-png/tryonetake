# Pricing Preview Sample Images

Place generated headshot images here following the structure below.

## Folder structure

```
samples/
├── starter/
│   ├── software-engineer/     ← 30 images: 01.jpg – 30.jpg
│   └── 5th-grade-teacher/     ← 30 images: 01.jpg – 30.jpg
└── pro/
    └── finance-director/      ← 30 images: 01.jpg – 30.jpg
```

## Naming rules

| Rule | Example |
|------|---------|
| Folder name: kebab-case role | `software-engineer` |
| File name: 2-digit zero-padded | `01.jpg`, `02.jpg`, …, `30.jpg` |
| Format: JPG (recommended) or WebP | `.jpg` |
| Aspect ratio: 3:4 portrait | 900×1200 or similar |

## How to replace placeholder images

1. Generate real headshots for each set (30 images per set)
2. Place them into the matching folder
3. Open `src/lib/pricing-samples.ts`
4. Change `placeholder30()` → `sampleImages("plan/folder")`, e.g.:
   ```ts
   // Before (placeholder):
   images: placeholder30(),
   // After (real images):
   images: sampleImages("starter/software-engineer"),
   ```
5. Run `npx next build` to verify, then deploy
