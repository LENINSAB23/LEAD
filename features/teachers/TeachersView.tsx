"use client";

import { useState } from "react";
import { Users2, Award, BookOpen, Clock, Search } from "lucide-react";
import { TeacherListItem } from "@/types";

interface TeachersViewProps {
  initialTeachers: TeacherListItem[];
}

export function TeachersView({ initialTeachers }: TeachersViewProps) {
  const [teachers, setTeachers] = useState<TeacherListItem[]>(initialTeachers);
  const [search, setSearch] = useState("");

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">
            Gestión y Formación Docente
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Seguimiento de especialidades curriculares, horas de capacitación y puntaje formativo.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-700">
            Formación Global: 85%
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft max-w-md">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar docente o especialidad..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none"
          />
        </div>
      </div>

      {/* Teachers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-soft hover:shadow-card transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-sm shadow-xs">
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
                  {t.status}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 mt-3 text-sm">{t.name}</h3>
              <p className="text-xs text-slate-500">{t.email}</p>
              <div className="mt-2 text-xs font-medium text-sky-800 bg-sky-50 px-2.5 py-1 rounded-lg inline-block">
                {t.specialty}
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-600">
                <Award className="w-4 h-4 text-amber-500" />
                <span>
                  Desempeño: <strong>{t.trainingScore}%</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-600">
                <Clock className="w-4 h-4 text-indigo-500" />
                <span>
                  Horas: <strong>{t.hoursCompleted}h</strong>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

