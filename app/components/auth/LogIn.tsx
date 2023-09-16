"use client";

import Image from "next/image";
import { useState } from "react";
import { loginAsync } from "@/redux/features/authSlices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { setRole } from "@/redux/features/userRoleSlices";

export const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const credential = { username, password };

  const dispatch = useDispatch<AppDispatch>();

  function handleLogIn() {
    if (username.trim() === "" || password.trim() === "") {
      alert("Username and password cannot be blank");
      return;
    }

    dispatch(loginAsync(credential)).then((resultAction) => {
      if (loginAsync.fulfilled.match(resultAction)) {
        let userRole = "oustomer";
        if (resultAction.payload.isOperator === true) {
          userRole = "operator";
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      } else if (loginAsync.rejected.match(resultAction)) {
        const errorMessage =
          resultAction.payload || "An error occurred during login.";
        alert(errorMessage);
      }
    });
  }

  return (
    <div className="flex flex-col items-center">
      <Image
        src="/logo-superindo.png"
        width={100}
        height={100}
        alt="logo"
      ></Image>
      <div className="flex flex-col p-3 mt-3">
        <div className="font-bold text-[24px]">Masuk</div>
        <form action="">
          <div className="mt-2">
            <input
              type="text"
              name="username"
              className="py-3 px-4 font-medium border rounded border-gray-400 text-sm outline-none"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <input
              type="password"
              name="password"
              className="py-3 px-4 font-medium border rounded border-gray-400 text-sm outline-none"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>
        <div className="mt-4">
          <button
            type="button"
            onClick={handleLogIn}
            className="w-full py-3 rounded bg-red items-center font-bold text-p-white hover:opacity-60"
          >
            Masuk
          </button>
        </div>
        <div className="mt-2">
          <div className="text-center text-xs font-semibold">
            Baru di Super Indo? <span className="text-red">Daftar disini!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
