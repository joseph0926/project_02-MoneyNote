import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/user-slice";
import uiSlice from "./ui/ui-slice";
import expenseSlice from "./money/expense-slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    ui: uiSlice,
    expense: expenseSlice,
  },
});
