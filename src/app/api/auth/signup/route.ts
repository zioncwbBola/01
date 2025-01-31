
import bcrypt from 'bcryptjs';
// src/app/api/auth/signup/route.ts
import  prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  // Verificando se o email já está cadastrado
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return new Response("Usuário já existe", { status: 400 });
  }

  // Criptografando a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Criando o novo usuário
  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return new Response(JSON.stringify(newUser), { status: 201 });
}
