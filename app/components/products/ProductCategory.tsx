import React, { useState } from "react";
import { Button, Menu, MenuItem, Switch } from "@mui/material";
import Accordion from "../Accordion";
import ProductItem from "./ProductItem";

type ProductCategoryPropsType = {
  disabled: boolean;
  setDisabled: (value: boolean) => void;
  category: {
    id: number;
    name: string;
    active: boolean;
    created_user: string;
    created_date: string;
    updated_user: string;
    updated_date: string;
  };
  key: number;
};

const productInCategory = [
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
];

function ProductCategory(props: ProductCategoryPropsType) {
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
    <div className="flex flex-col gap-2 border-2 border-purple bg-p-white p-2 rounded-lg w-full my-3">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="font-bold">{props.category.name}</div>
          <div className="text-gray text-xs">ID: {props.category.id}</div>
          <div className="text-xs text-gray">
            Ditambahkan pada: {props.category.created_date}
          </div>
        </div>
        <div className="">
          <div className="font-semibold text-xs">Jumlah Produk</div>
          <div className="text-lg font-bold text-center">100</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 items-center justify-center">
            <div className="flex flex-col items-center">
              <label htmlFor="active" className="text-xs font-medium">
                Aktif
              </label>
              <Switch
                checked={props.category.active}
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
      <div className="">
        <Accordion cta="Tambah Produk ke Kategori" title="Lihat Produk">
          {productInCategory.map((product) => (
            <div className="my-2 ml-3" key={product.id}>
              <ProductItem key={product.id} product={product} />
            </div>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default ProductCategory;
