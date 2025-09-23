import type { Context } from "hono";
import { addNewMessageService } from "../services/message.js";


export async function addNewMessageController(c: Context) {
    try {
        const payload = await c.req.json();
        const newMessage = await addNewMessageService(payload);
        return c.json(newMessage, 201);
    } catch (error: Error | any) {
        return c.json({ message: error.message }, 500);
    }
}