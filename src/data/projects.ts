import type { Project } from '@/types'

// ===================================================
// RM Portfolio — Projects Data
// Add / edit projects here. UI updates automatically.
// ===================================================

export const projects: Project[] = [
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

// ── Project Categories ──────────────────────────────
export const projectCategories = [
  { key: 'all', label: 'All Projects' },
  { key: 'school', label: 'School Projects' },
  { key: 'capstone', label: 'Capstone Projects' },
  { key: 'personal', label: 'Personal Projects' },
] as const

export type CategoryKey = (typeof projectCategories)[number]['key']
