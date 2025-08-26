import { useGetPesanan, useCreatePesanan } from "@/feature/pesanan/query";
import { useGetProduk, useUpdateProduk } from "@/feature/produk/query";

function formatRupiah(angka?: number) {
    if (typeof angka !== "number") return "Rp 0";
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

export default function ListPesanan() {
    const { data: pesanan, isLoading, isError } = useGetPesanan();
    const { data: produk } = useGetProduk();
    const createPesanan = useCreatePesanan();
    const updateProduk = useUpdateProduk();

    const handleCreateDummyPesanan = async () => {
        if (!produk || produk.length === 0) {
            alert("Tidak ada produk untuk dibuatkan pesanan dummy.");
            return;
        }
        const pr = produk.find((p) => p.stok > 0);
        if (!pr) {
            alert("Semua stok produk habis!");
            return;
        }

        await createPesanan.mutateAsync({
            produk_id: pr.id,
            nama_pembeli: `Pembeli ${pr.nama}`,
            tgl_beli: new Date().toISOString().slice(0, 10),
            harga: pr.harga,
        });

        await updateProduk.mutateAsync({
            id: pr.id,
            data: {
                ...pr,
                stok: pr.stok - 1,
            },
        });
        alert(`Pesanan dummy untuk produk "${pr.nama}" berhasil dibuat dan stok produk berkurang!`);
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Gagal memuat pesanan</div>;

    return (
        <div className="mt-6 overflow-x-auto rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-white mt-2 mb-1 ml-4">List Pesanan</h2>
                <button
                    onClick={handleCreateDummyPesanan}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm mr-4"
                >
                    Buat Data Dummy Pesanan
                </button>

            </div>
            <table className="min-w-full bg-[#456882] text-white rounded-2xl overflow-hidden">
                <thead>
                    <tr className="bg-[#1B3C53] text-left">
                        <th className="px-6 py-4 text-sm text-center font-semibold">ID</th>
                        <th className="px-6 py-4 text-sm text-center font-semibold">Nama Pembeli</th>
                        <th className="px-6 py-4 text-sm text-center font-semibold">Nama Produk</th>
                        <th className="px-6 py-4 text-sm text-center font-semibold">Harga</th>
                        <th className="px-6 py-4 text-sm text-center font-semibold">Tanggal Pesan</th>
                        <th className="px-6 py-4 text-sm text-center font-semibold">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {pesanan?.map((p, index) => {
                        const prod = produk?.find((pr) => pr.id === p.produk_id);
                        return (
                            <tr
                                key={p.id}
                                className={`transition duration-200 ${index % 2 === 0 ? "bg-[#456882]" : "bg-[#3b5c76]"} hover:bg-[#5c86a3]`}
                            >
                                <td className="px-6 py-4 text-sm text-center">#{p.id}</td>
                                <td className="px-6 py-4 text-sm text-center">{p.nama_pembeli}</td>
                                <td className="px-6 py-4 text-sm text-center">{prod?.nama || "-"}</td>
                                <td className="px-6 py-4 text-sm text-center">{formatRupiah(p.harga)}</td>
                                <td className="px-6 py-4 text-sm text-center">{formatTanggal(p.tgl_beli)}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                                        Lunas
                                    </span>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}