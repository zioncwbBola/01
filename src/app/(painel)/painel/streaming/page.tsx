"use client";

import Layout from "@/components/layout";
import { useState, useEffect } from "react";

// Definição do tipo Playlist
type Playlist = {
  id: string;
  snippet: {
    title: string;
  };
};

export default function CPanel() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/youtube/playlists");
      const data: { items: Playlist[] } = await response.json();
      setPlaylists(data.items || []);
    } catch (error) {
      console.error("Erro ao buscar playlists:", error);
    }
    setLoading(false);
  };

  const createPlaylist = async () => {
    if (!newPlaylistTitle.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("/api/youtube/playlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newPlaylistTitle }),
      });
      if (response.ok) {
        setNewPlaylistTitle("");
        fetchPlaylists();
      }
    } catch (error) {
      console.error("Erro ao criar playlist:", error);
    }
    setLoading(false);
  };

  return (
    <Layout>
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Painel de Controle - YouTube</h1>

      {/* Criar Playlist */}
      <div className="card bg-base-100 shadow-xl p-6 mb-8">
        <h2 className="text-xl font-semibold">Criar Nova Playlist</h2>
        <input
          className="input input-bordered w-full mt-2"
          placeholder="Nome da Playlist"
          value={newPlaylistTitle}
          onChange={(e) => setNewPlaylistTitle(e.target.value)}
        />
        <button
          className="btn btn-primary mt-4"
          onClick={createPlaylist}
          disabled={loading}
        >
          {loading ? "Criando..." : "Criar Playlist"}
        </button>
      </div>

      {/* Listar Playlists */}
      <h2 className="text-xl font-semibold mb-4">Playlists do Canal</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="list-disc pl-5">
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <li key={playlist.id} className="mb-2">
                <a
                  href={`https://www.youtube.com/playlist?list=${playlist.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link link-primary"
                >
                  {playlist.snippet.title}
                </a>
              </li>
            ))
          ) : (
            <p>Nenhuma playlist encontrada.</p>
          )}
        </ul>
      )}
    </div>
    </Layout>
  );
}
