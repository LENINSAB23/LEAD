import { NextResponse } from "next/server";
import {
  getImprovementPlans,
  createImprovementPlan,
  updatePlanStatus,
} from "@/services/improvementPlanService";
import { createPlanSchema } from "@/validations";

export async function GET() {
  try {
    const data = await getImprovementPlans();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createPlanSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validated.error.issues.map((i) => i.message),
        },
        { status: 400 }
      );
    }

    const created = await createImprovementPlan(validated.data);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "id and status are required" },
        { status: 400 }
      );
    }
    const updated = await updatePlanStatus(id, status);
    return NextResponse.json({ success: true, updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

