import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiInstance } from "@/lib/axios";
import { Pesanan } from "@/types/Pesanan";
import { queryClient } from "@/provider/TanstackProvider";

export const useGetPesanan = () => {
    return useQuery<Pesanan[]>({
        queryKey: ["PESANAN"],
        queryFn: async () => {
            const response = await apiInstance.get<Pesanan[]>("/pesanan");
            return response.data;
        },
    });
};

export const useCreatePesanan = () => {

  //const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["CREATE_PESANAN"],
    mutationFn: async (data: Omit<Pesanan, "id" | "status">) => {
      const response = await apiInstance.post<Pesanan>("/pesanan", { ...data, status: "lunas" });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["PESANAN"] });
      queryClient.invalidateQueries({ queryKey: ["PRODUK"] }); 
    },
  });
};