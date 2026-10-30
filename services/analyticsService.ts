import { prisma, isDatabaseConnected } from "@/lib/prisma";
import {
  initialKPICards,
  initialSparklinePoints,
  initialGradePerformances,
  initialHeatmapData,
  initialRecommendations,
  initialAreaBenchmarks,
  initialLearningEvolution,
  initialResourceUsage,
  initialCommunityParticipation,
} from "./seedData";
import {
  KPICardData,
  SparklinePoint,
  GradePerformance,
  HeatmapCell,
  PriorityRecommendation,
  AreaBenchmark,
  LearningEvolutionPoint,
  ResourceUsageItem,
  CommunityPoint,
} from "@/types";

export interface AnalyticsFilter {
  period?: string;
  grade?: string;
  section?: string;
  area?: string;
}

export async function getDashboardData() {
  const isConnected = await isDatabaseConnected();

  if (isConnected) {
    try {
      const school = await prisma.school.findFirst({
        include: {
          grades: {
            include: {
              students: true,
              grades: true,
              attendance: true,
            },
          },
        },
      });

      if (school && school.grades.length > 0) {
        let totalAttendance = 0;
        let attendanceCount = 0;
        let totalScore = 0;
        let scoreCount = 0;

        const gradePerformances: GradePerformance[] = school.grades.map((g) => {
          const avgScore =
            g.grades.length > 0
              ? g.grades.reduce((acc, curr) => acc + curr.score, 0) / g.grades.length
              : 80;
          const presentCount = g.attendance.filter(
            (a) => a.status === "PRESENTE"
          ).length;
          const attRate =
            g.attendance.length > 0
              ? Math.round((presentCount / g.attendance.length) * 100)
              : 90;

          totalAttendance += attRate;
          attendanceCount++;
          totalScore += avgScore;
          scoreCount++;

          return {
            grade: `${g.number}°`,
            gradeNumber: g.number,
            score: Math.round(avgScore),
            attendance: attRate,
          };
        });

        const avgAtt =
          attendanceCount > 0 ? Math.round(totalAttendance / attendanceCount) : 92;
        const avgSco = scoreCount > 0 ? Math.round(totalScore / scoreCount) : 78;

        const dynamicKPIs: KPICardData[] = [
          {
            title: "Asistencia",
            value: `${avgAtt}%`,
            change: "-4%",
            trend: "down",
            category: "asistencia",
            iconName: "CalendarCheck",
          },
          {
            title: "Aprendizaje",
            value: `${avgSco}%`,
            change: "+6%",
            trend: "up",
            category: "aprendizaje",
            iconName: "GraduationCap",
          },
          {
            title: "Formación docente",
            value: "85%",
            change: "+12%",
            trend: "up",
            category: "formacion",
            iconName: "Users",
          },
          {
            title: "Uso de recursos",
            value: "76%",
            change: "-8%",
            trend: "down",
            category: "recursos",
            iconName: "Layers",
          },
          {
            title: "Participación",
            value: "81%",
            change: "+5%",
            trend: "up",
            category: "participacion",
            iconName: "HeartHandshake",
          },
        ];

        return {
          kpis: dynamicKPIs,
          sparkline: initialSparklinePoints,
          gradePerformances,
          heatmap: initialHeatmapData,
          recommendations: initialRecommendations,
          source: "database",
        };
      }
    } catch {
      // Fall through to seed data
    }
  }

  return {
    kpis: initialKPICards,
    sparkline: initialSparklinePoints,
    gradePerformances: initialGradePerformances,
    heatmap: initialHeatmapData,
    recommendations: initialRecommendations,
    source: "seed-fallback",
  };
}

export async function getAnalyticsData(filters?: AnalyticsFilter) {
  let gradePerformances = [...initialGradePerformances];
  let areaBenchmarks = [...initialAreaBenchmarks];
  let learningEvolution = [...initialLearningEvolution];

  if (filters?.grade && filters.grade !== "Todos") {
    gradePerformances = gradePerformances.filter(
      (g) => g.grade === filters.grade || `${g.gradeNumber}°` === filters.grade
    );
  }

  if (filters?.area && filters.area !== "Todas") {
    areaBenchmarks = areaBenchmarks.filter(
      (a) => a.area.toLowerCase() === filters.area?.toLowerCase()
    );
  }

  return {
    areaBenchmarks,
    learningEvolution,
    attendanceByGrade: gradePerformances,
    resourceUsage: initialResourceUsage,
    communityParticipation: initialCommunityParticipation,
    source: "ready",
  };
}
