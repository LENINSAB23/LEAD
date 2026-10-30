"use client";

import { useState } from "react";
import {
  Plus,
  FolderKanban,
  AlertTriangle,
  RotateCw,
  CheckCircle2,
  Calendar,
  User,
  ArrowUpRight,
  X,
  Check,
} from "lucide-react";
import {
  ImprovementPlanItem,
  EducationalAlertItem,
  PlanPriority,
  PlanStatus,
} from "@/types";
import { createPlanAction, updatePlanStatusAction } from "@/app/actions/plans";
import { cn } from "@/lib/utils";

interface ImprovementPlansViewProps {
  initialData: {
    plans: ImprovementPlanItem[];
    alerts: EducationalAlertItem[];
    stats: {
      activePlans: number;
      priorityAlerts: number;
      inProgress: number;
      completed: number;
    };
  };
}

const timelinePhases = [
  { name: "Diagnóstico", date: "Sep 2024", status: "completed" },
  { name: "Planificación", date: "Oct 2024", status: "current" },
  { name: "Ejecución", date: "Nov - Dic 2024", status: "upcoming" },
  { name: "Seguimiento", date: "Ene 2025", status: "upcoming" },
  { name: "Evaluación", date: "Feb 2025", status: "upcoming" },
];

export function ImprovementPlansView({ initialData }: ImprovementPlansViewProps) {
  const [plans, setPlans] = useState<ImprovementPlanItem[]>(initialData.plans);
  const [alerts, setAlerts] = useState<EducationalAlertItem[]>(initialData.alerts);
  const [stats, setStats] = useState(initialData.stats);
  const [activeTab, setActiveTab] = useState("Planes activos");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  // Form State
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("Comunicación");
  const [responsible, setResponsible] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState<PlanPriority>("Alta");
  const [impact, setImpact] = useState("+5%");

  const handleCreatePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormErrors([]);

    const res = await createPlanAction({
      title,
      area,
      responsible,
      deadline,
      priority,
      status: "Pendiente",
      impact,
      currentPhase: "Planificación",
    });

    if (res.success && res.plan) {
      setPlans([res.plan, ...plans]);
      setStats((prev) => ({
        ...prev,
        activePlans: prev.activePlans + 1,
      }));
      setIsModalOpen(false);
      setTitle("");
      setResponsible("");
      setDeadline("");
    } else if (res.errors) {
      setFormErrors(res.errors);
    }
    setIsSubmitting(false);
  };

  const handleToggleStatus = async (plan: ImprovementPlanItem) => {
    const nextStatus: PlanStatus =
      plan.status === "Pendiente"
        ? "En progreso"
        : plan.status === "En progreso"
        ? "Completado"
        : "Pendiente";

    const res = await updatePlanStatusAction(plan.id, nextStatus);
    if (res.success) {
      setPlans((prev) =>
        prev.map((p) => (p.id === plan.id ? { ...p, status: nextStatus } : p))
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">
            Planes de mejora
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Convierte los datos en acciones concretas para una mejor escuela.
          </p>
        </div>

        {/* New Plan Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold shadow-md shadow-sky-600/20 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Nuevo plan</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        {["Planes activos", "Alertas", "Historial", "Impacto"].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                isActive
                  ? "bg-sky-100 text-sky-800 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* 4 Stat Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Planes activos */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-soft flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-slate-900">{stats.activePlans}</div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">Planes activos</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
            <FolderKanban className="w-5 h-5" />
          </div>
        </div>

        {/* Alertas prioritarias */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-soft flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-rose-600">{stats.priorityAlerts}</div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">Alertas prioritarias</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
        </div>

        {/* En progreso */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-soft flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-teal-600">{stats.inProgress}</div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">En progreso</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <RotateCw className="w-5 h-5" />
          </div>
        </div>

        {/* Completado */}
        <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-soft flex items-center justify-between">
          <div>
            <div className="text-2xl font-black text-emerald-600">{stats.completed}</div>
            <div className="text-xs font-semibold text-slate-500 mt-0.5">Completado</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Content depending on Tab */}
      {activeTab === "Alertas" ? (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft space-y-4">
          <h3 className="text-sm font-bold text-slate-800">Alertas Detectadas por LEAD</h3>
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={cn(
                  "p-4 rounded-xl border flex items-start justify-between gap-4",
                  alert.severity === "CRITICA"
                    ? "bg-rose-50/70 border-rose-200"
                    : alert.severity === "ALTA"
                    ? "bg-amber-50/70 border-amber-200"
                    : "bg-sky-50/70 border-sky-200"
                )}
              >
                <div>
                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                      alert.severity === "CRITICA"
                        ? "bg-rose-200 text-rose-800"
                        : alert.severity === "ALTA"
                        ? "bg-amber-200 text-amber-800"
                        : "bg-sky-200 text-sky-800"
                    )}
                  >
                    {alert.severity}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{alert.title}</h4>
                  <p className="text-xs text-slate-600 mt-0.5">{alert.description}</p>
                  <span className="text-[10px] text-slate-400 mt-2 block">
                    Área: {alert.area} • {alert.date}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setTitle(`Intervención: ${alert.title}`);
                    setArea(alert.area);
                    setIsModalOpen(true);
                  }}
                  className="px-3 py-1.5 bg-white border border-slate-200 text-slate-800 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors shrink-0 shadow-xs"
                >
                  Convertir en plan
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Plans Table */
        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Prioridad</th>
                  <th className="py-3.5 px-4">Acción / Plan</th>
                  <th className="py-3.5 px-4">Área</th>
                  <th className="py-3.5 px-4">Responsable</th>
                  <th className="py-3.5 px-4">Fecha límite</th>
                  <th className="py-3.5 px-4">Estado</th>
                  <th className="py-3.5 px-4">Impacto</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {plans.map((p) => {
                  const isHigh = p.priority === "Alta";
                  const isMed = p.priority === "Media";
                  const isInProgress = p.status === "En progreso";
                  const isPending = p.status === "Pendiente";
                  const isDone = p.status === "Completado";

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Prioridad */}
                      <td className="py-3.5 px-4">
                        <span
                          className={cn(
                            "px-2.5 py-1 rounded-full text-[10px] font-bold",
                            isHigh
                              ? "bg-rose-100 text-rose-700"
                              : isMed
                              ? "bg-amber-100 text-amber-800"
                              : "bg-slate-100 text-slate-700"
                          )}
                        >
                          {p.priority}
                        </span>
                      </td>

                      {/* Acción / Plan */}
                      <td className="py-3.5 px-4 font-bold text-slate-800 max-w-xs">
                        {p.title}
                      </td>

                      {/* Área */}
                      <td className="py-3.5 px-4 text-slate-600 font-medium">{p.area}</td>

                      {/* Responsable */}
                      <td className="py-3.5 px-4 text-slate-600 flex items-center gap-1.5 font-medium">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        <span>{p.responsible}</span>
                      </td>

                      {/* Fecha límite */}
                      <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                        {p.deadline}
                      </td>

                      {/* Estado */}
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleToggleStatus(p)}
                          title="Clic para cambiar estado"
                          className={cn(
                            "px-2.5 py-1 rounded-full text-[10px] font-bold transition-transform hover:scale-105 cursor-pointer flex items-center gap-1",
                            isInProgress
                              ? "bg-sky-100 text-sky-800"
                              : isPending
                              ? "bg-amber-100 text-amber-800"
                              : "bg-emerald-100 text-emerald-800"
                          )}
                        >
                          {isDone && <Check className="w-2.5 h-2.5" />}
                          <span>{p.status}</span>
                        </button>
                      </td>

                      {/* Impacto */}
                      <td className="py-3.5 px-4 font-bold">
                        {p.impact && p.impact !== "-" ? (
                          <span className="text-emerald-600 flex items-center">
                            <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />
                            {p.impact}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Línea de tiempo de implementación */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft">
        <h3 className="text-sm font-bold text-slate-800 mb-6">
          Línea de tiempo de implementación
        </h3>

        <div className="relative flex items-center justify-between max-w-4xl mx-auto px-4">
          {/* Timeline background bar */}
          <div className="absolute left-8 right-8 top-3.5 h-1 bg-slate-200 -z-0" />
          <div className="absolute left-8 w-[25%] top-3.5 h-1 bg-sky-500 -z-0" />

          {timelinePhases.map((phase) => {
            const isCompleted = phase.status === "completed";
            const isCurrent = phase.status === "current";

            return (
              <div
                key={phase.name}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-all shadow-xs",
                    isCompleted
                      ? "bg-emerald-500 text-white"
                      : isCurrent
                      ? "bg-[#0284c7] text-white ring-4 ring-sky-100 scale-110"
                      : "bg-slate-200 text-slate-600"
                  )}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : null}
                  {isCurrent ? <div className="w-2.5 h-2.5 bg-white rounded-full" /> : null}
                </div>
                <span
                  className={cn(
                    "text-xs font-bold mt-2",
                    isCurrent ? "text-sky-800" : "text-slate-700"
                  )}
                >
                  {phase.name}
                </span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {phase.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal "+ Nuevo Plan" */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">
                Crear Nuevo Plan de Mejora
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formErrors.length > 0 && (
              <div className="mt-3 p-3 rounded-xl bg-rose-50 text-rose-800 text-xs border border-rose-200">
                <ul className="list-disc list-inside space-y-0.5">
                  {formErrors.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}

            <form onSubmit={handleCreatePlan} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Acción / Título del Plan
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: Taller intensivo de resolución de problemas matemáticos"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Área</label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Comunicación">Comunicación</option>
                    <option value="Matemática">Matemática</option>
                    <option value="Convivencia">Convivencia</option>
                    <option value="Recursos">Recursos</option>
                    <option value="Formación">Formación</option>
                    <option value="Comunidad">Comunidad</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Prioridad</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as PlanPriority)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Responsable</label>
                  <input
                    type="text"
                    required
                    value={responsible}
                    onChange={(e) => setResponsible(e.target.value)}
                    placeholder="Ej: Equipo Docente 4°"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fecha Límite</label>
                  <input
                    type="date"
                    required
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Impacto Esperado</label>
                <input
                  type="text"
                  value={impact}
                  onChange={(e) => setImpact(e.target.value)}
                  placeholder="Ej: +8% de mejora"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl font-bold shadow-md shadow-sky-600/20"
                >
                  {isSubmitting ? "Guardando..." : "Guardar Plan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

