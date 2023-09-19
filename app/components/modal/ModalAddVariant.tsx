import { ProductVariantType } from "@/app/types/types";
import { Modal, Box, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";

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

function ModalAddVariant({
  setOpenModal,
  openModal,
  productId,
}: {
  setOpenModal: (value: boolean) => void;
  openModal: boolean;
  productId: number | undefined;
}) {
  const [addProductVariant, setAddProductVariant] =
    useState<ProductVariantType | null>({
      name: "",
      product_id: productId,
      code: "",
      price: 0,
      qty: 0,
      active: true,
      created_date: "",
      updated_date: "",
      created_user: "",
      updated_user: "",
    });
  function handleClose() {
    setOpenModal(false);
  }

  async function fetchExistingProductCodes() {
    try {
      const response = await fetch("http://localhost:3001/productVariants");
      const data = await response.json();
      const existingProductCodes = data.map(
        (product: ProductVariantType) => product.code
      );
      console.log(existingProductCodes);

      // Find the highest number used in product codes
      const highestNumber = existingProductCodes.reduce(
        (highest: number, currentProductCode: string) => {
          const match = currentProductCode.match(/PDCT(\d+)/);
          //   console.log(match)
          if (match) {
            const number = parseInt(match[1], 10);
            return Math.max(highest, number);
          }
          return highest;
        },
        0
      );

      // Increment the highest number by 1 and format it
      const nextNumber = highestNumber + 1;
      const nextCode = `PDCT0000002${String(nextNumber).padStart(4, "0")}`;
      //   console.log(nextNumber,nextCode)

      return nextCode;
    } catch (error) {
      console.error("Error fetching product codes:", error);
      return ""; // You can return an empty string or handle the error case as needed.
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      await fetchExistingProductCodes().then((nextCode) => {
        if (addProductVariant) {
          setAddProductVariant({
            ...addProductVariant,
            code: nextCode,
            active: true,
            created_user: "OPERATOR",
            updated_user: "OPERATOR",
            created_date: new Date().toISOString(),
            updated_date: new Date().toISOString(),
          });
        }
      });
      //   console.log(addProductVariant);
      const response = await fetch("http://localhost:3001/productVariants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addProductVariant),
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
  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col gap-3">
          <div className="font-bold text-center">Tambah Varian Produk</div>
          <div className="flex flex-col">
            <label htmlFor="product-name" className="text-sm font-medium">
              Nama Produk
            </label>
            <input
              type="text"
              name="name"
              onChange={(e) => {
                if (addProductVariant) {
                  setAddProductVariant({
                    ...addProductVariant,
                    name: e.target.value,
                  });
                }
              }}
              className="border border-gray rounded p-2"
            />
            <div className="">
              <label htmlFor="price" className="text-xs font-medium pb-1">
                Harga
              </label>
              <div
                className={`flex items-center justify-center p-2 gap-2 rounded-lg border-gray border`}
              >
                <div className="font-medium">Rp</div>
                <input
                  type="number"
                  name="price"
                  className="remove-arrow p-1 outline-none w-full"
                  onChange={(e) => {
                    if (addProductVariant) {
                      setAddProductVariant({
                        ...addProductVariant,
                        price: e.currentTarget.valueAsNumber,
                      });
                    }
                  }}
                />
              </div>
            </div>
            <div className="">
              <label htmlFor="stock" className="text-xs font-medium pb-1">
                Stok
              </label>
              <div
                className={`border flex items-center justify-center p-2 gap-2 border-gray rounded-lg border"`}
              >
                <input
                  type="number"
                  name="stock"
                  className="remove-arrow p-1 outline-none w-full"
                  onChange={(e) => {
                    if (addProductVariant) {
                      setAddProductVariant({
                        ...addProductVariant,
                        qty: e.currentTarget.valueAsNumber,
                      });
                    }
                  }}
                />
                <div className="font-medium">Pcs</div>
              </div>
            </div>
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

export default ModalAddVariant;
