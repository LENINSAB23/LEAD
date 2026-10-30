import { prisma, isDatabaseConnected } from "@/lib/prisma";
import { initialTeachers } from "./seedData";
import { TeacherListItem } from "@/types";

let memoryTeachers: TeacherListItem[] = [...initialTeachers];

export async function getTeachers(search?: string): Promise<TeacherListItem[]> {
  const isConnected = await isDatabaseConnected();

  if (isConnected) {
    try {
      const dbTeachers = await prisma.teacher.findMany({
        orderBy: { name: "asc" },
      });

      if (dbTeachers && dbTeachers.length > 0) {
        let result: TeacherListItem[] = dbTeachers.map((t) => ({
          id: t.id,
          name: t.name,
          email: t.email,
          specialty: t.specialty,
          status: t.status,
          trainingScore: t.trainingScore,
          hoursCompleted: t.hoursCompleted,
        }));

        if (search) {
          const q = search.toLowerCase();
          result = result.filter(
            (t) =>
              t.name.toLowerCase().includes(q) ||
              t.specialty.toLowerCase().includes(q)
          );
        }
        return result;
      }
    } catch {
      // Fallback
    }
  }

  let result = [...memoryTeachers];
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.specialty.toLowerCase().includes(q)
    );
  }
  return result;
}
