"use client";

import React, { useEffect, useState } from "react";
import { Box, MenuItem, Modal, Select } from "@mui/material";
import { ProductCategoryType, ProductType } from "@/app/types/types";
import ModalConfirm from "./ModalConfirm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#FAFAFA",
  border: "2px solid #2A186C",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

function ModalAddProduct({
  setOpenModal,
  openModal,
}: {
  setOpenModal: (value: boolean) => void;
  openModal: boolean;
}) {
  const [addProduct, setAddProduct] = useState<ProductType | null>({
    name: "",
    product_category_id: 0,
    plu: "",
    active: true,
    created_date: "",
    updated_date: "",
    created_user: "",
    updated_user: "",
  });
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [productName, setProductName] = useState("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [productCategory, setProductCategory] = useState<ProductCategoryType[]>(
    []
  );
  async function fetchExistingProductCodes() {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      const existingProductCodes = data.map(
        (product: ProductType) => product.plu
      );
      const highestNumber = existingProductCodes.reduce(
        (highest: number, currentProductCode: string) => {
          const match = currentProductCode.match(/PDCT(\d+)/);
          if (match) {
            const number = parseInt(match[1], 10);
            return Math.max(highest, number);
          }
          return highest;
        },
        0
      );
      const nextPlu = `PDCT${String(highestNumber + 1).padStart(7, "0")}`;

      return nextPlu;
    } catch (error) {
      console.error("Error fetching product codes:", error);
      return "";
    }
  }
  async function fetchExistingId() {
    try {
      const response = await fetch("/api/products");
      const products = await response.json();
      const highestNumber = products.reduce((highest: number, product: any) => {
        const number = parseInt(product.id, 10);
        if (!isNaN(number)) {
          return Math.max(highest, number);
        }
        return highest;
      }, 0);
      const nextId = highestNumber + 1;

      return nextId;
    } catch (error) {
      console.error("Error fetching product codes:", error);
      return "";
    }
  }

  function handleClose() {
    setOpenModal(false);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      const nextId = await fetchExistingId();
      const nextPlu = await fetchExistingProductCodes();
      const updatedProduct = {
        name: productName,
        plu: nextPlu,
        id: nextId,
        product_category_id: selectedCategory,
        active: true,
        created_user: "OPERATOR",
        updated_user: "OPERATOR",
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString(),
      }
      // console.log(updatedProduct);
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });
      if (response.ok) {
        setOpenModal(false);
      } else {
        console.error("Failed to add product");
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/categories");
        const data = await response.json();
        console.log(data);
        setProductCategory(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col gap-3">
          <div className="font-bold text-center">Tambah Produk Baru</div>
          <div className="flex flex-col">
            <label htmlFor="product-name" className="text-sm font-medium">
              Nama Produk
            </label>
            <input
              type="text"
              name="name"
              onChange={(e) => setProductName(e.target.value)}
              className="border border-gray rounded p-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="product-category" className="text-sm font-medium">
              Kategori Produk
            </label>
            <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              defaultValue=""
              name="product_category_id"
              onChange={(e) =>
                setSelectedCategory(e.target.value as unknown as number)
              }
            >
              {productCategory.map((category) => {
                return (
                  <MenuItem value={category.id} key={category.id}>
                    {category.name}
                  </MenuItem>
                );
              })}
            </Select>
          </div>
          <div className="mx-auto">
            <button
              type="button"
              className="text-center border rounded py-2 px-4 bg-purple text-white font-bold"
              onClick={handleSubmit}
            >
              Simpan
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default ModalAddProduct;
