import type { Context } from "hono";
import { addUserService, getAllUserService, getUserChatService } from "../services/user.js";

export async function addUserController(c: Context) {
    try {
        const { name } = await c.req.json();
        if (!name) {
            c.json({ message: "Give a name first to start a chat" }, 401);
        }
        const userData = await addUserService(name);
        return c.json(userData, 201)
    } catch (error: Error | any) {
        return c.json({ message: `${error.message}` }, 500);
    }
};

export async function getAllUserController(c: Context) {
    try {
        const allUser = await getAllUserService();
        return c.json(allUser, 200);
    } catch (error: Error | any) {
        return c.json({ message: `${error.message}` }, 500);
    }
}

export async function getUserChatController(c: Context) {
    try {
        const { user_id } = c.req.param();
        const userChat = await getUserChatService(user_id);
        return c.json(userChat, 200)
    } catch (error: Error | any) {
        return c.json({ message: `${error.message}` }, 500);
    }
}