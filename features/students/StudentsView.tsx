"use client";

import { useState } from "react";
import {
  GraduationCap,
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
  UserCheck,
  TrendingUp,
} from "lucide-react";
import { StudentListItem, RiskLevel } from "@/types";
import { cn } from "@/lib/utils";

interface StudentsViewProps {
  initialStudents: StudentListItem[];
}

export function StudentsView({ initialStudents }: StudentsViewProps) {
  const [students, setStudents] = useState<StudentListItem[]>(initialStudents);
  const [search, setSearch] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("Todos");
  const [selectedRisk, setSelectedRisk] = useState<string>("TODOS");

  const filtered = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = selectedGrade === "Todos" || s.grade === selectedGrade;
    const matchesRisk = selectedRisk === "TODOS" || s.riskLevel === selectedRisk;
    return matchesSearch && matchesGrade && matchesRisk;
  });

  const highRiskCount = students.filter((s) => s.riskLevel === "ALTO").length;
  const avgAttendance = Math.round(
    students.reduce((acc, s) => acc + s.attendanceRate, 0) / (students.length || 1)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">
            Gestión de Estudiantes
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Supervisa la asistencia, logros de aprendizaje y alertas de riesgo académico.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700">
            {highRiskCount} Estudiantes en Alerta
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800">
            Asistencia Media: {avgAttendance}%
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o código..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Grado:</span>
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none"
          >
            <option value="Todos">Todos</option>
            <option value="1°">1° Grado</option>
            <option value="2°">2° Grado</option>
            <option value="3°">3° Grado</option>
            <option value="4°">4° Grado</option>
            <option value="5°">5° Grado</option>
            <option value="6°">6° Grado</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Riesgo:</span>
          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none"
          >
            <option value="TODOS">Todos</option>
            <option value="ALTO">Alto</option>
            <option value="MEDIO">Medio</option>
            <option value="BAJO">Bajo</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Estudiante</th>
                <th className="py-3 px-4">Grado y Sección</th>
                <th className="py-3 px-4">Asistencia</th>
                <th className="py-3 px-4">Promedio Académico</th>
                <th className="py-3 px-4">Nivel de Riesgo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((s) => {
                const isHigh = s.riskLevel === "ALTO";
                const isMed = s.riskLevel === "MEDIO";

                return (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-slate-500">
                      {s.code}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">{s.name}</td>
                    <td className="py-3 px-4 text-slate-600 font-semibold">
                      {s.grade} - {s.section}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-700">
                      {s.attendanceRate}%
                    </td>
                    <td className="py-3 px-4 font-bold text-sky-800">
                      {s.averageScore} / 20
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={cn(
                          "px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1",
                          isHigh
                            ? "bg-rose-100 text-rose-700"
                            : isMed
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        )}
                      >
                        {isHigh ? (
                          <AlertCircle className="w-3 h-3" />
                        ) : (
                          <CheckCircle className="w-3 h-3" />
                        )}
                        <span>{s.riskLevel}</span>
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

