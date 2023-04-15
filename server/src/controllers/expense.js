import mongoose from "mongoose";
import moment from "moment";

import Money from "../models/Money.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import NotFoundError from "../errors/not-found.js";

export const getAllExpense = async (req, res) => {
  const { userId } = req.user;
  const expenses = await Money.find({ createdBy: userId });
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

export const updateExpense = async (req, res) => {
  const { userId } = req.user;
  const { id: expenseId } = req.params;
  const { title, description, expenseAmount } = req.body;
  if (title === "" || description === "" || expenseAmount === 0) {
    throw new BadRequestError("필수 항목들은 비울수 없습니다.");
  }

  const expense = await Money.findByIdAndUpdate({ _id: expenseId, createdBy: userId }, req.body, { new: true, runValidators: true });
  if (!expense) {
    throw new NotFoundError(`${expenseId}의 항목을 찾을 수 없습니다.`);
  }

  res.status(StatusCodes.OK).json({ expense });
};

export const showStats = async (req, res) => {
  const { userId } = req.user;

  const totalExpense = await Money.find({ createdBy: userId }).countDocuments({});
  const expenseAmounts = await Money.find({ createdBy: userId }).select("expenseAmount -_id");

  let total = 0;
  for (let i = 0; i < totalExpense; i++) {
    const value = expenseAmounts[0].expenseAmount;
    total += value;
  }

  const totalExpenseAmount = total;

  let monthlyApplications = await Money.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { day: { $dayOfMonth: "$createdAt" }, month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.month": -1, "_id.year": -1 } },
    { $limit: 6 },
  ]);
  monthlyApplications = monthlyApplications
    .map((item) => {
      console.log(item);
      const {
        _id: { day, month, year },
        count,
      } = item;
      const date = moment()
        .day(day - 9)
        .month(month - 1)
        .year(year)
        .format("YYYY-MM-DD");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ stats: { totalExpense, totalExpenseAmount }, monthlyApplications });
};
