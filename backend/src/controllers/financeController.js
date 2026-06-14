import * as financeService from "../services/financeService.js";

export const getFinances = async (req, res) => {
  try {
    const data = await financeService.getFinances();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Error fetching finances" });
  }
};

export const getFinancesByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const data = await financeService.getFinancesByUser(userId);
    res.json(data);
  } catch {
    res.status(500).json({ error: "Error fetching user finances" });
  }
};

export const createFinance = async (req, res) => {
  try {
    const { name, email, monthly, rent, food, extra, month, userId } = req.body;

    if (!name || !email || !monthly || !rent || !food || !month || !userId) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const finance = await financeService.createFinance({
      name,
      email,
      monthly: Number(monthly),
      rent: Number(rent),
      food: Number(food),
      extra: extra ? Number(extra) : null,
      month,
      userId,
    });

    res.json(finance);
  } catch {
    res.status(500).json({ error: "Error creating finance" });
  }
};

export const updateFinance = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await financeService.updateFinance(id, req.body);
    res.json(updated);
  } catch {
    res.status(500).json({ error: "Error updating finance" });
  }
};

export const deleteFinance = async (req, res) => {
  try {
    const { id } = req.params;

    await financeService.deleteFinance(id);
    res.json({ message: "Deleted" });
  } catch {
    res.status(500).json({ error: "Error deleting finance" });
  }
};
