"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import LogoSite from "./base/logo/logo-site";
import { routes } from "@/lib/routes";

export default function DesktopSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hovering, setHovering] = useState(false);

  const width = isCollapsed ? "w-16" : "w-[280px]";

  return (
    <aside
      className={`
        relative flex h-screen flex-col bg-gray p-4 dark:bg-zinc-900
        transition-all duration-300 ease-in-out ${width}
      `}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >

      <button
        aria-label="Toggle sidebar"
        onClick={() => setIsCollapsed(v => !v)}
        className={`
          absolute -right-3 top-4 z-10 rounded-full border p-1 shadow-sm
          bg-gray-200 hover:bg-gray-300 dark:bg-zinc-700 dark:hover:bg-zinc-600
          transition-opacity ${hovering ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>


      {!isCollapsed && (
        <div className="mb-8 flex items-center gap-4 pl-2 text-2xl font-extrabold">
          <LogoSite size="large" />
          <span>
            <span className="bg-gradient-to-r from-sky-500 to-sky-600 bg-clip-text text-transparent">
              Flow
            </span>
            <span className="text-stone-700 dark:text-stone-300">Scrape</span>
          </span>
        </div>
      )}

      <nav className="space-y-1">
        {routes.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`
              flex items-center rounded-md font-medium text-stone-700
              dark:text-stone-300
              ${isCollapsed
                ? "mx-auto my-1 h-12 w-12"
                : "gap-3 px-3 py-2 hover:bg-gray-300"}
            `}
          >
            <Icon className={isCollapsed ? "h-5 w-5" : "h-5 w-5"} />
            {!isCollapsed && <span>{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
