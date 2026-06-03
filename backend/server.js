import express from "express";
import cors from "cors";
import { PrismaClient } from "./src/generated/client.js";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.post("/users", async (req, res) => {
  try {
    const { name, email, age, password } = req.body;

    if (!name || !email || age == null || !password) {
      return res.status(400).json({ error: "Fill in all fields" });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email: email.trim().toLowerCase(),
        age: Number(age),
        password: password.trim(),
      },
    });

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      error: "Error creating user",
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    const user = await prisma.user.findFirst({
      where: {
        email: cleanEmail,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User not found",
      });
    }

    if (user.password !== cleanPassword) {
      return res.status(400).json({
        success: false,
        error: "Incorrect password",
      });
    }

    return res.json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Login error",
    });
  }
});

app.post("/finances", async (req, res) => {
  try {
    const { name, email, rent, monthly, food, extra, month } = req.body;

    if (
      !email ||
      !name ||
      monthly == null ||
      rent == null ||
      food == null ||
      !month
    ) {
      return res.status(400).json({ error: "Fill in all fields" });
    }

    const finance = await prisma.finances.create({
      data: {
        name,
        email,
        monthly: Number(monthly),
        rent: Number(rent),
        food: Number(food),
        extra: Number(extra ?? 0),
        month,
      },
    });

    res.status(201).json(finance);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error creating finance record" });
  }
});

app.get("/finances/:email", async (req, res) => {
  try {
    const email = req.params.email.trim().toLowerCase();

    const user = await prisma.finances.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const income = user.monthly + user.extra;
    const expenses = user.rent + user.food;
    const balance = income - expenses;

    let message = "";

    if (balance > 0 && expenses < income * 0.5) {
      message = "Excellent! You are managing your expenses very well";
    } else if (balance > 0) {
      message = "Good job, but you can still save more";
    } else {
      message = "Warning: your expenses are higher than your income";
    }

    res.json({ income, expenses, balance, message, data: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.get("/admin/users", async (req, res) => {
  try {
    const adminKey = req.headers["x-admin-key"];

    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return res.status(403).json({ error: "Access denied" });
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching users" });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});