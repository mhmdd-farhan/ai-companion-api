import aiClient from "../config/ai-client.js";
import prisma from "../config/db.js";
import type { MessagePayload } from "../types/message.js";


export async function addNewMessageService({ chat_id, content }: MessagePayload) {
    try {
        const rule = process.env.SYSTEM_RULE as string;
        const start = Date.now();
        const chat = await prisma.chat.findUnique({
            where: {
                id: chat_id
            },
            select: {
                persona_id: true,
                Persona: true
            }
        });
        if (!chat) {
            throw new Error();
        }
        const completion = await aiClient.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: `You are ${chat.Persona.name}, ${chat.Persona.systemPrompt}. ${rule}`
                },
                {
                    role: "user",
                    content
                }
            ]
        });
        const reply = completion.choices[0].message.content;
        if (!reply) {
            throw new Error();
        }
        const end = Date.now();
        const latency = end - start + "ms";
        const message = await prisma.messageItem.create({
            data: {
                content,
                reply,
                chat_id,
                latency
            },
            select: {
                reply: true,
                id: true
            }
        })
        return {
            message: "Message created",
            data: {
                id: message.id,
                reply: message.reply,
                latency
            }
        }
    } catch (error) {
        console.error(error);
        throw new Error("There are something error with server")
    }
}

export async function getAllMessageService() {
    try {
        const data = await prisma.messageItem.findMany({
            select: {
                latency: true
            }
        })
        return {
            message: "Get all message success",
            data
        }
    } catch (error) {
        console.error(error);
        throw new Error("There are something error with server")
    }
}

export async function getMessageService(chat_id: string) {
    try {
        const data = await prisma.messageItem.findMany({
            where: {
                chat_id
            }
        });

        return {
            message: "Get Messages sucess",
            data
        }
    } catch (error) {
        console.error(error);
        throw new Error("There are something error with server")
    }
}