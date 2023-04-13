import express from "express";
import { getAllExpense } from "../controllers/expense";

export const router = express.Router();

router.get("/", getAllExpense);
