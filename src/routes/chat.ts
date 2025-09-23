import { Hono } from "hono";
import { addNewChatController, getChatController } from "../controllers/chat.js";


const chatRouter = new Hono();

chatRouter.post("/", addNewChatController);
chatRouter.get("/:id", getChatController);

export default chatRouter;