import { createEnv as createNextEnv } from "@t3-oss/env-nextjs";
import z from "zod";
import { ZeroSchema } from "@/lib/zero-schema";

console.log(process.env);

/** https://github.com/t3-oss/t3-env */
export const NEXTENV = createNextEnv({
  server: {},
  client: {
    // NODE_ENV: ZeroSchema.shape.NODE_ENV,
    // PORT: ZeroSchema.shape.PORT,
    // NEXT_PUBLIC_ZERO_SERVICE_GATEWAY: z.string(),
  },
  shared: {
    NODE_ENV: ZeroSchema.shape.NODE_ENV,
    PORT: ZeroSchema.shape.PORT,
    NEXT_PUBLIC_ZERO_SERVICE_GATEWAY: z.string(),
  },
  runtimeEnv: {
    // biome-ignore lint/style/noProcessEnv: Intentional
    NODE_ENV: process.env.NODE_ENV,
    // biome-ignore lint/style/noProcessEnv: Intentional
    PORT: process.env.PORT,
    NEXT_PUBLIC_ZERO_SERVICE_GATEWAY:
      process.env.NEXT_PUBLIC_ZERO_SERVICE_GATEWAY,
  },
});
