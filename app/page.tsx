"use client"

import { useEffect } from "react";
import Header from "./components/Header";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/features/authSlices";
import { useRouter } from "next/navigation";


export default function App() {
  const user = useAppSelector((state) => state.authReducer.user);
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  const router = useRouter()


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
       <Header user={{name: user.name}} isAuth={isAuth} />
       <div className="">Home</div>
    </div>
  );
}
