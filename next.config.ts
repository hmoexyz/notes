import { SITE_CONFIG } from "@/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: SITE_CONFIG.basePath,
  assetPrefix: SITE_CONFIG.basePath,
  distDir: `out/${SITE_CONFIG.basePath}`,
  output: 'export',
};

export default nextConfig;
