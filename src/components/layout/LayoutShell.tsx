"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";

interface LayoutShellProps {
  children: React.ReactNode;
}

export function LayoutShell({ children }: LayoutShellProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={isOpen} onToggle={() => setIsOpen((o) => !o)} />
      <main
        className={`min-h-screen pt-14 md:pt-4 md:py-4 md:px-6 transition-[margin-left] duration-300 ease-in-out ${
          isOpen
            ? "md:ml-(--sidebar-offset-md) xl:ml-(--sidebar-offset)"
            : "md:ml-0"
        }`}
      >
        <div className="paper-lines bg-cream md:rounded-2xl md:max-w-[1140px] mx-auto overflow-hidden shadow-[0_8px_60px_rgba(0,0,0,0.4)] min-h-[calc(100vh-32px)]">
          {children}
        </div>
      </main>
    </>
  );
}