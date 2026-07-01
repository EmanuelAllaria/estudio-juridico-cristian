import type { NextConfig } from "next";

const isFtpExport = process.env.BUILD_TARGET === "ftp";

const nextConfig: NextConfig = {
  ...(isFtpExport ? { output: "export" as const } : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isFtpExport ? { unoptimized: true } : {}),
  },
};

export default nextConfig;
