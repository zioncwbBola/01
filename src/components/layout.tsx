"use client";

import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";
import "@/app/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}