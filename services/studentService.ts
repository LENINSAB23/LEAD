import { prisma, isDatabaseConnected } from "@/lib/prisma";
import { initialStudents } from "./seedData";
import { StudentListItem, RiskLevel } from "@/types";

let memoryStudents: StudentListItem[] = [...initialStudents];

export async function getStudents(filters?: {
  grade?: string;
  search?: string;
  riskLevel?: RiskLevel;
}): Promise<StudentListItem[]> {
  const isConnected = await isDatabaseConnected();

  if (isConnected) {
    try {
      const dbStudents = await prisma.student.findMany({
        include: {
          grade: true,
          section: true,
        },
        orderBy: { lastName: "asc" },
      });

      if (dbStudents && dbStudents.length > 0) {
        let result: StudentListItem[] = dbStudents.map((s) => ({
          id: s.id,
          code: s.code,
          name: `${s.firstName} ${s.lastName}`,
          grade: `${s.grade.number}°`,
          section: s.section.name,
          attendanceRate: s.attendanceRate,
          averageScore: s.averageScore,
          riskLevel: s.riskLevel as RiskLevel,
        }));

        if (filters?.grade && filters.grade !== "Todos") {
          result = result.filter((s) => s.grade === filters.grade);
        }
        if (filters?.riskLevel) {
          result = result.filter((s) => s.riskLevel === filters.riskLevel);
        }
        if (filters?.search) {
          const q = filters.search.toLowerCase();
          result = result.filter(
            (s) =>
              s.name.toLowerCase().includes(q) ||
              s.code.toLowerCase().includes(q)
          );
        }
        return result;
      }
    } catch {
      // Fallback
    }
  }

  let result = [...memoryStudents];
  if (filters?.grade && filters.grade !== "Todos") {
    result = result.filter((s) => s.grade === filters.grade);
  }
  if (filters?.riskLevel) {
    result = result.filter((s) => s.riskLevel === filters.riskLevel);
  }
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.code.toLowerCase().includes(q)
    );
  }
  return result;
}

export async function addStudent(student: Omit<StudentListItem, "id">) {
  const newStudent: StudentListItem = {
    id: `std-${Date.now()}`,
    ...student,
  };
  memoryStudents.unshift(newStudent);
  return newStudent;
}
