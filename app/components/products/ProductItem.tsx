import React from "react";
import Image from "next/image";

type ProductItemPropsType = {
  product: {
    id: number;
    name: string;
    plu: string;
    product_category_id: number;
    active: boolean;
    created_date: string;
    updated_date: string;
    image?: string;
  };
};

function ProductItem(props: ProductItemPropsType) {
  return (
    <div className="flex item-center gap-2">
      <div className="flex justify-center items-center border-2 border-gray rounded-lg p-1">
        <Image
          src={"/logo-superindo.png"}
          alt="product"
          width={80}
          height={80}
        />
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-sm font-bold">{props.product.name}</div>
        <div className="text-xs text-gray">PLU: {props.product.plu}</div>
        <div className="text-xs text-gray font-medium">
          {props.product.product_category_id === 1 ? "MAKANAN" : "MINUMAN"}
        </div>
        <div className="text-xs text-gray">
          Ditambahkan pada: {props.product.created_date}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
