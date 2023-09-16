"use client";

import { useAppSelector } from "@/redux/store";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [product, setProduct] = useState([
    {
      id: 1,
      name: "Indomie Goreng Original",
      product_id: 2,
      active: true,
      qty: 1000,
      price: 3000,
      code:"PDCT000002001"
    },
    {
      id: 2,
      name: "Indomie Goreng Aceh",
      product_id: 2,
      active: true,
      qty: 1000,
      price: 2000,
      code:"PDCT000002002"
    },
    {
      id: 3,
      name: "Indomie Ayam Bawang",
      product_id: 2,
      active: true,
      qty: 1000,
      price: 3500,
      code:"PDCT000002003"
    },
    {
      id: 4,
      name: "Indomie Ayam Bawang",
      product_id: 2,
      active: true,
      qty: 1000,
      price: 3500,
      code:"PDCT000002004"
    }
  ])

  // const currentPage = useAppSelector((state)=>state.menuSlices.menu)
  
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mt-1">
        <div className="rounded-lg bg-white w-[250px] h-[100px] border-2 border-gray flex flex-col justify-around p-2 hover:scale-105">
          <div className="text-xs text-gray font-semibold">JUMLAH PRODUK</div>
          <div className="text-2xl text-black font-bold">100</div>
        </div>
        <div className="rounded-lg bg-white w-[250px] h-[100px] border-2 border-gray flex flex-col justify-around p-2 hover:scale-105">
          <div className="text-xs text-gray font-semibold">
            JUMLAH KATEGORI PRODUK
          </div>
          <div className="text-2xl text-black font-bold">10</div>
        </div>
        <div className="rounded-lg bg-white w-[250px] h-[100px] border-2 border-gray flex flex-col justify-around p-2 hover:scale-105">
          <div className="text-xs text-gray font-semibold">
            JUMLAH TRANSAKSI
          </div>
          <div className="text-2xl text-black font-bold">20</div>
        </div>
        <div className="rounded-lg bg-purple w-[300px] h-[100px] flex justify-around items-center p-2 hover:scale-105">
          <div className="text-md text-white font-semibold">
            Butuh Bantuan? <br />{" "}
            <span className="text-red">Pelajari Disini.</span>
          </div>
          <div className="">
            <Image
              src={"/ill-question.png"}
              alt="help"
              width={150}
              height={150}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-around p-2 mt-6 rounded-lg bg-white w-[71%] h-[250px] border-2 border-gray">
        <div className="flex justify-between">
        <div className="text-xs text-gray font-semibold">PRODUK TERBARU</div>
        <div className="text-xs text-gray font-semibold cursor-pointer">Lihat Semua {`>>>`}</div>
        </div>
        <div className="flex gap-5 mx-2">
          {product.map((p)=>{
             return <div className="rounded-lg bg-p-white border-2 border-purple w-[190px] h-[200px] flex flex-col p-2">
             <div className="h-[60%] flex justify-center items-center">
               <Image
                 src={"/logo-superindo.png"}
                 alt="product"
                 width={100}
                 height={100}
               />
             </div>
             <div className="h-[40%] flex flex-col justify-end">
               <div className="font-bold text-sm">{p.name}</div>
               <div className="text-xs">Rp {p.price} <span>/ pcs</span></div>
               <div className="text-xs font-medium text-gray">Makanan</div>
             </div>
           </div>
          })}
        </div>
      </div>
    </div>
  );
}
