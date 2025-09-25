import { Hono } from "hono";
import { addUserController, getAllUserController, getUserChatController } from "../controllers/user.js";

const userRouter = new Hono();

userRouter.post("/", addUserController);
userRouter.get("/", getAllUserController);
userRouter.get("/chat/:user_id", getUserChatController);

export default userRouter;