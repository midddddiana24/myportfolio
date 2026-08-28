import type { Technology, TechCategory } from '@/types'

// ===================================================
// RM Portfolio — Tech Stack Data
// ===================================================

export const technologies: Technology[] = [
  // ── AI & LLMs ─────────────────────────────────────
  { name: 'OpenAI', icon: 'openai', category: 'ai-llm', color: '#8a8a8a' },
  { name: 'Hugging Face', icon: 'huggingface', category: 'ai-llm', color: '#8a8a8a' },

  // ── Frontend ─────────────────────────────────────
  { name: 'React', icon: 'react', category: 'frontend', color: '#8a8a8a' },
  { name: 'Vue.js', icon: 'vuejs', category: 'frontend', color: '#8a8a8a' },
  { name: 'Next.js', icon: 'nextjs', category: 'frontend', color: '#000000' },
  { name: 'TypeScript', icon: 'typescript', category: 'frontend', color: '#8a8a8a' },
  { name: 'JavaScript', icon: 'javascript', category: 'frontend', color: '#8a8a8a' },
  { name: 'Tailwind CSS', icon: 'tailwindcss', category: 'frontend', color: '#8a8a8a' },
  { name: 'HTML5', icon: 'html5', category: 'frontend', color: '#8a8a8a' },
  { name: 'CSS3', icon: 'css3', category: 'frontend', color: '#8a8a8a' },

  // ── Backend ──────────────────────────────────────
  { name: 'Node.js', icon: 'nodejs', category: 'backend', color: '#8a8a8a' },
  { name: 'Laravel', icon: 'laravel', category: 'backend', color: '#8a8a8a' },
  { name: 'PHP', icon: 'php', category: 'backend', color: '#8a8a8a' },
  { name: 'Express.js', icon: 'express', category: 'backend', color: '#000000' },
  { name: 'REST APIs', icon: 'api', category: 'backend', color: '#8a8a8a' },

  // ── Database ─────────────────────────────────────
  { name: 'MySQL', icon: 'mysql', category: 'database', color: '#8a8a8a' },
  { name: 'MongoDB', icon: 'mongodb', category: 'database', color: '#8a8a8a' },
  { name: 'PostgreSQL', icon: 'postgresql', category: 'database', color: '#8a8a8a' },
  { name: 'Supabase', icon: 'supabase', category: 'database', color: '#8a8a8a' },
  { name: 'Firebase', icon: 'firebase', category: 'database', color: '#8a8a8a' },

  // ── Tools ────────────────────────────────────────
  { name: 'Git', icon: 'git', category: 'tools', color: '#8a8a8a' },
  { name: 'Docker', icon: 'docker', category: 'tools', color: '#8a8a8a' },
  { name: 'Kali Linux', icon: 'linux', category: 'tools', color: '#8a8a8a' },
  { name: 'Postman', icon: 'postman', category: 'tools', color: '#8a8a8a' },
  { name: 'CI/CD', icon: 'cicd', category: 'tools', color: '#8a8a8a' },
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
