import * as userService from "../services/userService.js";

export const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch {
    res.status(500).json({ error: "Error fetching users" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, age, password } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email required" });
    }

    const user = await userService.createUser({
      name,
      email,
      age,
      password,
    });

    res.json(user);
  } catch {
    res.status(500).json({ error: "Error creating user" });
  }
};

export const login = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }

    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch {
    res.status(500).json({ error: "Login error" });
  }
};
