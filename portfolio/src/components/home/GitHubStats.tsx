import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Star, GitFork, ExternalLink } from 'lucide-react'
import { ScrollReveal, StaggerReveal, staggerItemVariants } from '@/components/ui/ScrollReveal'
import { Card3D } from '@/components/ui/Card3D'

// ================================================================
// GitHubStats — Live GitHub profile stats + pinned repos
// Update GITHUB_USERNAME in src/data/socials.ts
// ================================================================

const GITHUB_USERNAME = 'yourusername'   // ← Replace with your real username

interface GitHubUser {
  public_repos: number
  followers: number
  following: number
  name: string
  bio: string
}
interface GitHubRepo {
  id: number
  name: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  html_url: string
  updated_at: string
}

const langColors: Record<string,string> = {
  TypeScript:'#3178c6', JavaScript:'#f7df1e', PHP:'#777bb4',
  Python:'#3572A5', Vue:'#42b883', HTML:'#e34f26', CSS:'#1572b6',
  Shell:'#89e051', Dockerfile:'#384d54',
}

export function GitHubStats() {
  const [user, setUser]   = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]   = useState(false)

  useEffect(() => {
    const base = `https://api.github.com/users/${GITHUB_USERNAME}`
    Promise.all([
      fetch(base).then(r => r.json()),
      fetch(`${base}/repos?sort=updated&per_page=6`).then(r => r.json()),
    ])
      .then(([u, r]) => {
        if (u.message) throw new Error('not found')
        setUser(u)
        setRepos(Array.isArray(r) ? r.filter((repo: GitHubRepo) => !repo.name.includes(GITHUB_USERNAME)).slice(0, 3) : [])
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if (error) return null   // Silently hide if username not configured

  return (
    <section className="rm-section" style={{ background:'var(--section-bg-alt)' }}>
      <div className="rm-container">
        {/* Section header */}
        <div className="flex items-center gap-4 mb-10">
          <span className="section-num">07</span>
          <div className="rm-divider flex-1" />
          <span className="t-eyebrow">Open Source</span>
        </div>

        <ScrollReveal>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
            <h2 className="t-display text-3xl sm:text-4xl" style={{ color:'var(--text-1)' }}>
              GitHub Activity
            </h2>
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer"
              className="btn-ghost text-sm">
              <Github size={14} />View Profile
            </a>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="flex items-center justify-center py-16 gap-3">
            <div className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
              style={{ borderColor:'var(--accent)', borderTopColor:'transparent' }} />
            <span className="font-mono text-xs" style={{ color:'var(--text-3)' }}>Fetching GitHub data...</span>
          </div>
        ) : (
          <>
            {/* User stats */}
            {user && (
              <StaggerReveal className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { label:'Public Repos', value: user.public_repos, icon:'📦' },
                  { label:'Followers',    value: user.followers,    icon:'👥' },
                  { label:'Following',    value: user.following,    icon:'🔍' },
                ].map(stat => (
                  <motion.div key={stat.label} variants={staggerItemVariants}>
                    <Card3D className="bento-card flex items-center gap-4" intensity={8} lift={6}>
                      <span style={{ fontSize:'1.75rem' }}>{stat.icon}</span>
                      <div>
                        <p style={{ fontFamily:"'Geist', sans-serif", fontWeight:800, fontSize:'1.75rem', letterSpacing:'-0.04em', color:'var(--text-1)', lineHeight:1 }}>
                          {stat.value}
                        </p>
                        <p className="t-eyebrow">{stat.label}</p>
                      </div>
                    </Card3D>
                  </motion.div>
                ))}
              </StaggerReveal>
            )}

            {/* Contribution graph from github-readme-stats */}
            <ScrollReveal className="mb-8">
              <div className="rounded-2xl overflow-hidden border" style={{ borderColor:'var(--border)', background:'var(--card)' }}>
                <img
                  src={`https://github-readme-stats.vercel.app/api?username=${GITHUB_USERNAME}&show_icons=true&theme=dark&bg_color=1C1A18&title_color=E8702A&icon_color=CF4500&text_color=9A9690&border_color=2E2D2A&hide_border=false&count_private=true`}
                  alt={`${GITHUB_USERNAME} GitHub stats`}
                  className="w-full max-w-lg mx-auto block"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>

            {/* Recent repos */}
            {repos.length > 0 && (
              <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {repos.map(repo => (
                  <motion.div key={repo.id} variants={staggerItemVariants}>
                    <Card3D className="bento-card flex flex-col gap-3 h-full group" intensity={10} lift={7}>
                      <div className="flex items-start justify-between gap-2">
                        <h3 style={{ fontFamily:"'Geist', sans-serif", fontWeight:700, fontSize:'0.875rem', letterSpacing:'-0.01em', color:'var(--text-1)' }}>
                          {repo.name}
                        </h3>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                          style={{ color:'var(--text-3)', flexShrink:0 }}
                          className="transition-colors hover:text-accent">
                          <ExternalLink size={13} />
                        </a>
                      </div>
                      {repo.description && (
                        <p className="text-xs leading-relaxed flex-1" style={{ color:'var(--text-2)', fontFamily:"'Geist', sans-serif" }}>
                          {repo.description.length > 90 ? repo.description.slice(0, 90) + '…' : repo.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 mt-auto">
                        {repo.language && (
                          <span className="flex items-center gap-1.5 text-xs font-mono" style={{ color:'var(--text-3)' }}>
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: langColors[repo.language] ?? '#888' }} />
                            {repo.language}
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-xs font-mono" style={{ color:'var(--text-3)' }}>
                          <Star size={11} />{repo.stargazers_count}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-mono" style={{ color:'var(--text-3)' }}>
                          <GitFork size={11} />{repo.forks_count}
                        </span>
                      </div>
                    </Card3D>
                  </motion.div>
                ))}
              </StaggerReveal>
            )}
          </>
        )}
      </div>
    </section>
  )
}
