import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Handle POST request to create a new support request
export async function POST(request: Request) {
  let data;

  try {
    const contentType = request.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      data = await request.json(); // ✅ Lê o corpo como JSON
    } else if (contentType?.includes('application/x-www-form-urlencoded')) {
      const formData = await request.formData();
      data = Object.fromEntries(formData.entries());
    } else {
      return NextResponse.json({ error: 'Unsupported content type' }, { status: 400 });
    }

    const newRequest = await prisma.communitySupportRequest.create({
      data: {
        name: data.name || null,
        email: data.email,
        phone: data.phone,
        category: data.category,
        message: data.message,
        isPublic: data.isPublic === 'on' || data.isPublic === true,
        status: 'pendente',
      },
    });

    return NextResponse.json(newRequest, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Erro ao processar a solicitação.' }, { status: 500 });
  }
}

// Handle GET request to fetch public requests
export async function GET() {
  try {
    const publicRequests = await prisma.communitySupportRequest.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(publicRequests);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Erro ao buscar os pedidos.' }, { status: 500 });
  }
}
