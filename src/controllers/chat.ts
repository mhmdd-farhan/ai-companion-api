import type { Context } from "hono";
import { addNewChatService, getAllChatService, getChatService } from "../services/chat.js";

export async function addNewChatController(c: Context) {
    try {
        const payload = await c.req.json();
        const newChat = await addNewChatService(payload);
        return c.json(newChat, 201);
    } catch (error: Error | any) {
        return c.json({ message: error.message }, 500);
    }
}

export async function getAllChatController(c: Context) {
    try {
        const allChat = await getAllChatService();
        return c.json(allChat, 200);
    } catch (error: Error | any) {
        return c.json({ message: error.message }, 500);
    }
}

export async function getChatController(c: Context) {
    try {
        const { id } = c.req.param();
        const chat = await getChatService(id);
        return c.json(chat, 200);
    } catch (error: Error | any) {
        return c.json({ message: error.message }, 500);
    }
}