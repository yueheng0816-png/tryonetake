// One-off: generate 400x300 logo PNG for Trustpilot / directory submissions
// Usage: node scripts/generate-logo.mjs
import sharp from "sharp";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="iconBg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3D3528"/>
      <stop offset="100%" stop-color="#2A2319"/>
    </linearGradient>
  </defs>

  <!-- White canvas -->
  <rect width="400" height="300" fill="#FFFFFF"/>

  <!-- App icon: rounded square with camera lens (matches favicon) -->
  <g transform="translate(152, 48)">
    <rect width="96" height="96" rx="21" fill="url(#iconBg)"/>
    <!-- Lens ring -->
    <circle cx="48" cy="45" r="18" fill="none" stroke="#FFFFFF" stroke-width="3.75" opacity="0.95"/>
    <!-- Lens center -->
    <circle cx="48" cy="45" r="6" fill="#FFFFFF" opacity="0.95"/>
    <!-- Flash reflection -->
    <circle cx="42" cy="39" r="3" fill="#FFFFFF" opacity="0.3"/>
  </g>

  <!-- Wordmark -->
  <text x="200" y="208" text-anchor="middle"
        font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="46" font-weight="700" fill="#2A2319"
        letter-spacing="-1">OneTake</text>

  <!-- Tagline -->
  <text x="200" y="242" text-anchor="middle"
        font-family="Segoe UI, Arial, Helvetica, sans-serif"
        font-size="16" font-weight="400" fill="#8A8577"
        letter-spacing="2">AI PROFESSIONAL HEADSHOTS</text>
</svg>`;

const out = "public/trustpilot-logo.png";
await sharp(Buffer.from(svg), { density: 192 })
  .resize(400, 300)
  .png()
  .toFile(out);

const { size } = await import("fs").then((fs) => fs.promises.stat(out));
console.log(`✓ Generated ${out} (${(size / 1024).toFixed(1)} KB, 400x300)`);
