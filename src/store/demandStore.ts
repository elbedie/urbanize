import { create } from "zustand";
import { demandService } from "@/services/demandService";
import { Demand, DemandFilters, DemandStatus } from "@/types/demand";

interface DemandState {
  demands: Demand[];
  selected?: Demand;
  loading: boolean;
  filters: DemandFilters;
  list: (filters?: DemandFilters) => Promise<void>;
  get: (id: string) => Promise<void>;
  create: (payload: Omit<Demand, "id" | "createdAt" | "updatedAt">) => Promise<Demand>;
  updateStatus: (id: string, status: DemandStatus) => Promise<void>;
  setFilters: (filters: DemandFilters) => void;
}

export const useDemandStore = create<DemandState>((set, get) => ({
  demands: [],
  loading: false,
  filters: {},
  async list(filters = {}) {
    set({ loading: true, filters });
    const data = await demandService.list(filters);
    set({ demands: data, loading: false });
  },
  async get(id) {
    set({ loading: true });
    const data = await demandService.getById(id);
    set({ selected: data, loading: false });
  },
  async create(payload) {
    set({ loading: true });
    const data = await demandService.create(payload);
    set({ demands: [data, ...get().demands], loading: false });
    return data;
  },
  async updateStatus(id, status) {
    set({ loading: true });
    const data = await demandService.updateStatus(id, status);
    set({
      demands: get().demands.map((d) => (d.id === id ? data : d)),
      selected: data,
      loading: false,
    });
  },
  setFilters(filters) {
    set({ filters });
  },
}));
