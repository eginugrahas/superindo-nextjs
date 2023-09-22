"use client";

import ModalAddCategory from "@/app/components/modal/ModalAddCategory";
import ProductCategory from "@/app/components/products/ProductCategory";
import { ProductCategoryType } from "@/app/types/types";
import { useState, useEffect } from "react";



const MasterCategory: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategoryType[]>([]);
  const [openModal, setOpenModal] = useState(false);

  function modalTambahKategori() {
    setOpenModal(true)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        console.log(data)
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  },[]);

  return (
    <div className="flex flex-col">
      <div className="font-bold">Master Data {`->`} Kategori Produk</div>
      <div className="flex gap-3 mt-2">
        <div className="border-2 rounded-lg border-gray bg-white p-3 w-[80%] text-sm font-semibold">
          Panduan Kelola Data Kategori Produk dapat di{" "}
          <span className="text-red cursor-pointer">pelajari disini.</span>
        </div>
        <div className="rounded-lg p-3 w-[20%] text-sm font-semibold text-white bg-red text-center cursor-pointer" onClick={modalTambahKategori}>
          Tambah Kategori Produk
        </div>
      </div>
      <div className="mt-2 rounded-lg border-2 border-gray bg-white w-full min-h-[70vh] p-3">
        {categories
          ? categories.map((category) => {
              return (
                <ProductCategory
                  category={category}
                  key={category.id}
                />
              );
            })
          : "Belum ada data kategori produk"}
      </div>
      <ModalAddCategory openModal={openModal} setOpenModal={setOpenModal}/>
    </div>
  );
};

export default MasterCategory;
