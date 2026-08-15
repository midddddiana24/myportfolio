import { Github, Linkedin, Facebook, ExternalLink } from 'lucide-react'
import { cn } from '@/utils/cn'
import { socialLinks } from '@/data/socials'

// ===================================================
// SocialLinks — Reusable social icon link strip
// ===================================================

const iconMap: Record<string, React.ElementType> = {
  Github,
  Linkedin,
  Facebook,
  ExternalLink,
}

interface SocialLinksProps {
  className?: string
  size?: number
  showLabels?: boolean
  direction?: 'row' | 'col'
}

export function SocialLinks({
  className,
  size = 18,
  showLabels = false,
  direction = 'row',
}: SocialLinksProps) {
  return (
    <div
      className={cn(
        'flex gap-3',
        direction === 'col' ? 'flex-col' : 'flex-row items-center',
        className
      )}
    >
      {socialLinks.map((link) => {
        const Icon = iconMap[link.icon] ?? ExternalLink

        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${link.label} profile`}
            className={cn(
              'inline-flex items-center gap-2 rounded-xl p-2.5 transition-all duration-300',
              'border focus-visible:outline-none focus-visible:ring-2',
              showLabels && 'px-4'
            )}
            style={{
              background: 'var(--card)',
              borderColor: 'var(--border)',
              color: 'var(--text-secondary)',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'var(--accent)'
              el.style.background = 'var(--accent-dim)'
              el.style.color = 'var(--accent-light)'
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget
              el.style.borderColor = 'var(--border)'
              el.style.background = 'var(--card)'
              el.style.color = 'var(--text-secondary)'
            }}
          >
            <Icon size={size} />
            {showLabels && (
              <span className="text-sm font-medium">{link.label}</span>
            )}
          </a>
        )
      })}
    </div>
  )
}
