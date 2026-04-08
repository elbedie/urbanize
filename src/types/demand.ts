export type DemandStatus = "aberta" | "em_andamento" | "concluida" | "cancelada";
export type DemandCategory = "iluminacao" | "vias" | "coleta" | "saneamento" | "fiscalizacao";

export interface Location {
  lat: number;
  lng: number;
  address: string;
  region?: string;
}

export interface Demand {
  id: string;
  title: string;
  description: string;
  category: DemandCategory;
  status: DemandStatus;
  location: Location;
  createdAt: string;
  updatedAt: string;
  citizenName: string;
  attachments?: string[];
}

export interface DemandFilters {
  status?: DemandStatus;
  category?: DemandCategory;
  region?: string;
  search?: string;
}
