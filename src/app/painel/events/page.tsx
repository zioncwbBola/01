"use client";

import { useState, useEffect } from "react";

interface Event {
  id?: number;
  title: string;
  date: string;
  location: string;
  description: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const fetchEvents = async () => {
    try {
      const response = await fetch("/api/events");
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Erro ao listar eventos:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const createEvent = async () => {
    if (!newEvent.title || !newEvent.date || !newEvent.location || !newEvent.description) {
      console.error("Todos os campos são obrigatórios.");
      return;
    }

    const response = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEvent),
    });

    if (response.ok) {
      setNewEvent({ title: "", date: "", location: "", description: "" });
      fetchEvents();
    } else {
      const { error } = await response.json();
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gerenciamento de Eventos</h1>
      <div className="card bg-base-100 shadow-xl p-6 mb-8">
        <h2 className="text-xl font-semibold">Criar Novo Evento</h2>
        <input
          className="input input-bordered w-full mt-2"
          placeholder="Título do Evento"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <input
          className="input input-bordered w-full mt-2"
          type="datetime-local"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <input
          className="input input-bordered w-full mt-2"
          placeholder="Localização"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
        />
        <textarea
          className="textarea textarea-bordered w-full mt-2"
          placeholder="Descrição"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <button className="btn btn-primary mt-4" onClick={createEvent}>Criar Evento</button>
      </div>
      <h2 className="text-xl font-semibold mb-4">Lista de Eventos</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="card bg-base-100 shadow-md p-4">
            <h3 className="font-bold">{event.title}</h3>
            <p><strong>Data:</strong> {new Date(event.date).toLocaleString()}</p>
            <p><strong>Local:</strong> {event.location}</p>
            <p><strong>Descrição:</strong> {event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
