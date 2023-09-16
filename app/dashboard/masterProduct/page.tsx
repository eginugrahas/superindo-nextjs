"use client";

import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

const MasterProduct = () => {
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
            <tr className="border-b-2 border-gray">
              <td className="pb-2" width={"40%"}>
                Info Produk
              </td>
              <td className="pb-2">Harga</td>
              <td className="pb-2" width={"15%"}>
                Stok
              </td>
              <td className="pb-2">Aktif</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pt-3 px-2">
                <div className="flex rounded-lg border border-gray w-full h-24"></div>
              </td>
              <td className="pt-3">
                <FormControl sx={{ m: 0.5, bgcolor:"#FAFAFA" }}>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    startAdornment={
                      <InputAdornment position="start" >Rp</InputAdornment>
                    }
                  />
                </FormControl>
              </td>
              <td className="pt-3">produk</td>
              <td className="pt-3">produk</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MasterProduct;
