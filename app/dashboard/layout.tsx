"use client";

import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setToken } from "@/redux/features/authSlices";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useAppSelector((state) => state.authReducer.user);
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    } else {
      router.push("/");
    }
  }, [dispatch]);

  return (
    <div className="h-screen flex bg-p-white">
      <Sidebar user={{ name: user.name, isOperator: user.isOperator }} />
      <Header user={{ name: user.name }} isAuth={isAuth} />
      <div className="flex-1 ml-[200px] overflow-hidden">
        <main className="h-full overflow-y-auto bg-gray-100 pt-4 pb-[6rem] px-8 mt-[80px]">
          {children}
        </main>
      </div>
    </div>
  );
}
