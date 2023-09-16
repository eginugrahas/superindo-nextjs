"use client"

import Header from "./components/Header";
import { useAppSelector } from "@/redux/store";


export default function App() {
  const user = useAppSelector((state) => state.authReducer.user);
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-p-white">
       <Header user={{name: user.name}} isAuth={isAuth} />
       <div className="">Home</div>
    </div>
  );
}
