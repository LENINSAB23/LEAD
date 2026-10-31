# LEAD — La escuela que aprende de sus datos

Plataforma SaaS Full Stack profesional de **Analítica Educativa e Inteligencia Artificial** construida exclusivamente sobre el ecosistema **TypeScript**.

---

## 1. Stack Tecnológico Obligatorio

- **Lenguaje Principal:** TypeScript (100% en Frontend y Backend).
- **Framework Full Stack:** Next.js 14 (App Router) + React 18.
- **Frontend & UI:**
  - Tailwind CSS con paleta corporativa LEAD (Azul Marino `#0b2341`, Azul Primario `#0284c7`, Blancos y fondos suaves `#f1f5f9`).
  - Lucide React para iconografía de alta calidad.
  - Recharts para gráficos analíticos (barras comparativas, evolución multi-línea, dona de recursos, áreas y mapa de calor).
  - Framer Motion para micro-interacciones suaves.
- **Backend:**
  - Next.js Server Actions y Route Handlers (100% TypeScript).
  - API REST endpoints para analítica, planes de mejora, estudiantes, docentes e importación.
- **Base de Datos & ORM:**
  - PostgreSQL con Prisma ORM (`prisma/schema.prisma`).
  - Modelo relacional: `School`, `User`, `Grade`, `Section`, `SubjectArea`, `Student`, `AttendanceRecord`, `GradeRecord`, `ImprovementPlan`, `EducationalAlert`, `ResourceMetric`, `CommunityMetric`, `ChatMessage`.
  - Script de siembra (`prisma/seed.ts`) para poblar la base de datos con los registros reales.
- **Procesamiento de Datos & Reportes:**
  - `xlsx` para lectura y escritura masiva de archivos Excel y CSV.
  - `jspdf` y `jspdf-autotable` para generación de informes ejecutivos en formato PDF oficial.
  - Validación de esquemas con Zod (`validations/index.ts`).
- **Inteligencia Artificial:**
  - Motor de IA fundamentado en los datos reales de la institución educativa.
  - Soporte nativo para Google Gemini API (`GEMINI_API_KEY`) y motor pedagógico contextualizado.

---

## 2. Arquitectura del Proyecto

```plaintext
Lead/
├── app/                        # Next.js App Router (Páginas y API Route Handlers)
│   ├── actions/                # Next.js Server Actions (TypeScript server mutations)
│   ├── analitica/              # Vista de analítica educativa y comparativas
│   ├── api/                    # Endpoints REST (analytics, plans, ai/chat, reports/export, import)
│   ├── asistente-ia/           # Interfaz de chat del Asistente IA de LEAD
│   ├── configuracion/          # Configuración de escuela, periodos lectivos y estado del sistema
│   ├── docentes/               # Gestión docente y horas de formación
│   ├── estudiantes/            # Gestión de estudiantes y detección de riesgo
│   ├── importar/               # Módulo de importación de Excel/CSV con Zod
│   ├── planes-de-mejora/       # Gestión de planes de acción y alertas
│   ├── reportes/               # Centro de generación de reportes PDF y Excel
│   ├── globals.css             # Estilos globales y Tailwind CSS
│   ├── layout.tsx              # Shell general con Sidebar y Header
│   └── page.tsx                # Dashboard principal de LEAD
├── components/                 # Componentes reutilizables de UI y Maquetación
│   ├── layout/                 # Sidebar corporativo y Header interactivo con búsqueda
│   └── ui/                     # Primitivas de interfaz
├── features/                   # Módulos funcionales desacoplados
│   ├── ai-assistant/           # Componente Asistente IA con preguntas sugeridas y chat
│   ├── analytics/              # Componente Analítica con filtros y pestañas
│   ├── dashboard/              # Componente Dashboard con KPIs, mapa de calor y alertas
│   ├── data-import/            # Componente de importación masiva con validación
│   ├── improvement-plans/      # Componente de planes de mejora y stepper de fases
│   ├── reports/                # Componente de descarga de informes
│   ├── settings/               # Componente de configuración y monitor de base de datos
│   ├── students/               # Componente de padrón y alertas de riesgo
│   └── teachers/               # Componente de seguimiento formativo docente
├── lib/                        # Configuraciones y clientes singleton
│   ├── prisma.ts               # Cliente Prisma con verificación de conexión
│   └── utils.ts                # Utilidades de estilo y formateadores
├── prisma/                     # Esquema y semillas de base de datos
│   ├── schema.prisma           # Esquema relacional PostgreSQL
│   └── seed.ts                 # Script de inicialización de datos escolares
├── public/                     # Recursos estáticos
│   └── images/                 # Logotipo corporativo de LEAD
├── services/                   # Lógica de negocio y acceso a datos
│   ├── aiAssistantService.ts   # Motor de recomendaciones y conexión con Gemini
│   ├── analyticsService.ts     # Cálculos estadísticos y agregaciones
│   ├── importService.ts        # Procesamiento y validación de archivos Excel/CSV
│   ├── improvementPlanService.ts# Lógica de planes de mejora y alertas
│   ├── reportService.ts        # Generador de Excel (.xlsx) y PDF (.pdf)
│   ├── seedData.ts             # Datos institucionales iniciales de alta fidelidad
│   ├── studentService.ts       # Consultas y filtros de estudiantes
│   └── teacherService.ts       # Consultas y seguimiento docente
├── types/                      # Interfaces y tipos TypeScript
├── validations/                # Esquemas de validación Zod
├── .env.example                # Plantilla de variables de entorno
└── package.json                # Dependencias y scripts de ejecución
```

---

## 3. Puesta en Marcha

### Prerrequisitos
- Node.js >= 18 (o 20+).
- Instancia de PostgreSQL (local, Docker, Supabase o Neon).

### Instalación de dependencias
```bash
npm install
```

### Configuración de Base de Datos
En el archivo `.env`:
```env
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/lead_db?schema=public"
NEXTAUTH_SECRET="lead_super_secure_jwt_secret_education_analytics_2024"
GEMINI_API_KEY="" # Opcional para habilitar llamadas a Google Gemini
```

### Sincronización y siembra de datos en PostgreSQL
```bash
npx prisma db push
npm run prisma:seed
```

### Ejecución en Modo Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

### Compilación y Ejecución en Producción
```bash
npm run build
npm run start
```

---

## 4. Despliegue en Render (Paso a Paso)

El proyecto incluye soporte nativo para **Render** mediante `render.yaml` (Blueprints) y despliegue manual.

### Opción A: Despliegue Automático mediante Blueprints (Recomendado)
1. Inicia sesión en [Render](https://dashboard.render.com).
2. Haz clic en **New +** y selecciona **Blueprint**.
3. Conecta tu repositorio de GitHub `https://github.com/LENINSAB23/LEAD`.
4. Render leerá automáticamente el archivo `render.yaml`, creando:
   - La base de datos PostgreSQL administrada (`lead-postgres`).
   - El servicio web Next.js (`lead-analytics`), conectando automáticamente las variables de entorno.
5. Haz clic en **Apply** y listo.

### Opción B: Despliegue Manual desde el Dashboard de Render

#### Paso 1: Crear la Base de Datos PostgreSQL en Render
1. En el Dashboard de Render, haz clic en **New +** -> **PostgreSQL**.
2. Configura los campos:
   - **Name:** `lead-postgres`
   - **Database:** `lead_db`
   - **User:** `lead_admin`
   - **Region:** `Oregon (US West)` (o la más cercana)
   - **Plan:** `Free`
3. Haz clic en **Create Database**.
4. Una vez creada, copia el **Internal Database URL** (para servicios en la misma red de Render).

#### Paso 2: Crear el Web Service en Render
1. Haz clic en **New +** -> **Web Service**.
2. Conecta el repositorio: `https://github.com/LENINSAB23/LEAD`.
3. Completa los siguientes parámetros:
   - **Name:** `lead-analytics`
   - **Language:** `Node`
   - **Branch:** `main`
   - **Region:** Misma región elegida para la base de datos (ej. `Oregon`)
   - **Build Command:** `npm install && npx prisma generate && npx prisma db push && npm run build`
   - **Start Command:** `npm run start`
   - **Plan:** `Free`

#### Paso 3: Variables de Entorno en el Web Service
En la pestaña **Environment** del Web Service, agrega:
- `DATABASE_URL`: Pegar el **Internal Database URL** obtenido en el Paso 1.
- `NODE_ENV`: `production`
- `NEXTAUTH_SECRET`: Un texto aleatorio seguro (o presiona "Generate").
- `NEXTAUTH_URL`: `https://tu-servicio.onrender.com` (la URL generada por Render).
- `GEMINI_API_KEY`: *(Opcional)* Tu API Key de Google Gemini si deseas respuestas directas del modelo.

#### Paso 4: Poblar la Base de Datos Inicial (Seed)
En la pestaña **Shell** de tu Web Service en Render, ejecuta:
```bash
npm run prisma:seed
```
Esto insertará automáticamente la escuela demo, grados de 1° a 6°, docentes, estudiantes y los planes de mejora iniciales.


