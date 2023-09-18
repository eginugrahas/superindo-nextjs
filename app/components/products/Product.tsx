import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Menu, MenuItem, Switch } from "@mui/material";
import Accordion from "../Accordion";
import ProductVariant from "./ProductVariant";
import ProductItem from "./ProductItem";
import { ProductType, ProductVariantType, ProductPropsType } from "../../types/types";

function Product(props: ProductPropsType) {
  const [productVariants, setProductVariants] = useState<ProductVariantType[]>(
    []
  );
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [isEditing, setIsEditing] = useState(false); //
  const [editedProduct, setEditedProduct] = useState<ProductType | null>(props.product);
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProduct(props.product);
    handleClose(); 
  };

  const handleDelete= async () => {
    try {
      if (editedProduct) {
        await fetch(`http://localhost:3001/products/${editedProduct.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedProduct),
        });
        
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  }

  const handleSave = async () => {
    try {
      if (editedProduct) {
       
        await fetch(`http://localhost:3001/products/${editedProduct.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedProduct),
        });
        
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleToggleActive = () => {
    if (editedProduct) {
      setEditedProduct({ ...editedProduct, active: !editedProduct.active });
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `http://localhost:3001/productVariants?product_id=${props.product.id}`
        );
        const data = await response.json();
        setProductVariants(data);
        // console.log(data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-2 border-2 border-purple bg-p-white p-2 rounded-lg w-full my-3">
      <div className="flex items-center gap-2">
        <ProductItem product={props.product} />
        <div className="ml-auto flex flex-col gap-2">
          <div className="flex gap-3 items-center justify-center">
            <div className="flex flex-col items-center">
              <label htmlFor="active" className="text-xs font-medium">
                Aktif
              </label>
              <Switch
                checked={editedProduct ? editedProduct.active : false}
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
        <Accordion cta="Tambah Varian Produk" title="Lihat Varian Produk">
          {productVariants.length > 0 ? (
            productVariants.map((productVariant) => (
              <ProductVariant
                key={productVariant.id}
                product={productVariant}
              />
            ))
          ) : (
            <div className="flex p-3 text-center text-red">
              Belum ada varian produk
            </div>
          )}
        </Accordion>
      </div>
    </div>
  );
}

export default Product;
