import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Atualizar Evento
export async function PUT(request: Request) {
  try {
    const { id, title, date, location, description } = await request.json();

    if (!id || !title || !date || !location || !description) {
      return NextResponse.json(
        { error: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: { title, date: new Date(date), location, description },
    });

    return NextResponse.json(updatedEvent);
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar evento." },
      { status: 500 }
    );
  }
}

// Deletar Evento
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "ID do evento é obrigatório." },
        { status: 400 }
      );
    }

    await prisma.event.delete({ where: { id } });

    return NextResponse.json({ message: "Evento excluído com sucesso." });
  } catch (error) {
    console.error("Erro ao excluir evento:", error);
    return NextResponse.json(
      { error: "Erro ao excluir evento." },
      { status: 500 }
    );
  }
}
