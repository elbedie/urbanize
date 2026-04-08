import { Demand, DemandCategory, DemandStatus } from "@/types/demand";
import { randomUUID } from "crypto";

const now = new Date();

const baseDemands: Demand[] = [
  {
    id: randomUUID(),
    title: "Poste sem iluminação na Rua das Flores",
    description: "Poste em frente ao número 120 está apagado há 3 dias.",
    category: "iluminacao",
    status: "aberta",
    location: { lat: -8.05, lng: -34.9, address: "Rua das Flores, 120 - Recife", region: "Centro" },
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(),
    updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24).toISOString(),
    citizenName: "João Lima",
  },
  {
    id: randomUUID(),
    title: "Buraco em via principal",
    description: "Buraco grande na Av. Boa Viagem sentido centro.",
    category: "vias",
    status: "em_andamento",
    location: { lat: -8.12, lng: -34.88, address: "Av. Boa Viagem, 900", region: "Zona Sul" },
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 48).toISOString(),
    updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 12).toISOString(),
    citizenName: "Ana Souza",
  },
  {
    id: randomUUID(),
    title: "Coleta de lixo atrasada",
    description: "Sem coleta há dois dias na Rua da Aurora.",
    category: "coleta",
    status: "concluida",
    location: { lat: -8.06, lng: -34.88, address: "Rua da Aurora, 300", region: "Centro" },
    createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 72).toISOString(),
    updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 6).toISOString(),
    citizenName: "Marcos Costa",
  },
];

let demands = [...baseDemands];

export function listDemands(filters: {
  status?: DemandStatus;
  category?: DemandCategory;
  region?: string;
  search?: string;
} = {}) {
  return demands.filter((d) => {
    if (filters.status && d.status !== filters.status) return false;
    if (filters.category && d.category !== filters.category) return false;
    if (filters.region && d.location.region !== filters.region) return false;
    if (filters.search && !d.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });
}

export function getDemand(id: string) {
  return demands.find((d) => d.id === id);
}

export function createDemand(payload: Omit<Demand, "id">) {
  const demand: Demand = { ...payload, id: randomUUID(), createdAt: payload.createdAt, updatedAt: payload.updatedAt };
  demands = [demand, ...demands];
  return demand;
}

export function updateDemandStatus(id: string, status: DemandStatus) {
  demands = demands.map((d) => (d.id === id ? { ...d, status, updatedAt: new Date().toISOString() } : d));
  return getDemand(id);
}

export function metrics() {
  const total = demands.length;
  const abertas = demands.filter((d) => d.status === "aberta").length;
  const emAndamento = demands.filter((d) => d.status === "em_andamento").length;
  const concluidas = demands.filter((d) => d.status === "concluida").length;
  const canceladas = demands.filter((d) => d.status === "cancelada").length;
  const porCategoria = demands.reduce<Record<string, number>>((acc, d) => {
    acc[d.category] = (acc[d.category] ?? 0) + 1;
    return acc;
  }, {});

  return { total, abertas, emAndamento, concluidas, canceladas, porCategoria };
}
