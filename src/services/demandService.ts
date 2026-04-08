import { api } from "./api";
import { Demand, DemandFilters, DemandStatus } from "@/types/demand";

export const demandService = {
  async list(filters: DemandFilters = {}) {
    const { data } = await api.get<Demand[]>("/demands", { params: filters });
    return data;
  },
  async getById(id: string) {
    const { data } = await api.get<Demand>(`/demands/${id}`);
    return data;
  },
  async create(payload: Omit<Demand, "id" | "createdAt" | "updatedAt">) {
    const { data } = await api.post<Demand>("/demands", payload);
    return data;
  },
  async updateStatus(id: string, status: DemandStatus) {
    const { data } = await api.patch<Demand>(`/demands/${id}/status`, { status });
    return data;
  },
};
