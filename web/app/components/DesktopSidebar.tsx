"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function DesktopSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className={`
        transition-all duration-300 ease-in-out
        ${isCollapsed ? "w-[60px]" : "w-[280px]"}
        bg-white dark:bg-zinc-900 border-r shadow-md p-4
        flex flex-col h-screen relative
      `}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Toggle button - only visible on hover */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`
          absolute -right-3 top-4 z-10 bg-gray-200 dark:bg-zinc-700 hover:bg-gray-300 dark:hover:bg-zinc-600 
          border rounded-full p-1 shadow-sm transition-opacity duration-200
          ${hovering ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>

      {/* Sidebar Content */}
      <div className="flex flex-col gap-6 mt-10">
        {!isCollapsed && (
          <>
            <div className="text-xl font-semibold text-gray-700 dark:text-gray-200">导航</div>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="hover:text-blue-600 cursor-pointer transition">📄 我的文件</li>
              <li className="hover:text-blue-600 cursor-pointer transition">🤝 协作</li>
              <li className="hover:text-blue-600 cursor-pointer transition">⭐ 我的收藏</li>
              <li className="hover:text-blue-600 cursor-pointer transition">🔥 模板社区</li>
              <li className="hover:text-blue-600 cursor-pointer transition">🗑 回收站</li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default DesktopSidebar;
