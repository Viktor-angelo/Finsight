import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "https://finsight-frontend.onrender.com",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch {
    res.status(500).json({ error: "Error fetching users" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email, age, password } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        age,
        password,
      },
    });

    res.json(user);
  } catch {
    res.status(500).json({ error: "Error creating user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch {
    res.status(500).json({ error: "Login error" });
  }
});

/* ===== FINANCAS ROUTES ===== */

app.get("/financas", async (req, res) => {
  try {
    const finances = await prisma.finances.findMany();
    res.json(finances);
  } catch {
    res.status(500).json({ error: "Error fetching finances" });
  }
});

app.get("/financas/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const finances = await prisma.finances.findMany({
      where: { userId },
    });

    res.json(finances);
  } catch {
    res.status(500).json({ error: "Error fetching user finances" });
  }
});

app.post("/financas", async (req, res) => {
  try {
    const { name, email, monthly, rent, food, extra, month, userId } = req.body;

    if (!name || !email || !monthly || !rent || !food || !month || !userId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const finance = await prisma.finances.create({
      data: {
        name,
        email,
        monthly,
        rent,
        food,
        extra,
        month,
        userId,
      },
    });

    res.json(finance);
  } catch {
    res.status(500).json({ error: "Error creating finance" });
  }
});

app.put("/financas/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await prisma.finances.update({
      where: { id },
      data: req.body,
    });

    res.json(updated);
  } catch {
    res.status(500).json({ error: "Error updating finance" });
  }
});

app.delete("/financas/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.finances.delete({
      where: { id },
    });

    res.json({ message: "Finance deleted" });
  } catch {
    res.status(500).json({ error: "Error deleting finance" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
