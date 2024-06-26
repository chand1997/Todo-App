import { Hono } from "hono";
import { cors } from "hono/cors";
import { todoRoute } from "./routes/todo";
import { userRoute } from "./routes/user";

const app = new Hono();

app.use(
  "/*",
  cors( {
    origin: ["https://todo-app-six-khaki.vercel.app"],
  } )
);

app.route("/api/v1/user", userRoute);
app.route("api/v1/todo", todoRoute);

export default app;
