import { NextResponse } from "next/server";
import { getStudents, addStudent } from "@/services/studentService";
import { RiskLevel } from "@/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const grade = searchParams.get("grade") || undefined;
    const search = searchParams.get("search") || undefined;
    const riskLevel = (searchParams.get("risk") as RiskLevel) || undefined;

    const students = await getStudents({ grade, search, riskLevel });
    return NextResponse.json({ success: true, data: students });
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
    const created = await addStudent(body);
    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

