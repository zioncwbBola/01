"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    if (!res.ok) {
      alert("Erro ao cadastrar usuário");
      return;
    }
    
    router.push("/signin");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="card w-96 bg-base-100 shadow-xl p-6">
        <h1 className="text-xl font-bold mb-4">Cadastro</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="label">Nome</label>
            <input
              type="text"
              id="name"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input
              type="email"
              id="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="label">Senha</label>
            <input
              type="password"
              id="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
