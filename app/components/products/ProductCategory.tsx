import React, { useState, useEffect } from "react";
import { Button, Menu, MenuItem, Switch } from "@mui/material";
import Accordion from "../Accordion";
import ProductItem from "./ProductItem";
import {
  ProductCategoryPropsType,
  ProductCategoryType,
  ProductType,
} from "@/app/types/types";

function ProductCategory(props: ProductCategoryPropsType) {
  const [productInCategory, setProductInCategory] = useState<ProductType[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProductCategory, setEditedProductCategory] =
    useState<ProductCategoryType | null>(props.category);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProductCategory(props.category);
    handleClose();
  };

  const handleDelete = async () => {
    try {
      if (editedProductCategory) {
        await fetch(
          `/api/categories?id=${editedProductCategory.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedProductCategory),
          }
        );

        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleSave = async () => {
    try {
      if (editedProductCategory) {
        await fetch(
          `/api/categories?id=${editedProductCategory.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editedProductCategory),
          }
        );
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleToggleActive = () => {
    if (editedProductCategory) {
      setEditedProductCategory({
        ...editedProductCategory,
        active: !editedProductCategory.active,
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/products/getByCategory?id=${props.category.id}`
        );
        const data = await response.json();
        setProductInCategory(data);
        // console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

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
          <div className="text-lg font-bold text-center">{productInCategory.length}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-3 items-center justify-center">
            <div className="flex flex-col items-center">
              <label htmlFor="active" className="text-xs font-medium">
                Aktif
              </label>
              <Switch
                checked={
                  editedProductCategory ? editedProductCategory.active : false
                }
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
