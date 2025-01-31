// "use client";

// import { useState, useEffect } from "react";

// interface Event {
//   id?: number;
//   title: string;
//   date: string;
//   location: string;
//   description: string;
// }

// export default function EventsPage() {
//   const [events, setEvents] = useState<Event[]>([]);
//   const [newEvent, setNewEvent] = useState<Event>({
//     title: "",
//     date: "",
//     location: "",
//     description: "",
//   });

//   const fetchEvents = async () => {
//     try {
//       const response = await fetch("/api/events");
//       const data = await response.json();
//       setEvents(data);
//     } catch (error) {
//       console.error("Erro ao listar eventos:", error);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const createEvent = async () => {
//     if (!newEvent.title || !newEvent.date || !newEvent.location || !newEvent.description) {
//       console.error("Todos os campos são obrigatórios.");
//       return;
//     }

//     const response = await fetch("/api/events", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(newEvent),
//     });

//     if (response.ok) {
//       setNewEvent({ title: "", date: "", location: "", description: "" });
//       fetchEvents();
//     } else {
//       const { error } = await response.json();
//       console.error(error);
//     }
//   };

//   return (
//     <div className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Gerenciamento de Eventos</h1>
//       <div className="card bg-base-100 shadow-xl p-6 mb-8">
//         <h2 className="text-xl font-semibold">Criar Novo Evento</h2>
//         <input
//           className="input input-bordered w-full mt-2"
//           placeholder="Título do Evento"
//           value={newEvent.title}
//           onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//         />
//         <input
//           className="input input-bordered w-full mt-2"
//           type="datetime-local"
//           value={newEvent.date}
//           onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
//         />
//         <input
//           className="input input-bordered w-full mt-2"
//           placeholder="Localização"
//           value={newEvent.location}
//           onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
//         />
//         <textarea
//           className="textarea textarea-bordered w-full mt-2"
//           placeholder="Descrição"
//           value={newEvent.description}
//           onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
//         />
//         <button className="btn btn-primary mt-4" onClick={createEvent}>Criar Evento</button>
//       </div>
//       <h2 className="text-xl font-semibold mb-4">Lista de Eventos</h2>
//       <div className="space-y-4">
//         {events.map((event) => (
//           <div key={event.id} className="card bg-base-100 shadow-md p-4">
//             <h3 className="font-bold">{event.title}</h3>
//             <p><strong>Data:</strong> {new Date(event.date).toLocaleString()}</p>
//             <p><strong>Local:</strong> {event.location}</p>
//             <p><strong>Descrição:</strong> {event.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
"use client";
import Layout from "@/components/layout";
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
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

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

  const deleteEvent = async (id: number) => {
    const response = await fetch(`/api/events/${id}`, { method: "DELETE" });
    if (response.ok) fetchEvents();
  };

  const editEvent = (event: Event) => {
    setEditingEvent(event);
  };

  const updateEvent = async () => {
    if (!editingEvent) return;
    const response = await fetch(`/api/events/${editingEvent.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingEvent),
    });

    if (response.ok) {
      setEditingEvent(null);
      fetchEvents();
    }
  };

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Gerenciamento de Eventos</h1>
        <div className="card bg-base-100 shadow-xl p-6 mb-8">
          <h2 className="text-xl font-semibold">{editingEvent ? "Editar Evento" : "Criar Novo Evento"}</h2>
          <input
            className="input input-bordered w-full mt-2"
            placeholder="Título do Evento"
            value={editingEvent ? editingEvent.title : newEvent.title}
            onChange={(e) =>
              editingEvent
                ? setEditingEvent({ ...editingEvent, title: e.target.value })
                : setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <input
            className="input input-bordered w-full mt-2"
            type="datetime-local"
            value={editingEvent ? editingEvent.date : newEvent.date}
            onChange={(e) =>
              editingEvent
                ? setEditingEvent({ ...editingEvent, date: e.target.value })
                : setNewEvent({ ...newEvent, date: e.target.value })
            }
          />
          <input
            className="input input-bordered w-full mt-2"
            placeholder="Localização"
            value={editingEvent ? editingEvent.location : newEvent.location}
            onChange={(e) =>
              editingEvent
                ? setEditingEvent({ ...editingEvent, location: e.target.value })
                : setNewEvent({ ...newEvent, location: e.target.value })
            }
          />
          <textarea
            className="textarea textarea-bordered w-full mt-2"
            placeholder="Descrição"
            value={editingEvent ? editingEvent.description : newEvent.description}
            onChange={(e) =>
              editingEvent
                ? setEditingEvent({ ...editingEvent, description: e.target.value })
                : setNewEvent({ ...newEvent, description: e.target.value })
            }
          />
          {editingEvent ? (
            <button className="btn btn-warning mt-4" onClick={updateEvent}>
              Atualizar Evento
            </button>
          ) : (
            <button className="btn btn-primary mt-4" onClick={createEvent}>
              Criar Evento
            </button>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4">Lista de Eventos</h2>
        <table className="table w-full">
          <thead>
            <tr>
              <th>Título</th>
              <th>Data</th>
              <th>Localização</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <td>{event.title}</td>
                <td>{new Date(event.date).toLocaleString()}</td>
                <td>{event.location}</td>
                <td>
                  <button className="btn btn-warning btn-xs mr-2" onClick={() => editEvent(event)}>
                    Editar
                  </button>
                  <button className="btn btn-error btn-xs" onClick={() => deleteEvent(event.id!)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
