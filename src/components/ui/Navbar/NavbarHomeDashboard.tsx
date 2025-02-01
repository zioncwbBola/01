// src/components/Navbar.tsx
"use client";
// import Sidebar from "@/components/ui/Sidebar/SidebarIcons";
import ToggleTheme from "@/components/ActionUI/ToggleTheme";
import SidebarIcons from "@/components/ui/Sidebar/SidebarIcons";

const NavbarDashboard = () => {
  return (

    <nav className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <SidebarIcons />
        <h1 className="text-xl font-bold text-primary ml-4">Minha Aplicação</h1>
      </div>
      <div className="flex-none">
        <ToggleTheme />
      </div>
      <div className="flex-none">
        <button className="btn btn-primary">Logout</button>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
