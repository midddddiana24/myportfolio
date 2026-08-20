import { Github, Linkedin, Facebook, ExternalLink } from 'lucide-react'
import { cn } from '@/utils/cn'
import { socialLinks } from '@/data/socials'

const iconMap: Record<string, React.ElementType> = { Github, Linkedin, Facebook, ExternalLink }

interface SocialLinksProps { className?: string; size?: number; showLabels?: boolean; direction?: 'row'|'col' }

export function SocialLinks({ className, size=17, showLabels=false, direction='row' }: SocialLinksProps) {
  return (
    <div className={cn('flex gap-2', direction==='col'?'flex-col':'flex-row items-center', className)}>
      {socialLinks.map(link => {
        const Icon = iconMap[link.icon] ?? ExternalLink
        return (
          <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer"
            aria-label={`${link.label} profile`}
            className={cn('inline-flex items-center gap-2 rounded-lg border transition-all duration-150', showLabels?'px-3 py-2':'w-8 h-8 justify-center')}
            style={{ background:'var(--card)', borderColor:'var(--border)', color:'var(--text-2)' }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent-h)'; e.currentTarget.style.background='var(--accent-dim)' }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-2)'; e.currentTarget.style.background='var(--card)' }}>
            <Icon size={size} />
            {showLabels && <span style={{ fontFamily:"'Geist', sans-serif", fontWeight:500, fontSize:'0.8125rem' }}>{link.label}</span>}
          </a>
        )
      })}
    </div>
  )
}
