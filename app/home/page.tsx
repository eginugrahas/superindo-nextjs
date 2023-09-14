"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/store";
import { logOut } from "@/redux/features/authSlices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";

export default function Home() {
//   const username = useAppSelector((state) => state.authReducer.value.username);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()
  function handleLogout() {
    dispatch(logOut());
    router.push("/");
  }
  return (
    <div className="flex flex-col">
      <div className="text-xl">Home</div>
      <div className="">username: {}</div>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
