"use client";

import React from "react";
import Analisis from "@/components/Dashboard/Analisis";
import { useGetProduk, useCreateProduk, useDeleteProduk, useUpdateProduk } from "@/feature/produk/query";
import { useGetPesanan } from "@/feature/pesanan/query";
import { ShoppingCart, Package } from "lucide-react";

export default function DashboardMenu() {

  const { data: produkList, isLoading, isError } = useGetProduk();
  const { data: pesananList } = useGetPesanan();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Terjadi error saat mengambil data produk</div>;

  const totalProduk = produkList ? produkList.length : 0;
  const totalPesanan = pesananList ? pesananList.length : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4 text-[#456882]">Dashboard Admin Menu</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Pesanan */}
        <div className="bg-[#1B3C53] from-blue-600 to-indigo-700 rounded-2xl shadow-lg p-6 text-white flex items-center justify-between hover:scale-105 transition-transform duration-200">
          <div>
            <h2 className="text-lg font-medium opacity-80">
              Total Pesanan Masuk
            </h2>
            <p className="text-4xl font-bold mt-2">{totalPesanan}</p>
          </div>
          <ShoppingCart className="w-12 h-12 opacity-90" />
        </div>

        {/* Produk */}
        <div className="bg-[#1B3C53] from-emerald-600 to-green-700 rounded-2xl shadow-lg p-6 text-white flex items-center justify-between hover:scale-105 transition-transform duration-200">
          <div>
            <h2 className="text-lg font-medium opacity-80">
              Jumlah Produk Tersedia
            </h2>
            <p className="text-4xl font-bold mt-2">{totalProduk}</p>
          </div>
          <Package className="w-12 h-12 opacity-90" />
        </div>
      </div>

      {/* Grafik */}
      <Analisis>

      </Analisis>
    </div>
  );
}