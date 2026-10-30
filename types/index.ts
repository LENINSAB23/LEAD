export type Role = "DIRECTOR" | "COORDINADOR" | "DOCENTE";

export type RiskLevel = "BAJO" | "MEDIO" | "ALTO";

export type AttendanceStatus =
  | "PRESENTE"
  | "TARDANZA"
  | "FALTA_JUSTIFICADA"
  | "FALTA_INJUSTIFICADA";

export type PlanPriority = "Alta" | "Media" | "Baja";

export type PlanStatus = "Pendiente" | "En progreso" | "Completado" | "Cancelado";

export type PlanPhase =
  | "Diagnóstico"
  | "Planificación"
  | "Ejecución"
  | "Seguimiento"
  | "Evaluación";

export interface KPICardData {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  category: "asistencia" | "aprendizaje" | "formacion" | "recursos" | "participacion";
  iconName: string;
}

export interface SparklinePoint {
  month: string;
  value: number;
}

export interface GradePerformance {
  grade: string;
  gradeNumber: number;
  score: number;
  attendance: number;
}

export interface HeatmapCell {
  grade: string;
  subject: string;
  level: "Bajo" | "Medio" | "Alto";
  value: number;
}

export interface PriorityRecommendation {
  id: string;
  title: string;
  area: string;
  level: "high" | "medium" | "info";
  icon: string;
  actionUrl?: string;
}

export interface AreaBenchmark {
  area: string;
  escuela: number;
  nacional: number;
}

export interface LearningEvolutionPoint {
  month: string;
  matematica: number;
  comunicacion: number;
  ciencia?: number;
}

export interface ResourceUsageItem {
  name: string;
  percentage: number;
  color: string;
}

export interface CommunityPoint {
  month: string;
  participacion: number;
}

export interface ImprovementPlanItem {
  id: string;
  title: string;
  description?: string;
  area: string;
  responsible: string;
  deadline: string;
  priority: PlanPriority;
  status: PlanStatus;
  impact?: string;
  phase?: PlanPhase;
}

export interface EducationalAlertItem {
  id: string;
  title: string;
  description: string;
  severity: "CRITICA" | "ALTA" | "MEDIA" | "INFORMATIVA";
  area: string;
  grade?: string;
  date: string;
  isResolved: boolean;
}

export interface StudentListItem {
  id: string;
  code: string;
  name: string;
  grade: string;
  section: string;
  attendanceRate: number;
  averageScore: number;
  riskLevel: RiskLevel;
}

export interface TeacherListItem {
  id: string;
  name: string;
  email: string;
  specialty: string;
  status: string;
  trainingScore: number;
  hoursCompleted: number;
}

export interface AIMessage {
  id: string;
  sender: "user" | "lead-ai";
  text: string;
  timestamp: string;
  identifiedFactors?: string[];
  recommendation?: string;
  evidence?: string;
}

