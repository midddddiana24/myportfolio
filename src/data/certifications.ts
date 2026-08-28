import type { Certification } from '@/types'

// ===================================================
// RM Portfolio — Certifications
//
// Generated from the signed PDFs in /public/assets/certs/.
// Each entry pairs a grayscale page-1 preview (.jpg) with the
// original certificate (.pdf) as the credential link.
// Ordered newest first.
// ===================================================

export const certifications: Certification[] = [
  {
    id: 'network-defense',
    title: 'Network Defense',
    issuer: 'Cisco Networking Academy',
    date: 'January 2026',
    image: '/assets/certs/network-defense.jpg',
    credentialUrl: '/assets/certs/network-defense.pdf',
    category: 'Cybersecurity',
  },
  {
    id: 'endpoint-security',
    title: 'Endpoint Security',
    issuer: 'Cisco Networking Academy',
    date: 'January 2026',
    image: '/assets/certs/endpoint-security.jpg',
    credentialUrl: '/assets/certs/endpoint-security.pdf',
    category: 'Cybersecurity',
  },
  {
    id: 'networking-basics',
    title: 'Networking Basics',
    issuer: 'Cisco Networking Academy',
    date: 'January 2026',
    image: '/assets/certs/networking-basics.jpg',
    credentialUrl: '/assets/certs/networking-basics.pdf',
    category: 'Networking',
  },
  {
    id: 'networking-devices-and-initial-configuration',
    title: 'Networking Devices and Initial Configuration',
    issuer: 'Cisco Networking Academy',
    date: 'January 2026',
    image: '/assets/certs/networking-devices-and-initial-configuration.jpg',
    credentialUrl: '/assets/certs/networking-devices-and-initial-configuration.pdf',
    category: 'Networking',
  },
  {
    id: 'hardware-and-upgrade-support',
    title: 'Hardware and Upgrade Support',
    issuer: 'Cisco Networking Academy',
    date: 'December 2025',
    image: '/assets/certs/hardware-and-upgrade-support.jpg',
    credentialUrl: '/assets/certs/hardware-and-upgrade-support.pdf',
    category: 'IT Support',
  },
  {
    id: 'digital-safety-and-security-awareness',
    title: 'Digital Safety and Security Awareness',
    issuer: 'Cisco Networking Academy',
    date: 'December 2025',
    image: '/assets/certs/digital-safety-and-security-awareness.jpg',
    credentialUrl: '/assets/certs/digital-safety-and-security-awareness.pdf',
    category: 'Cybersecurity',
  },
  {
    id: 'digital-awareness',
    title: 'Digital Awareness',
    issuer: 'Cisco Networking Academy',
    date: 'December 2025',
    image: '/assets/certs/digital-awareness.jpg',
    credentialUrl: '/assets/certs/digital-awareness.pdf',
    category: 'Digital Literacy',
  },
  {
    id: 'introduction-to-cybersecurity',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: 'December 2025',
    image: '/assets/certs/introduction-to-cybersecurity.jpg',
    credentialUrl: '/assets/certs/introduction-to-cybersecurity.pdf',
    category: 'Cybersecurity',
  },
]

// Distinct categories, for filter tabs.
export const certCategories: string[] = [
  'All',
  'Cybersecurity',
  'Digital Literacy',
  'IT Support',
  'Networking',
]
