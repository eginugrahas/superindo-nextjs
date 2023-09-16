import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlices"
import userRoleSlices from "./features/userRoleSlices";
import menuSlices from "./features/menuSlices";
import { TypedUseSelectorHook, useSelector } from "react-redux";
export const store = configureStore({
    reducer: {
        authReducer,
        userRoleSlices,
        menuSlices
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch  = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;