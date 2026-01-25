import { z } from "zod";

export const ZeroSchemaPrimitives = z.object({
  // #region env
  /** NODE_ENV ref: https://nextjs.org/docs/pages/guides/environment-variables */
  NODE_ENV: z.enum(["development", "test", "staging", "production"]),
  PORT: z.coerce.number(),
  /** LOG_LEVEL ref: https://github.com/pinojs/pino */
  LOG_LEVEL: z.enum([
    "trace",
    "debug",
    "info",
    "warn",
    "error",
    "fatal",
    "silent",
  ]),
  /** DATABASE ref: https://orm.drizzle.team/docs/tutorials/drizzle-with-vercel-edge-functions */
  DATABASE_URL: z.string(),
  /** DATABASE ref: https://orm.drizzle.team/docs/tutorials/drizzle-with-vercel-edge-functions */
  DATABASE_AUTH_TOKEN: z.string().optional(),
  /** BETTER_AUTH ref: https://www.better-auth.com/docs/installation */
  BETTER_AUTH_URL: z.string(),
  /** BETTER_AUTH ref: https://www.better-auth.com/docs/installation */
  BETTER_AUTH_SECRET: z.string(),
  // #endregion

  // #region date types
  date: z.iso.date(),
  time: z.iso.time(),
  dateTime: z.iso.datetime(),
  /** timeZone IANA ref: https://github.com/date-fns/date-fns/blob/main/scripts/test/tzIANA.ts */
  timeZone: z.string(),
  // #endregion

  summary: z.string(),
  location: z.string(),
  /** recurrence ref: http://tools.ietf.org/html/rfc5545#section-3.8.5 */
  recurrence: z.array(z.string()),
});
export type ZeroSchemaPrimitives = z.infer<typeof ZeroSchemaPrimitives>;

export const ZeroSchema = z.object({
  ...ZeroSchemaPrimitives.shape,
  /**
  googleCalendarEvent ref: 
  https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/gapi.calendar
  https://developers.google.com/workspace/calendar/api/v3/reference/events
  */
  googleCalendarEvent: z.object({
    summary: ZeroSchemaPrimitives.shape.summary,
    location: ZeroSchemaPrimitives.shape.location.optional(),
    recurrence: ZeroSchemaPrimitives.shape.recurrence,
    start: z.xor([
      ZeroSchemaPrimitives.pick({
        date: true,
        timeZone: true,
      }),
      ZeroSchemaPrimitives.pick({
        dateTime: true,
        timeZone: true,
      }),
    ]),
    end: z.xor([
      ZeroSchemaPrimitives.pick({
        date: true,
        timeZone: true,
      }),
      ZeroSchemaPrimitives.pick({
        dateTime: true,
        timeZone: true,
      }),
    ]),
    attendees: z.array(
      z.object({
        email: z.email(),
      })
    ),
  }),
});
export type ZeroSchema = z.infer<typeof ZeroSchema>;
