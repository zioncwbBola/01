import { NextResponse } from "next/server";

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

// Listar playlists do canal
export async function GET() {
  try {
    const response = await fetch(
      `${BASE_URL}/playlists?part=snippet&channelId=${CHANNEL_ID}&maxResults=10&key=${YOUTUBE_API_KEY}`
    );
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error.message }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao listar playlists:", error);
    return NextResponse.json({ error: "Erro ao listar playlists." }, { status: 500 });
  }
}

// Criar uma nova playlist (requer OAuth 2.0)
export async function POST(req: Request) {
  try {
    const { title } = await req.json();
    if (!title) {
      return NextResponse.json({ error: "Título é obrigatório." }, { status: 400 });
    }

    // Aqui, precisaria de um token OAuth 2.0 para criar a playlist
    return NextResponse.json({ message: "Criação de playlist via OAuth ainda não implementada." });
  } catch (error) {
    console.error("Erro ao criar playlist:", error);
    return NextResponse.json({ error: "Erro ao criar playlist." }, { status: 500 });
  }
}
