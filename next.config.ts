import type { NextConfig } from "next";

const staticExport =
  process.env.NEXT_STATIC_EXPORT === "1" || process.env.NEXT_STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(staticExport
    ? {
        output: "export" as const,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
