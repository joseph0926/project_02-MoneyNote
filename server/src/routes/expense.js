import express from "express";
import {
  createExpense,
  deleteExpense,
  getAllExpense,
} from "../controllers/expense.js";

export const router = express.Router();

router.get("/", getAllExpense);
router.post("/", createExpense);
router.delete("/:id", deleteExpense);
