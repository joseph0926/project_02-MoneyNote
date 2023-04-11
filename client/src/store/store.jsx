import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user/user-slice";
import uiSlice from "./ui/ui-slice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    ui: uiSlice,
  },
});
