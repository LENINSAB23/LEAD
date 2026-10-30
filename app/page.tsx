import { getDashboardData } from "@/services/analyticsService";
import { DashboardView } from "@/features/dashboard/DashboardView";

export const revalidate = 0; // Dynamic server rendering

export default async function HomePage() {
  const data = await getDashboardData();
  return <DashboardView initialData={data} />;
}

