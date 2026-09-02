import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    name: 'Sebastián Cardona',
    role: 'Software Engineer',
    subtitleRole: 'Full Stack, Backend & Systems Architecture',
    locationText: 'Colombia | Remote & Relocation',
    bio: 'Software Engineer focused on Full Stack, Mobile, Backend Systems, Architecture, and Cloud/DevOps, with practical experience in IoT platforms and data pipelines.',
    aboutTitle: 'About Me',
    aboutP1: 'Software Engineer oriented towards backend development, system design, and software architecture, with practical experience engineering full stack web applications, progressive web apps (PWA), IoT platforms, and data processing systems. I approach development from an engineering discipline across the entire SDLC: requirement elicitation, domain and data modeling, architecture and API design, implementation, testing, security hardiness, and deployment.',
    aboutP2: 'I select architectures, patterns, and technologies based on functional and non-functional requirements, prioritizing strong engineering fundamentals over transient tools. I apply core principles including SOLID, ACID, and CAP, secure development best practices aligned with OWASP, ISO, and IEEE standards, and agile methodologies such as Scrum.',
    aboutP3: 'Experienced in implementing JWT, rotating access & refresh tokens, HttpOnly Cookies, RBAC, Redis token revocation, rate limiting, Argon2id hashing, input sanitization, XSS mitigation, and containerization with Docker to deliver secure, maintainable, high-performance, scalable, and resilient software.',
    educationTitle: 'Education',
    educationText: 'Software Engineering — Universidad Cooperativa de Colombia (2026)',
    certificationsTitle: 'Certifications',
    certifications: [
      'SoftSkills Strengthening Program HCL — HabComLearn (2024)',
      'Emotional Intelligence — CUN (2022)'
    ],
    skillsTitle: 'Architecture Levels & Principles',
    skillsDiagramSubtitle: 'Software as Engineered Systems: Layered Structure from UI to Infrastructure & Security',
    skillLayers: [
      {
        level: 'L1',
        name: 'Full Stack & Mobile Layer',
        roleType: 'UI, Mobile & Interaction',
        tags: ['React', 'React Native', 'TypeScript', 'JavaScript', 'Vue.js', 'PWA', 'Jenny Preece Design Method', 'Minimalismo']
      },
      {
        level: 'L2',
        name: 'Backend & Services Layer',
        roleType: 'APIs & Computation',
        tags: ['FastAPI (Python)', 'Django', 'Node.js (Express)', 'ASP.NET (C#)', 'REST APIs', 'WebSockets', 'SOAP / WSDL', 'Microservices']
      },
      {
        level: 'L3',
        name: 'Data & Persistence Layer',
        roleType: 'Storage & Modeling',
        tags: ['PostgreSQL', 'Supabase', 'Redis', 'MySQL', 'SQLAlchemy + Alembic', 'Data Modeling', 'ETL Pipelines']
      },
      {
        level: 'L4',
        name: 'DevOps & Cloud Infrastructure',
        roleType: 'Cloud & Deployment',
        tags: ['Docker', 'Docker Compose', 'AWS', 'Supabase', 'GitHub Actions (CI/CD)', 'Git & GitHub', 'Render', 'Vercel']
      },
      {
        level: 'L5',
        name: 'Architecture, Security & Standards',
        roleType: 'Quality & Governance',
        tags: ['SOLID Principles', 'ACID & CAP Theorems', 'OWASP Standards', 'JWT (RS256/HS256)', 'Argon2id', 'RBAC & Rate Limiting', 'HttpOnly Cookies']
      },
      {
        level: 'L6',
        name: 'IoT & Applied Systems (Specialized)',
        roleType: 'Telemetry & Inference',
        tags: ['MQTT', 'HiveMQ Broker', 'ESP32 / Arduino', 'OWL 2 / Protégé & SWRL', 'LEGAL-BETO (NLP)', 'LLM Integrations']
      }
    ],
    projectsTitle: 'Featured Projects',
    projectsSubtitle: 'Engineered systems built for reliability, security, and performance',
    github: 'GitHub Repo',
    livePreview: 'Live Preview',
    footer: 'Designed with a minimalist aesthetic in mind. Built with Vue.js.',
    contactTitle: 'Get in Touch',
    contactSub: "Looking for a software engineer to build robust, elegant, and secure systems? Let's connect.",
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    linkedinLabel: 'LinkedIn',
    githubLabel: 'GitHub',
    xLabel: 'X / Twitter',
    downloadCV: 'Download CV (PDF)',
    projects: [
      {
        id: 1,
        num: '01/',
        badge: 'Full Stack & Mobile PWA',
        title: 'Car Inspection | Vehicle Inspection PWA',
        subtitle: 'Special Vehicle Inspection Sector (2026)',
        description: 'Industrial full stack PWA replacing paper inspections with complete digital traceability, audit trails, evidence logs, and automated reporting.',
        bullet_points: [
          'Modular Layered + MVC architecture with FastAPI, React, TypeScript, PostgreSQL, and SQLAlchemy.',
          'Secure auth with JWT, HttpOnly cookies, RBAC, Argon2id, and Redis token revocation under OWASP.',
          'Containerized environment with Docker Compose for local orchestration and deployment.'
        ],
        github_link: 'https://github.com/sebastiansaintt/car_checking',
        technologies: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker Compose', 'PWA', 'OWASP'],
        preview: '/car_checking.png'
      },
      {
        id: 2,
        num: '02/',
        badge: 'Enterprise Architecture & NLP',
        title: 'LawSim Pymes | Regulatory Simulation Platform',
        subtitle: 'Enterprise System Architecture & Rule Reasoning (2025)',
        description: 'Enterprise hybrid architecture combining Layered, Microservices, and MVC patterns to decouple CRUD operations from computational reasoning pipelines.',
        bullet_points: [
          'Modeled domain ontologies in OWL 2 (Protégé) with HermiT reasoner, SWRL rules, and LEGAL-BETO NLP.',
          'Defined SOAP/WSDL microservices, Redis distributed caching, and asymmetric JWT (RS256) security.',
          'Applied UWE and OOHDM methodologies for user-centric interaction and navigation flows.'
        ],
        github_link: 'https://github.com/sebastiansaintt/WebDesign',
        technologies: ['Software Architecture', 'OWL 2 / Protégé', 'NLP (LEGAL-BETO)', 'FastAPI', 'Vue.js', 'SOAP / WSDL', 'Redis'],
        preview: '/lawsim.png'
      },
      {
        id: 3,
        num: '03/',
        badge: 'Real-time Systems & IoT',
        title: 'Industrial Environmental Monitoring Platform',
        subtitle: 'Craft Breweries Telemetry (2025 - 2026)',
        description: 'Real-time telemetry platform integrated with IoT devices via MQTT and WebSockets for live monitoring, data persistence, and threshold risk alerting.',
        bullet_points: [
          'Ingestion and validation backend for telemetry (temperature, humidity, CO2) from ESP32 microcontrollers.',
          'High-throughput REST APIs and WebSocket feeds with FastAPI and PostgreSQL persistence.',
          'JWT authentication, Argon2 hashing, and granular RBAC permissions.'
        ],
        github_link: 'https://github.com/realprodigium/risk_follower',
        technologies: ['FastAPI', 'WebSockets', 'MQTT', 'PostgreSQL', 'Supabase', 'Docker', 'ESP32'],
        preview: '/co2bien.png'
      }
    ]
  },
  es: {
    name: 'Sebastián Cardona',
    role: 'Ingeniero de Software',
    subtitleRole: 'Full Stack, Backend & Arquitectura de Sistemas',
    locationText: 'Colombia | Remoto y Relocalización',
    bio: 'Ingeniero de Software enfocado en Desarrollo Full Stack, Mobile, Sistemas Backend, Arquitectura y Cloud/DevOps, con experiencia práctica en plataformas IoT y flujos de datos.',
    aboutTitle: 'Sobre Mí',
    aboutP1: 'Ingeniero de Software con orientación al desarrollo backend, arquitectura y diseño de sistemas, con experiencia práctica construyendo aplicaciones full stack, aplicaciones web progresivas (PWA), plataformas IoT y sistemas de procesamiento de datos. Abordo el desarrollo desde una perspectiva de ingeniería, participando en el SDLC desde la elicitación de requisitos, modelado de dominio y datos, diseño de arquitectura y APIs, hasta implementación, pruebas, seguridad y despliegue.',
    aboutP2: 'Selecciono arquitecturas, patrones y tecnologías según los requisitos funcionales y no funcionales del problema, priorizando fundamentos de ingeniería sobre herramientas específicas. Aplico principios como SOLID, ACID y CAP, prácticas de diseño y desarrollo seguro alineadas con estándares OWASP, ISO e IEEE, y metodologías ágiles como Scrum.',
    aboutP3: 'He implementado mecanismos como JWT, access y refresh tokens rotativos, HttpOnly Cookies, RBAC, rate limiting, Argon2id, sanitización y validación de entradas, protección frente a XSS y contenerización con Docker, buscando construir software seguro, mantenible, escalable y preparado para evolucionar.',
    educationTitle: 'Educación',
    educationText: 'Ingeniería de Software — Universidad Cooperativa de Colombia (2026)',
    certificationsTitle: 'Certificaciones',
    certifications: [
      'Programa de Fortalecimiento en SoftSkills HCL — HabComLearn (2024)',
      'Inteligencia Emocional — CUN (2022)'
    ],
    skillsTitle: 'Niveles de Arquitectura & Principios',
    skillsDiagramSubtitle: 'Habilidades y Herramientas con las que resuelvo un problema: Dividido por capas',
    skillLayers: [
      {
        level: 'L1',
        name: 'Capa Full Stack & Mobile',
        roleType: 'UI, Móvil e Interacción',
        tags: ['React', 'React Native', 'TypeScript', 'JavaScript', 'Vue.js', 'PWA', 'Jenny Preece Design Method', 'Minimalismo']
      },
      {
        level: 'L2',
        name: 'Capa Backend & Servicios',
        roleType: 'APIs & Cómputo',
        tags: ['FastAPI (Python)', 'Django', 'Node.js (Express)', 'ASP.NET (C#)', 'APIs REST', 'WebSockets', 'SOAP / WSDL', 'Microservicios']
      },
      {
        level: 'L3',
        name: 'Capa de Datos & Persistencia',
        roleType: 'Almacenamiento & Modelado',
        tags: ['PostgreSQL', 'Supabase', 'Redis', 'MySQL', 'SQLAlchemy + Alembic', 'Modelado de Datos', 'Pipelines ETL']
      },
      {
        level: 'L4',
        name: 'Infraestructura, DevOps & Cloud',
        roleType: 'Cloud & Despliegue',
        tags: ['Docker', 'Docker Compose', 'AWS', 'Supabase', 'GitHub Actions (CI/CD)', 'Git & GitHub', 'Render', 'Vercel']
      },
      {
        level: 'L5',
        name: 'Arquitectura, Seguridad & Estándares',
        roleType: 'Calidad & Gobernanza',
        tags: ['Principios SOLID', 'Teoremas ACID & CAP', 'Estándares OWASP', 'JWT (RS256/HS256)', 'Argon2id', 'RBAC & Rate Limiting', 'HttpOnly Cookies']
      },
      {
        level: 'L6',
        name: 'IoT & Sistemas Aplicados (Especializado)',
        roleType: 'Telemetría e Inferencia',
        tags: ['MQTT', 'Broker HiveMQ', 'ESP32 / Arduino', 'OWL 2 / Protégé & SWRL', 'LEGAL-BETO (NLP)', 'Integraciones LLM']
      }
    ],
    projectsTitle: 'Proyectos Destacados',
    projectsSubtitle: 'Sistemas diseñados con rigor de ingeniería, seguridad y rendimiento',
    github: 'Repositorio GitHub',
    livePreview: 'Vista Previa',
    footer: 'Construido con Vue.js.',
    contactTitle: 'Contacto',
    contactSub: '¿Buscas un Ingeniero de Software para construir soluciones sólidas, elegantes y escalables? Hablemos.',
    emailLabel: 'Correo electrónico',
    phoneLabel: 'Teléfono',
    linkedinLabel: 'LinkedIn',
    githubLabel: 'GitHub',
    xLabel: 'X / Twitter',
    downloadCV: 'Descargar CV (PDF)',
    projects: [
      {
        id: 1,
        num: '01/',
        badge: 'Full Stack & Mobile PWA',
        title: 'Car Inspection | Sistema PWA de Inspección Vehicular',
        subtitle: 'Interventoría y Mantenimiento de Vehículos Especiales (2026)',
        description: 'Aplicación full stack PWA que digitaliza la inspección técnica vehicular con trazabilidad completa, auditoría de cambios, evidencias y reportería.',
        bullet_points: [
          'Arquitectura modular por capas + MVC con FastAPI, React, TypeScript, PostgreSQL y SQLAlchemy.',
          'Autenticación segura con JWT, cookies HttpOnly/Secure, RBAC, Argon2id y Redis bajo OWASP.',
          'Contenerización completa con Docker Compose para desarrollo y despliegue.'
        ],
        github_link: 'https://github.com/sebastiansaintt/car_checking',
        technologies: ['FastAPI', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker Compose', 'PWA', 'OWASP'],
        preview: '/car_checking.png'
      },
      {
        id: 2,
        num: '02/',
        badge: 'Arquitectura Empresarial & NLP',
        title: 'LawSim Pymes | Plataforma de Simulación Regulatoria',
        subtitle: 'Arquitectura de Sistemas & Motor de Inferencia Normativa (2025)',
        description: 'Blueprint arquitectónico híbrido de nivel empresarial que combina Arquitectura por Capas, Microservicios y MVC para desacoplar operaciones CRUD de pipelines de inferencia lógica.',
        bullet_points: [
          'Modelado ontológico en OWL 2 (Protégé) con razonador HermiT, reglas SWRL y NLP con LEGAL-BETO.',
          'Interfaces SOAP/WSDL, caché distribuida con Redis y seguridad criptográfica con JWT RS256.',
          'Metodologías UWE y OOHDM para modelado de interacción orientada al usuario.'
        ],
        github_link: 'https://github.com/sebastiansaintt/WebDesign',
        technologies: ['Software Architecture', 'OWL 2 / Protégé', 'NLP (LEGAL-BETO)', 'FastAPI', 'Vue.js', 'SOAP / WSDL', 'Redis'],
        preview: '/lawsim.png'
      },
      {
        id: 3,
        num: '03/',
        badge: 'Sistemas en Tiempo Real & IoT',
        title: 'Plataforma de Monitoreo Ambiental Industrial',
        subtitle: 'Telemetría para Procesos de Fermentación (2025 - 2026)',
        description: 'Plataforma de monitoreo en tiempo real conectada a microcontroladores IoT vía MQTT y WebSockets para telemetría continua, persistencia y alertas.',
        bullet_points: [
          'Backend de ingesta y validación de telemetría (temperatura, humedad, CO2) desde microcontroladores ESP32.',
          'APIs REST y WebSockets de alto rendimiento con FastAPI y PostgreSQL.',
          'Autenticación JWT, cifrado con Argon2 y control de accesos RBAC.'
        ],
        github_link: 'https://github.com/realprodigium/risk_follower',
        technologies: ['FastAPI', 'WebSockets', 'MQTT', 'PostgreSQL', 'Supabase', 'Docker', 'ESP32'],
        preview: '/co2bien.png'
      }
    ]
  }
}

const userLang = typeof navigator !== 'undefined' ? (navigator.language || navigator.userLanguage) : 'es'
const defaultLocale = userLang && userLang.startsWith('es') ? 'es' : 'en'

const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages,
})

export default i18n
