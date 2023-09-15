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

      const user = await response.json();
      console.log(user)
      return user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const auth = createSlice({
  name: "auth",
  initialState: initialState.value,
  reducers: {
    logOut: () => {
      return initialState.value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isAuth = false;
        state.user = initialState.value.user;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isAuth = false;
        state.user = initialState.value.user;
        state.error = action.payload || "An error occured on Authentification";
      });
  },
});

export const { logOut } = auth.actions;
export default auth.reducer;
