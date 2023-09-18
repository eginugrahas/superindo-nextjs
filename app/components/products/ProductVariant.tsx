import React, { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import Image from "next/image";
import { Button, Menu, MenuItem, Switch } from "@mui/material";

type ProductPropsType = {
  disabled: boolean;
  setDisabled: (value: boolean) => void;
  product: {
    name: string;
    id: number;
    product_id: number;
    code: string;
    price: number;
    qty: number;
    active: boolean;
    created_user: string;
    created_date: string;
    updated_user: string;
    updated_date: string;
  };
  key: number;
};

function ProductVariant(props: ProductPropsType) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: any) => {
    setAnchorEl(e);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    props.setDisabled(false);
    handleClose;
  };
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
        <div className="rounded text-[10px] bg-purple cursor-pointer font-light text-white p-1 text-center w-20">
          Lihat Barcode
        </div>
      </div>
      <div className="">
        <label htmlFor="price" className="text-xs font-medium pb-1">
          Harga
        </label>
        <div
          className={`flex items-center justify-center p-2 gap-2 rounded-lg ${
            props.disabled ? "border-gray border" : "border-purple border-2"
          }`}
        >
          <div className="font-medium">Rp</div>
          <input
            type="number"
            name="price"
            value={props.product.price}
            className="remove-arrow p-1 outline-none"
            disabled={props.disabled}
          />
        </div>
      </div>
      <div className="">
        <label htmlFor="stock" className="text-xs font-medium pb-1">
          Stok
        </label>
        <div
          className={`border flex items-center justify-center p-2 gap-2 border-gray rounded-lg ${
            props.disabled ? "border-gray border" : "border-purple border-2"
          }`}
        >
          <input
            type="number"
            name="stock"
            value={props.product.qty}
            className="remove-arrow p-1 outline-none"
            disabled={props.disabled}
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
              checked={props.product.active}
              disabled={props.disabled}
              inputProps={{ "aria-label": "controlled" }}
              color="secondary"
            />
          </div>
          {props.disabled ? (
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={(e) => handleClick(e.currentTarget)}
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
                <MenuItem onClick={handleClose}>Hapus</MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="">
              <Button
                sx={{ bgcolor: "#2A186C", color: "white" }}
                variant="contained"
                className="bg-purple text-white"
                onClick={() => props.setDisabled(true)}
              >
                Simpan
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductVariant;
