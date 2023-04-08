import * as dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const comparePassword = async (inputPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
  return isMatch;
};

export const createJwt = (userId, name) => {
  return jwt.sign({ userId, name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
};
