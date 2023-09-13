import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialStateType = {
  value: AuthStateType;
};

type AuthStateType = {
  isAuth: boolean;
  username: string;
  id: string;
  isAdmin: boolean;
};

const initialState = {
  value: {
    isAuth: false,
    username: "",
    id: "",
    isAdmin: false,
  } as AuthStateType,
} as InitialStateType;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<string>) => {
      return {
        value: {
          isAuth: true,
          username: action.payload,
          id: "aaa0001",
          isAdmin: false,
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
