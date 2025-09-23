import { Hono } from "hono";
import { addUserController } from "../controllers/user.js";

const userRouter = new Hono();

userRouter.post("/", addUserController);

export default userRouter;