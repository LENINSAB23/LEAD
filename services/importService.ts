import * as XLSX from "xlsx";
import { studentRowSchema, StudentRowInput } from "@/validations";
import { addStudent } from "./studentService";

export interface ImportResult {
  success: boolean;
  importedCount: number;
  errors: string[];
  sampleProcessed: any[];
}

export async function processDataImport(
  buffer: Buffer,
  type: "students" | "attendance" | "grades"
): Promise<ImportResult> {
  const errors: string[] = [];
  const processed: any[] = [];
  let importedCount = 0;

  try {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    if (!sheetName) {
      return { success: false, importedCount: 0, errors: ["El archivo no contiene hojas de datos"], sampleProcessed: [] };
    }

    const worksheet = workbook.Sheets[sheetName];
    const rawData = XLSX.utils.sheet_to_json<any>(worksheet);

    if (rawData.length === 0) {
      return { success: false, importedCount: 0, errors: ["La hoja de cálculo está vacía"], sampleProcessed: [] };
    }

    if (type === "students") {
      for (let i = 0; i < rawData.length; i++) {
        const row = rawData[i];
        // Normalize keys (lowercase and trimmed)
        const normalized: Record<string, any> = {};
        for (const [k, v] of Object.entries(row)) {
          normalized[k.trim().toLowerCase()] = v;
        }

        const candidate = {
          code: String(normalized["codigo"] || normalized["code"] || `ST-${100 + i}`),
          firstName: String(normalized["nombre"] || normalized["nombres"] || normalized["firstname"] || "Estudiante"),
          lastName: String(normalized["apellidos"] || normalized["apellido"] || normalized["lastname"] || `${i + 1}`),
          grade: String(normalized["grado"] || normalized["grade"] || "1°"),
          section: String(normalized["seccion"] || normalized["sección"] || normalized["section"] || "A"),
          attendanceRate: Number(normalized["asistencia"] || normalized["attendance"] || 92),
          averageScore: Number(normalized["promedio"] || normalized["score"] || 15),
        };

        const validation = studentRowSchema.safeParse(candidate);
        if (validation.success) {
          const validData = validation.data;
          const riskLevel =
            validData.attendanceRate < 85 || validData.averageScore < 12
              ? "ALTO"
              : validData.attendanceRate < 90 || validData.averageScore < 14
              ? "MEDIO"
              : "BAJO";

          const studentObj = {
            code: validData.code,
            name: `${validData.firstName} ${validData.lastName}`,
            grade: validData.grade.includes("°") ? validData.grade : `${validData.grade}°`,
            section: validData.section.toUpperCase(),
            attendanceRate: validData.attendanceRate,
            averageScore: validData.averageScore,
            riskLevel: riskLevel as any,
          };

          await addStudent(studentObj);
          importedCount++;
          if (processed.length < 5) {
            processed.push(studentObj);
          }
        } else {
          errors.push(`Fila ${i + 2}: ${validation.error.issues.map((iss) => iss.message).join(", ")}`);
        }
      }
    }

    return {
      success: importedCount > 0,
      importedCount,
      errors: errors.slice(0, 10), // Limit error message size
      sampleProcessed: processed,
    };
  } catch (err: any) {
    return {
      success: false,
      importedCount: 0,
      errors: [`Error al procesar el archivo: ${err.message}`],
      sampleProcessed: [],
    };
  }
}

