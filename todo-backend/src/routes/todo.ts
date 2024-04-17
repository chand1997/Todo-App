import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "@hono/zod-openapi";

export const todoRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  };
  Variables: {
    userId: string;
  };
}>();

todoRoute.use("/*", async (c, next) => {
  const auth = await c.req.header("authorization");
  // console.log(auth);
  const jwt = auth?.split(" ")[1];
  // console.log(jwt);
  if (!jwt) {
    return c.json({ msg: "Token not found" });
  }
  const verified = await verify(jwt, c.env.SECRET_KEY);
  if (!verified) return c.json({ msg: "Invalid token!" });
  c.set("userId", verified.id);
  await next();
});

const createTodoInput = z.object({
  title: z.string(),
  content: z.string(),
});

todoRoute.post("/", async (c) => {
  const body = await c.req.json();
  const { success } = createTodoInput.safeParse(body);
  if (!success) return c.json({ msg: "Wrong inputs" });
  const userId = c.get("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const todo = await prisma.todo.create({
      data: {
        title: body.title,
        content: body.content,
        userId: userId,
      },
    });
    return c.json({ msg: "Todo created!", id: todo.id });
  } catch (e) {
    return c.json({ e });
  }
});

const updateTodoInputs = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
});

todoRoute.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateTodoInputs.safeParse(body);
  if (!success) return c.json({ msg: "wrong inputs" });

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    await prisma.todo.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    return c.json({ msg: "Todo updated" });
  } catch (e) {
    return c.json({ e });
  }
});

todoRoute.get("/userId/:userId", async (c) => {
  const userId = c.req.param("userId");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
        content: true,
        title: true,
      },
    });
    return c.json({ todos });
  } catch (e) {
    return c.json({ e });
  }
});

todoRoute.get("/id/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id,
      },
      select: {
        title: true,
        content: true,
      },
    });
    return c.json({ todo });
  } catch (e) {
    return c.json({ e });
  }
});

todoRoute.delete("/delete/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    await prisma.todo.delete({
      where: {
        id,
      },
    });
    return c.json({ msg: "Todo Deleted" });
  } catch (e) {
    return c.json({ e });
  }
});
