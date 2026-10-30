"use client";

import { useState } from "react";
import {
  Download,
  Filter,
  BarChart2,
  Calendar,
  Layers,
  Users,
  Check,
  FileSpreadsheet,
  FileText,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  AreaBenchmark,
  LearningEvolutionPoint,
  GradePerformance,
  ResourceUsageItem,
  CommunityPoint,
} from "@/types";
import { cn } from "@/lib/utils";

interface AnalyticsViewProps {
  initialData: {
    areaBenchmarks: AreaBenchmark[];
    learningEvolution: LearningEvolutionPoint[];
    attendanceByGrade: GradePerformance[];
    resourceUsage: ResourceUsageItem[];
    communityParticipation: CommunityPoint[];
  };
}

const tabs = [
  "Aprendizaje",
  "Asistencia",
  "Formación docente",
  "Uso de recursos",
  "Participación",
];

export function AnalyticsView({ initialData }: AnalyticsViewProps) {
  const [activeTab, setActiveTab] = useState("Aprendizaje");
  const [period, setPeriod] = useState("2024");
  const [grade, setGrade] = useState("Todos");
  const [section, setSection] = useState("Todas");
  const [area, setArea] = useState("Todas");
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const {
    areaBenchmarks,
    learningEvolution,
    attendanceByGrade,
    resourceUsage,
    communityParticipation,
  } = initialData;

  const handleExport = (type: "excel" | "pdf") => {
    setIsExporting(true);
    setShowExportMenu(false);
    window.location.href = `/api/reports/export?type=${type}`;
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">
            Analítica y reportes
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Explora los datos de tu escuela y descubre información clave.
          </p>
        </div>

        {/* Export Button Menu */}
        <div className="relative">
          <button
            onClick={() => setShowExportMenu(!showExportMenu)}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold shadow-md shadow-sky-600/20 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? "Generando..." : "Exportar reporte"}</span>
          </button>

          {showExportMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40 text-xs">
              <button
                onClick={() => handleExport("excel")}
                className="w-full px-4 py-2 text-left flex items-center gap-2.5 hover:bg-slate-50 text-slate-700 font-medium"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Descargar Excel (.xlsx)</span>
              </button>
              <button
                onClick={() => handleExport("pdf")}
                className="w-full px-4 py-2 text-left flex items-center gap-2.5 hover:bg-slate-50 text-slate-700 font-medium border-t border-slate-100"
              >
                <FileText className="w-4 h-4 text-rose-600" />
                <span>Descargar PDF (.pdf)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft flex flex-wrap items-center gap-3">
        {/* Periodo */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Periodo:</span>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>

        {/* Grado */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Grado:</span>
          <select
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
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

        {/* Sección */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Sección:</span>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="Todas">Todas</option>
            <option value="A">Sección A</option>
            <option value="B">Sección B</option>
          </select>
        </div>

        {/* Área */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500">Área:</span>
          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="text-xs font-medium bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="Todas">Todas</option>
            <option value="Matemática">Matemática</option>
            <option value="Comunicación">Comunicación</option>
            <option value="Ciencia y Tec.">Ciencia y Tec.</option>
            <option value="Personal Social">Personal Social</option>
          </select>
        </div>

        <button className="ml-auto px-4 py-1.5 bg-[#0284c7] hover:bg-sky-600 text-white text-xs font-bold rounded-lg shadow-sm transition-colors">
          Aplicar
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap",
                isActive
                  ? "bg-sky-100/90 text-sky-800 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Row 1 Charts: Desempeño por área & Evolución del aprendizaje */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Desempeño por área */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-100 shadow-soft">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Desempeño por área
              </h3>
              <p className="text-[11px] text-slate-400">
                Comparativa vs promedio nacional
              </p>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
                Promedio de la escuela
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#7dd3fc]" />
                Promedio nacional
              </span>
            </div>
          </div>

          <div className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={areaBenchmarks}
                margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis dataKey="area" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
                  formatter={(v: number) => [`${v}%`]}
                />
                <Bar dataKey="escuela" fill="#0284c7" radius={[5, 5, 0, 0]} name="Escuela" />
                <Bar dataKey="nacional" fill="#7dd3fc" radius={[5, 5, 0, 0]} name="Nacional" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Evolución del aprendizaje */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-100 shadow-soft">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Evolución del aprendizaje
              </h3>
              <p className="text-[11px] text-slate-400">Últimos 6 meses</p>
            </div>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
                Matemática
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
                Comunicación
              </span>
            </div>
          </div>

          <div className="h-64 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={learningEvolution}
                margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
              >
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
                  formatter={(v: number) => [`${v}%`]}
                />
                <Line
                  type="monotone"
                  dataKey="matematica"
                  stroke="#0284c7"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#0284c7" }}
                />
                <Line
                  type="monotone"
                  dataKey="comunicacion"
                  stroke="#38bdf8"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#38bdf8" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2 Charts: Asistencia por grado | Uso de recursos | Participación de la comunidad */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Asistencia por grado (Horizontal Bars) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-soft">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">
              Asistencia por grado
            </h3>
            <span className="text-[11px] text-slate-400">Promedio anual</span>
          </div>

          <div className="mt-4 space-y-3">
            {attendanceByGrade.map((g) => (
              <div key={g.grade} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>{g.grade} grado</span>
                  <span className="font-bold text-sky-700">{g.attendance}%</span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      g.attendance >= 92 ? "bg-[#0284c7]" : "bg-sky-400"
                    )}
                    style={{ width: `${g.attendance}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uso de recursos educativos (Donut Chart) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-soft">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">
              Uso de recursos educativos
            </h3>
            <span className="text-[10px] text-slate-400">Últimos 6 meses</span>
          </div>

          <div className="flex items-center justify-center relative h-48 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={resourceUsage}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="percentage"
                >
                  {resourceUsage.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number) => [`${val}%`, "Uso"]}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-2xl font-black text-slate-800">100%</span>
              <span className="text-[10px] text-slate-400 font-semibold">Total</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 text-[11px]">
            {resourceUsage.map((r) => (
              <div key={r.name} className="flex items-center justify-between text-slate-600">
                <span className="flex items-center gap-1.5 truncate">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: r.color }} />
                  <span className="truncate">{r.name}</span>
                </span>
                <span className="font-bold text-slate-800 ml-1">{r.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Participación de la comunidad (Area Chart) */}
        <div className="lg:col-span-4 bg-white rounded-2xl p-5 border border-slate-100 shadow-soft">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">
              Participación de la comunidad
            </h3>
            <span className="text-[11px] text-emerald-600 font-semibold">+5% anual</span>
          </div>

          <div className="h-48 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={communityParticipation}
                margin={{ top: 15, right: 10, left: -25, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="commGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis domain={[50, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
                  formatter={(v: number) => [`${v}%`, "Participación"]}
                />
                <Area
                  type="monotone"
                  dataKey="participacion"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#commGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-3 border-t border-slate-100 mt-2 text-center text-xs text-slate-500 font-medium">
            Índice de involucramiento de familias: <strong className="text-purple-700">86%</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

