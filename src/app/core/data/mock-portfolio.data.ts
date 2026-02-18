import type Blog from '../entities/Blogs';
import type CertificateAndCourse from '../entities/CertificatesAndCources';
import type Experience from '../entities/Experience';
import type Project from '../entities/Projects';
import type Skill from '../entities/Skils';
import type Studies from '../entities/Studies';
import ProjectsStatus from '../enums/projects_status';
import SkillsTypes from '../enums/skills_types';
import TypeWorks from '../enums/work_types';

// ─────────────────────────────────────────────
// BLOGS
// ─────────────────────────────────────────────
export const MOCK_BLOGS: Blog[] = [
  {
    index: 1,
    Title: 'Cómo Implementar Glassmorphism en Angular',
    Descriptions:
      'Una guía práctica sobre cómo aplicar el efecto de glassmorphism en componentes Angular usando CSS moderno y backdrop-filter para crear interfaces visualmente atractivas.',
    ImgesUrls: [
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    ],
    Tags: ['Angular', 'CSS', 'Glassmorphism', 'UI/UX'],
    Date: '15-01-2025',
    Location: 'Guayaquil, Ecuador',
  },
  {
    index: 2,
    Title: 'Patrones de Diseño en TypeScript para el Frontend',
    Descriptions:
      'Exploramos los patrones de diseño más útiles para aplicaciones frontend modernas: Observer, Strategy y Decorator, con ejemplos reales en TypeScript.',
    ImgesUrls: [
      'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800',
    ],
    Tags: ['TypeScript', 'Design Patterns', 'Frontend', 'Best Practices'],
    Date: '03-06-2024',
    Location: 'Quito, Ecuador',
  },
  {
    index: 3,
    Title: 'Animaciones con Framer Motion y React',
    Descriptions:
      'Aprende a crear animaciones fluidas y atractivas usando Framer Motion en aplicaciones React. Desde transiciones simples hasta animaciones complejas con gestos.',
    ImgesUrls: [
      'https://images.unsplash.com/photo-1550063873-ab792950096b?w=800',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800',
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800',
    ],
    Tags: ['React', 'Framer Motion', 'Animaciones', 'UX'],
    Date: '22-11-2024',
    Location: 'Medellín, Colombia',
  },
  {
    index: 4,
    Title: 'Microfrontends: Arquitectura del Futuro',
    Descriptions:
      'Un análisis profundo sobre la arquitectura de microfrontends, sus ventajas, desafíos y cómo implementarla usando Module Federation de Webpack.',
    ImgesUrls: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
    ],
    Tags: ['Microfrontends', 'Webpack', 'Arquitectura', 'Module Federation'],
    Date: '10-09-2024',
    Location: 'Buenos Aires, Argentina',
  },
];

// ─────────────────────────────────────────────
// CERTIFICATES & COURSES
// ─────────────────────────────────────────────
export const MOCK_CERTIFICATES: CertificateAndCourse[] = [
  {
    index: 1,
    Title: 'Angular Avanzado: Arquitectura Empresarial',
    Descriptions:
      'Curso especializado en patrones de arquitectura empresarial con Angular, incluyendo state management con NgRx, lazy loading y optimización de rendimiento.',
    Start: '10-03-2023',
    End: '25-06-2023',
    Labels: ['Angular', 'NgRx', 'Enterprise Architecture'],
    University: 'Instituto Tecnológico Latinoamericano (ITLA)',
    states: 'past',
  },
  {
    index: 2,
    Title: 'Máster en Desarrollo Full Stack',
    Descriptions:
      'Programa intensivo cubriendo tecnologías frontend y backend modernas, incluyendo React, Node.js, bases de datos SQL y NoSQL, y despliegue en la nube.',
    Start: '01-09-2024',
    End: null,
    Labels: ['Full Stack', 'React', 'Node.js', 'MongoDB'],
    University: 'Academia Digital del Pacífico (ADP)',
    states: 'current',
  },
  {
    index: 3,
    Title: 'Certificación en UX/UI Design',
    Descriptions:
      'Certificación profesional en diseño de experiencia de usuario e interfaces, con enfoque en design systems, accesibilidad web y prototipado con Figma.',
    Start: '15-01-2024',
    End: '30-07-2024',
    Labels: ['UX', 'UI', 'Figma', 'Design Systems'],
    University: 'Centro de Innovación Austral (CIA)',
    states: 'past',
  },
  {
    index: 4,
    Title: 'Cloud Computing con AWS',
    Descriptions:
      'Formación completa en servicios de Amazon Web Services: EC2, S3, Lambda, DynamoDB y arquitecturas serverless para aplicaciones escalables.',
    Start: '05-05-2023',
    End: '20-11-2023',
    Labels: ['AWS', 'Cloud', 'Serverless', 'DevOps'],
    University: 'Escuela Superior de Tecnología Andina (ESTA)',
    states: 'past',
  },
];

// ─────────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────────
export const MOCK_EXPERIENCE: Experience[] = [
  {
    index: 1,
    Title: 'Senior Frontend Developer',
    Descriptions:
      'Liderazgo técnico del equipo frontend, desarrollo de componentes reutilizables en Angular, implementación de design systems y optimización de rendimiento para aplicaciones enterprise.',
    Start: '01-03-2024',
    End: null,
    Labels: ['Angular', 'TypeScript', 'RxJS', 'SCSS', 'Jest'],
    Company: 'NovaTech Solutions S.A.',
    types: [TypeWorks.FullTime, TypeWorks.Remote],
    states: 'current',
  },
  {
    index: 2,
    Title: 'Frontend Developer',
    Descriptions:
      'Desarrollo de interfaces de usuario modernas con React y Next.js, integración de APIs REST y GraphQL, y participación activa en revisiones de código y sesiones de pair programming.',
    Start: '15-06-2022',
    End: '28-02-2024',
    Labels: ['React', 'Next.js', 'GraphQL', 'Tailwind CSS'],
    Company: 'Meridian Digital Labs',
    types: [TypeWorks.Contrated, TypeWorks.FullTime],
    states: 'past',
  },
  {
    index: 3,
    Title: 'Junior Web Developer',
    Descriptions:
      'Desarrollo y mantenimiento de aplicaciones web usando Vue.js y Node.js. Participación en sprints ágiles y colaboración estrecha con el equipo de diseño UX.',
    Start: '01-02-2021',
    End: '10-06-2022',
    Labels: ['Vue.js', 'Node.js', 'JavaScript', 'Bootstrap'],
    Company: 'Cumbre Creativa Cia. Ltda.',
    types: [TypeWorks.Contrated, TypeWorks.PartTime],
    states: 'past',
  },
  {
    index: 4,
    Title: 'Frontend Intern',
    Descriptions:
      'Prácticas profesionales enfocadas en el desarrollo de landing pages responsivas, maquetación con HTML/CSS, e introducción a frameworks JavaScript modernos.',
    Start: '01-08-2020',
    End: '31-01-2021',
    Labels: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    Company: 'Solaris Interactive Agency',
    types: [TypeWorks.Internship],
    states: 'past',
  },
];

// ─────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────
export const MOCK_PROJECTS: Project[] = [
  {
    index: 1,
    Title: 'TaskFlow — Gestor de Proyectos',
    Descriptions:
      'Aplicación web de gestión de proyectos con tableros Kanban, asignación de tareas, seguimiento de tiempo y reportes en tiempo real usando WebSockets.',
    Repository: 'https://github.com/portfolio/taskflow-app',
    Demo: 'https://taskflow-demo.vercel.app',
    Status: ProjectsStatus.Completed,
    Labels: ['Angular', 'Firebase', 'RxJS', 'Material UI'],
  },
  {
    index: 2,
    Title: 'HealthPulse — Dashboard Médico',
    Descriptions:
      'Dashboard interactivo para monitoreo de pacientes en clínicas, con gráficos en tiempo real, alertas automáticas y generación de reportes PDF.',
    Repository: 'https://github.com/portfolio/healthpulse',
    Demo: null,
    Status: ProjectsStatus.InProgress,
    Labels: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
  },
  {
    index: 3,
    Title: 'EcoTrack — Huella de Carbono Personal',
    Descriptions:
      'App para calcular y visualizar la huella de carbono personal, con recomendaciones personalizadas, gamificación y comparativas con la comunidad.',
    Repository: 'https://github.com/portfolio/ecotrack',
    Demo: 'https://ecotrack.netlify.app',
    Status: ProjectsStatus.Completed,
    Labels: ['Next.js', 'TypeScript', 'Chart.js', 'Supabase'],
  },
  {
    index: 4,
    Title: 'LinguaBot — Asistente de Idiomas con IA',
    Descriptions:
      'Chatbot inteligente para aprendizaje de idiomas que utiliza modelos de lenguaje para conversaciones naturales, corrección gramatical y ejercicios adaptativos.',
    Repository: 'https://github.com/portfolio/linguabot',
    Demo: null,
    Status: ProjectsStatus.Planned,
    Labels: ['Vue.js', 'Python', 'OpenAI API', 'FastAPI'],
  },
];

// ─────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────
export const MOCK_SKILLS: Skill[] = [
  {
    index: 1,
    Title: 'Angular',
    Descriptions:
      'Framework de desarrollo frontend con TypeScript para aplicaciones web empresariales escalables y de alto rendimiento.',
    Type: SkillsTypes.Frameworks,
    Hover: [
      {
        index: 101,
        Title: 'Angular Avanzado: Arquitectura Empresarial',
        Descriptions:
          'Curso especializado en patrones de arquitectura empresarial con Angular, NgRx y optimización de rendimiento.',
        Start: '10-03-2023',
        End: '25-06-2023',
        Labels: ['Angular', 'NgRx', 'Enterprise Architecture'],
        University: 'Instituto Tecnológico Latinoamericano (ITLA)',
        states: 'past',
      },
      {
        index: 102,
        Title: 'Angular: De Cero a Experto',
        Descriptions:
          'Curso intensivo cubriendo desde los fundamentos hasta técnicas avanzadas en Angular, incluyendo routing, forms reactivos y testing.',
        Start: '01-06-2022',
        End: '15-09-2022',
        Labels: ['Angular', 'TypeScript', 'Testing'],
        University: 'Academia Digital del Pacífico (ADP)',
        states: 'past',
      },
    ],
  },
  {
    index: 2,
    Title: 'React',
    Descriptions:
      'Biblioteca de JavaScript para crear interfaces de usuario interactivas con un enfoque basado en componentes.',
    Type: SkillsTypes.Frontend,
    Hover: [
      {
        index: 201,
        Title: 'React: Hooks y Patrones Avanzados',
        Descriptions:
          'Formación avanzada en custom hooks, render props, compound components y gestión de estado con Context API y Redux.',
        Start: '05-01-2024',
        End: '20-04-2024',
        Labels: ['React', 'Hooks', 'Redux', 'Patterns'],
        University: 'Centro de Innovación Austral (CIA)',
        states: 'past',
      },
      {
        index: 202,
        Title: 'Next.js: Full Stack con React',
        Descriptions:
          'Curso completo de Next.js cubriendo SSR, SSG, ISR, API routes y despliegue en Vercel para aplicaciones de producción.',
        Start: '10-08-2024',
        End: null,
        Labels: ['Next.js', 'React', 'Vercel', 'SSR'],
        University: 'Escuela Superior de Tecnología Andina (ESTA)',
        states: 'current',
      },
    ],
  },
  {
    index: 3,
    Title: 'Node.js',
    Descriptions:
      'Entorno de ejecución de JavaScript del lado del servidor para construir aplicaciones backend escalables y APIs REST.',
    Type: SkillsTypes.Backend,
    Hover: [
      {
        index: 301,
        Title: 'Node.js: APIs RESTful Profesionales',
        Descriptions:
          'Desarrollo de APIs REST robustas con Express.js, autenticación JWT, validación de datos y documentación con Swagger.',
        Start: '15-02-2023',
        End: '30-05-2023',
        Labels: ['Node.js', 'Express', 'JWT', 'Swagger'],
        University: 'Instituto Tecnológico Latinoamericano (ITLA)',
        states: 'past',
      },
      null,
    ],
  },
  {
    index: 4,
    Title: 'PostgreSQL',
    Descriptions:
      'Sistema de gestión de bases de datos relacional de código abierto, potente y de alta confiabilidad.',
    Type: SkillsTypes.Database,
    Hover: [
      {
        index: 401,
        Title: 'PostgreSQL: Administración y Optimización',
        Descriptions:
          'Curso avanzado de PostgreSQL cubriendo modelado de datos, consultas complejas, índices, triggers y optimización de queries.',
        Start: '01-07-2023',
        End: '15-10-2023',
        Labels: ['PostgreSQL', 'SQL', 'Database Design'],
        University: 'Academia Digital del Pacífico (ADP)',
        states: 'past',
      },
      {
        index: 402,
        Title: 'Bases de Datos NoSQL con MongoDB',
        Descriptions:
          'Introducción a bases de datos NoSQL con MongoDB, incluyendo modelado de documentos, aggregation pipeline y replica sets.',
        Start: '01-11-2023',
        End: '28-02-2024',
        Labels: ['MongoDB', 'NoSQL', 'Aggregation'],
        University: 'Centro de Innovación Austral (CIA)',
        states: 'past',
      },
    ],
  },
  {
    index: 5,
    Title: 'Git & GitHub',
    Descriptions:
      'Sistema de control de versiones distribuido y plataforma de colaboración para desarrollo de software.',
    Type: SkillsTypes.Tools,
    Hover: [
      {
        index: 501,
        Title: 'Git Avanzado y Flujos de Trabajo',
        Descriptions:
          'Dominio de Git: branching strategies (GitFlow, Trunk-based), rebasing interactivo, cherry-pick, bisect y hooks personalizados.',
        Start: '10-04-2022',
        End: '30-06-2022',
        Labels: ['Git', 'GitHub', 'GitFlow', 'CI/CD'],
        University: 'Escuela Superior de Tecnología Andina (ESTA)',
        states: 'past',
      },
      null,
    ],
  },
  {
    index: 6,
    Title: 'AWS',
    Descriptions:
      'Plataforma de servicios en la nube de Amazon para computación, almacenamiento, bases de datos y despliegue de aplicaciones.',
    Type: SkillsTypes.Cloud,
    Hover: [
      {
        index: 601,
        Title: 'Cloud Computing con AWS',
        Descriptions:
          'Formación completa en servicios de AWS: EC2, S3, Lambda, DynamoDB y arquitecturas serverless para aplicaciones escalables.',
        Start: '05-05-2023',
        End: '20-11-2023',
        Labels: ['AWS', 'Cloud', 'Serverless', 'DevOps'],
        University: 'Escuela Superior de Tecnología Andina (ESTA)',
        states: 'past',
      },
      {
        index: 602,
        Title: 'AWS Solutions Architect — Preparación',
        Descriptions:
          'Curso preparatorio para la certificación AWS Solutions Architect Associate, cubriendo diseño de arquitecturas resilientes y de alto rendimiento.',
        Start: '01-01-2025',
        End: null,
        Labels: ['AWS', 'Certification', 'Architecture'],
        University: 'Instituto Tecnológico Latinoamericano (ITLA)',
        states: 'current',
      },
    ],
  },
];

// ─────────────────────────────────────────────
// STUDIES
// ─────────────────────────────────────────────
export const MOCK_STUDIES: Studies[] = [
  {
    index: 1,
    Title: 'Ingeniería en Sistemas Computacionales',
    Descriptions:
      'Carrera de grado enfocada en el desarrollo de software, arquitectura de sistemas, redes y seguridad informática. Incluye prácticas profesionales y proyecto de tesis.',
    Start: '01-04-2018',
    End: '15-03-2023',
    Labels: [
      'Ingeniería de Software',
      'Algoritmos',
      'Redes',
      'Base de Datos',
    ],
    University: 'Universidad Politécnica del Litoral (UPL)',
    states: 'past',
  },
  {
    index: 2,
    Title: 'Maestría en Ingeniería de Software',
    Descriptions:
      'Programa de posgrado centrado en metodologías ágiles, arquitectura de microservicios, calidad de software y liderazgo técnico en equipos de desarrollo.',
    Start: '01-09-2024',
    End: null,
    Labels: [
      'Microservicios',
      'Agile',
      'Software Quality',
      'Technical Leadership',
    ],
    University: 'Instituto de Estudios Avanzados del Sur (IEAS)',
    states: 'current',
  },
  {
    index: 3,
    Title: 'Técnico Superior en Desarrollo Web',
    Descriptions:
      'Formación técnica intensiva en tecnologías web modernas: HTML5, CSS3, JavaScript, frameworks frontend y backend, con enfoque práctico y proyectos reales.',
    Start: '15-02-2016',
    End: '20-12-2017',
    Labels: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL'],
    University: 'Centro de Formación Técnica Horizonte (CFTH)',
    states: 'past',
  },
];

// ─────────────────────────────────────────────
// EXPORTACIÓN UNIFICADA
// ─────────────────────────────────────────────
export const MOCK_PORTFOLIO = {
  blogs: MOCK_BLOGS,
  certificates: MOCK_CERTIFICATES,
  experience: MOCK_EXPERIENCE,
  projects: MOCK_PROJECTS,
  skills: MOCK_SKILLS,
  studies: MOCK_STUDIES,
};
