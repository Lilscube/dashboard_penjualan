"use client";

import { useState } from "react";
import { Produk } from "@/types/Produk";
import { useCreateProduk } from "@/feature/produk/query";
import { useForm } from "react-hook-form";

type FormInput = Omit<Produk, "id">;

interface FormTambahProdukProps {
  onSubmit: (data: FormInput) => void;
  onClose: () => void;
  isOpen: boolean;
}

export default function FormTambahProduk({ onSubmit, onClose, isOpen }: FormTambahProdukProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>();
  const [showForm, setShowForm] = useState(false);


  // const submitHandler = async (data: FormInput) => {
  //   onSubmit(data);
  // };
  const submitHandler = async (data: FormInput) => {

    const fixedData = { ...data, harga: data.harga * 1000 };
    onSubmit(fixedData);
  };

  return (

    // <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
    //<div className="bg-[#426981] p-6 rounded-xl w-[400px]">

    <div className={`
        fixed top-0 right-0 h-full w-[400px] bg-[#426981] shadow-lg p-6 rounded-l-xl
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}>

      <h2 className="text-xl font-bold text-white mb-4">Tambah Produk</h2>
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
        <div>
          <label className="block text-white mb-2">Nama Produk</label>
          <input
            type="text"
            {...register("nama", { required: "Nama produk wajib diisi" })}
            className="w-full px-3 py-2 rounded-lg text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.nama && <p className="text-red-300 text-sm">{errors.nama.message}</p>}
        </div>

        <div>
          <label className="block text-white mb-2">Stok</label>
          <input
            type="number"
            {...register("stok", { required: "Stok wajib diisi", min: 0 })}
            className="w-full px-3 py-2 rounded-lg text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.stok && <p className="text-red-300 text-sm">{errors.stok.message}</p>}
        </div>

        <div>
          <label className="block text-white mb-2">Harga</label>
          <input
            type="number"
            {...register("harga", { required: "Harga wajib diisi", min: 1 })}
            className="w-full px-3 py-2 rounded-lg text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.harga && <p className="text-red-300 text-sm">{errors.harga.message}</p>}
        </div>

        <div>
          <label className="block text-white mb-2">Tanggal Masuk</label>
          <input
            type="date"
            {...register("tgl_masuk", { required: "Tanggal masuk wajib diisi" })}
            className="w-full px-3 py-2 rounded-lg text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.tgl_masuk && <p className="text-red-300 text-sm">{errors.tgl_masuk.message}</p>}
        </div>
        
        <div>
          <label className="block text-white mb-2">Tanggal Keluar</label>
          <input
            type="date"
            {...register("tgl_keluar", { required: "Tanggal keluar wajib diisi" })}
            className="w-full px-3 py-2 rounded-lg text-black bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.tgl_keluar && <p className="text-red-300 text-sm">{errors.tgl_keluar.message}</p>}
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-500 hover:bg-gray-600 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition"
          >
            Simpan
          </button>
        </div>
      </form>

    </div>

    //</div>
    // </div>

  );
}
