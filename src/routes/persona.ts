import { Hono } from "hono";
import { addPersonaController, getAllPersonaController, getPersonaController, updatePersonaController } from "../controllers/persona.js";


const personaRouter = new Hono();

personaRouter.post("/", addPersonaController);
personaRouter.get("/", getAllPersonaController);
personaRouter.get("/:id", getPersonaController);
personaRouter.put("/:id", updatePersonaController);

export default personaRouter;