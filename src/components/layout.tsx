"use client";

import "@/app/globals.css";
import NavbarDashboard from "@/components/ui/Navbar/NavbarHomeDashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      {/* <SidebarIcons /> */}
      <div className="flex flex-col flex-1">
        <NavbarDashboard />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}