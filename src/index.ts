import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from 'dotenv'
import { getDinamicPort } from './config/port.js';
import userRouter from './routes/user.js';
import { checkAPiKey } from './middlewares/api-key.js';
import personaRouter from './routes/persona.js';
import chatRouter from './routes/chat.js';
import messagerouter from './routes/message.js';
import { cors } from 'hono/cors';
dotenv.config();

const app = new Hono();
const port = getDinamicPort();
const FRONTEND_URL = process.env.FRONTEND_URL as string;

app.use("*", cors({
  origin: FRONTEND_URL
}))

app.all("*", checkAPiKey);

app.get('/', (c) => {
  return c.html('Welcome to AI Companion API!');
})

app.route("/users", userRouter);
app.route("/personas", personaRouter);
app.route("/chats", chatRouter);
app.route("/messages", messagerouter);

serve({
  fetch: app.fetch,
  port: port || 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
