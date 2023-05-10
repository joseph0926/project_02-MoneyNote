import mongoose from "mongoose";

const MoneySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "지출 내용을 입력해주세요"],
      maxlength: 50,
    },
    description: {
      type: String,
      required: [true, "지출에 대한 설명을 입력해주세요"],
      maxlength: 300,
    },
    status: {
      type: String,
      enum: ["지출예정", "지출"],
      default: "지출예정",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    expensesType: {
      type: String,
      enum: ["생활비", "교육비", "취미생활비", "그외"],
      default: "그외",
    },
    expenseAmount: {
      type: Number,
      required: [true, "지출 금액을 입력해주세요"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Money", MoneySchema);
