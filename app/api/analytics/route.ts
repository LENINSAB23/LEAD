import { NextResponse } from "next/server";
import { getDashboardData, getAnalyticsData } from "@/services/analyticsService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const view = searchParams.get("view");
    const period = searchParams.get("period") || undefined;
    const grade = searchParams.get("grade") || undefined;
    const section = searchParams.get("section") || undefined;
    const area = searchParams.get("area") || undefined;

    if (view === "dashboard") {
      const dashboard = await getDashboardData();
      return NextResponse.json({ success: true, data: dashboard });
    }

    const analytics = await getAnalyticsData({ period, grade, section, area });
    return NextResponse.json({ success: true, data: analytics });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Error al obtener analítica" },
      { status: 500 }
    );
  }
}

