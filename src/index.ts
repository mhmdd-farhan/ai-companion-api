import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from 'dotenv'
import { getDinamicPort } from './config/port.js';
import userRouter from './routes/user.js';
import { checkAPiKey } from './middlewares/api-key.js';
import personaRouter from './routes/persona.js';
import chatRouter from './routes/chat.js';
import messagerouter from './routes/message.js';
dotenv.config();

const app = new Hono();
const port = getDinamicPort();

app.all("*", checkAPiKey);

app.get('/', (c) => {
  return c.html('Hello Hono!');
})

app.route("/user", userRouter);
app.route("/personas", personaRouter);
app.route("/chat", chatRouter);
app.route("/messages", messagerouter);

serve({
  fetch: app.fetch,
  port: port || 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
