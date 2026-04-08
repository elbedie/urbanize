import { DemandStatus } from "@/types/demand";

export const statusLabel: Record<DemandStatus, string> = {
  aberta: "Aberta",
  em_andamento: "Em andamento",
  concluida: "Concluída",
  cancelada: "Cancelada",
};

export const statusColor: Record<DemandStatus, string> = {
  aberta: "yellow",
  em_andamento: "blue",
  concluida: "green",
  cancelada: "red",
};
