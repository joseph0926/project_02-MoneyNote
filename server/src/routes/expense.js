import express from "express";
import { getAllExpense } from "../controllers/expense.js";

export const router = express.Router();

router.get("/", getAllExpense);
