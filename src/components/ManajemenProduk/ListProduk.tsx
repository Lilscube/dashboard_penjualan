"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetProduk, useCreateProduk, useDeleteProduk, useUpdateProduk } from "@/feature/produk/query";
import { Produk } from "@/types/Produk";
import FormTambahProduk from "./FormTambahProduk";
import FormEditProduk from "./FormEditProduk";
import { useState } from "react";

export default function ListProduk() {
  const { data, isLoading, isError } = useGetProduk();
  const postProduk = useCreateProduk();
  const deleteProduk = useDeleteProduk();
  const updateProduk = useUpdateProduk();
  const [showForm, setShowForm] = useState(false);
  const [editProduk, setEditProduk] = useState<Produk | null>(null);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Terjadi error saat mengambil produk</div>;

  const handleSubmit = async (formData: Omit<Produk, "id">) => {
    try {
      await postProduk.mutateAsync(formData);
      setShowForm(false);
      alert("Produk berhasil ditambahkan");
    } catch (error) {
      alert("Gagal menambahkan produk");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      try {
        await deleteProduk.mutateAsync(id);
        alert("Produk berhasil dihapus");
      } catch (error) {
        alert("Gagal menghapus produk");
      }
    }
  };


  const handleEdit = async (data: Omit<Produk, "id">) => {
    if (!editProduk) return;
    try {
      await updateProduk.mutateAsync({ id: editProduk.id, data });
      setEditProduk(null);
      alert("Produk berhasil diupdate");
    } catch (error) {
      alert("Gagal mengupdate produk");
    }
  };

  function formatRupiah(angka: number) {
    return angka.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    });
  }

  function formatTanggal(tanggal: string) {
    if (!tanggal) return "-";
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  }


  return (
    <div className="mt-6 overflow-x-auto rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-white mt-2 mb-1 ml-4">List Produk</h2>

        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg shadow-md transition mr-4"
        >
          Tambah Produk
        </button>
      </div>

      <table className="min-w-full bg-[#456882] text-white rounded-2xl overflow-hidden">
        <thead>
          <tr className="bg-[#1B3C53] text-left">
            <th className="px-6 py-4 text-sm text-center font-semibold">ID</th>
            <th className="px-6 py-4 text-sm text-center font-semibold">Nama Produk</th>
            <th className="px-6 py-4 text-sm text-center font-semibold">Stok</th>
            <th className="px-6 py-4 text-sm text-center font-semibold">Harga</th>
            <th className="px-6 py-4 text-sm text-center font-semibold">Tanggal Masuk</th>
            <th className="px-6 py-4 text-sm text-center font-semibold">Tanggal Keluar</th>
            <th className="px-6 py-4 text-sm text-center font-semibold">Status</th>
            <th className="px-6 py-4 text-sm text-center font-semibold">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((produk, index) => (
            <tr
              key={produk.id}
              className={`transition duration-200 ${index % 2 === 0 ? "bg-[#456882]" : "bg-[#3b5c76]"
                } hover:bg-[#5c86a3]`}
            >
              <td className="px-6 py-4 text-sm text-center">#{produk.id}</td>
              <td className="px-6 py-4 text-sm text-center font-medium">{produk.nama}</td>
              <td className="px-6 py-4 text-sm text-center">{produk.stok}</td>
              <td className="px-6 py-4 text-sm text-center">{formatRupiah(produk.harga)}</td>
              <td className="px-6 py-4 text-sm text-center">{formatTanggal(produk.tgl_masuk)}</td>
              <td className="px-6 py-4 text-sm text-center">{formatTanggal(produk.tgl_keluar)}</td>
              <td className="px-6 py-4 text-center">
                {produk.stok > 0 ? (
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                    Tersedia
                  </span>
                ) : (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs">
                    Habis
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-center space-x-2">
                <button
                  onClick={() => setEditProduk(produk)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg text-xs"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(produk.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs "
                >
                  Hapus
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <FormTambahProduk
          isOpen={showForm}
          onSubmit={handleSubmit}
          onClose={() => setShowForm(false)}
        />
      )}

      {editProduk && (
        <FormEditProduk
          isOpen={!!editProduk}
          produk={editProduk}
          onSubmit={handleEdit}
          onClose={() => setEditProduk(null)}
        />
      )}
    </div>
  );
}
