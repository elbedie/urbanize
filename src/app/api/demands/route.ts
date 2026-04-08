import { NextRequest, NextResponse } from "next/server";
import { createDemand, listDemands } from "./data";
import { Demand, DemandCategory, DemandStatus } from "@/types/demand";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as DemandStatus | null;
  const category = searchParams.get("category") as DemandCategory | null;
  const region = searchParams.get("region");
  const search = searchParams.get("search") ?? undefined;

  const demands = listDemands({
    status: status ?? undefined,
    category: category ?? undefined,
    region: region ?? undefined,
    search,
  });

  return NextResponse.json(demands);
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Omit<Demand, "id">;
  const demand = createDemand({ ...body, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  return NextResponse.json(demand, { status: 201 });
}
