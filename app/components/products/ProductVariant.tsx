import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import Image from "next/image";

type ProductPropsType = {
    disabled: boolean;
    setDisabled: (value: boolean) => void;
    product: {
      name: string;
      id: number;
      product_id: number;
      code: string;
      date: string;
      price: number;
      qty: number;
      active: boolean;
    };
  };

function ProductVariant(props: ProductPropsType) {
  return (
    <div className="flex w-full gap-2">
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
          <div className="text-xs text-gray">Ditambahkan pada: 03-09-2023</div>
        </div>
      </div>
      <div
        className={`flex items-center justify-center p-2 gap-2 rounded-lg ${
          props.disabled ? "border-gray border" : "border-purple border-2"
        }`}
      >
        <div className="font-semibold">Rp</div>
        <input
          type="number"
          className="remove-arrow p-2 outline-none w-full"
          disabled
        />
      </div>
      <div
        className={`border flex items-center justify-center p-2 gap-2 border-gray rounded-lg ${
          props.disabled ? "border-gray border" : "border-purple border-2"
        }`}
      >
        <input
          type="number"
          className="remove-arrow p-2 outline-none w-full"
          disabled={props.disabled}
        />
        <div className="font-semibold">Pcs</div>
      </div>
    </div>
  );
}

export default ProductVariant;
