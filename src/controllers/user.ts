import type { Context } from "hono";
import { addUserService } from "../services/user.js";

export async function addUserController(c: Context) {
    try {
        const { name } = await c.req.json();
        console.log("user name", name)
        if (!name) {
            c.json({ message: "Give a name first to start a chat" }, 401);
        }
        const userData = await addUserService(name);
        return c.json(userData, 201)
    } catch (error: Error | any) {
        return c.json({ message: `${error.message}` }, 500);
    }
};