import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Produk, IProduk } from "./models/Produk";
import { Pesanan, IPesanan } from "./models/Pesanan";

const app = express();
app.use(cors());
app.use(express.json());

// Ganti string berikut sesuai koneksi MongoDB Anda jika perlu
const MONGO_URL = "mongodb+srv://Lilscube:<AnjesmongoDB04.>@cluster0.otbl4ng.mongodb.net/dashboard_penjualan?retryWrites=true&w=majority";

mongoose.connect(MONGO_URL)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

// --- Produk Endpoints ---

// Get all produk
app.get("/produk", async (_req, res) => {
    const produk = await Produk.find();
    res.json(produk);
});

// Create produk
app.post("/produk", async (req, res) => {
    try {
        const produk = new Produk(req.body);
        await produk.save();
        res.json(produk);
    } catch (err) {
        res.status(400).json({ error: "Gagal menambah produk" });
    }
});

// Update produk
app.put("/produk/:id", async (req, res) => {
    try {
        const produk = await Produk.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(produk);
    } catch (err) {
        res.status(400).json({ error: "Gagal mengupdate produk" });
    }
});

// Delete produk
app.delete("/produk/:id", async (req, res) => {
    try {
        await Produk.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        res.status(400).json({ error: "Gagal menghapus produk" });
    }
});

// Get all pesanan
app.get("/pesanan", async (_req, res) => {
    const pesanan = await Pesanan.find();
    res.json(pesanan);
});

// Create pesanan & update stok produk
app.post("/pesanan", async (req, res) => {
    const { produk_id, nama_pembeli, tgl_beli, harga } = req.body;
    try {
        // Kurangi stok produk
        const produk = await Produk.findById(produk_id);
        if (!produk) return res.status(404).json({ error: "Produk tidak ditemukan" });
        if (produk.stok < 1) return res.status(400).json({ error: "Stok produk habis" });

        produk.stok -= 1;
        await produk.save();

        // Buat pesanan
        const pesanan = new Pesanan({
            produk_id,
            nama_pembeli,
            tgl_beli,
            harga,
            status: "lunas",
        });
        await pesanan.save();

        res.json(pesanan);
    } catch (err) {
        res.status(400).json({ error: "Gagal membuat pesanan" });
    }
});

// Jalankan server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});