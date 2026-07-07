import { defineConfig } from "prisma/config";
import { readFileSync } from "fs";
import { resolve } from "path";

// Prisma CLI doesn't auto-load .env — read it manually
function loadEnv(): Record<string, string> {
  const envPath = resolve(__dirname, ".env");
  const env: Record<string, string> = {};
  try {
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const value = trimmed.slice(eqIdx + 1).trim();
      env[key] = value;
      process.env[key] = value; // also set for runtime
    }
  } catch {
    // .env not found — hope env vars are set externally
  }
  return env;
}

const env = loadEnv();

export default defineConfig({
  schema: "./prisma/schema.prisma",
  migrations: {
    path: "./prisma/migrations",
  },
  datasource: {
    url: env.DATABASE_URL ?? process.env.DATABASE_URL!,
  },
});
