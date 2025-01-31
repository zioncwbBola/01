import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="drawer drawer-open w-64 bg-base-300 h-full p-4">
      <ul className="menu">
        <li><Link href={"/painel"} className="btn btn-ghost">Dashboard</Link></li>
        <li><Link href={"/painel/events"} className="btn btn-ghost">Programação e Eventos</Link></li>
        <li><Link href={"/painel/membership"} className="btn btn-ghost">Discipulado e Integração</Link></li>
        <li><Link href={"/painel/services"} className="btn btn-ghost">Pedidos de Oração</Link></li>
        <li><Link href={"/painel/streaming"} className="btn btn-ghost">Culto ao vivo</Link></li>
        <li><Link href={"/painel/contacts"} className="btn btn-ghost">Solicitações de Contato</Link></li>
        <li><Link href={"/painel/blog"} className="btn btn-ghost">Blog e Conteudos</Link></li>
        <li><Link href={"/painel/config"} className="btn btn-ghost">Configurações</Link></li>
      </ul>
    </div>
  );
}