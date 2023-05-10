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
    try {
      const response = await fetch(`${url}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
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
export const login = createAsyncThunk("user/login", async (user, thunkAPI) => {
  try {
    const response = await fetch(`${url}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user, thunkAPI) => {
    try {
      const response = await fetch(`${url}/auth/updateUser`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
        body: JSON.stringify(user),
      });

      if (response.status === 401) {
        thunkAPI.dispatch(logout());
        return thunkAPI.rejectWithValue("인증오류가 발생하였습니다,,,");
      }
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

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (user, thunkAPI) => {
    try {
      const response = await fetch(`${url}/auth/updatePassword`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
        body: JSON.stringify(user),
      });

      if (response.status === 401) {
        thunkAPI.dispatch(logout());
        return thunkAPI.rejectWithValue("인증오류가 발생하였습니다,,,");
      }
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, { payload }) => {
      state.user = null;
      removeUserFromLocalStorage();
      if (payload) {
        toast.success(payload);
      }
    },
  },
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
        toast.success(`환영합니다! ${user.name}님`);
      })
      .addCase(signup.rejected, (state, { payload }) => {
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
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`${user.name}님 정보 업데이트 성공`);
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user);
        toast.success(`${user.name}님 비밀번호 업데이트 성공`);
      })
      .addCase(updatePassword.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
