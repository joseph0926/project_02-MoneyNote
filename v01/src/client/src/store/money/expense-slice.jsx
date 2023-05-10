import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { logout } from "../user/user-slice";

const url = "http://localhost:5000/api/v1";

const initialFilterState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "amount-desc", "amount-asc"],
};

const initialTotalState = {
  expenseAmount: 0,
  totalExpenseAmount: 0,
};

const initialExpenseState = {
  title: "",
  description: "",
  statusOptions: ["지출예정", "지출"],
  status: "지출예정",
  expensesTypeOptions: ["생활비", "교육비", "취미생활비", "그외"],
  expensesType: "그외",
  isEditing: false,
  editExpenseId: "",
};

const initialState = {
  isLoading: false,
  expenses: [],
  totalExpense: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialTotalState,
  ...initialExpenseState,
  ...initialFilterState,
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
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const deleteExpense = createAsyncThunk("expense/deleteExpense", async (expenseId, thunkAPI) => {
  try {
    const response = await fetch(`${url}/expense/${expenseId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    if (response.status === 401) {
      thunkAPI.dispatch(logout());
      return thunkAPI.rejectWithValue("인증오류가 발생하였습니다,,,");
    }
    if (!response.ok) {
      throw await response.json();
    }

    thunkAPI.dispatch(getAllExpenses());

    const data = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateExpense = createAsyncThunk("expense/updateExpense", async ({ expenseId, expense }, thunkAPI) => {
  try {
    const response = await fetch(`${url}/expense/${expenseId}`, {
      method: "PATCH",
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
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const showStats = createAsyncThunk("expense/showStats", async (_, thunkAPI) => {
  try {
    const response = await fetch(`${url}/expense/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    if (!response.ok) {
      throw await response.json();
    }

    thunkAPI.dispatch(getAllExpenses());

    const data = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    changeHandler: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearHandler: () => {
      return { ...initialFilterState };
    },
    setEditMode: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
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
        state.isLoading = false;
        toast.success("새로운 지출 내역 생성에 성공하셨습니다");
      })
      .addCase(createExpense.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      // deleteExpense
      .addCase(deleteExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExpense.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("지출 내역 삭제에 성공하셨습니다");
      })
      .addCase(deleteExpense.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error({ payload });
      })
      // updateExpense
      .addCase(updateExpense.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateExpense.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success("지출 내역 수정에 성공하셨습니다");
      })
      .addCase(updateExpense.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error({ payload });
      })
      // stats
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.stats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        console.log(payload.message);
        toast.error(payload.message);
      });
  },
});

export const { clearHandler, changeHandler, setEditMode, calcExpense } = expenseSlice.actions;

export default expenseSlice.reducer;
