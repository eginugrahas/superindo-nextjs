"use client";

import Accordion from "@/app/components/Accordion";
import ProductCategory from "@/app/components/products/ProductCategory";
import ProductItem from "@/app/components/products/ProductItem";
import { useState, useEffect } from "react";

type CategoryType = {
  id: number;
  name: string;
  active: boolean;
  created_user: string;
  created_date: string;
  updated_user: string;
  updated_date: string;
};

const MasterCategory: React.FC = () => {
  const [disabled, setDisabled] = useState(true);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3001/productCategories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="font-bold">Master Data {`->`} Kategori Produk</div>
      <div className="flex gap-3 mt-2">
        <div className="border-2 rounded-lg border-gray bg-white p-3 w-[80%] text-sm font-semibold">
          Panduan Kelola Data Kategori Produk dapat di{" "}
          <span className="text-red cursor-pointer">pelajari disini.</span>
        </div>
        <div className="rounded-lg p-3 w-[20%] text-sm font-semibold text-white bg-red text-center">
          Tambah Kategori Produk
        </div>
      </div>
      <div className="mt-2 rounded-lg border-2 border-gray bg-white w-full min-h-[70vh] p-3">
        {categories
          ? categories.map((category) => {
              return (
                <ProductCategory
                  disabled={true}
                  setDisabled={setDisabled}
                  category={category}
                  key={category.id}
                />
              );
            })
          : "Belum ada data kategori produk"}
      </div>
    </div>
  );
};

export default MasterCategory;
