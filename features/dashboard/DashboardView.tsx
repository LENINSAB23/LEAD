"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  GraduationCap,
  Users,
  Layers,
  HeartHandshake,
  TrendingUp,
  TrendingDown,
  BookOpen,
  UserX,
  Laptop,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  KPICardData,
  SparklinePoint,
  GradePerformance,
  HeatmapCell,
  PriorityRecommendation,
} from "@/types";
import { cn } from "@/lib/utils";

interface DashboardViewProps {
  initialData: {
    kpis: KPICardData[];
    sparkline: SparklinePoint[];
    gradePerformances: GradePerformance[];
    heatmap: HeatmapCell[];
    recommendations: PriorityRecommendation[];
    source?: string;
  };
}

const iconMap: Record<string, any> = {
  CalendarCheck,
  GraduationCap,
  Users,
  Layers,
  HeartHandshake,
};

const recIconMap: Record<string, any> = {
  BookOpen,
  UserX,
  Laptop,
};

export function DashboardView({ initialData }: DashboardViewProps) {
  const { kpis, sparkline, gradePerformances, heatmap, recommendations } =
    initialData;

  const subjects = [
    "Matemática",
    "Comunicación",
    "Ciencia y Tec.",
    "Personal Social",
  ];
  const grades = ["1°", "2°", "3°", "4°", "5°", "6°"];

  // Helper for heatmap cell color
  const getHeatmapColor = (subject: string, grade: string) => {
    const item = heatmap.find(
      (h) => h.subject === subject && h.grade === grade
    );
    if (!item) return "bg-sky-100 text-sky-800";
    if (item.level === "Alto") return "bg-sky-500 text-white font-bold";
    if (item.level === "Medio") return "bg-sky-300 text-slate-800";
    return "bg-sky-100 text-slate-700";
  };

  const getHeatmapValue = (subject: string, grade: string) => {
    const item = heatmap.find(
      (h) => h.subject === subject && h.grade === grade
    );
    return item ? `${item.value}%` : "75%";
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900 flex items-center gap-2">
            Hola, Director <span>👋</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Aquí tienes un resumen de lo más importante de tu escuela.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/asistente-ia"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-600 to-indigo-600 text-white rounded-xl text-xs font-semibold shadow-md hover:from-sky-500 hover:to-indigo-500 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Consultar Asistente IA</span>
          </Link>
          <div className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs">
            Periodo escolar 2024
          </div>
        </div>
      </div>

      {/* KPI Cards Row + General Trend */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi) => {
          const Icon = iconMap[kpi.iconName] || GraduationCap;
          const isUp = kpi.trend === "up";

          return (
            <div
              key={kpi.title}
              className="bg-white rounded-2xl p-4 border border-slate-100 shadow-soft flex flex-col justify-between hover:shadow-card transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 truncate">
                  {kpi.title}
                </span>
                <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-black text-slate-900 tracking-tight">
                  {kpi.value}
                </div>
                <div className="flex items-center gap-1 mt-1 text-[11px] font-semibold">
                  {isUp ? (
                    <span className="flex items-center text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                      <TrendingUp className="w-3 h-3 mr-0.5" />
                      {kpi.change}
                    </span>
                  ) : (
                    <span className="flex items-center text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md">
                      <TrendingDown className="w-3 h-3 mr-0.5" />
                      {kpi.change}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Mini Sparkline: Tendencia General */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-soft flex flex-col justify-between hover:shadow-card transition-all col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Tendencia general
            </span>
            <span className="text-[10px] text-slate-400">Últimos 6 meses</span>
          </div>
          <div className="h-14 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparkline}>
                <defs>
                  <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0284c7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#trendGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-[9px] text-slate-400 mt-1">
            {sparkline.map((s) => (
              <span key={s.month}>{s.month}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Desempeño por grado | Mapa de calor | Recomendaciones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 1. Desempeño por grado */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800">
                Desempeño por grado (promedio)
              </h3>
              <span className="text-[11px] text-slate-400">0 - 100</span>
            </div>
            <div className="h-60 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradePerformances} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                  <XAxis dataKey="grade" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} domain={[0, 100]} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: "#f1f5f9" }}
                    contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
                    formatter={(val: number) => [`${val}%`, "Promedio"]}
                  />
                  <Bar
                    dataKey="score"
                    fill="#0284c7"
                    radius={[6, 6, 0, 0]}
                    label={{ position: "top", fill: "#64748b", fontSize: 10, formatter: (v: number) => `${v}%` }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="pt-3 text-[11px] text-slate-400 text-center border-t border-slate-100 mt-2">
            Promedio global institucional: <strong className="text-slate-700">78%</strong>
          </div>
        </div>

        {/* 2. Mapa de calor de aprendizaje */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800">
                Mapa de calor de aprendizaje
              </h3>
              <span className="text-[11px] text-sky-600 font-medium">Primaria</span>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="text-left font-medium text-slate-400 py-1.5 pr-2">Área</th>
                    {grades.map((g) => (
                      <th key={g} className="text-center font-semibold text-slate-600 px-1 py-1.5">
                        {g}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/60">
                  {subjects.map((sub) => (
                    <tr key={sub}>
                      <td className="text-left py-2 font-medium text-slate-600 text-[11px] pr-2 whitespace-nowrap">
                        {sub}
                      </td>
                      {grades.map((g) => (
                        <td key={g} className="p-1 text-center">
                          <div
                            title={`${sub} - ${g}: ${getHeatmapValue(sub, g)}`}
                            className={cn(
                              "w-7 h-7 mx-auto rounded-lg flex items-center justify-center text-[10px] transition-transform hover:scale-110 cursor-pointer shadow-xs",
                              getHeatmapColor(sub, g)
                            )}
                          >
                            {getHeatmapValue(sub, g).replace("%", "")}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Heatmap Legend */}
          <div className="flex items-center justify-center gap-4 pt-3 text-[11px] border-t border-slate-100 text-slate-500 mt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-sky-100 border border-sky-200" />
              Bajo
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-sky-300" />
              Medio
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-sky-500" />
              Alto
            </span>
          </div>
        </div>

        {/* 3. Recomendaciones prioritarias */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-800">
                Recomendaciones prioritarias
              </h3>
              <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full font-bold">
                Acción inmediata
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {recommendations.map((rec) => {
                const Icon = recIconMap[rec.icon] || BookOpen;
                const isHigh = rec.level === "high";
                const isMedium = rec.level === "medium";

                return (
                  <Link
                    key={rec.id}
                    href={rec.actionUrl || "/planes-de-mejora"}
                    className={cn(
                      "p-3 rounded-xl border flex items-start gap-3 transition-all hover:scale-[1.02] block",
                      isHigh
                        ? "bg-rose-50/60 border-rose-200/80 hover:bg-rose-50"
                        : isMedium
                        ? "bg-amber-50/60 border-amber-200/80 hover:bg-amber-50"
                        : "bg-sky-50/60 border-sky-200/80 hover:bg-sky-50"
                    )}
                  >
                    <div
                      className={cn(
                        "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5",
                        isHigh
                          ? "bg-rose-500 text-white"
                          : isMedium
                          ? "bg-amber-500 text-white"
                          : "bg-sky-500 text-white"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex-1">
                      <p
                        className={cn(
                          "text-xs font-bold leading-snug",
                          isHigh
                            ? "text-rose-950"
                            : isMedium
                            ? "text-amber-950"
                            : "text-sky-950"
                        )}
                      >
                        {rec.title}
                      </p>
                      <span className="text-[10px] font-medium text-slate-500 mt-1 block">
                        Área: {rec.area}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-3 text-center">
            <Link
              href="/planes-de-mejora"
              className="text-xs font-bold text-sky-600 hover:text-sky-700 inline-flex items-center gap-1 group"
            >
              <span>Ver todos los planes de mejora</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

