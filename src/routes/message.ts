import { Hono } from "hono";
import { addNewMessageController } from "../controllers/message.js";

const messagerouter = new Hono();

messagerouter.post("/", addNewMessageController);

export default messagerouter;