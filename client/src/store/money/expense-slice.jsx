import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { logout } from "../user/user-slice";

const url = "http://localhost:5000/api/v1";

const initialExpenseState = {
  title: "",
  description: "",
  statusOptions: ["지출예정", "지출"],
  status: "지출예정",
  expensesTypeOptions: ["생활비", "교육비", "취미생활비", "그외"],
  expensesType: "그외",
  expenseAmount: 0,
  totalExpenseAmount: 0,
  isEditing: false,
  editExpense: "",
};

const initialState = {
  isLoading: false,
  expenses: [],
  totalExpense: 0,
  ...initialExpenseState,
};

export const getAllExpenses = createAsyncThunk("expense/getAllExpenses", async (_, thunkAPI) => {
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
});

export const createExpense = createAsyncThunk("expense/createExpense", async (expense, thunkAPI) => {
  try {
    const response = await fetch(`${url}/expense`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
      body: JSON.stringify(expense),
    });

    if (response.status === 401) {
      thunkAPI.dispatch(logout());
      return thunkAPI.rejectWithValue("인증오류가 발생하였습니다,,,");
    }
    if (!response.ok) {
      throw await response.json();
    }

    thunkAPI.dispatch(getAllExpenses());
    thunkAPI.dispatch(clearHandler());

    const data = await response.json();
    return data;
  } catch (error) {}
});

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    changeHandler: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearHandler: () => {
      return { ...initialExpenseState };
    },
  },
  extraReducers: (builder) => {
    builder
      // getAllExpense
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
      })
      // createExpense
      .addCase(createExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExpense.fulfilled, (state, { payload }) => {
        state.isLoading - false;
        toast.success("새로운 지출 내역 생성에 성공하셨습니다");
      })
      .addCase(createExpense.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { clearHandler, changeHandler } = expenseSlice.actions;

export default expenseSlice.reducer;
