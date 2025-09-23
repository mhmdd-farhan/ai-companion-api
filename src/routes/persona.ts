import { Hono } from "hono";
import { addPersonaController, getPersonaController, updatePersonaController } from "../controllers/persona.js";


const personaRouter = new Hono();

personaRouter.post("/", addPersonaController);
personaRouter.get("/", getPersonaController);
personaRouter.put("/:id", updatePersonaController);

export default personaRouter;