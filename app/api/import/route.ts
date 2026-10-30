import { NextResponse } from "next/server";
import { processDataImport } from "@/services/importService";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const type = (formData.get("type") as "students" | "attendance" | "grades") || "students";

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No se ha subido ningún archivo" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await processDataImport(buffer, type);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Error al procesar archivo" },
      { status: 500 }
    );
  }
}

