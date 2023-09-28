import { ProductCategoryType } from "@/app/types/types";
import { Modal, Box } from "@mui/material";
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

function ModalAddCategory({
  setOpenModal,
  openModal,
}: {
  setOpenModal: (value: boolean) => void;
  openModal: boolean;
}) {
  const [addCategory, setAddCategory] = useState<ProductCategoryType | null>({
    name: "",
    active: true,
    created_date: "",
    updated_date: "",
    created_user: "",
    updated_user: "",
  });
  function handleClose() {
    setOpenModal(false);
  }
  const handleSubmit = async (e: React.FormEvent) => {
    if (addCategory) {
      setAddCategory({
        ...addCategory,
        active: true,
        created_user: "OPERATOR",
        updated_user: "OPERATOR",
        created_date: new Date().toISOString(),
        updated_date: new Date().toISOString(),
      });
    }
    console.log(addCategory);
    try {
      const response = await fetch("api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addCategory),
      });
      if (response.ok) {
        setOpenModal(false);
      } else {
        console.error("Failed to add category");
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
          <div className="font-bold text-center">Tambah Kategori Baru</div>
          <div className="flex flex-col">
            <label htmlFor="product-name" className="text-sm font-medium">
              Nama Kategori
            </label>
            <input
              type="text"
              name="name"
              onChange={(e) => {
                if (addCategory) {
                  setAddCategory({
                    ...addCategory,
                    name: e.target.value,
                  });
                }
              }}
              className="border border-gray rounded p-2"
            />
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

export default ModalAddCategory;
