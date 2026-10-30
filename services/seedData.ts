import {
  KPICardData,
  SparklinePoint,
  GradePerformance,
  HeatmapCell,
  PriorityRecommendation,
  AreaBenchmark,
  LearningEvolutionPoint,
  ResourceUsageItem,
  CommunityPoint,
  ImprovementPlanItem,
  EducationalAlertItem,
  StudentListItem,
  TeacherListItem,
} from "@/types";

export const initialSchoolInfo = {
  id: "lead-school-demo-2024",
  name: "Escuela Demo",
  level: "Institución Educativa Nivel Primario",
  academicPeriod: "Periodo escolar 2024",
  modularCode: "0482910",
  director: "Director Demo",
};

export const initialKPICards: KPICardData[] = [
  {
    title: "Asistencia",
    value: "92%",
    change: "-4%",
    trend: "down",
    category: "asistencia",
    iconName: "CalendarCheck",
  },
  {
    title: "Aprendizaje",
    value: "78%",
    change: "+6%",
    trend: "up",
    category: "aprendizaje",
    iconName: "GraduationCap",
  },
  {
    title: "Formación docente",
    value: "85%",
    change: "+12%",
    trend: "up",
    category: "formacion",
    iconName: "Users",
  },
  {
    title: "Uso de recursos",
    value: "76%",
    change: "-8%",
    trend: "down",
    category: "recursos",
    iconName: "Layers",
  },
  {
    title: "Participación",
    value: "81%",
    change: "+5%",
    trend: "up",
    category: "participacion",
    iconName: "HeartHandshake",
  },
];

export const initialSparklinePoints: SparklinePoint[] = [
  { month: "Mar", value: 72 },
  { month: "Abr", value: 75 },
  { month: "May", value: 78 },
  { month: "Jun", value: 80 },
  { month: "Jul", value: 79 },
  { month: "Ago", value: 84 },
];

export const initialGradePerformances: GradePerformance[] = [
  { grade: "1°", gradeNumber: 1, score: 82, attendance: 98 },
  { grade: "2°", gradeNumber: 2, score: 74, attendance: 95 },
  { grade: "3°", gradeNumber: 3, score: 80, attendance: 92 },
  { grade: "4°", gradeNumber: 4, score: 89, attendance: 88 },
  { grade: "5°", gradeNumber: 5, score: 78, attendance: 85 },
  { grade: "6°", gradeNumber: 6, score: 83, attendance: 93 },
];

export const initialHeatmapData: HeatmapCell[] = [
  // 1°
  { grade: "1°", subject: "Matemática", level: "Medio", value: 78 },
  { grade: "1°", subject: "Comunicación", level: "Alto", value: 86 },
  { grade: "1°", subject: "Ciencia y Tec.", level: "Alto", value: 84 },
  { grade: "1°", subject: "Personal Social", level: "Alto", value: 88 },
  // 2°
  { grade: "2°", subject: "Matemática", level: "Bajo", value: 68 },
  { grade: "2°", subject: "Comunicación", level: "Medio", value: 75 },
  { grade: "2°", subject: "Ciencia y Tec.", level: "Medio", value: 76 },
  { grade: "2°", subject: "Personal Social", level: "Alto", value: 82 },
  // 3°
  { grade: "3°", subject: "Matemática", level: "Medio", value: 77 },
  { grade: "3°", subject: "Comunicación", level: "Bajo", value: 65 },
  { grade: "3°", subject: "Ciencia y Tec.", level: "Medio", value: 79 },
  { grade: "3°", subject: "Personal Social", level: "Medio", value: 78 },
  // 4°
  { grade: "4°", subject: "Matemática", level: "Alto", value: 91 },
  { grade: "4°", subject: "Comunicación", level: "Medio", value: 72 },
  { grade: "4°", subject: "Ciencia y Tec.", level: "Alto", value: 88 },
  { grade: "4°", subject: "Personal Social", level: "Alto", value: 90 },
  // 5°
  { grade: "5°", subject: "Matemática", level: "Medio", value: 74 },
  { grade: "5°", subject: "Comunicación", level: "Medio", value: 76 },
  { grade: "5°", subject: "Ciencia y Tec.", level: "Medio", value: 79 },
  { grade: "5°", subject: "Personal Social", level: "Medio", value: 77 },
  // 6°
  { grade: "6°", subject: "Matemática", level: "Alto", value: 85 },
  { grade: "6°", subject: "Comunicación", level: "Alto", value: 84 },
  { grade: "6°", subject: "Ciencia y Tec.", level: "Alto", value: 82 },
  { grade: "6°", subject: "Personal Social", level: "Alto", value: 86 },
];

export const initialRecommendations: PriorityRecommendation[] = [
  {
    id: "rec-1",
    title: "Reforzar comprensión lectora en 3° y 4° grado",
    area: "Comunicación",
    level: "high",
    icon: "BookOpen",
    actionUrl: "/planes-de-mejora",
  },
  {
    id: "rec-2",
    title: "Mejorar asistencia en 5° grado",
    area: "Convivencia",
    level: "medium",
    icon: "UserX",
    actionUrl: "/planes-de-mejora",
  },
  {
    id: "rec-3",
    title: "Fortalecer uso de recursos digitales en aulas",
    area: "Recursos",
    level: "info",
    icon: "Laptop",
    actionUrl: "/planes-de-mejora",
  },
];

export const initialAreaBenchmarks: AreaBenchmark[] = [
  { area: "Matemática", escuela: 78, nacional: 68 },
  { area: "Comunicación", escuela: 76, nacional: 70 },
  { area: "Ciencia y Tec.", escuela: 82, nacional: 65 },
  { area: "Personal Social", escuela: 85, nacional: 72 },
];

export const initialLearningEvolution: LearningEvolutionPoint[] = [
  { month: "Mar", matematica: 68, comunicacion: 72, ciencia: 70 },
  { month: "Abr", matematica: 72, comunicacion: 74, ciencia: 73 },
  { month: "May", matematica: 74, comunicacion: 75, ciencia: 76 },
  { month: "Jun", matematica: 76, comunicacion: 75, ciencia: 78 },
  { month: "Jul", matematica: 79, comunicacion: 77, ciencia: 80 },
  { month: "Ago", matematica: 84, comunicacion: 78, ciencia: 82 },
];

export const initialResourceUsage: ResourceUsageItem[] = [
  { name: "Recursos digitales", percentage: 38, color: "#0284c7" },
  { name: "Biblioteca", percentage: 24, color: "#38bdf8" },
  { name: "Laboratorio", percentage: 18, color: "#60a5fa" },
  { name: "Material impreso", percentage: 12, color: "#93c5fd" },
  { name: "Otros", percentage: 8, color: "#cbd5e1" },
];

export const initialCommunityParticipation: CommunityPoint[] = [
  { month: "Mar", participacion: 65 },
  { month: "Abr", participacion: 70 },
  { month: "May", participacion: 75 },
  { month: "Jun", participacion: 78 },
  { month: "Jul", participacion: 79 },
  { month: "Ago", participacion: 86 },
];

export const initialImprovementPlans: ImprovementPlanItem[] = [
  {
    id: "plan-1",
    title: "Mejorar comprensión lectora en 3° y 4° grado",
    area: "Comunicación",
    responsible: "Equipo docente",
    deadline: "30 Oct 2024",
    priority: "Alta",
    status: "En progreso",
    impact: "+12%",
    phase: "Ejecución",
  },
  {
    id: "plan-2",
    title: "Aumentar asistencia en 5° grado",
    area: "Convivencia",
    responsible: "Tutoría",
    deadline: "15 Oct 2024",
    priority: "Alta",
    status: "En progreso",
    impact: "+7%",
    phase: "Ejecución",
  },
  {
    id: "plan-3",
    title: "Fortalecer uso de recursos digitales en aulas",
    area: "Recursos",
    responsible: "Coordinación TIC",
    deadline: "30 Nov 2024",
    priority: "Media",
    status: "Pendiente",
    impact: "-",
    phase: "Planificación",
  },
  {
    id: "plan-4",
    title: "Capacitación docente en evaluación formativa",
    area: "Formación",
    responsible: "Dirección",
    deadline: "20 Nov 2024",
    priority: "Media",
    status: "En progreso",
    impact: "+5%",
    phase: "Ejecución",
  },
  {
    id: "plan-5",
    title: "Incrementar participación de familias",
    area: "Comunidad",
    responsible: "Equipo de bienestar",
    deadline: "15 Dic 2024",
    priority: "Baja",
    status: "Pendiente",
    impact: "-",
    phase: "Diagnóstico",
  },
];

export const initialEducationalAlerts: EducationalAlertItem[] = [
  {
    id: "alert-1",
    title: "Deserción potencial por inasistencia en 5° grado",
    description: "Tres estudiantes acumulan más de 5 inasistencias injustificadas consecutivas.",
    severity: "CRITICA",
    area: "Convivencia",
    grade: "5° Grado",
    date: "28 Oct 2024",
    isResolved: false,
  },
  {
    id: "alert-2",
    title: "Brecha en comprensión lectora en 3° grado B",
    description: "El 38% del aula se encuentra en nivel Inicio según la última evaluación censal interna.",
    severity: "ALTA",
    area: "Comunicación",
    grade: "3° Grado",
    date: "25 Oct 2024",
    isResolved: false,
  },
  {
    id: "alert-3",
    title: "Bajo uso de aula de innovación pedagógica (TIC)",
    description: "Docentes de 1° y 2° grado no han reservado horas en el laboratorio digital este mes.",
    severity: "MEDIA",
    area: "Recursos",
    grade: "General",
    date: "20 Oct 2024",
    isResolved: false,
  },
];

export const initialStudents: StudentListItem[] = [
  { id: "std-1", code: "ST-001", name: "Alonso Ramos Silva", grade: "5°", section: "A", attendanceRate: 82, averageScore: 13.5, riskLevel: "ALTO" },
  { id: "std-2", code: "ST-002", name: "Camila Mendoza Huamán", grade: "5°", section: "A", attendanceRate: 84, averageScore: 14.0, riskLevel: "MEDIO" },
  { id: "std-3", code: "ST-003", name: "Mateo Quispe Vega", grade: "3°", section: "B", attendanceRate: 94, averageScore: 11.2, riskLevel: "ALTO" },
  { id: "std-4", code: "ST-004", name: "Lucía Fernandez Rios", grade: "4°", section: "A", attendanceRate: 98, averageScore: 18.5, riskLevel: "BAJO" },
  { id: "std-5", code: "ST-005", name: "Gabriel Torres Castro", grade: "1°", section: "A", attendanceRate: 99, averageScore: 17.0, riskLevel: "BAJO" },
  { id: "std-6", code: "ST-006", name: "Valentina Salazar Paredes", grade: "6°", section: "B", attendanceRate: 95, averageScore: 16.8, riskLevel: "BAJO" },
  { id: "std-7", code: "ST-007", name: "Diego Cárdenas Flores", grade: "5°", section: "B", attendanceRate: 85, averageScore: 12.8, riskLevel: "MEDIO" },
  { id: "std-8", code: "ST-008", name: "Sofía Palacios Morales", grade: "2°", section: "A", attendanceRate: 96, averageScore: 15.2, riskLevel: "BAJO" },
];

export const initialTeachers: TeacherListItem[] = [
  { id: "tch-1", name: "Rosa María Benavides", email: "rbenavides@lead.edu.pe", specialty: "Comunicación y Lenguaje", status: "Activo", trainingScore: 92, hoursCompleted: 45 },
  { id: "tch-2", name: "Carlos Eduardo Morales", email: "cmorales@lead.edu.pe", specialty: "Matemática y Estadística", status: "Activo", trainingScore: 88, hoursCompleted: 38 },
  { id: "tch-3", name: "Elena Valenzuela Soto", email: "evalenzuela@lead.edu.pe", specialty: "Ciencia y Tecnología", status: "Activo", trainingScore: 84, hoursCompleted: 30 },
  { id: "tch-4", name: "Javier Arturo Peña", email: "jpena@lead.edu.pe", specialty: "Personal Social e Historia", status: "Activo", trainingScore: 79, hoursCompleted: 24 },
  { id: "tch-5", name: "Miriam Del Pilar Rojas", email: "mrojas@lead.edu.pe", specialty: "Innovación y Robótica", status: "Activo", trainingScore: 95, hoursCompleted: 50 },
];

