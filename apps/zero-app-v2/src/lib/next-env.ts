import { createEnv as createNextEnv } from "@t3-oss/env-nextjs";
import z from "zod";
import { ZeroSchema } from "@/lib/zero-schema";

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
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    NEXT_PUBLIC_ZERO_SERVICE_GATEWAY:
      process.env.NEXT_PUBLIC_ZERO_SERVICE_GATEWAY,
  },
});
