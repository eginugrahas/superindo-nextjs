"use client";

import { Switch, Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import Image from "next/image";

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
        <div className="border-2 rounded-lg border-gray p-3 w-[80%] text-sm font-semibold">
          Panduan Kelola Data Produk dapat di{" "}
          <span className="text-red cursor-pointer">pelajari disini.</span>
        </div>
        <div className="rounded-lg p-3 w-[20%] font-semibold text-white bg-red text-center">
          Tambah Produk
        </div>
      </div>
      <div className="mt-2 rounded-lg border-2 border-gray w-full min-h-[70vh] p-3">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray font-bold">
              <td className="pb-2 text-center" width={"40%"}>
                Info Produk
              </td>
              <td className="pb-2 text-center" width={"20%"}>
                Harga
              </td>
              <td className="pb-2 text-center" width={"20%"}>
                Stok
              </td>
              <td className="pb-2 text-center">Aktif</td>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b-2 border-gray">
              <td className="py-3 px-2">
                <div className="flex gap-2 items-center rounded-lg w-full h-24">
                  <div className="flex justify-center items-center border-2 border-gray rounded-lg p-2">
                    <Image
                      src={"/logo-superindo.png"}
                      alt="product"
                      width={70}
                      height={70}
                    />
                  </div>
                  <div className="flex-flex-col">
                    <div className="text-sm font-bold">Indomie Ayam Bawang</div>
                    <div className="text-xs text-gray">PDC: 00092923484</div>
                    <div className="text-xs text-gray">
                      Ditambahkan pada: 03-09-2023
                    </div>
                  </div>
                </div>
              </td>
              <td className="pt-3 px-2">
                <div className="border flex items-center justify-center p-2 gap-2 border-gray rounded-lg">
                  <div className="">Rp</div>
                  <input
                    type="number"
                    className="remove-arrow p-2 outline-none w-full"
                    disabled={disabled}
                  />
                </div>
              </td>
              <td className="pt-3 px-2">
                <div className="border flex items-center justify-center p-2 gap-2 border-gray rounded-lg">
                  <input
                    type="number"
                    className="remove-arrow p-2 outline-none w-full"
                    disabled={disabled}
                  />
                </div>
              </td>
              <td className="pt-3">
                <div className="flex gap-3 items-center justify-center">
                  <Switch
                    checked={true}
                    disabled={disabled}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  {disabled ? (
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
                        sx={{bgcolor: "#2A186C", color: "white"}}
                        variant="contained"
                        className="bg-purple text-white"
                        onClick={() => setDisabled(true)}
                      >
                        Simpan
                      </Button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterProduct;
