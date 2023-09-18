"use client";

import { useState } from "react";
import Product from "@/app/components/products/Product";

const products = [
  {
    id: 1,
    name: "Indomie",
    plu: "PDCT0000001",
    product_category_id: 1,
    active: true,
    created_user: "OPERATOR",
    created_date: "2023-02-01 07:00:00",
    updated_user: "OPERATOR",
    updated_date: "2023-02-01 07:00:00",
  },
  {
    id: 2,
    name: "Cheetos",
    plu: "PDCT0000002",
    product_category_id: 1,
    active: true,
    created_user: "OPERATOR",
    created_date: "2023-02-01 07:00:00",
    updated_user: "OPERATOR",
    updated_date: "2023-02-01 07:00:00",
  },
  {
    id: 3,
    name: "Air Mineral Aqua",
    plu: "PDCT0000003",
    product_category_id: 2,
    active: true,
    created_user: "OPERATOR",
    created_date: "2023-02-01 07:00:00",
    updated_user: "OPERATOR",
    updated_date: "2023-02-01 07:00:00",
  }
];

const MasterProduct = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const open = Boolean(anchorEl);
  const handleClick = (e: any) => {
    setAnchorEl(e);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setDisabled(false);
    handleClose;
  };

  return (
    <div className="flex flex-col">
      <div className="font-bold">Master Data {`->`} Produk</div>
      <div className="flex gap-3 mt-2">
        <div className="border-2 rounded-lg border-gray bg-white p-3 w-[80%] text-sm font-semibold">
          Panduan Kelola Data Produk dapat di{" "}
          <span className="text-red cursor-pointer">pelajari disini.</span>
        </div>
          <div className="rounded-lg p-3 w-[20%] font-semibold text-white bg-red text-center">
            Tambah Produk
          </div>
      </div>
      <div className="mt-2 rounded-lg border-2 border-gray bg-white w-full min-h-[70vh] p-3">
        {products.map((product) => {
          return (
            <div className="my-3">
              <Product
                disabled={true}
                product={product}
                setDisabled={setDisabled}
                key={product.id}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MasterProduct;
