import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getDashboardData } from "./analyticsService";
import { getImprovementPlans } from "./improvementPlanService";
import { getStudents } from "./studentService";
import { getTeachers } from "./teacherService";

export async function generateExcelReport(): Promise<Uint8Array> {
  const dashboard = await getDashboardData();
  const plansData = await getImprovementPlans();
  const students = await getStudents();
  const teachers = await getTeachers();

  const workbook = XLSX.utils.book_new();

  // 1. Resumen Ejecutivo
  const summaryRows = [
    ["INDICADOR CLAVE", "VALOR", "VARIACIÓN", "CATEGORÍA"],
    ...dashboard.kpis.map((k) => [k.title, k.value, k.change, k.category]),
    [],
    ["DESEMPEÑO POR GRADO", "PROMEDIO (0-100)", "ASISTENCIA (%)"],
    ...dashboard.gradePerformances.map((g) => [g.grade, g.score, `${g.attendance}%`]),
  ];
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryRows);
  XLSX.utils.book_append_sheet(workbook, summarySheet, "Resumen General");

  // 2. Planes de Mejora
  const plansRows = [
    ["PRIORIDAD", "ACCIÓN / PLAN", "ÁREA", "RESPONSABLE", "FECHA LÍMITE", "ESTADO", "IMPACTO"],
    ...plansData.plans.map((p) => [
      p.priority,
      p.title,
      p.area,
      p.responsible,
      p.deadline,
      p.status,
      p.impact || "-",
    ]),
  ];
  const plansSheet = XLSX.utils.aoa_to_sheet(plansRows);
  XLSX.utils.book_append_sheet(workbook, plansSheet, "Planes de Mejora");

  // 3. Estudiantes
  const studentsRows = [
    ["CÓDIGO", "ESTUDIANTE", "GRADO", "SECCIÓN", "ASISTENCIA", "PROMEDIO", "NIVEL DE RIESGO"],
    ...students.map((s) => [
      s.code,
      s.name,
      s.grade,
      s.section,
      `${s.attendanceRate}%`,
      s.averageScore,
      s.riskLevel,
    ]),
  ];
  const studentsSheet = XLSX.utils.aoa_to_sheet(studentsRows);
  XLSX.utils.book_append_sheet(workbook, studentsSheet, "Estudiantes");

  // 4. Formación Docente
  const teachersRows = [
    ["DOCENTE", "CORREO", "ESPECIALIDAD", "ESTADO", "PUNTAJE CAPACITACIÓN", "HORAS ACUMULADAS"],
    ...teachers.map((t) => [
      t.name,
      t.email,
      t.specialty,
      t.status,
      `${t.trainingScore}%`,
      t.hoursCompleted,
    ]),
  ];
  const teachersSheet = XLSX.utils.aoa_to_sheet(teachersRows);
  XLSX.utils.book_append_sheet(workbook, teachersSheet, "Docentes");

  const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
  return wbout;
}

export async function generatePdfReport(): Promise<Uint8Array> {
  const dashboard = await getDashboardData();
  const plansData = await getImprovementPlans();

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Header Banner
  doc.setFillColor(11, 35, 65); // Lead dark navy #0b2341
  doc.rect(0, 0, 210, 32, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  doc.text("LEAD - Analítica Educativa", 14, 16);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("La escuela que aprende de sus datos | Reporte Consolidado 2024", 14, 24);

  doc.setFontSize(9);
  doc.text(`Fecha de emisión: ${new Date().toLocaleDateString("es-ES")}`, 150, 24);

  // KPIs Summary Table
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("1. Resumen de Indicadores Clave (KPIs)", 14, 42);

  const kpiData = dashboard.kpis.map((k) => [k.title, k.value, k.change]);
  autoTable(doc, {
    startY: 46,
    head: [["Indicador", "Valor Actual", "Tendencia"]],
    body: kpiData,
    theme: "striped",
    headStyles: { fillColor: [2, 132, 199] },
    styles: { fontSize: 9 },
  });

  // Improvement Plans Table
  const finalY1 = (doc as any).lastAutoTable.finalY + 12;
  doc.setFontSize(14);
  doc.text("2. Estado de Planes de Mejora Escolar", 14, finalY1);

  const plansBody = plansData.plans.map((p) => [
    p.priority,
    p.title,
    p.area,
    p.responsible,
    p.deadline,
    p.status,
    p.impact || "-",
  ]);

  autoTable(doc, {
    startY: finalY1 + 4,
    head: [["Prioridad", "Plan / Acción", "Área", "Responsable", "Fecha Límite", "Estado", "Impacto"]],
    body: plansBody,
    theme: "grid",
    headStyles: { fillColor: [11, 35, 65] },
    styles: { fontSize: 8 },
  });

  // Educational Recommendations
  const finalY2 = (doc as any).lastAutoTable.finalY + 12;
  doc.setFontSize(14);
  doc.text("3. Recomendaciones Prioritarias Sugeridas por IA", 14, finalY2);

  const recBody = dashboard.recommendations.map((r) => [r.area, r.title, r.level.toUpperCase()]);
  autoTable(doc, {
    startY: finalY2 + 4,
    head: [["Área", "Recomendación Pedagógica", "Nivel de Urgencia"]],
    body: recBody,
    theme: "striped",
    headStyles: { fillColor: [14, 165, 233] },
    styles: { fontSize: 8 },
  });

  // Footer note
  doc.setFontSize(8);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "Este informe fue generado automáticamente por el sistema LEAD. Confidencial y de uso exclusivo institucional.",
    14,
    285
  );

  const arrayBuffer = doc.output("arraybuffer");
  return new Uint8Array(arrayBuffer);
}

