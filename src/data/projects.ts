import type { Project } from '@/types'

// ===================================================
// RM Portfolio — Projects Data
// Add / edit projects here. UI updates automatically.
// ===================================================
//
// IMAGES. Every project's `image` points at its own file under
// public/assets/projects/. None of those files have to exist yet: the bento
// grid and the list rows both render through components/ui/SafeImage, which
// swaps a failed load onto PROJECT_SLOT — a generated "drop a screenshot
// here" tile that holds the layout's shape instead of leaving a hole. Drop
// the real PNG at the path named below and it appears with no code change.
//
// The slot file is `_slot.png`, not `_placeholder.png`, on purpose: several
// render paths guard on `image.includes('placeholder')` to mean "this is a
// stub, skip it", and a fallback carrying that word in its own name would be
// skipped by the very code meant to display it.

/** Fallback tile for a project whose screenshot isn't on disk yet. */
export const PROJECT_SLOT = '/assets/projects/_slot.png'

// ── Real work ───────────────────────────────────────
const realProjects: Project[] = [
  {
    id: 'mis-service-request',
    slug: 'mis-service-request-system',
    title: 'MIS Service Request System',
    category: 'capstone',
    shortDescription:
      'A web-based Management Information System for handling IT service requests across departments — built with Laravel and MySQL.',
    fullDescription:
      'An academic capstone project designed to streamline how departments submit, track, and resolve IT-related service requests within an organization. The system provides role-based access control, real-time status tracking, and an administrative dashboard for managing workloads.',
    image: '/assets/projects/mis-service-request.png',
    gallery: [],
    technologies: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'JavaScript', 'Blade'],
    tools: ['Git', 'Postman', 'XAMPP', 'VS Code'],
    features: [
      'Multi-role authentication (Admin, Staff, Requester)',
      'Service request submission and tracking',
      'Real-time status updates and notifications',
      'Administrative dashboard with analytics',
      'Request assignment and escalation',
      'Printable service reports',
    ],
    date: '2024',
    status: 'in-progress',
    role: 'Full-Stack Developer (Capstone)',
    type: 'system',
    problem:
      'Organizations struggle with informal, untracked IT service requests that lead to delays and accountability gaps.',
    solution:
      'A structured, role-based web system that formalizes the service request lifecycle from submission to resolution.',
    challenges: [
      'Designing a flexible role system adaptable to different organizational structures',
      'Implementing efficient queue management logic',
      'Building a clean, accessible dashboard for non-technical users',
    ],
    learningOutcomes: [
      'Laravel Eloquent ORM and relationships',
      'Role-based access control patterns',
      'Database normalization for transactional systems',
      'UI design for administrative dashboards',
    ],
    featured: true,
  },
]

// ── Sample tiles ────────────────────────────────────
// FILLER, NOT PORTFOLIO. A bento grid needs five or six tiles before the
// mixed spans read as a composition rather than an accident, and there is
// one real project so far. These four exist to hold that shape.
//
// Each carries `sample: true`, which makes the UI stamp a visible SAMPLE
// badge on the tile and keeps the entry out of the project counts. That is
// deliberate: a portfolio that pads itself is worse than a short one, so
// filler is labelled as filler on the page itself, not just in this comment.
//
// TO USE: overwrite a block with a real project and delete the `sample`
// line. TO REMOVE ALL: delete the `...sampleProjects` spread below.
const sampleProjects: Project[] = [
  {
    id: 'sample-portfolio',
    slug: 'sample-portfolio-site',
    title: 'Portfolio Site',
    category: 'personal',
    shortDescription:
      'This site — a monochrome editorial portfolio with scroll-driven type, a WebGL wireframe terrain and a pinned horizontal career timeline.',
    fullDescription:
      'Sample entry. Replace with a real project, or delete it from src/data/projects.ts.',
    image: '/assets/projects/portfolio-site.png',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'GSAP', 'three.js'],
    tools: ['Git', 'VS Code'],
    date: '2026',
    status: 'in-progress',
    role: 'Designer & Developer',
    type: 'web-app',
    sample: true,
  },
  {
    id: 'sample-inventory',
    slug: 'sample-inventory-tracker',
    title: 'Inventory Tracker',
    category: 'school',
    shortDescription:
      'Coursework CRUD application for stock levels, suppliers and reorder thresholds, with printable stock reports.',
    fullDescription:
      'Sample entry. Replace with a real project, or delete it from src/data/projects.ts.',
    image: '/assets/projects/inventory-tracker.png',
    technologies: ['PHP', 'MySQL', 'Bootstrap', 'jQuery'],
    date: '2023',
    status: 'completed',
    role: 'Full-Stack Developer',
    type: 'web-app',
    sample: true,
  },
  {
    id: 'sample-recon',
    slug: 'sample-recon-toolkit',
    title: 'Recon Toolkit',
    category: 'personal',
    shortDescription:
      'Command-line helper that chains subdomain enumeration, header inspection and TLS checks into one report for authorised targets.',
    fullDescription:
      'Sample entry. Replace with a real project, or delete it from src/data/projects.ts.',
    image: '/assets/projects/recon-toolkit.png',
    technologies: ['Python', 'Bash', 'Kali Linux'],
    date: '2025',
    status: 'in-progress',
    role: 'Developer',
    type: 'other',
    sample: true,
  },
  {
    id: 'sample-attendance',
    slug: 'sample-attendance-qr',
    title: 'QR Attendance',
    category: 'school',
    shortDescription:
      'Class attendance logger that scans a rotating student QR code and exports a per-session CSV for instructors.',
    fullDescription:
      'Sample entry. Replace with a real project, or delete it from src/data/projects.ts.',
    image: '/assets/projects/qr-attendance.png',
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    date: '2024',
    status: 'completed',
    role: 'Full-Stack Developer',
    type: 'web-app',
    sample: true,
  },
]

export const projects: Project[] = [...realProjects, ...sampleProjects]

/** Only work that actually exists. Use this for any number shown as a fact. */
export const realProjectCount = realProjects.length

// ── Project Categories ──────────────────────────────
export const projectCategories = [
  { key: 'all', label: 'All Projects' },
  { key: 'school', label: 'School Projects' },
  { key: 'capstone', label: 'Capstone Projects' },
  { key: 'personal', label: 'Personal Projects' },
] as const

export type CategoryKey = (typeof projectCategories)[number]['key']
