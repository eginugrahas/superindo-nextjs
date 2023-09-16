import { useState } from "react";
import { getShortName } from "../utils/formatter";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setMenu } from "@/redux/features/menuSlices";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  isOperator: boolean;
};

type SidebarProps = {
  user: User;
};

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const [selectedMenu, setSelectedMenu] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()

  function handleSelectedMenu(menu:string){
    setSelectedMenu(menu)
    dispatch(setMenu(menu))
    router.push(`/dashboard/${menu}`)
  }

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
              selectedMenu === "" ? "text-red" : ""
            }`}
            id="dashboard"
            onClick={() => handleSelectedMenu("")}
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
            onClick={() => handleSelectedMenu("transaction")}
          >
            <div className="flex gap-2 font-bold items-center">
              <i className="icon-orders font-bold text-xl"></i>
              <div className="">Transaksi</div>
            </div>
          </li>
          <li className="" id="master_data">
            <div
              className={`cursor-pointer ${
                selectedMenu === "masterProduct" ||
                selectedMenu === "masterCategory"
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
                  selectedMenu === "masterProduct" ? "text-red" : ""
                }`}
                id="master_product"
                onClick={() => handleSelectedMenu("masterProduct")}
              >
                Produk
              </li>
              <li
                className={`my-2 cursor-pointer ${
                  selectedMenu === "masterCategory" ? "text-red" : ""
                }`}
                id="master_category"
                onClick={() => handleSelectedMenu("masterCategory")}
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
