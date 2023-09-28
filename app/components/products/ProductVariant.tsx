import React, { useState } from "react";
import Image from "next/image";
import { Button, Menu, MenuItem, Switch } from "@mui/material";
import { ProductVariantPropsType, ProductVariantType } from "../../types/types";
import ModalBarcode from "../modal/ModalBarcode";


function ProductVariant(props: ProductVariantPropsType) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isEditing, setIsEditing] = useState(false); //
  const [editedProductVariant, setEditedProductVariant] = useState<ProductVariantType | null>(props.product);
  const open = Boolean(anchorEl);
  const [openModal, setOpenModal] = useState(false);
  const [productCode, setProductCode] = useState("");
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProductVariant(props.product);
    handleClose(); 
  };

  const handleDelete= async () => {
    try {
      if (editedProductVariant) {
        await fetch(`/api/variants/getOneById?id=${editedProductVariant.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedProductVariant),
        });
        
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  }

  const handleSave = async () => {
    try {
      if (editedProductVariant) {
      //  console.log(editedProductVariant);
        await fetch(`/api/variants/getOneById?id=${editedProductVariant.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedProductVariant),
        });
        
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleToggleActive = () => {
    if (editedProductVariant) {
      setEditedProductVariant({ ...editedProductVariant, active: !editedProductVariant.active });
    }
  };

  function modalBarcode(code: string){
    setOpenModal(true);
    setProductCode(code)
  }
  return (
    <div className="flex gap-2 items-center py-3 pl-5">
      <div className="flex justify-center items-center border-2 border-gray rounded-lg p-2">
        <Image
          src={"/logo-superindo.png"}
          alt="product"
          width={65}
          height={65}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-sm font-bold">{props.product.name}</div>
        <div className="text-xs text-gray">Code: {props.product.code}</div>
        <div className="text-xs text-gray">
          Ditambahkan pada: {props.product.created_date}
        </div>
        <div className="rounded text-[10px] bg-purple cursor-pointer font-light text-white p-1 text-center w-20"
        onClick={()=>modalBarcode(props.product.code)}>
          Lihat Barcode
        </div>
      </div>
      <div className="ml-auto">
        <label htmlFor="price" className="text-xs font-medium pb-1">
          Harga
        </label>
        <div
          className={`flex items-center justify-center p-2 gap-2 rounded-lg ${
            !isEditing ? "border-gray border" : "border-purple border-2"
          }`}
        >
          <div className="font-medium">Rp</div>
          <input
            type="number"
            name="price"
            value={editedProductVariant?.price}
            className="remove-arrow p-1 outline-none w-32"
            disabled={!isEditing}
            onChange={(e) => {
              if (editedProductVariant) {
                setEditedProductVariant({
                  ...editedProductVariant,
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
          className={`border flex items-center justify-center p-2 gap-2 border-gray rounded-lg ${
            !isEditing ? "border-gray border" : "border-purple border-2"
          }`}
        >
          <input
            type="number"
            name="stock"
            value={editedProductVariant?.qty}
            className="remove-arrow p-1 outline-none w-12"
            disabled={!isEditing}
            onChange={(e) => {
              if (editedProductVariant) {
                setEditedProductVariant({
                  ...editedProductVariant,
                  qty: e.currentTarget.valueAsNumber,
                });
              }
            }}
          />
          <div className="font-medium">Pcs</div>
        </div>
      </div>

      <div className="ml-auto flex flex-col gap-2">
        <div className="flex gap-3 items-center justify-center">
          <div className="flex flex-col items-center">
            <label htmlFor="active" className="text-xs font-medium">
              Aktif
            </label>
            <Switch
             checked={editedProductVariant ? editedProductVariant.active : false}
             disabled={!isEditing}
             onChange={handleToggleActive}
             inputProps={{ "aria-label": "controlled" }}
             color="secondary"
            />
          </div>
          {!isEditing ? (
              <div>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  <i className="icon-dots-vertical text-black"></i>
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleEdit}>Edit</MenuItem>
                  <MenuItem onClick={handleDelete}>Hapus</MenuItem>
                </Menu>
              </div>
            ) : (
              <div className="">
                <Button
                  sx={{ bgcolor: "#2A186C", color: "white" }}
                  variant="contained"
                  className="bg-purple text-white"
                  onClick={handleSave}
                  size="small"
                >
                  Simpan
                </Button>
              </div>
            )}
        </div>
      </div>
      <ModalBarcode setOpenModal={setOpenModal} openModal={openModal} productCode={productCode}/>
    </div>
  );
}

export default ProductVariant;
