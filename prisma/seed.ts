import { PrismaClient } from "@prisma/client";
import {
  initialSchoolInfo,
  initialGradePerformances,
  initialHeatmapData,
  initialRecommendations,
  initialImprovementPlans,
  initialEducationalAlerts,
  initialResourceUsage,
  initialCommunityParticipation,
  initialTeachers,
  initialStudents,
} from "../services/seedData";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando siembra de base de datos PostgreSQL para LEAD...");

  // 1. Limpiar o asegurar escuela
  const school = await prisma.school.upsert({
    where: { modularCode: initialSchoolInfo.modularCode },
    update: {
      name: initialSchoolInfo.name,
      level: initialSchoolInfo.level,
      academicPeriod: initialSchoolInfo.academicPeriod,
    },
    create: {
      name: initialSchoolInfo.name,
      modularCode: initialSchoolInfo.modularCode,
      level: initialSchoolInfo.level,
      academicPeriod: initialSchoolInfo.academicPeriod,
    },
  });

  console.log(`✅ Escuela sincronizada: ${school.name}`);

  // 2. Crear usuario Director demo
  await prisma.user.upsert({
    where: { email: "director@lead.edu.pe" },
    update: {},
    create: {
      name: "Director Demo",
      email: "director@lead.edu.pe",
      passwordHash: "$2a$10$wK1kYF6.P9hG4/iU.oUf8.lM2vB0bU4Uv8Vq2sWp3z0m1n2o3p4q",
      role: "DIRECTOR",
      schoolId: school.id,
    },
  });

  // 3. Crear Áreas Curriculares
  const areas = [
    { name: "Matemática", code: "MAT" },
    { name: "Comunicación", code: "COM" },
    { name: "Ciencia y Tecnología", code: "CYT" },
    { name: "Personal Social", code: "PS" },
  ];

  for (const a of areas) {
    await prisma.subjectArea.upsert({
      where: { code: a.code },
      update: { name: a.name },
      create: { name: a.name, code: a.code },
    });
  }

  // 4. Crear Grados y Secciones (1° a 6°)
  for (let num = 1; num <= 6; num++) {
    const grade = await prisma.grade.upsert({
      where: {
        schoolId_number: {
          schoolId: school.id,
          number: num,
        },
      },
      update: { name: `${num}° Grado` },
      create: {
        name: `${num}° Grado`,
        number: num,
        schoolId: school.id,
      },
    });

    for (const sec of ["A", "B"]) {
      await prisma.section.upsert({
        where: {
          gradeId_name: {
            gradeId: grade.id,
            name: sec,
          },
        },
        update: {},
        create: {
          name: sec,
          gradeId: grade.id,
        },
      });
    }
  }

  // 5. Crear Planes de Mejora
  for (const p of initialImprovementPlans) {
    await prisma.improvementPlan.create({
      data: {
        title: p.title,
        description: `Plan institucional de mejora continua para ${p.area}.`,
        area: p.area,
        responsible: p.responsible,
        deadline: new Date("2024-11-30"),
        priority: p.priority as any,
        status: p.status.replace(" ", "_") as any,
        impact: p.impact,
        currentPhase: (p.phase as any) ?? "Planificacion",
        schoolId: school.id,
      },
    });
  }

  // 6. Crear Alertas Educativas
  for (const a of initialEducationalAlerts) {
    await prisma.educationalAlert.create({
      data: {
        title: a.title,
        description: a.description,
        severity: a.severity as any,
        area: a.area,
        schoolId: school.id,
      },
    });
  }

  // 7. Docentes
  for (const t of initialTeachers) {
    await prisma.teacher.upsert({
      where: { email: t.email },
      update: {
        specialty: t.specialty,
        trainingScore: t.trainingScore,
        hoursCompleted: t.hoursCompleted,
      },
      create: {
        name: t.name,
        email: t.email,
        specialty: t.specialty,
        status: t.status,
        trainingScore: t.trainingScore,
        hoursCompleted: t.hoursCompleted,
        schoolId: school.id,
      },
    });
  }

  console.log("🎉 Siembra completada exitosamente en PostgreSQL.");
}

main()
  .catch((e) => {
    console.error("Error durante el seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

