import { Hono, type Context } from "hono";
import { addNewChatController, getAllChatController, getChatController } from "../controllers/chat.js";
import { addChatLimiter } from "../limiter/chat.js";

const chatRouter = new Hono();

chatRouter.post("/", addChatLimiter, addNewChatController);
chatRouter.get("/", getAllChatController);
chatRouter.get("/:id", getChatController);

export default chatRouter;