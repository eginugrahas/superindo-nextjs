import { useState } from "react";
import { getShortName } from "../utils/formatter";

type User = {
  name: string;
  isOperator: boolean;
};

type SidebarProps = {
  user: User;
};

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const [selectedMenu, setSelectedMenu] = useState("home");

  return (
    <div className="flex flex-col w-[200px] bg-white h-screen border-r-2 border-purple">
      <div className="mt-5 mx-4 flex gap-2 items-center border-b border-b-gray pb-5">
        <button className="bg-red h-[45px] w-[45px] text-white font-bold text-lg rounded-full">
          {getShortName(user.name)}
        </button>
        <div className="user-details">
          <div className="font-bold">{user.name}</div>
          <div className="text-gray text-sm font-medium">
            {user.isOperator ? "Operator" : ""}
          </div>
        </div>
      </div>
      <div className="m-5">
        <ul className="">
          <li
            className={`mb-4 cursor-pointer ${
              selectedMenu === "home" ? "text-red" : ""
            }`}
            id="home"
            onClick={() => setSelectedMenu("home")}
          >
            <div className="flex gap-2 font-bold items-center cursor-pointer">
              <i className="icon-home-outline font-bold text-xl"></i>
              <div className="">Home</div>
            </div>
          </li>
          <li
            className={`mb-4 cursor-pointer ${
              selectedMenu === "transaction" ? "text-red" : ""
            }`}
            id="transaction"
            onClick={() => setSelectedMenu("transaction")}
          >
            <div className="flex gap-2 font-bold items-center">
              <i className="icon-orders font-bold text-xl"></i>
              <div className="">Transaksi</div>
            </div>
          </li>
          <li className="" id="master_data">
            <div
              className={`cursor-pointer ${
                selectedMenu === "master_product" ||
                selectedMenu === "master_category"
                  ? "text-red"
                  : ""
              } flex gap-2 font-bold items-center`}
            >
              <i className="icon-product font-bold text-lg"></i>
              <div className="">Master Data</div>
            </div>
            <ul className="pl-7">
              <li
                className={`my-2 cursor-pointer ${
                  selectedMenu === "master_product" ? "text-red" : ""
                }`}
                id="master_product"
                onClick={() => setSelectedMenu("master_product")}
              >
                Produk
              </li>
              <li
                className={`my-2 cursor-pointer ${
                  selectedMenu === "master_category" ? "text-red" : ""
                }`}
                id="master_category"
                onClick={() => setSelectedMenu("master_category")}
              >
                Kategori Produk
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
