"use client";

import Accordion from "@/app/components/Accordion";
import ProductCategory from "@/app/components/products/ProductCategory";
import ProductItem from "@/app/components/products/ProductItem";
import { useState } from "react";

const categories = [
  {
    id: 1,
    name: "Makanan",
    active: true,
    created_user: "OPERATOR",
    created_date: "2023-02-01 07:00:00",
    updated_user: "OPERATOR",
    updated_date: "2023-02-01 07:00:00",
  },
  {
    id: 2,
    name: "Minuman",
    active: true,
    created_user: "OPERATOR",
    created_date: "2023-02-01 07:00:00",
    updated_user: "OPERATOR",
    updated_date: "2023-02-01 07:00:00",
  },
];

const MasterCategory: React.FC = () => {
  const [disabled, setDisabled] = useState(true);
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
        {categories.map((category) => {
          return (
            <div className="my-3">
              <ProductCategory
                disabled={true}
                setDisabled={setDisabled}
                category={category}
                key={category.id}
              />
            </div>
          );
        })}
      </div>
      
    </div>
  );
};

export default MasterCategory;
