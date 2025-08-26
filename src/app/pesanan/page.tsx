"use client";


import ListPesanan from "@/components/Pesanan/ListPesanan";
import ListProduk from "@/components/Pesanan/ListPesanan";

export default function PelangganMenu() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-[#456882]">Pesanan Menu</h1>

       <div className="bg-[#1B3C53] rounded-2xl shadow-md p-6">
      
              <div className="overflow-x-auto">
                <ListPesanan />
              </div>
      
            </div>
    </div>
  );
}
