import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  getUserFromLocalStorage,
  addUserToLocalStorage,
  removeUserFromLocalStorage,
} from "../../components/Helpers/localStorage";

const url = "http://localhost:5000/api/v1";

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
};

export const signup = createAsyncThunk(
  "user/signup",
  async (user, thunkAPI) => {
    console.log(user);
    try {
      const response = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      if (!response.ok) {
        throw data;
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.msg);
    }
  }
);
export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  try {
    const response = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();

    if (!response.ok) {
      throw data;
    }
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.msg);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        console.log(user);
        toast.success(`안녕하세요! ${user.name}님`);
      })
      .addCase(signup.rejected, (state, { payload }) => {
        console.log(payload);
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);

        toast.success(`안녕하세요! ${user.name}님`);
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export default userSlice.reducer;
