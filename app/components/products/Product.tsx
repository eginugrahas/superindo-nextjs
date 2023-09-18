import React, { useState } from "react";
import Image from "next/image";
import { Button, Menu, MenuItem, Switch } from "@mui/material";
import Accordion from "../Accordion";
import ProductVariant from "./ProductVariant";

type ProductPropsTyoe = {
  disabled: boolean;
  setDisabled: (value: boolean) => void;
  product: {
    id: number;
    name: string;
    plu: string;
    product_category_id: number;
    active: boolean;
    created_user: string;
    created_date: string;
    updated_user: string;
    updated_date: string;
  };
};

const productVariants = [
  {
    id: 1,
    name: "Indomie Goreng Original",
    code: "PDCT00000020001",
    product_id: 2,
    qty: 1000,
    price: 3000,
    active: true,
    created_user: "OPERATOR",
    created_date: "2023-02-01 07:00:00",
    updated_user: "OPERATOR",
    updated_date: "2023-02-01 07:00:00",
  },
  {
    id: 2,
    name: "Indomie Ayam Bawang",
    code: "PDCT00000020002",
    product_id: 2,
    qty: 500,
    price: 2700,
    active: true,
    created_user: "OPERATOR",
    created_date: "2023-02-01 07:00:00",
    updated_user: "OPERATOR",
    updated_date: "2023-02-01 07:00:00",
  },
  {
    id: 3,
    name: "Indomie Goreng Aceh",
    code: "PDCT00000020003",
    product_id: 2,
    qty: 1000,
    price: 3200,
    active: true,
    created_user: "OPERATOR",
    created_date: "2023-02-01 07:00:00",
    updated_user: "OPERATOR",
    updated_date: "2023-02-01 07:00:00",
  },
];

function Product(props: ProductPropsTyoe) {
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
    <div className="flex flex-col gap-2 border-2 border-purple bg-p-white p-2 rounded-lg w-full">
      <div className="flex items-center gap-2">
        <div className="flex justify-center items-center border-2 border-gray rounded-lg p-1">
          <Image
            src={"/logo-superindo.png"}
            alt="product"
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-sm font-bold">{props.product.name}</div>
          <div className="text-xs text-gray">PLU: {props.product.plu}</div>
          <div className="text-xs text-gray font-medium">MAKANAN</div>
          <div className="text-xs text-gray">
            Ditambahkan pada: {props.product.created_date}
          </div>
        </div>
        <div className="ml-auto flex flex-col gap-2">
          <div className="flex gap-3 items-center justify-center">
            <Switch
              checked={props.product.active}
              disabled={props.disabled}
              inputProps={{ "aria-label": "controlled" }}
              color="secondary"
            />
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
      <div className="cursor-pointer">
        <Accordion>
            {productVariants.map((productVariant) => (
                <ProductVariant
                key={productVariant.id}
                disabled={props.disabled}
                setDisabled={props.setDisabled}
                product={productVariant}
                />
            ))}
        </Accordion>
      </div>
      <div className=""></div>
    </div>
  );
}

export default Product;
