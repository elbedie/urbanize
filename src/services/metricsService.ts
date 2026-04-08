import { api } from "./api";

export interface MetricsSummary {
  total: number;
  abertas: number;
  emAndamento: number;
  concluidas: number;
  canceladas: number;
  porCategoria: Record<string, number>;
}

export const metricsService = {
  async summary() {
    const { data } = await api.get<MetricsSummary>('/metrics/summary');
    return data;
  },
};
