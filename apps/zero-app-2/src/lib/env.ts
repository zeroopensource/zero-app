import path from "node:path";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import type { z } from "zod";
import { ZeroSchema } from "@/lib/zero-schema";

expand(
  config({
    path: path.resolve(
      process.cwd(),
      // biome-ignore lint/style/noProcessEnv: Intentional
      process.env.NODE_ENV === "test" ? ".env.test" : ".env"
    ),
  })
);

// Replace with variation, envNext, envApi
const EnvSchema = ZeroSchema.shape.envNext;

export type env = z.infer<typeof EnvSchema>;

// biome-ignore lint/style/noProcessEnv: Intentional
const { data, error } = EnvSchema.safeParse(process.env);

if (error) {
  // biome-ignore lint/suspicious/noConsole: Intentional
  console.error("❌ Invalid env:");
  // biome-ignore lint/suspicious/noConsole: Intentional
  console.error(JSON.stringify(error.flatten().fieldErrors, null, 2));
  process.exit(1);
}

// biome-ignore lint/style/noNonNullAssertion: Intended
export const ENV = data!;
