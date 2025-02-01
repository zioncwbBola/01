/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Criar um novo pedido de oração
export async function POST(req: Request) {
  try {
    const { name, prayer, isPublic } = await req.json();

    const newRequest = await prisma.prayerRequest.create({
      data: {
        name,
        prayer,
        isPublic,
      },
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar pedido de oração" }, { status: 500 });
  }
}

// Obter todos os pedidos de oração
export async function GET() {
  try {
    const requests = await prisma.prayerRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao buscar pedidos" }, { status: 500 });
  }
}
