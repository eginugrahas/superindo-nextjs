"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ProductType = {
  name: string;
  id: number;
  product_id: number;
  code: string;
  price: number;
  qty: number;
  active: boolean;
  created_user: string;
  created_date: string;
  updated_user: string;
  updated_date: string;
};

type SummaryType = {
  totalProduct: number;
  totalCategory: number;
  totalTransaction: number;
};

export default function Home() {
  const [product, setProduct] = useState<ProductType[]>([]);
  const [summary, setSummary] = useState<SummaryType>({
    totalProduct: 0,
    totalCategory: 0,
    totalTransaction: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const productResponse = await fetch("/api/variants");
        const productData = await productResponse.json();
        setProduct(productData);

        const getProductId = await fetch("/api/products/getOneById?id=1");
        const product = await getProductId.json();
        // console.log(product)

        const categoryResponse = await fetch("/api/categories");
        const categoryData = await categoryResponse.json();

        const transactionResponse = await fetch("/api/transactions");
        const transactionData = await transactionResponse.json();

        setSummary((prevSummary) => ({
          ...prevSummary,
          totalProduct: productData.length,
          totalCategory: categoryData.length,
          totalTransaction: transactionData.length,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mt-1">
        <div className="rounded-lg bg-white w-[250px] h-[100px] border-2 border-gray flex flex-col justify-around p-2 hover:scale-105">
          <div className="text-xs text-gray font-semibold">JUMLAH PRODUK</div>
          <div className="text-2xl text-black font-bold">
            {summary.totalProduct}
          </div>
        </div>
        <div className="rounded-lg bg-white w-[250px] h-[100px] border-2 border-gray flex flex-col justify-around p-2 hover:scale-105">
          <div className="text-xs text-gray font-semibold">
            JUMLAH KATEGORI PRODUK
          </div>
          <div className="text-2xl text-black font-bold">
            {summary.totalCategory}
          </div>
        </div>
        <div className="rounded-lg bg-white w-[250px] h-[100px] border-2 border-gray flex flex-col justify-around p-2 hover:scale-105">
          <div className="text-xs text-gray font-semibold">
            JUMLAH TRANSAKSI
          </div>
          <div className="text-2xl text-black font-bold">
            {summary.totalTransaction}
          </div>
        </div>
        <div className="rounded-lg bg-purple w-[300px] h-[100px] flex justify-around items-center p-2 hover:scale-105">
          <div className="text-md text-white font-semibold">
            Butuh Bantuan? <br />{" "}
            <span className="text-red">Pelajari Disini.</span>
          </div>
          <div className="">
            <Image
              src={"/ill-question.png"}
              alt="help"
              width={150}
              height={150}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-around p-2 mt-6 rounded-lg bg-white w-[71%] h-[250px] border-2 border-gray">
        <div className="flex justify-between">
          <div className="text-xs text-gray font-semibold">PRODUK TERBARU</div>
          <div className="text-xs text-gray font-semibold cursor-pointer">
            Lihat Semua {`>>>`}
          </div>
        </div>
        <div className="flex gap-5 mx-2">
          {product
            ? product.map((p) => {
                return (
                  <div
                    key={p.id}
                    className="rounded-lg bg-p-white border-2 border-purple w-[190px] h-[200px] flex flex-col p-2"
                  >
                    <div className="h-[60%] flex justify-center items-center">
                      <Image
                        src={"/logo-superindo.png"}
                        alt="product"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="h-[40%] flex flex-col justify-end">
                      <div className="font-bold text-sm">{p.name}</div>
                      <div className="text-xs">
                        Rp {p.price} <span>/ pcs</span>
                      </div>
                      <div className="text-xs font-medium text-gray">
                        Makanan
                      </div>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
