import { Schema, model, Document } from "mongoose";

export interface IProduk extends Document {
    nama: string;
    harga: number;
    stok: number;
    tgl_masuk: string;
    tgl_keluar: string;
}

const ProdukSchema = new Schema<IProduk>({
    nama: { type: String, required: true },
    harga: { type: Number, required: true },
    stok: { type: Number, required: true },
    tgl_masuk: { type: String, required: true },
    tgl_keluar: { type: String, required: true },
});

export const Produk = model<IProduk>("Produk", ProdukSchema);