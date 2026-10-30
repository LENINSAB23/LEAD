import { z } from "zod";

export const createPlanSchema = z.object({
  title: z
    .string()
    .min(5, "El título del plan debe tener al menos 5 caracteres")
    .max(150, "El título no puede exceder 150 caracteres"),
  description: z.string().optional(),
  area: z.string().min(2, "Seleccione un área curricular o de gestión"),
  responsible: z
    .string()
    .min(3, "El responsable debe tener al menos 3 caracteres"),
  deadline: z.string().min(8, "La fecha límite es obligatoria"),
  priority: z.enum(["Alta", "Media", "Baja"]),
  status: z.enum(["Pendiente", "En progreso", "Completado", "Cancelado"]).default("Pendiente"),
  impact: z.string().optional(),
  currentPhase: z
    .enum([
      "Diagnóstico",
      "Planificación",
      "Ejecución",
      "Seguimiento",
      "Evaluación",
    ])
    .default("Planificación"),
});

export type CreatePlanInput = z.infer<typeof createPlanSchema>;

export const aiQuerySchema = z.object({
  query: z.string().min(3, "La consulta debe tener al menos 3 caracteres"),
  schoolId: z.string().optional(),
  academicPeriod: z.string().optional(),
  grade: z.string().optional(),
});

export type AiQueryInput = z.infer<typeof aiQuerySchema>;

export const studentRowSchema = z.object({
  code: z.string().min(3),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  grade: z.string().min(1),
  section: z.string().min(1),
  attendanceRate: z.number().min(0).max(100).optional().default(90),
  averageScore: z.number().min(0).max(20).optional().default(14),
});

export type StudentRowInput = z.infer<typeof studentRowSchema>;

export const attendanceRowSchema = z.object({
  studentCode: z.string().min(3),
  date: z.string(),
  status: z.enum(["PRESENTE", "TARDANZA", "FALTA_JUSTIFICADA", "FALTA_INJUSTIFICADA"]),
  remarks: z.string().optional(),
});

export const gradeRowSchema = z.object({
  studentCode: z.string().min(3),
  subject: z.string().min(2),
  score: z.number().min(0).max(20),
  month: z.string().optional(),
});

