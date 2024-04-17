import { Hono } from "hono";
import { sign } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { z } from "@hono/zod-openapi";
import bcrypt from "bcryptjs";

export const userRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  };
}>();

const signupInput = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6, { message: "Minimum 6 characters" }),
});

const signinInput = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Minimum 6 characters" }),
});

userRoute.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    return c.json({ msg: "Incorrect Inputs!!" });
  }
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (existingUser) {
      return c.json({ msg: "Email already taken" });
    }
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });
    const token = await sign({ id: user.id }, c.env.SECRET_KEY);
    return c.json({ token, id: user.id });
  } catch (e) {
    return c.json({ e });
  }
});
userRoute.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    return c.json({ msg: "Incorrect Inputs!!" });
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      return c.json({ msg: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(body.password, user?.password);
    if (!passwordMatch) {
      return c.json({ msg: "Wrong credentials" });
    }
    const token = await sign({ id: user.id }, c.env.SECRET_KEY);
    return c.json({ token, id: user.id });
  } catch (e) {
    return c.json({ e });
  }
});
