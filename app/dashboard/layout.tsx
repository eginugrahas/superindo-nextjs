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
  const router = useRouter()
  const user = useAppSelector((state) => state.authReducer.user);
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  const dispatch = useDispatch<AppDispatch>();
  
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      dispatch(setToken(token))
    } else{
      router.push('/')
    }
  },[dispatch])
  

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-p-white">
      <Header user={{name: user.name}} isAuth={isAuth}/>
      <div className="flex flex-1">
        <div className="">
          <Sidebar user={{ name: user.name, isOperator: user.isOperator }} />
        </div>
        <div className="flex-1 overflow-hidden">
          <main className="h-full overflow-y-auto bg-gray-100 py-4 px-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
