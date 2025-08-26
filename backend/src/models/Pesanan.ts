import { Schema, model, Document } from "mongoose";

export interface IPesanan extends Document {
    produk_id: string;
    nama_pembeli: string;
    tgl_beli: string;
    harga: number;
    status: "lunas";
}

const PesananSchema = new Schema<IPesanan>({
    produk_id: { type: String, required: true },
    nama_pembeli: { type: String, required: true },
    tgl_beli: { type: String, required: true },
    harga: { type: Number, required: true },
    status: { type: String, enum: ["lunas"], default: "lunas" },
});

export const Pesanan = model<IPesanan>("Pesanan", PesananSchema);