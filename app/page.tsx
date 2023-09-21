"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/features/authSlices";
import { useRouter } from "next/navigation";
import ProductShow from "./components/products/ProductShow";
import { ProductVariantType } from "./types/types";

export default function App() {
  const user = useAppSelector((state) => state.authReducer.user);
  const isAuth = useAppSelector((state) => state.authReducer.isAuth);
  const router = useRouter();

  const [products, setProducts] = useState<ProductVariantType[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    } else {
      router.push("/login");
    }

    const fetchData = async () => {
      try {
        const response = await fetch("/api/variants");
        const data = await response.json();
        setProducts(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [dispatch]);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-p-white">
      <Header user={{ name: user.name }} isAuth={isAuth} />
      <div className="mt-[80px]">
        <div className="flex h-full items-center justify-between min-h-[400px] m-3 p-3 border-2 rounded border-purple bg-p-white">
          {products.map((product) => {
            return <ProductShow product={product} key={product.id} />;
          })}
        </div>
      </div>
    </div>
  );
}
