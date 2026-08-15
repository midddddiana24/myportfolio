import type { Certification } from '@/types'

// ===================================================
// RM Portfolio — Certifications Data
// Add certificates here. Images go in /public/assets/certs/
// ===================================================

export const certifications: Certification[] = [
  // ── Replace these placeholders with your actual certificates ──
  // {
  //   id: 'cert-001',
  //   title: 'Your Certificate Title',
  //   issuer: 'Issuing Organization',
  //   date: 'Month Year',
  //   image: '/assets/certs/your-cert.png',
  //   credentialUrl: 'https://credential.url',
  //   category: 'Web Development',
  // },

  // PLACEHOLDER — remove and replace with your own
  {
    id: 'cert-placeholder-1',
    title: 'Certificate Placeholder',
    issuer: 'Your Certifying Organization',
    date: '2024',
    image: '',            // Replace with: '/assets/certs/cert-name.png'
    credentialUrl: '',
    category: 'General',
  },
]

// Tip: To add your real certificates from C:\Users\rober\Desktop\myportfolio\,
// copy the certificate images to: public/assets/certs/
// Then add entries above following the same structure.
