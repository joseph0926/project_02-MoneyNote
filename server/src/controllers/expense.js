import mongoose from "mongoose";
import moment from "moment";

import Money from "../models/Money.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import NotFoundError from "../errors/not-found.js";

export const getAllExpense = async (req, res) => {
  const expenses = await Money.find({});
  if (!expenses) {
    throw new NotFoundError("등록된 비용을 찾을 수 없습니다.");
  }

  res.status(StatusCodes.OK).json({ expenses });
};

export const createExpense = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const expense = await Money.create(req.body);
  res.status(StatusCodes.CREATED).json({ expense });
};

export const deleteExpense = async (req, res) => {
  const { userId } = req.user;
  const { id: expenseId } = req.params;

  const expense = await Money.findByIdAndRemove({
    _id: expenseId,
    createdBy: userId,
  });
  if (!expense) {
    throw new NotFoundError(`${expenseId}의 항목을 찾을 수 없습니다.`);
  }
  res.status(StatusCodes.OK).json({ message: "삭제 성공" });
};
