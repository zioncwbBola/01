import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

  

export async function POST(req: Request) {
  const { fullName, email, phone, requestType } = await req.json();
  const newRequest = await prisma.membershipRequest.create({
    data: { fullName, email, phone, requestType },
  });
  return NextResponse.json(newRequest);
}

export async function GET() {
  const requests = await prisma.membershipRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(requests);
}