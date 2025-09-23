import aiClient from "../config/ai-client.js";
import prisma from "../config/db.js";
import type { MessagePayload } from "../types/message.js";


export async function addNewMessageService({ chat_id, content }: MessagePayload) {
    try {
        const start = Date.now();
        const parsedChatId = Number(chat_id);
        const chat = await prisma.chat.findUnique({
            where: {
                id: parsedChatId
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
                    content: chat.Persona.systemPrompt
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
        const message = await prisma.messageItem.create({
            data: {
                content,
                reply,
                chat_id: parsedChatId
            },
            select: {
                reply: true
            }
        })
        const end = Date.now();
        const latency = end - start + "ms";
        return {
            message: "Message created",
            data: {
                reply: message.reply,
                latency
            }
        }
    } catch (error) {
        console.error(error);
        throw new Error("There are something error with server")
    }
}