import Image from "next/image";
import React from "react";
import { useAppSelector } from "@/redux/store";
import { logOut } from "@/redux/features/authSlices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { getShortName } from "../utils/formatter";

type User = {
  name: string;
};

type HeaderPropsType = {
  user: User;
};

const Header: React.FC<HeaderPropsType> = ({user}) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  function handleLogout() {
    dispatch(logOut());
    router.push("/");
  }
  return (
    <header className="bg-white py-3 px-4 flex justify-between items-center border-b-2 border-red">
      <div className="">
        <Image src={"/logo-superindo.png"} alt="logo" width={50} height={50} />
      </div>
      <div className="flex gap-3 items-center">
        <div className="">
          <i className="icon-bell-solid text-purple cursor-pointer"></i>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red w-[30px] h-[30px] rounded-full font-semibold text-white text-sm"
        >
          {getShortName(user.name)}
        </button>
      </div>
    </header>
  );
};

export default Header;