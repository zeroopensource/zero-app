// import "@zero-app-1/env/web";
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
  process.env.PLATFORM === "web" ? webNextConfig : tauriNextConfig;

export default nextConfig;
