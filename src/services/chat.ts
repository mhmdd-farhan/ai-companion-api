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

export async function getAllChatService() {
    try {
        const data = await prisma.chat.findMany({
            select: {
                id: true
            }
        })

        return {
            message: "Get all chat sucess",
            data
        }
    } catch (error) {
        console.error(error);
        throw new Error("There are something error with server")
    }
}

export async function getChatService(id: string) {
    try {
        const data = await prisma.chat.findUnique({
            where: {
                id
            },
            include: {
                Persona: true
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