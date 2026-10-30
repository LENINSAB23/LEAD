import { NextResponse } from "next/server";
import { generateExcelReport, generatePdfReport } from "@/services/reportService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "excel";

    if (type === "pdf") {
      const pdfBytes = await generatePdfReport();
      const buffer = Buffer.from(pdfBytes);
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="Reporte_Educativo_LEAD_${Date.now()}.pdf"`,
        },
      });
    }

    // Default: Excel
    const excelBytes = await generateExcelReport();
    const buffer = Buffer.from(excelBytes);
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="Reporte_Consolidado_LEAD_${Date.now()}.xlsx"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Error al exportar reporte" },
      { status: 500 }
    );
  }
}
