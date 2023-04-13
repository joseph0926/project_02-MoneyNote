import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const url = "http://localhost:5000/api/v1";

const initialState = {
  isLoading: false,
  expenses: [],
  totalExpense: 0,
};

export const getAllExpenses = createAsyncThunk(
  "expense/getAllExpenses",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(`${url}/expense`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });

      if (!response.ok) {
        throw await response.json();
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllExpenses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllExpenses.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.expenses = payload.expenses;
      })
      .addCase(getAllExpenses.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default expenseSlice.reducer;
