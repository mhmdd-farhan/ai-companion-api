import prisma from "../config/db.js";
import type { PersonaPayload } from "../types/persona.js";

export async function addPersonaService({ name, systemPrompt }: PersonaPayload) {
    try {
        const newPersona = await prisma.persona.create({
            data: {
                name,
                systemPrompt
            },
            select: {
                name: true
            }
        });

        return {
            message: "Add new persona success",
            data: {
                persona_name: newPersona.name
            }
        }
    } catch (error) {
        console.error(error);
        throw new Error("There are something wrong with server")
    }
}

export async function getAllPersonaService() {
    try {
        const data = await prisma.persona.findMany({
            include: {
                chats: {
                    select: {
                        id: true,
                        message_items: {
                            select: {
                                id: true
                            }
                        }
                    }
                }
            }
        })

        return {
            message: "Get all persona success",
            data
        }
    } catch (error) {
        console.error(error);
        throw new Error("There are something wrong with server")
    }
}

export async function getPersonaService(id: number) {
    try {
        const data = await prisma.persona.findUnique({
            where: {
                id
            }
        });

        return {
            message: "Get persona by id success",
            data
        }
    } catch (error) {
        console.error(error);
        throw new Error("There are something wrong with server")
    }
}


export async function updatePersonaService(id: number, { name, systemPrompt }: PersonaPayload) {
    try {
        const data = await prisma.persona.update({
            data: {
                name,
                systemPrompt
            },
            where: {
                id
            }
        });

        return {
            message: "Update a persona success",
            data
        }
    } catch (error) {
        console.error(error);
        throw new Error("There are something wrong with server");
    }
}