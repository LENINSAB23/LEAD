import { getTeachers } from "@/services/teacherService";
import { TeachersView } from "@/features/teachers/TeachersView";

export const revalidate = 0;

export default async function TeachersPage() {
  const teachers = await getTeachers();
  return <TeachersView initialTeachers={teachers} />;
}

