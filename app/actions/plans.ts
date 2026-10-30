"use server";

import { revalidatePath } from "next/cache";
import { createImprovementPlan, updatePlanStatus } from "@/services/improvementPlanService";
import { createPlanSchema, CreatePlanInput } from "@/validations";
import { ImprovementPlanItem } from "@/types";

export async function createPlanAction(data: CreatePlanInput): Promise<{
  success: boolean;
  plan?: ImprovementPlanItem;
  errors?: string[];
}> {
  const validation = createPlanSchema.safeParse(data);
  if (!validation.success) {
    return {
      success: false,
      errors: validation.error.issues.map((i) => i.message),
    };
  }

  try {
    const created = await createImprovementPlan(validation.data);
    revalidatePath("/planes-de-mejora");
    revalidatePath("/");
    return { success: true, plan: created };
  } catch (error: any) {
    return {
      success: false,
      errors: [error.message || "Error al crear el plan de mejora"],
    };
  }
}

export async function updatePlanStatusAction(
  id: string,
  status: ImprovementPlanItem["status"]
) {
  try {
    const ok = await updatePlanStatus(id, status);
    revalidatePath("/planes-de-mejora");
    return { success: ok };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

