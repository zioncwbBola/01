export default function Navbar() {
  return (
    <div className="navbar bg-base-200 shadow-md">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Dashboard</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-primary">Logout</button>
      </div>
    </div>
  );
}