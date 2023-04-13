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
