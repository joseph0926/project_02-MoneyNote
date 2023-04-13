import User from "../models/User.js";
import { comparePassword, createJwt, hashPassword } from "../middleware/authMiddleware.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import UnauthenticatedError from "../errors/un-auth.js";

export const signup = async (req, res) => {
  const { email, password, name, goal, description } = req.body;

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    email,
    password: hashedPassword,
    name,
    goal: goal ? goal : "",
    description: description ? description : "",
  });
  const token = createJwt(user._id, user.name);

  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      name: user.name,
      goal: user.goal,
      description: user.description,
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
      goal: user.goal,
      description: user.description,
      token,
    },
  });
};

export const updateUser = async (req, res) => {
  const { name, goal, description } = req.body;
  if (!name) {
    throw new BadRequestError("이름이 유효하지 않습니다. 다시 입력해주세요");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.name = name;
  user.goal = goal;
  user.description = description;

  await user.save();

  const token = createJwt(user._id, user.name);

  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      goal: user.goal,
      description: user.description,
      token,
    },
  });
};

export const updatePassword = async (req, res) => {
  const { currPassword, newPassword } = req.body;
  if (!currPassword || !newPassword) {
    throw new BadRequestError("비밀번호가 유효하지 않습니다. 다시 입력해주세요");
  }

  const user = await User.findOne({ _id: req.user.userId });

  const isMatch = await comparePassword(currPassword, user.password);
  if (!isMatch) {
    throw new UnauthenticatedError("비밀번호가 일치하지 않습니다.");
  }

  const hashNewPassword = await hashPassword(newPassword);
  user.password = hashNewPassword;
  await user.save();

  const token = createJwt(user._id, user.name);

  res.status(StatusCodes.OK).json({
    user: {
      token,
    },
  });
};
