"use client";

import { useState } from "react";
import {
  UploadCloud,
  FileSpreadsheet,
  CheckCircle,
  AlertTriangle,
  Download,
  Loader2,
  RefreshCw,
} from "lucide-react";
import * as XLSX from "xlsx";

export function DataImportView() {
  const [file, setFile] = useState<File | null>(null);
  const [importType, setImportType] = useState<"students" | "attendance" | "grades">("students");
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    importedCount: number;
    errors: string[];
    sampleProcessed: any[];
  } | null>(null);

  const handleDownloadTemplate = () => {
    const wb = XLSX.utils.book_new();
    const sampleStudents = [
      ["Codigo", "Nombres", "Apellidos", "Grado", "Seccion", "Asistencia", "Promedio"],
      ["ST-101", "Alvaro", "Mendoza Sanchez", "3°", "A", 95, 16],
      ["ST-102", "Luciana", "Perez Castillo", "3°", "A", 88, 14],
      ["ST-103", "Joaquin", "Flores Quispe", "5°", "B", 79, 11],
    ];
    const ws = XLSX.utils.aoa_to_sheet(sampleStudents);
    XLSX.utils.book_append_sheet(wb, ws, "Plantilla_Estudiantes");
    XLSX.writeFile(wb, "Plantilla_Carga_Estudiantes_LEAD.xlsx");
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setIsUploading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", importType);

    try {
      const res = await fetch("/api/import", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({
        success: false,
        importedCount: 0,
        errors: ["Error de red al subir el archivo."],
        sampleProcessed: [],
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-extrabold text-slate-900">
          Importación de Datos Educativos
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Carga masiva de nóminas de estudiantes, registros de asistencia y calificaciones mediante Excel o CSV.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Upload Form */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-100 shadow-soft">
          <form onSubmit={handleUpload} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Tipo de Información a Importar
              </label>
              <select
                value={importType}
                onChange={(e) => setImportType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
              >
                <option value="students">Nómina de Estudiantes y Rendimiento</option>
                <option value="attendance">Registro de Asistencia Diaria</option>
                <option value="grades">Calificaciones por Competencia</option>
              </select>
            </div>

            {/* Drop Zone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Archivo de Datos (.xlsx, .xls, .csv)
              </label>
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center hover:border-sky-500 hover:bg-sky-50/30 transition-all cursor-pointer">
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-2">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    {file ? file.name : "Seleccionar archivo de tu equipo"}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-1">
                    Formatos permitidos: Excel 2007+ (.xlsx), .xls o texto CSV
                  </span>
                </label>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleDownloadTemplate}
                className="text-xs font-semibold text-sky-600 hover:text-sky-700 flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Descargar plantilla de ejemplo</span>
              </button>

              <button
                type="submit"
                disabled={!file || isUploading}
                className="px-5 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white rounded-xl text-xs font-bold shadow-md shadow-sky-600/20 flex items-center gap-2 transition-all disabled:opacity-40"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Procesando datos...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>Comenzar Importación</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Feedback */}
          {result && (
            <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
              {result.success ? (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold">¡Importación completada con éxito!</h4>
                    <p className="mt-0.5">
                      Se han registrado correctamente <strong>{result.importedCount}</strong> filas en la base de datos de la escuela.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold">Error en la importación</h4>
                    <p className="mt-0.5">
                      No se pudieron procesar las filas debido a errores de formato o validación.
                    </p>
                  </div>
                </div>
              )}

              {result.errors.length > 0 && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
                  <span className="font-bold text-slate-700">Detalles:</span>
                  <ul className="list-disc list-inside text-rose-600 text-[11px] space-y-0.5">
                    {result.errors.map((err, i) => (
                      <li key={i}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Instructions Card */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-100 shadow-soft space-y-4">
          <h3 className="text-sm font-bold text-slate-800">
            Reglas de Validación Automática
          </h3>
          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <strong className="text-slate-900 block font-bold mb-1">
                Tipado y Validación Zod
              </strong>
              <span>
                Cada fila es analizada por esquemas estrictos de TypeScript y Zod en el backend de Next.js antes de persistir.
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <strong className="text-slate-900 block font-bold mb-1">
                Cálculo Automático de Riesgo
              </strong>
              <span>
                Si un estudiante tiene asistencia menor a 85% o promedio inferior a 12, el sistema le asigna automáticamente nivel de riesgo ALTO para intervenir oportunamente.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

