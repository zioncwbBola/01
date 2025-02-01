// src/components/ToggleTheme.tsx
"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const ToggleTheme = () => {
  const [theme, setTheme] = useState<string>("corporate");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "corporate" ? "black" : "corporate"));
  };

  return (
    <button className="btn btn-ghost text-primary" onClick={toggleTheme}>
      {theme === "corporate" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ToggleTheme;
