import React from "react";
import Image from "next/image";
import { ProductVariantPropsType } from "@/app/types/types";

function ProductShow(props: ProductVariantPropsType) {
    function handlePesanan() {
        console.log("pesanan");
    }
  return (
    <div className="border-2 flex flex-col items-center rounded p-3 border-gray w-[230px] mx-3">
      <div className="flex justify-center items-center border-2 border-gray rounded-lg p-1 mb-3">
        <Image
          src={"/logo-superindo.png"}
          alt="product"
          width={100}
          height={100}
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="text-sm font-bold">{props.product.name}</div>
        <div className="text-lg font-bold text-red">
          Rp{props.product.price}
        </div>
      </div>
      <div className="mx-auto mt-3">
        <button
          type="button"
          className="text-center border rounded py-2 px-4 bg-purple text-white font-bold"
          onClick={handlePesanan}
        >
          Pesan
        </button>
      </div>
    </div>
  );
}

export default ProductShow;
