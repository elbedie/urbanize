import { NextRequest, NextResponse } from "next/server";
import { createUser, getUserByEmail } from "../users";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  const { name, email, role } = await request.json();
  const existing = getUserByEmail(email);
  if (existing) return NextResponse.json({ message: "Usuário já existe" }, { status: 400 });

  const user = createUser({ name, email, role });
  return NextResponse.json({ user, token: randomUUID() }, { status: 201 });
}
