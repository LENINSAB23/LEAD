"use client";

import { useState } from "react";
import {
  FileSpreadsheet,
  FileText,
  Download,
  Calendar,
  Layers,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export function ReportsView() {
  const [downloadingType, setDownloadingType] = useState<string | null>(null);

  const handleDownload = (type: "excel" | "pdf") => {
    setDownloadingType(type);
    window.location.href = `/api/reports/export?type=${type}`;
    setTimeout(() => setDownloadingType(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">
          Centro de Reportes Institucionales
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Genera y descarga informes ejecutivos en formatos estándar para acreditación y gestión directiva.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Excel Report Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Reporte Integral en Excel (.xlsx)
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Libro de cálculo multi-hoja con métricas consolidadas, tablas de estudiantes, registro de planes de mejora, asistencia por grados y detalle de formación docente.
            </p>

            <div className="mt-4 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Hoja 1: Resumen de Indicadores Clave (KPIs)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Hoja 2: Planes de Mejora y Estado de Ejecución</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Hoja 3: Padrón de Estudiantes y Niveles de Riesgo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Hoja 4: Formación y Horas de Capacitación Docente</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => handleDownload("excel")}
              disabled={downloadingType !== null}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>
                {downloadingType === "excel" ? "Generando Libro Excel..." : "Descargar Reporte Excel (.xlsx)"}
              </span>
            </button>
          </div>
        </div>

        {/* PDF Report Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Informe Ejecutivo en PDF (.pdf)
            </h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Documento formal listo para imprimir o presentar ante la UGEL, comités de calidad o consejo escolar, diseñado con tipografía profesional y membrete LEAD.
            </p>

            <div className="mt-4 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-500" />
                <span>Encabezado institucional oficial y fecha de emisión</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-500" />
                <span>Tablas ejecutivas de indicadores y planes de acción</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-500" />
                <span>Recomendaciones prioritarias sugeridas por IA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-500" />
                <span>Pie de página con marca de confidencialidad</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => handleDownload("pdf")}
              disabled={downloadingType !== null}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>
                {downloadingType === "pdf" ? "Generando Documento PDF..." : "Descargar Informe PDF (.pdf)"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

