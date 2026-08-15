import type { Technology, TechCategory } from '@/types'

// ===================================================
// RM Portfolio — Tech Stack Data
// ===================================================

export const technologies: Technology[] = [
  // ── AI & LLMs ─────────────────────────────────────
  { name: 'OpenAI', icon: 'openai', category: 'ai-llm', color: '#10a37f' },
  { name: 'Hugging Face', icon: 'huggingface', category: 'ai-llm', color: '#ff9d00' },

  // ── Frontend ─────────────────────────────────────
  { name: 'React', icon: 'react', category: 'frontend', color: '#61dafb' },
  { name: 'Vue.js', icon: 'vuejs', category: 'frontend', color: '#42b883' },
  { name: 'Next.js', icon: 'nextjs', category: 'frontend', color: '#000000' },
  { name: 'TypeScript', icon: 'typescript', category: 'frontend', color: '#3178c6' },
  { name: 'JavaScript', icon: 'javascript', category: 'frontend', color: '#f7df1e' },
  { name: 'Tailwind CSS', icon: 'tailwindcss', category: 'frontend', color: '#06b6d4' },
  { name: 'HTML5', icon: 'html5', category: 'frontend', color: '#e34f26' },
  { name: 'CSS3', icon: 'css3', category: 'frontend', color: '#1572b6' },

  // ── Backend ──────────────────────────────────────
  { name: 'Node.js', icon: 'nodejs', category: 'backend', color: '#339933' },
  { name: 'Laravel', icon: 'laravel', category: 'backend', color: '#ff2d20' },
  { name: 'PHP', icon: 'php', category: 'backend', color: '#777bb4' },
  { name: 'Express.js', icon: 'express', category: 'backend', color: '#000000' },
  { name: 'REST APIs', icon: 'api', category: 'backend', color: '#7c3aed' },

  // ── Database ─────────────────────────────────────
  { name: 'MySQL', icon: 'mysql', category: 'database', color: '#4479a1' },
  { name: 'MongoDB', icon: 'mongodb', category: 'database', color: '#47a248' },
  { name: 'PostgreSQL', icon: 'postgresql', category: 'database', color: '#336791' },
  { name: 'Supabase', icon: 'supabase', category: 'database', color: '#3ecf8e' },
  { name: 'Firebase', icon: 'firebase', category: 'database', color: '#ffca28' },

  // ── Tools ────────────────────────────────────────
  { name: 'Git', icon: 'git', category: 'tools', color: '#f05032' },
  { name: 'Docker', icon: 'docker', category: 'tools', color: '#2496ed' },
  { name: 'Kali Linux', icon: 'linux', category: 'tools', color: '#557c94' },
  { name: 'Postman', icon: 'postman', category: 'tools', color: '#ff6c37' },
  { name: 'CI/CD', icon: 'cicd', category: 'tools', color: '#7c3aed' },
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
