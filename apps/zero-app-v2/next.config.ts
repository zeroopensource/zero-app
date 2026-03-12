import type { NextConfig } from "next";

const webNextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
  output: "export",
};

const tauriNextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
};

const nextConfig =
  process.env.PLATFORM === "tauri" ? tauriNextConfig : webNextConfig;

export default nextConfig;
