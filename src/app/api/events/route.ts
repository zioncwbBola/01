/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Listar Eventos
export async function GET(request: Request) {
  try {
    const events = await prisma.event.findMany();
    return NextResponse.json(events, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (error) {
    console.error("Erro ao listar eventos:", error);
    return NextResponse.json(
      { error: "Erro ao listar eventos." },
      { status: 500 }
    );
  }
}

// Criar Evento
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, date, location, description } = body;

    // Validação dos campos obrigatórios
    if (!title || !date || !location || !description) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        title,
        date: new Date(date),
        location,
        description,
        updatedAt: new Date(), // Adiciona um valor para updatedAt
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Erro ao criar evento:", error);
    return NextResponse.json(
      { error: "Erro ao criar evento." },
      { status: 500 }
    );
  }
}
// Permitir CORS
