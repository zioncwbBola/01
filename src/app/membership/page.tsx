'use client';
import { useState } from 'react';

export default function MembershipForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    requestType: 'DISCIPLESHIP',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/membership', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    alert('Solicitação enviada com sucesso!');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Solicitação de Membresia</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Nome Completo"
          className="input input-bordered w-full"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Telefone de Contato"
          className="input input-bordered w-full"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <select
          name="requestType"
          className="select select-bordered w-full"
          value={formData.requestType}
          onChange={handleChange}
        >
          <option value="DISCIPLESHIP">Discipulado</option>
          <option value="INTEGRATION">Integração</option>
        </select>
        <button type="submit" className="btn btn-primary w-full">Enviar Solicitação</button>
      </form>
    </div>
  );
}