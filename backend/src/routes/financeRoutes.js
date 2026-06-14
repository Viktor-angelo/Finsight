import express from "express";
import * as financeController from "../controllers/financeController"

const router = express.Router();
router.get("/", financeController.getFinances);
router.get("/:userId", financeController.getFinancesByUser);
router.post("/", financeController.createFinance);
router.put("/:id", financeController.updateFinance);
router.delete("/:id", financeController.deleteFinance);

export default router;