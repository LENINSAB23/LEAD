"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Bell, ChevronDown, Calendar, ShieldCheck } from "lucide-react";

export function Header() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/estudiantes?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="relative w-full max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar estudiantes, reportes, recomendaciones..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
        />
      </form>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Academic Period Pill */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/90 border border-slate-200 text-xs font-semibold text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-sky-600" />
          <span>Periodo escolar 2024</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notificaciones"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50 text-xs space-y-3">
              <div className="flex items-center justify-between font-bold text-slate-800 pb-2 border-b border-slate-100">
                <span>Notificaciones de Alerta</span>
                <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">3 Nuevas</span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
                  <p className="font-semibold text-amber-900">Alerta de Asistencia</p>
                  <p className="text-amber-700 text-[11px] mt-0.5">5° grado presenta un descenso del 92% al 85%.</p>
                </div>
                <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-200/60">
                  <p className="font-semibold text-rose-900">Comprensión Lectora</p>
                  <p className="text-rose-700 text-[11px] mt-0.5">3° grado requiere refuerzo formativo prioritario.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-9 h-9 rounded-full bg-sky-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
            D
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-slate-800">Director</span>
            <span className="text-[10px] text-slate-400">LEAD Admin</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
}

