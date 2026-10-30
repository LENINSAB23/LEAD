import { NextResponse } from "next/server";
import { askEducationalAI } from "@/services/aiAssistantService";
import { aiQuerySchema } from "@/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = aiQuerySchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validated.error.issues.map((i) => i.message),
        },
        { status: 400 }
      );
    }

    const aiResponse = await askEducationalAI(validated.data.query);
    return NextResponse.json({ success: true, message: aiResponse });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Error procesando consulta IA" },
      { status: 500 }
    );
  }
}

