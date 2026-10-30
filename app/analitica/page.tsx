import { getAnalyticsData } from "@/services/analyticsService";
import { AnalyticsView } from "@/features/analytics/AnalyticsView";

export const revalidate = 0;

export default async function AnalyticsPage() {
  const data = await getAnalyticsData();
  return <AnalyticsView initialData={data} />;
}

