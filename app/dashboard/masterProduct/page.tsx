"use client";

import { useState, useEffect } from "react";
import Product from "@/app/components/products/Product";
import { ProductType } from "@/app/types/types";
import ModalAddProduct from "@/app/components/modal/ModalAddProduct";

const MasterProduct = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [openModal, setOpenModal] = useState(false);

  function modalTambahProduk() {
    setOpenModal(true);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    const interval = setInterval(fetchData, 5000); 

    return () => clearInterval(interval);
  }, [])
  

  return (
    <div className="flex flex-col">
      <div className="font-bold">Master Data {`->`} Produk</div>
      <div className="flex gap-3 mt-2">
        <div className="border-2 rounded-lg border-gray bg-white p-3 w-[80%] text-sm font-semibold">
          Panduan Kelola Data Produk dapat di{" "}
          <span className="text-red cursor-pointer">pelajari disini.</span>
        </div>
        <div className="rounded-lg cursor-pointer p-3 w-[20%] font-semibold text-white bg-red text-center" onClick={modalTambahProduk}>
          Tambah Produk
        </div>
      </div>
      <div className="mt-2 rounded-lg border-2 border-gray bg-white w-full min-h-[70vh] p-3">
        {products ? (products.map((product) => {
          return (
            <Product
              product={product}
              key={product.id}
            />
          );
        })) : "Belum ada data produk"}
      </div>
      <ModalAddProduct setOpenModal={setOpenModal} openModal={openModal} />
    </div>
  );
};

export default MasterProduct;
