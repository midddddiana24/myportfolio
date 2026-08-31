import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Star, GitFork, ExternalLink } from 'lucide-react'
import { ClipReveal }     from '@/components/motion/ClipReveal'
import { MagneticButton } from '@/components/motion/MagneticButton'

// ================================================================
// GitHubStats — lime green editorial stats display
// ================================================================

const GITHUB_USERNAME = 'yourusername'  // ← Replace

interface GitHubUser   { public_repos:number; followers:number; following:number }
interface GitHubRepo   { id:number; name:string; description:string|null; stargazers_count:number; forks_count:number; language:string|null; html_url:string }

const langColors: Record<string,string> = {
  TypeScript:'#8a8a8a', JavaScript:'#8a8a8a', PHP:'#8a8a8a',
  Python:'#8a8a8a', Vue:'#8a8a8a', HTML:'#8a8a8a', CSS:'#8a8a8a',
}

export function GitHubStats() {
  const [user, setUser]   = useState<GitHubUser|null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(false)

  useEffect(() => {
    const base = `https://api.github.com/users/${GITHUB_USERNAME}`
    Promise.all([fetch(base).then(r=>r.json()), fetch(`${base}/repos?sort=updated&per_page=6`).then(r=>r.json())])
      .then(([u, r]) => {
        if (u.message) throw new Error('not found')
        setUser(u)
        setRepos(Array.isArray(r) ? r.filter((repo: GitHubRepo) => !repo.name.includes(GITHUB_USERNAME)).slice(0,3) : [])
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if (error) return null

  return (
    <section className="rm-section border-t" style={{ borderColor:'#1f1f1f', background:'#111111' }}>
      <div className="rm-container">
        <div className="flex items-center gap-4 mb-16">
          <span className="eyebrow">/ Open Source</span>
          <div className="rule flex-1" />
          <MagneticButton strength={0.3}>
            <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer"
              className="btn-ghost" style={{ padding:'0.375rem 0.875rem', fontSize:'0.625rem', fontFamily:"'DM Mono', monospace", letterSpacing:'0.1em', textTransform:'uppercase' }}>
              <Github size={13} /> Profile
            </a>
          </MagneticButton>
        </div>

        {loading ? (
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', paddingBottom:'2rem' }}>
            <div style={{ width:14, height:14, border:'1px solid #1f1f1f', borderTopColor:'#ffffff', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />
            <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'#2a2a2a' }}>
              Fetching GitHub data…
            </span>
          </div>
        ) : (
          <>
            {user && (
              <div className="grid grid-cols-3 gap-px border mb-8" style={{ background:'#1f1f1f', borderColor:'#1f1f1f' }}>
                {[
                  { label:'Public Repos', value:user.public_repos },
                  { label:'Followers',    value:user.followers },
                  { label:'Following',    value:user.following },
                ].map((s, i) => (
                  <ClipReveal key={s.label} direction="down" delay={i*0.07}>
                    <div style={{ background:'#111111', padding:'2rem 1.5rem' }}>
                      <p style={{ fontFamily:"'Anton', sans-serif", textTransform:'uppercase', fontWeight:400, fontSize:'2.5rem', letterSpacing:'-0.01em', color:'#ffffff', lineHeight:1 }}>
                        {s.value}
                      </p>
                      <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'#5a5a5a', marginTop:'0.5rem' }}>
                        {s.label}
                      </p>
                    </div>
                  </ClipReveal>
                ))}
              </div>
            )}

            {repos.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px border" style={{ background:'#1f1f1f', borderColor:'#1f1f1f' }}>
                {repos.map((repo, i) => (
                  <motion.div key={repo.id} initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                    transition={{ delay:i*0.07, duration:0.45 }} viewport={{ once:true }}>
                    <div style={{ background:'#111111', padding:'1.75rem', display:'flex', flexDirection:'column', gap:'0.75rem', height:'100%' }}>
                      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'0.5rem' }}>
                        <h3 style={{ fontFamily:"'Anton', sans-serif", textTransform:'uppercase', fontWeight:400, fontSize:'0.9375rem', letterSpacing:'0.02em', color:'#f0f0f0' }}>
                          {repo.name}
                        </h3>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer"
                          style={{ color:'#2a2a2a', flexShrink:0, transition:'color 0.2s' }}
                          onMouseEnter={e=>{e.currentTarget.style.color='#ffffff'}}
                          onMouseLeave={e=>{e.currentTarget.style.color='#2a2a2a'}}>
                          <ExternalLink size={13}/>
                        </a>
                      </div>
                      {repo.description && (
                        <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.8125rem', color:'#5a5a5a', lineHeight:1.6, flex:1 }}>
                          {repo.description.length > 80 ? repo.description.slice(0,80)+'…' : repo.description}
                        </p>
                      )}
                      <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginTop:'auto' }}>
                        {repo.language && (
                          <span style={{ display:'flex', alignItems:'center', gap:'0.375rem', fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', letterSpacing:'0.08em', color:'#5a5a5a' }}>
                            <span style={{ width:8, height:8, borderRadius:'50%', background:langColors[repo.language]??'#555' }}/>
                            {repo.language}
                          </span>
                        )}
                        <span style={{ display:'flex', alignItems:'center', gap:'0.25rem', fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', color:'#5a5a5a' }}>
                          <Star size={10}/>{repo.stargazers_count}
                        </span>
                        <span style={{ display:'flex', alignItems:'center', gap:'0.25rem', fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', color:'#5a5a5a' }}>
                          <GitFork size={10}/>{repo.forks_count}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
