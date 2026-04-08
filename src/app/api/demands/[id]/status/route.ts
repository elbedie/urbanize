import { NextRequest, NextResponse } from "next/server";
import { updateDemandStatus } from "../../data";
import { DemandStatus } from "@/types/demand";

interface Params {
  params: { id: string };
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const { status } = (await request.json()) as { status: DemandStatus };
  const demand = updateDemandStatus(params.id, status);
  if (!demand) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(demand);
}
