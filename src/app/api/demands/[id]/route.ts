import { NextResponse } from "next/server";
import { getDemand } from "../data";

interface Params {
  params: { id: string };
}

export async function GET(_: Request, { params }: Params) {
  const demand = getDemand(params.id);
  if (!demand) return NextResponse.json({ message: "Not found" }, { status: 404 });
  return NextResponse.json(demand);
}
