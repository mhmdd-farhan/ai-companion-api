import type { Context, Next } from "hono";

export async function checkAPiKey(c: Context, next: Next) {
    const apiKeyHeader = c.req.header("x-api-key");
    const apiKey = process.env.API_KEY;
    if ((!apiKeyHeader && !apiKey) || apiKey !== apiKeyHeader) {
        return c.json({ message: "API Key is required!" }, 401);
    }

    await next();
}