import { Hono } from "hono";
import { addNewMessageController, getAllMessageController, getMessageController } from "../controllers/message.js";
import { addMessageLimiter } from "../limiter/message.js";

const messagerouter = new Hono();

messagerouter.post("/", addMessageLimiter, addNewMessageController);
messagerouter.get("/", getAllMessageController);
messagerouter.get("/:chat_id", getMessageController);

export default messagerouter;