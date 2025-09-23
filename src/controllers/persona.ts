import type { Context } from "hono";
import { addPersonaService, getPersonaService, updatePersonaService } from "../services/persona.js";


export async function addPersonaController(c: Context) {
    try {
        const reqNewPersona = await c.req.json();
        const newPersona = await addPersonaService(reqNewPersona);
        return c.json(newPersona, 201);
    } catch (error: Error | any) {
        return c.json({ message: error.message }, 500);
    }
}

export async function getPersonaController(c: Context) {
    try {
        const { id } = c.req.param();
        const parsedId = Number(id);
        const personaData = await getPersonaService(parsedId);

        return c.json(personaData, 200)
    } catch (error: Error | any) {
        return c.json({ message: error.message }, 500);
    }
}

export async function updatePersonaController(c: Context) {
    try {
        const payload = await c.req.json();
        const { id } = c.req.param();
        const parsedId = Number(id);
        const updatedPersona = await updatePersonaService(parsedId, payload);
        return c.json(updatedPersona, 200);
    } catch (error: Error | any) {
        return c.json({ message: error.message }, 500);
    }
}