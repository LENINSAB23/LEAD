import { getStudents } from "@/services/studentService";
import { StudentsView } from "@/features/students/StudentsView";

export const revalidate = 0;

export default async function StudentsPage() {
  const students = await getStudents();
  return <StudentsView initialStudents={students} />;
}

