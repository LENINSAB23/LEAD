import { NextResponse } from "next/server";
import { getTeachers } from "@/services/teacherService";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || undefined;
    const teachers = await getTeachers(search);
    return NextResponse.json({ success: true, data: teachers });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

