/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';

export default function PrayerAndSupport() {
  const [requests, setRequests] = useState([]);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const data = Object.fromEntries(formData.entries());

  //   await fetch('/api/community-support', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json', // ✅ Garantir o envio como JSON
  //     },
  //     body: JSON.stringify(data), // ✅ Converter para JSON
  //   });

  //   e.currentTarget.reset();
  //   fetchRequests(); // Atualiza a lista de pedidos públicos após o envio
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
  
    await fetch('/api/community-support', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (e.currentTarget) {
      e.currentTarget.reset(); // ✅ Verificação de segurança
    }
  
    fetchRequests(); // Atualiza a lista de pedidos públicos após o envio
  };
  const fetchRequests = async () => {
    const res = await fetch('/api/community-support');
    const data = await res.json();
    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Envie seu Pedido de Oração ou Apoio</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="name" placeholder="Nome (opcional)" className="input input-bordered w-full" />
        <input type="email" name="email" placeholder="Email" className="input input-bordered w-full" />
        <input type="tel" name="phone" placeholder="Telefone" className="input input-bordered w-full" />
        
        <select name="category" className="select select-bordered w-full" required>
          <option value="">Selecione uma categoria</option>
          <option value="ajuda">Ajuda Comunitária</option>
          <option value="apoio">Apoio da Igreja</option>
          <option value="oração">Pedido de Oração</option>
          <option value="agradecimento">Agradecimento</option>
        </select>

        <textarea name="message" placeholder="Digite seu pedido ou mensagem" className="textarea textarea-bordered w-full" required></textarea>

        <label className="flex items-center space-x-2">
          <input type="checkbox" name="isPublic" className="checkbox" />
          <span>Desejo que meu pedido seja público</span>
        </label>

        <button type="submit" className="btn btn-primary w-full">Enviar Pedido</button>
      </form>

      <h2 className="text-xl font-bold mt-8 mb-4">Pedidos Públicos</h2>
      <div className="grid gap-4">
        {requests.map((req: any) => (
          <div key={req.id} className="card bg-base-100 shadow-md p-4 border">
            <h3 className="font-semibold">{req.name || 'Anônimo'}</h3>
            <p className="text-sm">{req.category}</p>
            <p>{req.message}</p>
            <p className="text-xs text-gray-500">Enviado em: {new Date(req.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
