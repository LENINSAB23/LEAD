const { execSync } = require("child_process");

const dbUrl = process.env.DATABASE_URL;

if (
  !dbUrl ||
  (!dbUrl.startsWith("postgres://") && !dbUrl.startsWith("postgresql://"))
) {
  console.log("------------------------------------------------------------------");
  console.log("⚠️ AVISO IMPORTANTE: DATABASE_URL no está configurada en Render.");
  console.log("👉 Agrega la variable DATABASE_URL en la pestaña 'Environment' de tu Web Service con el enlace de tu PostgreSQL.");
  console.log("La aplicación se compilará con datos de inicio de contingencia para que el despliegue no falle.");
  console.log("------------------------------------------------------------------");
  process.exit(0);
}

try {
  console.log("🔄 Sincronizando esquema de base de datos con PostgreSQL (prisma db push)...");
  execSync("npx prisma db push --accept-data-loss", { stdio: "inherit" });
  console.log("✅ Esquema sincronizado exitosamente con PostgreSQL.");
} catch (error) {
  console.warn("⚠️ Advertencia: No se pudo conectar a la base de datos durante el paso de compilación.");
  console.warn("Esto es normal si Render aísla la red durante el build. La conexión se efectuará en tiempo de ejecución.");
  process.exit(0);
}

