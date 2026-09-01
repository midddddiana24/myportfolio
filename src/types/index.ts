// ===================================================
// RM Portfolio — TypeScript Type Definitions
// ===================================================

export interface Project {
  id: string
  slug: string
  title: string
  category: ProjectCategory
  shortDescription: string
  fullDescription: string
  image: string
  gallery?: string[]
  technologies: string[]
  tools?: string[]
  features?: string[]
  githubUrl?: string
  liveDemoUrl?: string
  date: string
  status: ProjectStatus
  role: string
  type: ProjectType
  problem?: string
  solution?: string
  challenges?: string[]
  learningOutcomes?: string[]
  featured?: boolean
  /**
   * Marks a filler entry that exists to give the bento grid enough tiles to
   * read as a grid, not a real shipped project.
   *
   * This flag is not cosmetic — it is a safety rail. Sample tiles render a
   * visible SAMPLE badge and are excluded from the stat counts, so a filler
   * entry can never quietly pass itself off as work that exists. Remove the
   * `...sampleProjects` spread in src/data/projects.ts and every one of them
   * disappears at once.
   */
  sample?: boolean
}

export type ProjectCategory =
  | 'school'
  | 'capstone'
  | 'personal'

export type ProjectStatus =
  | 'completed'
  | 'in-progress'
  | 'planned'

export type ProjectType =
  | 'web-app'
  | 'mobile-app'
  | 'api'
  | 'system'
  | 'design'
  | 'other'

// ── Certification ──────────────────────────────────
export interface Certification {
  id: string
  title: string
  issuer: string
  date?: string
  image: string
  credentialUrl?: string
  category?: string
}

// ── Technology ─────────────────────────────────────
export interface Technology {
  name: string
  icon: string
  category: TechCategory
  level?: TechLevel
  color?: string
}

export type TechCategory =
  | 'ai-llm'
  | 'frontend'
  | 'backend'
  | 'database'
  | 'tools'

export type TechLevel =
  | 'familiar'
  | 'working-knowledge'
  | 'academic-experience'
  | 'building-with'

// ── Service ────────────────────────────────────────
export interface Service {
  id: string
  icon: string
  title: string
  description: string
  useCases: string[]
  deliverable: string
}

// ── Social Link ────────────────────────────────────
export interface SocialLink {
  platform: string
  label: string
  url: string
  icon: string
}

// ── Education ──────────────────────────────────────
export interface Education {
  degree: string
  institution: string
  campus?: string
  status: string
  expectedGraduation: string
  description?: string
  logo?: string
}

// ── Navigation Item ────────────────────────────────
export interface NavItem {
  label: string
  href: string
  external?: boolean
}

// ── FAQ ────────────────────────────────────────────
export interface FAQItem {
  question: string
  answer: string
}

// ── Theme ──────────────────────────────────────────
export type Theme = 'dark' | 'light'
