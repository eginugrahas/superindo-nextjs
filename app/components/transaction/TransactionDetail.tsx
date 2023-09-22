import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  TransactionDetailPropsType,
  TransactionDetailType,
} from "@/app/types/types";

function TransactionDetail({ trxId }: { trxId: number | undefined }) {
  const [transactionDetail, setTransactionDetail] = useState
  ({
    qty: 0,
    subtotal: 0,
    created_date: "",
  });
  const [productDetail, setProductDetail] = useState({
    name: "",
    code: "",
    category: "",
    price: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/api/transactionDetails?id=" + trxId
        );
        const data = await response.json();
        setTransactionDetail(data);

        const product = await fetch(
          "/api/variants/getOneById?id=" +
            data[0].product_variant_id
        );
        const productData = await product.json();
        // console.log(productData)
        setProductDetail(productData[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

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
        <div className="text-sm font-bold">{productDetail.name}</div>
        <div className="text-xs text-gray">Code: {productDetail.code}</div>
        <div className="text-xs text-gray">
          <div className="text-xs text-gray">Rp{productDetail.price}</div>
          {productDetail.category}
        </div>
      </div>
      <div className="ml-auto flex flex-col">
        <div className="font-semibold">
          <span className="font-medium text-sm">Jumlah Pembelian:</span>{" "}
          {transactionDetail.qty}
        </div>
        <div className="font-semibold">
          <span className="font-medium text-sm">Jumlah Total:</span>{" "}
          Rp{transactionDetail.subtotal}
        </div>
        <div className="font-semibold">
          <span className="font-medium text-sm">Tanggal:</span>{" "}
          {transactionDetail.created_date}
        </div>
      </div>
    </div>
  );
}

export default TransactionDetail;
