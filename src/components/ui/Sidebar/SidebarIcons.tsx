// src/components/Sidebar.tsx
"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Home, Settings, LogOut } from "lucide-react";
import Link from "next/link";

const SidebarIcons = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão para abrir o menu */}
      <button
        className="btn btn-square btn-ghost text-primary"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Offcanvas Sidebar */}
      {isOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          className="fixed top-0 left-0 w-64 h-full bg-base-200 shadow-lg p-4 z-50"
        >
          <button
            className="btn btn-square btn-ghost absolute top-2 right-2 text-primary"
            onClick={() => setIsOpen(false)}
          >
            <X size={24} />
          </button>

          <nav className="mt-8 flex flex-col space-y-4">
            <Link href="/" className="btn btn-ghost justify-start text-primary">
              <Home size={20} className="mr-2" /> Home
            </Link>
            <Link href="/dashboard" className="btn btn-ghost justify-start text-primary">
              <Settings size={20} className="mr-2" /> Dashboard
            </Link>
            <button className="btn btn-ghost justify-start text-error">
              <LogOut size={20} className="mr-2" /> Sair
            </button>
          </nav>
        </motion.div>
      )}
    </>
  );
};

export default SidebarIcons;
