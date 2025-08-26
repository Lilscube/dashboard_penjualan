"use client";

import ListProduk from "@/components/ManajemenProduk/ListProduk";

export default function ManajemenMenu() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4 text-[#456882]">Manajemen Menu</h1>

      <div className="bg-[#1B3C53] rounded-2xl shadow-md p-6">

        <div className="overflow-x-auto">
          <ListProduk />
        </div>

      </div>
    </div>
  );
}
