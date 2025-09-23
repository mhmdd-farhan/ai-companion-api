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

export async function getPersonaService() {
    try {
        const data = await prisma.persona.findMany();

        return {
            message: "Get a persona success",
            data
        }
    } catch (error) {
        console.error(error);
        throw new Error("There are something wrong with server");
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