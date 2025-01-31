export default function Sidebar() {
  return (
    <div className="drawer drawer-open w-64 bg-base-300 h-full p-4">
      <ul className="menu">
        <li><a className="btn btn-ghost">Home</a></li>
        <li><a className="btn btn-ghost">Eventos</a></li>
        <li><a className="btn btn-ghost">Configurações</a></li>
      </ul>
    </div>
  );
}