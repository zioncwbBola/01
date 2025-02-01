/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/painel/apoio/page.tsx

'use client';

import { useState, useEffect } from 'react';
import Layout from '@/components/layout';
export default function SupportPanelPage() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('/api/community-support')
      .then((res) => res.json())
      .then((data) => setRequests(data));
  }, []);

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Painel de Apoio</h1>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Data do Pedido</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Exibição</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request: any) => (
              <tr key={request.id}>
                <td>{new Date(request.createdAt).toLocaleDateString()}</td>
                <td>{request.isPublic ? request.name : 'Anônimo'}</td>
                <td>{request.category}</td>
                <td>{request.isPublic ? 'Público' : 'Privado'}</td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
