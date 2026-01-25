import { createEnv as createNextEnv } from "@t3-oss/env-nextjs";
import { ZeroSchema } from "@/lib/zero-schema";

/** https://github.com/t3-oss/t3-env */
export const NEXTENV = createNextEnv({
  server: {},
  client: {},
  shared: {
    NODE_ENV: ZeroSchema.shape.NODE_ENV,
    PORT: ZeroSchema.shape.PORT,
  },
  runtimeEnv: {
    // biome-ignore lint/style/noProcessEnv: Intentional
    NODE_ENV: process.env.NODE_ENV,
    // biome-ignore lint/style/noProcessEnv: Intentional
    PORT: process.env.PORT,
  },
});
