import { getImprovementPlans } from "@/services/improvementPlanService";
import { ImprovementPlansView } from "@/features/improvement-plans/ImprovementPlansView";

export const revalidate = 0;

export default async function ImprovementPlansPage() {
  const data = await getImprovementPlans();
  return <ImprovementPlansView initialData={data} />;
}

