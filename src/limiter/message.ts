import type { Context } from "hono";
import { rateLimiter } from "hono-rate-limiter";

export const addMessageLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    keyGenerator: (c: Context) => c.req.header('x-forwarded-for') || "Unknown IP",
    handler: (c) => {
        return c.text('Too many requests, please try again later.', 429);
    },
});