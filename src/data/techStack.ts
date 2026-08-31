import type { Technology, TechCategory } from '@/types'

// ===================================================
// RM Portfolio — Tech Stack Data
//
// No `color` field. Technology.color is still declared optional in the
// type, but every row here carried the identical '#8a8a8a' after the
// monochrome pass and nothing in the app ever read it — TechStack paints
// its icons from `.tech-icon` in the stylesheet. Twenty-three identical
// literals that render nowhere are just a trap for the next person
// grepping the palette, so they are gone rather than re-tinted.
// ===================================================

export const technologies: Technology[] = [
  // ── AI & LLMs ─────────────────────────────────────
  { name: 'OpenAI', icon: 'openai', category: 'ai-llm' },
  { name: 'Hugging Face', icon: 'huggingface', category: 'ai-llm' },

  // ── Frontend ─────────────────────────────────────
  { name: 'React', icon: 'react', category: 'frontend' },
  { name: 'Vue.js', icon: 'vuejs', category: 'frontend' },
  { name: 'Next.js', icon: 'nextjs', category: 'frontend', color: '#000000' },
  { name: 'TypeScript', icon: 'typescript', category: 'frontend' },
  { name: 'JavaScript', icon: 'javascript', category: 'frontend' },
  { name: 'Tailwind CSS', icon: 'tailwindcss', category: 'frontend' },
  { name: 'HTML5', icon: 'html5', category: 'frontend' },
  { name: 'CSS3', icon: 'css3', category: 'frontend' },

  // ── Backend ──────────────────────────────────────
  { name: 'Node.js', icon: 'nodejs', category: 'backend' },
  { name: 'Laravel', icon: 'laravel', category: 'backend' },
  { name: 'PHP', icon: 'php', category: 'backend' },
  { name: 'Express.js', icon: 'express', category: 'backend', color: '#000000' },
  { name: 'REST APIs', icon: 'api', category: 'backend' },

  // ── Database ─────────────────────────────────────
  { name: 'MySQL', icon: 'mysql', category: 'database' },
  { name: 'MongoDB', icon: 'mongodb', category: 'database' },
  { name: 'PostgreSQL', icon: 'postgresql', category: 'database' },
  { name: 'Supabase', icon: 'supabase', category: 'database' },
  { name: 'Firebase', icon: 'firebase', category: 'database' },

  // ── Tools ────────────────────────────────────────
  { name: 'Git', icon: 'git', category: 'tools' },
  { name: 'Docker', icon: 'docker', category: 'tools' },
  { name: 'Kali Linux', icon: 'linux', category: 'tools' },
  { name: 'Postman', icon: 'postman', category: 'tools' },
  { name: 'CI/CD', icon: 'cicd', category: 'tools' },
]

// ── Category Display Config ─────────────────────────
export const techCategories: { key: TechCategory; label: string; description: string }[] = [
  {
    key: 'ai-llm',
    label: 'AI & LLMs',
    description: 'Language models and AI integration',
  },
  {
    key: 'frontend',
    label: 'Frontend',
    description: 'UI frameworks, languages, and styling tools',
  },
  {
    key: 'backend',
    label: 'Backend',
    description: 'Server-side frameworks and API development',
  },
  {
    key: 'database',
    label: 'Database',
    description: 'SQL, NoSQL, and cloud database platforms',
  },
  {
    key: 'tools',
    label: 'Tools & DevOps',
    description: 'Development, deployment, and security tools',
  },
]

// ── Get technologies by category ───────────────────
export const getTechByCategory = (category: TechCategory): Technology[] =>
  technologies.filter((t) => t.category === category)
