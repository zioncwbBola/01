/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/painel/membership/page.tsx
'use client';
import { useEffect, useState } from 'react';

export default function MembershipPanel() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const res = await fetch('/api/membership');
      const data = await res.json();
      setRequests(data);
    };
    fetchRequests();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Solicitações de Membresia</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Data de Cadastro</th>
              <th>Nome Completo</th>
              <th>Tipo do Pedido</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req: any) => (
              <tr key={req.id}>
                <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                <td>{req.fullName}</td>
                <td>{req.requestType === 'DISCIPLESHIP' ? 'Discipulado' : 'Integração'}</td>
                <td>{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
