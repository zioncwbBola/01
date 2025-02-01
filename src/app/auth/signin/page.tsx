// //src/app/auth/signin/page.tsx
// "use client";

// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// const SignInPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const res = await signIn("credentials", { email, password, redirect: false });
//     if (res?.error) {
//       alert("Erro ao autenticar: " + res.error);
//     } else {
//       router.push("/painel");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen p-6">
//       <div className="card w-96 bg-base-100 shadow-xl p-6">
//         <h1 className="text-xl font-bold mb-4">Login</h1>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label htmlFor="email" className="label">Email</label>
//             <input
//               type="email"
//               id="email"
//               className="input input-bordered w-full"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="password" className="label">Senha</label>
//             <input
//               type="password"
//               id="password"
//               className="input input-bordered w-full"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button type="submit" className="btn btn-primary w-full">Entrar</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignInPage;
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Credenciais inválidas");
    } else {
      router.push("/painel");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 bg-white shadow-md rounded-md w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input input-bordered w-full"
          />
          <button type="submit" className="btn btn-primary w-full">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
