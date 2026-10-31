"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Sparkles,
  ClipboardCheck,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  onOpenMenu: () => void;
}

const bottomTabs = [
  { name: "Inicio", href: "/", icon: LayoutDashboard },
  { name: "Analítica", href: "/analitica", icon: BarChart3 },
  { name: "Asistente IA", href: "/asistente-ia", icon: Sparkles },
  { name: "Planes", href: "/planes-de-mejora", icon: ClipboardCheck },
];

export function MobileNav({ onOpenMenu }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1.5 shadow-lg safe-bottom">
      <div className="flex items-center justify-around">
        {bottomTabs.map((tab) => {
          const isActive =
            tab.href === "/"
              ? pathname === "/"
              : pathname.startsWith(tab.href);
          const Icon = tab.icon;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={cn(
                "flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 min-w-[56px]",
                isActive
                  ? "text-[#0284c7] font-bold"
                  : "text-slate-500 hover:text-slate-800"
              )}
            >
              <div
                className={cn(
                  "p-1 rounded-lg transition-colors",
                  isActive ? "bg-sky-50 text-[#0284c7]" : ""
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">
                {tab.name}
              </span>
            </Link>
          );
        })}

        {/* More / Menu Drawer Button */}
        <button
          onClick={onOpenMenu}
          aria-label="Abrir menú"
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-500 hover:text-slate-800 transition-all min-w-[56px]"
        >
          <div className="p-1 rounded-lg">
            <Menu className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-medium">
            Más
          </span>
        </button>
      </div>
    </nav>
  );
}
