import database from '../config/database';
import ExperienceModel from '../models/Experience.model';
import ProjectModel from '../models/Project.model';
import EducationModel from '../models/Education.model';
import SkillModel from '../models/Skill.model';
import ProfileModel from '../models/Profile.model';

/**
 * Seed Script
 * Populates database with initial data from CV
 */

const profileData = {
  fullName: 'John Luis Alberto Castillo Reupo',
  title: 'Data Engineer | Estudiante de Ingeniería de Sistemas',
  email: 'castilloreupoluis@gmail.com',
  phone: '974052815',
  location: 'Lima, Perú',
  bio: 'Practicante de Data Engineering en Pacífico Seguros con pasión por Big Data y automatización.',
  summary: `Estudiante de Ingeniería de Sistemas (VIII Ciclo, Décimo Superior) en la UNMSM. Actualmente desempeñándome como Practicante de Data Engineering en Pacífico Seguros. Cuento con una sólida base teórica y práctica en SQL y Python, reforzada con proyectos académicos en entornos Cloud (Azure Data Factory, Azure Databricks) y on-premise como SSIS. Me caracterizo por ser autodidacta y tener una alta motivación por aprender nuevas tecnologías de Big Data y automatización. Busco consolidar mis conocimientos técnicos contribuyendo activamente en equipos de ingeniería de datos.`,
  profileImageUrl: 'https://res.cloudinary.com/dbmyhjhzq/image/upload/v1768752682/1740776197775_upgwll.jpg',
  linkedinUrl: '', // Agregar tu LinkedIn
  githubUrl: '', // Agregar tu GitHub
  languages: [
    { name: 'Español', proficiency: 'Nativo' },
    { name: 'Inglés', proficiency: 'Intermedio (ICPNA en curso)' },
  ],
  certifications: [
    { name: 'SQL Server Intermedio', issuer: 'Data Analítica' },
    { name: 'Análisis de Datos', issuer: 'W/E' },
    { name: 'SQL Server Avanzado', issuer: 'W/E education' },
    { name: 'Excel Avanzado', issuer: 'W/E Education' },
    { name: 'Programación Orientada a Objetos', issuer: 'Alura Latam' },
    { name: 'Python para Análisis de Datos', issuer: 'Udemy' },
  ],
};

const experiencesData = [
  {
    company: 'Pacífico Seguros',
    position: 'Practicante de Data Engineering - Data & Analytics',
    location: 'Lima, Perú',
    startDate: new Date('2025-09-01'),
    endDate: null,
    current: true,
    description: 'Apoyo en el desarrollo y mantenimiento de pipelines de datos (ETL/ELT) bajo la supervisión de ingenieros senior.',
    responsibilities: [
      'Apoyo en Pipelines: Colaboro en el desarrollo y mantenimiento de flujos de datos (ETL/ELT) bajo la supervisión de ingenieros senior, aprendiendo las mejores prácticas del ciclo de vida del dato.',
      'Calidad de Datos: Realizo validaciones básicas y monitoreo de procesos para asegurar la consistencia e integridad de la información procesada.',
      'Documentación: Apoyo en la redacción de documentación técnica y funcional, facilitando el entendimiento de los procesos para el equipo.',
      'Mejora Continua: Participo en la identificación de errores en los datos, contribuyendo a la resolución de incidencias operativas.',
    ],
    technologies: ['Azure Data Factory', 'Azure Databricks', 'PySpark', 'SQL Server', 'Python'],
    order: 1,
  },
  {
    company: 'Banco de Crédito del Perú (BCP)',
    position: 'Practicante Preprofesional - Gestión Administrativa y Análisis de Datos',
    location: 'Lima, Perú',
    startDate: new Date('2025-03-01'),
    endDate: new Date('2025-08-31'),
    current: false,
    description: 'Automatización de procesos y análisis de datos para reportes operativos.',
    responsibilities: [
      'Automatización de Scripts: Desarrollé scripts en Python para automatizar tareas manuales y simular procesos ETL, optimizando la generación de reportes operativos.',
      'Consultas en Cloud: Ejecuté consultas SQL en Azure Databricks para la extracción de datos hacia mi on-premise y realizar dashboards con estos.',
      'Visualización: Creé flujos de carga hacia Power BI para facilitar el seguimiento de presupuestos (PECOs) y métricas del equipo.',
    ],
    technologies: ['Python', 'Azure Databricks', 'SQL', 'Power BI', 'ETL'],
    order: 2,
  },
];

const projectsData = [
  {
    title: 'Simulación de Arquitectura Medallion en Databricks con PySpark',
    description: 'Implementación de pipeline con arquitectura de capas (Bronze, Silver, Gold) procesando dataset público.',
    longDescription: 'Implementé un prototipo de pipeline procesando un dataset público bajo la lógica de capas (Bronze, Silver, Gold). Exploré funcionalidades de Delta Lake como Time Travel para gestionar el control de versiones y la trazabilidad de los datos.',
    technologies: ['Azure Databricks', 'PySpark', 'Delta Lake', 'Python'],
    category: 'Data Engineering',
    date: new Date('2025-06-01'),
    featured: true,
    highlights: [
      'Arquitectura Medallion (Bronze, Silver, Gold)',
      'Delta Lake Time Travel',
      'Control de versiones de datos',
    ],
    order: 1,
  },
  {
    title: 'Carga Incremental con Azure Data Factory',
    description: 'Flujo de movimiento de datos con lógica de carga incremental (watermark) para optimizar rendimiento.',
    longDescription: 'Diseñé un flujo de movimiento de datos (Blob Storage a SQL Server), aplicando lógica de carga incremental (watermark) para procesar solo los registros nuevos y optimizar el rendimiento.',
    technologies: ['Azure Data Factory', 'Blob Storage', 'SQL Server', 'Watermark Pattern'],
    category: 'Cloud',
    date: new Date('2025-06-01'),
    featured: true,
    highlights: [
      'Carga incremental con watermark',
      'Optimización de rendimiento',
      'Integración Blob Storage - SQL Server',
    ],
    order: 2,
  },
  {
    title: 'Análisis de Ventas de Pizzería con SQL Server, Python y Power BI',
    description: 'Análisis exploratorio con SQL Server y Python, dashboard interactivo en Power BI.',
    longDescription: 'Realicé un análisis exploratorio utilizando SQL Server para consultas complejas y Python para la limpieza. Construí un dashboard interactivo en Power BI para monitorear KPIs clave como frecuencia de compra y comportamiento por cliente.',
    technologies: ['SQL Server', 'Python', 'Power BI', 'Pandas'],
    category: 'Data Analysis',
    date: new Date('2025-02-01'),
    featured: false,
    highlights: [
      'Consultas SQL complejas',
      'Limpieza de datos con Python',
      'Dashboard interactivo en Power BI',
    ],
    order: 3,
  },
  {
    title: 'ETL: Estrés y Rendimiento Académico - Kaggle',
    description: 'Pipeline ETL con Python y Pandas, dashboard en Power BI con filtros dinámicos.',
    longDescription: 'Desarrollé un pipeline en Python utilizando Pandas para la transformación de datos. Generé un dashboard en Power BI con filtros dinámicos que permitió visualizar la relación entre factores psicológicos y el rendimiento escolar.',
    technologies: ['Python', 'Pandas', 'Power BI', 'Kaggle'],
    category: 'Data Analysis',
    date: new Date('2025-01-01'),
    featured: false,
    highlights: [
      'Pipeline ETL con Pandas',
      'Análisis de factores psicológicos',
      'Visualización de correlaciones',
    ],
    order: 4,
  },
  {
    title: 'Sincronización Automática de Excel con SQL Server usando Python',
    description: 'Script Python que detecta cambios en Excel y actualiza automáticamente tablas SQL Server.',
    longDescription: 'Desarrollé un script que detecta cambios en archivos Excel y actualiza automáticamente los dataframes de pandas en tablas SQL Server. El sistema incluye validación de datos y logs de ejecución, eliminando la carga manual y reduciendo errores humanos.',
    technologies: ['Python', 'Pandas', 'SQL Server', 'Automation'],
    category: 'Automation',
    date: new Date('2024-12-01'),
    featured: true,
    highlights: [
      'Sincronización automática',
      'Validación de datos',
      'Sistema de logs',
    ],
    order: 5,
  },
  {
    title: 'Análisis Criminal en Estados Unidos con SQL Server y Excel',
    description: 'Procesamiento de más de 1 millón de registros para detectar zonas críticas.',
    longDescription: 'Procesé más de 1 millón de registros para detectar zonas críticas. Utilicé SQL Server para la segmentación por tipo de delito y generé reportes dinámicos en Excel que facilitaron la identificación de áreas de alta peligrosidad.',
    technologies: ['SQL Server', 'Excel', 'Data Analysis'],
    category: 'Data Analysis',
    date: new Date('2024-11-01'),
    featured: false,
    highlights: [
      'Procesamiento de 1M+ registros',
      'Segmentación por tipo de delito',
      'Identificación de zonas críticas',
    ],
    order: 6,
  },
];

const educationData = [
  {
    institution: 'Universidad Nacional Mayor de San Marcos',
    degree: 'Bachiller en Ingeniería de Sistemas',
    field: 'Ingeniería de Sistemas',
    location: 'Lima, Perú',
    startDate: new Date('2022-01-01'),
    endDate: null,
    current: true,
    gpa: 'Décimo Superior',
    achievements: [
      'VIII Ciclo en curso',
      'Décimo Superior',
    ],
    order: 1,
  },
];

const skillsData = [
  // Lenguajes de Programación
  { name: 'Python', category: 'Lenguajes de Programación', proficiency: 'Intermedio', order: 1 },
  { name: 'SQL', category: 'Lenguajes de Programación', proficiency: 'Avanzado', order: 2 },

  // Bases de Datos
  { name: 'SQL Server', category: 'Bases de Datos', proficiency: 'Avanzado', order: 3 },
  { name: 'MongoDB', category: 'Bases de Datos', proficiency: 'Básico', order: 4 },

  // Cloud & Big Data
  { name: 'Azure Data Factory', category: 'Cloud & Big Data', proficiency: 'Intermedio', order: 5 },
  { name: 'Azure Databricks', category: 'Cloud & Big Data', proficiency: 'Intermedio', order: 6 },
  { name: 'PySpark', category: 'Cloud & Big Data', proficiency: 'Básico', order: 7 },
  { name: 'Apache Airflow', category: 'Cloud & Big Data', proficiency: 'Básico', order: 8 },

  // Herramientas
  { name: 'Git', category: 'Herramientas', proficiency: 'Intermedio', order: 9 },
  { name: 'Excel', category: 'Herramientas', proficiency: 'Avanzado', order: 10 },
  { name: 'SSIS', category: 'Herramientas', proficiency: 'Intermedio', order: 11 },
  { name: 'Power Automate', category: 'Herramientas', proficiency: 'Básico', order: 12 },
  { name: 'Pandas', category: 'Herramientas', proficiency: 'Intermedio', order: 13 },

  // BI & Visualización
  { name: 'Power BI', category: 'BI & Visualización', proficiency: 'Intermedio', order: 14 },
];

async function seed() {
  try {
    console.log('🌱 Starting seed process...');

    // Connect to database
    await database.connect();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      ExperienceModel.deleteMany({}),
      ProjectModel.deleteMany({}),
      EducationModel.deleteMany({}),
      SkillModel.deleteMany({}),
      ProfileModel.deleteMany({}),
    ]);

    // Insert data
    console.log('📝 Inserting profile...');
    await ProfileModel.create(profileData);

    console.log('💼 Inserting experiences...');
    await ExperienceModel.insertMany(experiencesData);

    console.log('🚀 Inserting projects...');
    await ProjectModel.insertMany(projectsData);

    console.log('🎓 Inserting education...');
    await EducationModel.insertMany(educationData);

    console.log('⚡ Inserting skills...');
    await SkillModel.insertMany(skillsData);

    console.log('✅ Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

// Run seed
seed();
