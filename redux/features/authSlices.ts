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
  token: string | null;
  error: object | null;
};

type InitialStateType = {
  value: AuthStateType;
};

const initialState: InitialStateType = {
  value: {
    isAuth: false,
    user: {
      username: "",
      password: "",
      id: 0,
      name: "",
      isOperator: false,
    },
    token: null,
    error: null,
  },
};

export const loginAsync = createAsyncThunk(
  "auth/login", // Unique action type
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

      const data = await response.json();
      if (data.token.length > 0) {
        localStorage.setItem("token", data.token);
      }
      return data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const auth = createSlice({
  name: "auth",
  initialState: initialState.value,
  reducers: {
    logOut: (state) => {
      state.isAuth = false;
      state.user = initialState.value.user;
      state.token = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isAuth = false;
        state.user = initialState.value.user;
        state.token = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.token = action.payload;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isAuth = false;
        state.user = initialState.value.user;
        state.token = null;
        state.error = action.payload || "An error occured on Authentification";
      });
  },
});

export const { logOut, setToken } = auth.actions;
export default auth.reducer;
