// ===================================================
// RM Portfolio — Career Journey
//
// SAMPLE CONTENT. Every milestone below is a placeholder written from what
// the rest of the site already claims (BSIT at WVSU Janiuay, capstone in
// progress, Cisco certificate track). Edit the strings, add or remove
// entries — the section reads the array length and rebuilds itself, so
// nothing else needs touching.
//
// One deliberate constraint: `kicker` is the giant Anton line and wants to
// stay SHORT. It is set at clamp(2rem, 4.4vw, 3.4rem) inside a fixed-width
// panel, so anything past roughly 18 characters starts wrapping to three
// lines and the panel scrolls. Put the detail in `body`, not the kicker.
// ===================================================

export interface Milestone {
  /** Mono label top-left of the panel. A year, a range, or 'NOW'. */
  period: string
  /** Short Anton headline. Keep under ~18 chars — see note above. */
  kicker: string
  /** One or two sentences of DM Sans body copy. */
  body: string
  /** Optional mono list rendered as a bordered stack under the body. */
  points?: string[]
  /**
   * Marks the milestone as not-yet-complete. Renders a hollow status dot and
   * the word PENDING instead of a filled dot, so a future goal never reads
   * as an accomplishment already banked.
   */
  pending?: boolean
}

export const journeyIntro = {
  eyebrow: '/ Career journey',
  index: '01',
  heading: 'Building the web, one pixel at a time.',
  /** The two paragraphs moved out of the old home-page About section. */
  paragraphs: [
    `I'm an IT student with a genuine passion for building software that solves real
     problems. I work across the full stack — from clean, responsive UIs to reliable
     server-side logic and database architecture.`,
    `Currently pursuing my BSIT at West Visayas State University – Janiuay Campus and
     actively building my capstone system while exploring web security and AI
     integrations.`,
  ],
  stats: [
    { target: 4,  suffix: 'th', label: 'Year of Study' },
    { target: 20, suffix: '+',  label: 'Technologies' },
    { target: 3,  suffix: '+',  label: 'Projects Built' },
  ],
} as const

export const milestones: Milestone[] = [
  {
    period: '2022',
    kicker: 'Started BSIT',
    body: `Enrolled in Information Technology at West Visayas State University –
           Janiuay Campus. First real exposure to programming fundamentals, and the
           point where the hobby turned into a direction.`,
    points: ['C / C++ fundamentals', 'Discrete mathematics', 'First static websites'],
  },
  {
    period: '2023',
    kicker: 'Full Stack',
    body: `Moved past markup into actual applications — routing, authentication,
           relational schemas. Picked up Laravel on the back end and React on the
           front, which is still the pairing I reach for first.`,
    points: ['Laravel + MySQL', 'React + Tailwind CSS', 'Git as a daily habit'],
  },
  {
    period: '2024',
    kicker: 'Capstone',
    body: `Began the MIS Service Request System — a role-based platform for submitting,
           tracking and resolving IT service requests across departments. My first
           project with real users and real requirements rather than a rubric.`,
    points: ['Role-based access control', 'Request lifecycle + escalation', 'Admin analytics dashboard'],
  },
  {
    period: '2025',
    kicker: 'Security',
    body: `Started studying web application security seriously — how the things I build
           break, and what an attacker actually looks for. Networking and security
           coursework through the Cisco certificate track.`,
    points: ['Cisco networking certificates', 'OWASP Top 10 in practice', 'Kali Linux tooling'],
  },
  {
    period: '2026',
    kicker: 'Graduating',
    body: `Expected completion of the BSIT. Looking for a role where I can keep working
           across the whole stack and keep the security perspective close to the
           development work rather than bolted on afterwards.`,
    points: ['Capstone defence', 'Portfolio + case studies', 'Open to opportunities'],
    pending: true,
  },
]
