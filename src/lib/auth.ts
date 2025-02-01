// // import type { NextAuthOptions } from "next-auth"
// // import CredentialsProvider from "next-auth/providers/credentials"
// // import { compare } from "bcrypt"
// // import { db } from "./db" // Supondo que você tenha configurado o Prisma ou um DB semelhante aqui

// // // Extensão da tipagem do NextAuth para incluir o campo id na sessão
// // declare module "next-auth" {
// //   interface Session {
// //     user: {
// //       id: string
// //       email: string
// //       name: string | null
// //     }
// //   }

// //   interface User {
// //     id: string
// //     email: string
// //     name: string | null
// //   }
// // }

// // export const authOptions: NextAuthOptions = {
// //   session: {
// //     strategy: "jwt", // Usando JWT como estratégia de sessão
// //   },
// //   providers: [
// //     CredentialsProvider({
// //       name: "Sign in",
// //       credentials: {
// //         email: {
// //           label: "Email",
// //           type: "email",
// //           placeholder: "example@example.com",
// //         },
// //         password: { label: "Password", type: "password" },
// //       },
// //       async authorize(credentials) {
// //         if (!credentials?.email || !credentials.password) {
// //           return null
// //         }

// //         // Busca o usuário no banco de dados pelo e-mail
// //         const user = await db.user.findUnique({
// //           where: {
// //             email: credentials.email,
// //           },
// //         })

// //         if (!user) {
// //           return null
// //         }

// //         // Compara a senha fornecida com a armazenada no banco de dados
// //         const isPasswordValid = await compare(credentials.password, user.password)

// //         if (!isPasswordValid) {
// //           return null
// //         }

// //         // Retorna o usuário com o id, email e nome, para o NextAuth
// //         return {
// //           id: user.id,
// //           email: user.email,
// //           name: user.name,
// //         }
// //       },
// //     }),
// //   ],
// //   pages: {
// //     signIn: "/login", // Página de login personalizada
// //   },
// //   callbacks: {
// //     async session({ session, token }) {
// //       // Passando o id do token para a sessão
// //       return {
// //         ...session,
// //         user: {
// //           ...session.user,
// //           id: token.id, // Garantindo que o id do usuário está presente na sessão
// //         },
// //       }
// //     },
// //     async jwt({ token, user }) {
// //       if (user) {
// //         // Passando o id do usuário para o token JWT
// //         return {
// //           ...token,
// //           id: user.id,
// //         }
// //       }
// //       return token
// //     },
// //   },
// // }
// import type { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcrypt";
// import { db } from "./db"; // Prisma já está configurado

// // Extensão de tipos do NextAuth para incluir o campo 'id' no usuário e sessão
// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       email: string;
//       name: string | null;
//     };
//   }

//   interface User {
//     id: string;
//     email: string;
//     name: string | null;
//   }
// }

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt", // Estratégia de sessão JWT
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Sign in",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "example@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials.password) {
//           return null;
//         }

//         // Busca o usuário no banco de dados (por e-mail)
//         const user = await db.user.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });

//         // Verifica se o usuário existe
//         if (!user) {
//           return null;
//         }

//         // Compara a senha fornecida com a armazenada no banco de dados
//         const isPasswordValid = await compare(credentials.password, user.password);

//         if (!isPasswordValid) {
//           return null;
//         }

//         // Retorna um objeto com id, email e nome do usuário
//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//         };
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login", // Página de login personalizada
//   },
//   callbacks: {
//     // Callback para modificar a sessão antes de ser retornada
//     async session({ session, token }) {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: token.id, // Incluindo o 'id' no usuário da sessão
//         },
//       };
//     },

//     // Callback para modificar o token JWT
//     async jwt({ token, user }) {
//       if (user) {
//         return {
//           ...token,
//           id: user.id, // Incluindo o 'id' do usuário no JWT
//         };
//       }
//       return token;
//     },
//   },
// };
// src/lib/auth.ts
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import prisma from "./prisma"; // Importa o Prisma diretamente do arquivo prisma.ts

// Extensão da tipagem do NextAuth para incluir o campo id na sessão
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", // Usando JWT como estratégia de sessão
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Busca o usuário no banco de dados pelo e-mail
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          return null;
        }

        // Compara a senha fornecida com a armazenada no banco de dados
        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        // Retorna o usuário com o id, email e nome, para o NextAuth
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login", // Página de login personalizada
  },
  callbacks: {
    async session({ session, token }) {
      // Passando o id do token para a sessão
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id, // Garantindo que o id do usuário está presente na sessão
        },
      };
    },
    async jwt({ token, user }) {
      if (user) {
        // Passando o id do usuário para o token JWT
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
  },
};
