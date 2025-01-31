import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma  from "@/lib/prisma"; // Certifique-se de ter a instância correta do Prisma

// Função de autenticação personalizada
async function authorize(
  credentials: { email: string; password: string } | undefined
) {
  if (!credentials?.email || !credentials?.password) {
    throw new Error("Email e senha são obrigatórios");
  }

  const { email, password } = credentials;

  // Procurando o usuário no banco de dados
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  // Verificando se a senha está correta
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Senha incorreta");
  }

  // Retornando os dados do usuário se tudo estiver correto
  return user;
}

// Configuração do NextAuth
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize, // Passando a função de autorização corrigida
    }),
  ],
  session: {
    strategy: "jwt", // Usando a estratégia JWT para sessões
  },
  pages: {
    signIn: "/auth/signin", // Página de login personalizada
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret do NextAuth
});

// Exportando o handler do NextAuth
export { handler as GET, handler as POST };
