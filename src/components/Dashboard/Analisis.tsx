"use client";

import { useGetPesanan } from "@/feature/pesanan/query";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


const bulanIndo = [
  "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
  "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
];

function getMonth(dateStr: string) {
  const date = new Date(dateStr);
  return date.getMonth(); // 0-11
}

export default function Analisis() {
  const { data: pesananList, isLoading } = useGetPesanan();

  // Hitung jumlah pesanan lunas per bulan
  const grafikData = bulanIndo.map((bulan, idx) => ({
    bulan,
    penjualan:
      pesananList?.filter(
        (p) =>
          p.status === "lunas" &&
          getMonth(p.tgl_beli) === idx
      ).length || 0,
  }));

  if (isLoading) return <div>Loading grafik...</div>;

  return (
    <div className="bg-[#1B3C53] rounded-2xl shadow-lg p-6">
      <h2 className="text-lg font-semibold mb-4 text-white">
        Grafik Penjualan Perbulan
      </h2>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={grafikData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="bulan" stroke="#CBD5E1" />
            <YAxis stroke="#CBD5E1" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                borderRadius: "8px",
                border: "none",
                color: "#fff",
              }}
            />
            <Line
              type="monotone"
              dataKey="penjualan"
              stroke="#38BDF8"
              strokeWidth={3}
              dot={{ r: 5, fill: "#38BDF8" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
