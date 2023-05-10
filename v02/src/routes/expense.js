import express from "express";
import { createExpense, deleteExpense, getAllExpense, showStats, updateExpense } from "../controllers/expense.js";

export const router = express.Router();

router.get("/", getAllExpense);
router.get("/stats", showStats);
router.post("/", createExpense);
router.delete("/:id", deleteExpense);
router.patch("/:id", updateExpense);
