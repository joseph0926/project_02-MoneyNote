import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "이름을 입력해주세요"],
    maxlength: 50,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, "이메일을 입력해주세요"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "이메일 형식이 잘못되었습니다.",
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "비밀번호를 입력해주세요"],
    minlength: 6,
  },
  goal: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
    maxlength: 100,
  },
});

export default mongoose.model("User", UserSchema);
