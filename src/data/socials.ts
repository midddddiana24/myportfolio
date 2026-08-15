import type { SocialLink, NavItem } from '@/types'

// ===================================================
// RM Portfolio — Socials & Navigation Config
// Replace placeholder URLs with your actual profiles.
// ===================================================

export const socialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    label: 'GitHub',
    url: 'https://github.com/yourusername',   // ← Replace
    icon: 'Github',
  },
  {
    platform: 'LinkedIn',
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/yourprofile', // ← Replace
    icon: 'Linkedin',
  },
  {
    platform: 'Facebook',
    label: 'Facebook',
    url: 'https://facebook.com/yourprofile',   // ← Replace
    icon: 'Facebook',
  },
]

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Tech Stack', href: '/tech-stack' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
]

// Contact email — update before deployment
export const contactEmail = 'your.email@example.com' // ← Replace
