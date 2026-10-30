import { prisma, isDatabaseConnected } from "@/lib/prisma";
import { initialImprovementPlans, initialEducationalAlerts } from "./seedData";
import { ImprovementPlanItem, EducationalAlertItem } from "@/types";
import { CreatePlanInput } from "@/validations";

let memoryPlans: ImprovementPlanItem[] = [...initialImprovementPlans];
let memoryAlerts: EducationalAlertItem[] = [...initialEducationalAlerts];

export async function getImprovementPlans(): Promise<{
  plans: ImprovementPlanItem[];
  alerts: EducationalAlertItem[];
  stats: {
    activePlans: number;
    priorityAlerts: number;
    inProgress: number;
    completed: number;
  };
}> {
  const isConnected = await isDatabaseConnected();

  if (isConnected) {
    try {
      const dbPlans = await prisma.improvementPlan.findMany({
        orderBy: { createdAt: "desc" },
      });

      const dbAlerts = await prisma.educationalAlert.findMany({
        where: { isResolved: false },
      });

      if (dbPlans && dbPlans.length > 0) {
        const formattedPlans: ImprovementPlanItem[] = dbPlans.map((p) => ({
          id: p.id,
          title: p.title,
          description: p.description ?? undefined,
          area: p.area,
          responsible: p.responsible,
          deadline: p.deadline.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          priority: p.priority as "Alta" | "Media" | "Baja",
          status: p.status.replace("_", " ") as "Pendiente" | "En progreso" | "Completado",
          impact: p.impact ?? "-",
          phase: (p.currentPhase as unknown) as ImprovementPlanItem["phase"],
        }));

        const formattedAlerts: EducationalAlertItem[] = dbAlerts.map((a) => ({
          id: a.id,
          title: a.title,
          description: a.description,
          severity: a.severity,
          area: a.area,
          date: a.createdAt.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
            year: "numeric",
          }),
          isResolved: a.isResolved,
        }));

        const activePlans = formattedPlans.filter((p) => p.status !== "Completado").length;
        const inProgress = formattedPlans.filter((p) => p.status === "En progreso").length;
        const completed = formattedPlans.filter((p) => p.status === "Completado").length;
        const priorityAlerts = formattedAlerts.filter(
          (a) => a.severity === "CRITICA" || a.severity === "ALTA"
        ).length;

        return {
          plans: formattedPlans,
          alerts: formattedAlerts,
          stats: {
            activePlans,
            priorityAlerts,
            inProgress,
            completed,
          },
        };
      }
    } catch {
      // Fallback
    }
  }

  const activePlans = memoryPlans.filter((p) => p.status !== "Completado").length;
  const inProgress = memoryPlans.filter((p) => p.status === "En progreso").length;
  const completed = memoryPlans.filter((p) => p.status === "Completado").length;
  const priorityAlerts = memoryAlerts.filter(
    (a) => a.severity === "CRITICA" || a.severity === "ALTA"
  ).length;

  return {
    plans: memoryPlans,
    alerts: memoryAlerts,
    stats: {
      activePlans,
      priorityAlerts,
      inProgress,
      completed,
    },
  };
}

export async function createImprovementPlan(
  data: CreatePlanInput
): Promise<ImprovementPlanItem> {
  const newPlan: ImprovementPlanItem = {
    id: `plan-${Date.now()}`,
    title: data.title,
    description: data.description,
    area: data.area,
    responsible: data.responsible,
    deadline: data.deadline,
    priority: data.priority,
    status: data.status,
    impact: data.impact || "-",
    phase: data.currentPhase,
  };

  const isConnected = await isDatabaseConnected();
  if (isConnected) {
    try {
      const school = await prisma.school.findFirst();
      if (school) {
        const created = await prisma.improvementPlan.create({
          data: {
            title: data.title,
            description: data.description,
            area: data.area,
            responsible: data.responsible,
            deadline: new Date(data.deadline),
            priority: data.priority,
            status: data.status.replace(" ", "_") as any,
            impact: data.impact,
            currentPhase: (data.currentPhase as any) ?? "Planificacion",
            schoolId: school.id,
          },
        });
        newPlan.id = created.id;
      }
    } catch {
      // Fallback
    }
  }

  memoryPlans.unshift(newPlan);
  return newPlan;
}

export async function updatePlanStatus(
  id: string,
  status: ImprovementPlanItem["status"]
): Promise<boolean> {
  const isConnected = await isDatabaseConnected();
  if (isConnected) {
    try {
      await prisma.improvementPlan.update({
        where: { id },
        data: { status: status.replace(" ", "_") as any },
      });
    } catch {
      // Fallback
    }
  }

  const idx = memoryPlans.findIndex((p) => p.id === id);
  if (idx !== -1) {
    memoryPlans[idx].status = status;
    return true;
  }
  return false;
}
