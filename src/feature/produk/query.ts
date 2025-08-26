import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "@/lib/axios";
import { Produk } from "@/types/Produk";
import { queryClient } from "@/provider/TanstackProvider";


export const useGetProduk = () => {
    return useQuery<Produk[]>({
        queryKey: ["PRODUK"],
        queryFn: async () => {
            const response = await apiInstance.get<Produk[]>("/produk");
            return response.data;
        },
    });
};


export const useCreateProduk = () => {
    return useMutation({
        mutationKey: ["CREATE_PRODUK"],
        mutationFn: async (data: Omit<Produk, "id">) => {
            const response = await apiInstance.post<Produk>("/produk", data, {
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["PRODUK"] });
        },
    });
};

export const useDeleteProduk = () => {
    return useMutation({
        mutationKey: ["DELETE_PRODUK"],
        mutationFn: async (id: string) => {
            await apiInstance.delete(`/produk/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["PRODUK"] });
        },
    });
}

export const useUpdateProduk = () => {
    return useMutation({
        mutationKey: ["UPDATE_PRODUK"],
        mutationFn: async ({ id, data }: { id: string, data: Omit<Produk, "id"> }) => {
            const response = await apiInstance.put<Produk>(`/produk/${id}`, data, {
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["PRODUK"] });
        },
    });
};