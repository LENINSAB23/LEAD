"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  BarChart3,
  Sparkles,
  ClipboardCheck,
  FileSpreadsheet,
  GraduationCap,
  Users2,
  UploadCloud,
  Sliders,
  School as SchoolIcon,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { name: "Inicio", href: "/", icon: LayoutDashboard },
  { name: "Analítica", href: "/analitica", icon: BarChart3 },
  { name: "Asistente IA", href: "/asistente-ia", icon: Sparkles },
  { name: "Planes de mejora", href: "/planes-de-mejora", icon: ClipboardCheck },
  { name: "Reportes", href: "/reportes", icon: FileSpreadsheet },
  { name: "Estudiantes", href: "/estudiantes", icon: GraduationCap },
  { name: "Docentes", href: "/docentes", icon: Users2 },
  { name: "Importar datos", href: "/importar", icon: UploadCloud },
  { name: "Datos y configuración", href: "/configuracion", icon: Sliders },
];

interface SidebarProps {
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isMobile = false, isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  // Content shared between desktop and mobile drawer
  const sidebarContent = (
    <>
      {/* Brand & Subtitle */}
      <div>
        <div className="p-5 lg:p-6 pb-4 flex items-center justify-between">
          <Link
            href="/"
            onClick={handleLinkClick}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 lg:w-11 lg:h-11 shrink-0 rounded-xl overflow-hidden bg-white/10 p-0.5 border border-white/20 shadow-md group-hover:scale-105 transition-transform">
              <Image
                src="/images/lead-logo.png"
                alt="LEAD Logo"
                width={44}
                height={44}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <span className="text-xl lg:text-2xl font-black tracking-wider text-white">
                LEAD
              </span>
              <p className="text-[10px] lg:text-[11px] font-medium leading-tight text-sky-200/80">
                La escuela que aprende de sus datos
              </p>
            </div>
          </Link>

          {/* Mobile Close Button */}
          {isMobile && (
            <button
              onClick={onClose}
              aria-label="Cerrar menú"
              className="w-8 h-8 rounded-lg bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation list */}
        <nav className="px-3 py-2 space-y-1">
          {navigationItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-[#0284c7] text-white shadow-md shadow-sky-900/30 font-semibold translate-x-1"
                    : "text-slate-300 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 shrink-0 transition-colors",
                    isActive ? "text-white" : "text-slate-400 group-hover:text-white"
                  )}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* School Badge Card */}
      <div className="p-4 border-t border-white/10 mt-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 flex items-center gap-3 border border-white/10">
          <div className="w-9 h-9 rounded-lg bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0 border border-sky-400/30">
            <SchoolIcon className="w-5 h-5" />
          </div>
          <div className="overflow-hidden">
            <h4 className="text-xs font-bold text-white truncate">
              Escuela Demo
            </h4>
            <p className="text-[10px] text-sky-200/70 truncate">
              Institución Educativa Nivel Primario
            </p>
          </div>
        </div>
      </div>
    </>
  );

  // If Mobile Drawer
  if (isMobile) {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 lg:hidden animate-fade-in">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        />

        {/* Drawer */}
        <aside className="relative z-50 w-72 max-w-[85vw] h-full bg-[#0b2341] text-white flex flex-col justify-between shadow-2xl overflow-y-auto">
          {sidebarContent}
        </aside>
      </div>
    );
  }

  // Desktop Static / Sticky Sidebar
  return (
    <aside className="hidden lg:flex w-64 bg-[#0b2341] text-white flex-col justify-between shrink-0 sticky top-0 h-screen border-r border-slate-800/60 select-none shadow-xl overflow-y-auto z-20">
      {sidebarContent}
    </aside>
  );
}
