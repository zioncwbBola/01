// // src\app\painel\page.tsx
// import Layout from "@/components/layout";

// export default function Painel() {
//   return (
//     <Layout>
//       <h1 className="text-2xl font-bold">Dashboard</h1>
//       <p>Bem-vindo ao painel de controle!</p>
//     </Layout>
//   );
// }

"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Painel() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p>Carregando...</p>;
  }

  if (status === "authenticated") {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Painel de Controle</h1>
        <p>Bem-vindo, {session.user?.name}!</p>
        <button onClick={() => signOut()} className="btn btn-error mt-4">
          Sair
        </button>
      </div>
    );
  }

  return null;
}
