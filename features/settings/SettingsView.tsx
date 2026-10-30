"use client";

import { useState } from "react";
import {
  School,
  Database,
  ShieldCheck,
  Cpu,
  Save,
  CheckCircle2,
  Server,
} from "lucide-react";

export function SettingsView() {
  const [schoolName, setSchoolName] = useState("Escuela Demo");
  const [period, setPeriod] = useState("Periodo escolar 2024");
  const [modularCode, setModularCode] = useState("0482910");
  const [level, setLevel] = useState("Institución Educativa Nivel Primario");
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">
          Datos y Configuración Institucional
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Administración de la escuela, roles de acceso y conectividad con la base de datos PostgreSQL.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* School Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-soft">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Información de la Institución
              </h3>
              <p className="text-[11px] text-slate-400">
                Parámetros generales de la escuela
              </p>
            </div>
          </div>

          <form onSubmit={handleSave} className="mt-5 space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nombre de la Escuela
              </label>
              <input
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Código Modular
                </label>
                <input
                  type="text"
                  value={modularCode}
                  onChange={(e) => setModularCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Periodo Lectivo Activo
                </label>
                <input
                  type="text"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Nivel Educativo
              </label>
              <input
                type="text"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              {saved && (
                <span className="text-emerald-600 font-bold flex items-center gap-1.5 text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  ¡Configuración guardada correctamente!
                </span>
              )}
              <button
                type="submit"
                className="ml-auto px-5 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl font-bold shadow-md shadow-sky-600/20 flex items-center gap-2 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            </div>
          </form>
        </div>

        {/* System & Architecture Status Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft space-y-4">
            <h3 className="text-sm font-bold text-slate-800">
              Estado del Sistema Full Stack
            </h3>

            {/* PostgreSQL & Prisma */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    PostgreSQL & Prisma ORM
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Esquema relacional y migraciones
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                Listo
              </span>
            </div>

            {/* TypeScript Backend */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center">
                  <Server className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    TypeScript Server Actions
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Backend 100% TypeScript (Sin Python/PHP)
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                Activo
              </span>
            </div>

            {/* AI Assistant Grounding */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    Motor IA Educativo
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    Gemini API / Motor Heurístico PostgreSQL
                  </p>
                </div>
              </div>
              <span className="text-[10px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full font-bold">
                Conectado
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

