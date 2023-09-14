import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

type AuthStateType = {
  isAuth: boolean;
  user: {
    username: string;
    password: string;
    id: number;
    name: string;
    isOperator: boolean;
  };
};

export const loginAsync = createAsyncThunk(
  "/api/auth",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      // Check if credentials are blank
      if (
        credentials.username.trim() === "" ||
        credentials.password.trim() === ""
      ) {
        return rejectWithValue("Username and password cannot be blank.");
      }

      const response = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message);
      }

      const user = await response.json();
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const auth = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    user: null as object | null,
    error: null as string | null,
  },
  reducers: {
    logOut: (state) => {
      state.isAuth = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isAuth = false;
        state.user = null;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isAuth = false;
        state.user = null;
        state.error = action.error.message || "An error occurred during login.";
      });
  },
});

export const { logOut } = auth.actions;
export default auth.reducer;
