import type { Context } from "hono";
import { addNewMessageService, getAllMessageService, getMessageService } from "../services/message.js";


export async function addNewMessageController(c: Context) {
    try {
        const payload = await c.req.json();
        const newMessage = await addNewMessageService(payload);
        return c.json(newMessage, 201);
    } catch (error: Error | any) {
        return c.json({ message: error.message }, 500);
    }
}

export async function getAllMessageController(c: Context) {
    try {
        const allMessage = await getAllMessageService();
        return c.json(allMessage, 200);
    } catch (error: Error | any) {
        return c.json({ message: error.message }, 500);
    }
}

export async function getMessageController(c: Context) {
    try {
        const { chat_id } = c.req.param();
        const messages = await getMessageService(chat_id);
        return c.json(messages, 200)
    } catch (error: Error | any) {
        return c.json({ message: error.message }, 500);
    }
}