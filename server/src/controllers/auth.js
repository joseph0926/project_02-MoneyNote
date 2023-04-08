import User from "../models/User.js";
import { comparePassword, createJwt, hashPassword } from "../middleware/authMiddleware.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import UnauthenticatedError from "../errors/un-auth.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    email,
    password: hashedPassword,
    name,
  });
  const token = createJwt(user._id, user.name);

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      token,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("이메일 또는 비밀번호가 유효하지 않습니다. 다시 입력해주세요");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("해당 이메일로 가입된 정보를 찾을수없습니다.");
  }

  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("비밀번호가 잘못되었습니다.");
  }

  const token = createJwt(user._id, user.name);

  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      name: user.name,
      token,
    },
  });
};
