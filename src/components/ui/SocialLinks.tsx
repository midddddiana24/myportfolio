import { Github, Linkedin, Facebook, ExternalLink } from 'lucide-react'
import { cn } from '@/utils/cn'
import { socialLinks } from '@/data/socials'

const iconMap: Record<string, React.ElementType> = { Github, Linkedin, Facebook, ExternalLink }

interface SocialLinksProps {
  className?: string
  size?: number
  showLabels?: boolean
  direction?: 'row'|'col'
}

export function SocialLinks({ className, size=16, showLabels=false, direction='row' }: SocialLinksProps) {
  return (
    <div className={cn('flex gap-2', direction==='col'?'flex-col':'flex-row items-center', className)}>
      {socialLinks.map(link => {
        const Icon = iconMap[link.icon] ?? ExternalLink
        return (
          <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer"
            aria-label={`${link.label} profile`}
            style={{
              display:'inline-flex', alignItems:'center', gap:'0.5rem',
              padding: showLabels ? '0.5rem 0.875rem' : '0.5rem',
              border:'1px solid #1f1f1f', background:'transparent',
              color:'#5a5a5a', borderRadius:0, transition:'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={e=>{ e.currentTarget.style.borderColor='#ffffff'; e.currentTarget.style.color='#ffffff' }}
            onMouseLeave={e=>{ e.currentTarget.style.borderColor='#1f1f1f'; e.currentTarget.style.color='#5a5a5a' }}>
            <Icon size={size} />
            {showLabels && (
              <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.1em', textTransform:'uppercase' }}>
                {link.label}
              </span>
            )}
          </a>
        )
      })}
    </div>
  )
}
