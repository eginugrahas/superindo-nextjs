import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <header className="bg-white py-3 px-4 flex justify-between items-center border-b-2 border-red">
      <div className="">
        <Image src={"/logo-superindo.png"} alt="logo" width={50} height={50} />
      </div>
      <div className="flex gap-3 items-center">
        <div className="">
          <i className="icon-bell-solid text-purple cursor-pointer"></i>
        </div>
        <button className="bg-red w-[30px] h-[30px] rounded-full font-semibold text-white text-sm">
          JS
        </button>
      </div>
    </header>
  );
};

export default Header;
