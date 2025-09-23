import prisma from "../config/db.js";
import type { ChatPayload } from "../types/chat.js";


export async function addNewChatService({ user_id, persona_id }: ChatPayload) {
    try {
        const data = await prisma.chat.create({
            data: {
                user_id,
                persona_id
            }
        });

        return {
            message: "New Message created",
            data
        }
    } catch (error) {
        console.error(error);
        throw new Error("There are something error with server")
    }
}

export async function getChatService(id: number) {
    try {
        const data = await prisma.chat.findUnique({
            where: {
                id
            },
            include: {
                message_items: true
            }
        });

        return {
            message: "Success get a chat",
            data
        }
    } catch (error) {
        console.error(error);
        throw new Error("There are something error with server")
    }
}