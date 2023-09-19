"use client";
import Accordion from "@/app/components/Accordion";
import TransactionDetail from "@/app/components/transaction/TransactionDetail";
import { TransactionType } from "@/app/types/types";
import React, { useEffect, useState } from "react";

function Transaction() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3001/transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="font-bold">Transaksi</div>
      <div className="border-2 rounded-lg border-gray bg-white p-3 w-[80%] text-sm font-semibold">
        Panduan Kelola Transaksi dapat di{" "}
        <span className="text-red cursor-pointer">pelajari disini.</span>
      </div>
      <div className="mt-2 rounded-lg border-2 border-gray bg-white w-full min-h-[70vh] p-3">
        {transactions
          ? transactions.map((transaction) => {
              return (
                <div
                  className="flex flex-col border-2 my-2 rounded border-gray p-2"
                  key={transaction.id}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="font-semibold">
                        <span className="font-medium text-sm">
                          Nomor Transaksi:
                        </span>{" "}
                        {transaction.transaction_no}
                      </div>
                      <div className="font-semibold">
                        <span className="font-medium text-sm">Jumlah:</span> Rp
                        {transaction.total_amount}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="font-semibold">
                        <span className="font-medium text-sm">Pembeli:</span>{" "}
                        {transaction.created_user}
                      </div>
                      <div className="font-semibold">
                        <span className="font-medium text-sm">Tanggal:</span>{" "}
                        {transaction.created_date}
                      </div>
                    </div>
                  </div>
                  <Accordion title="Lihat detail" cta="">
                    <TransactionDetail trxId={transaction.id}/>
                  </Accordion>
                </div>
              );
            })
          : "Belum ada data transaksi"}
      </div>
    </div>
  );
}

export default Transaction;
