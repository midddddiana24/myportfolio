import type { Service, FAQItem } from '@/types'

// ===================================================
// RM Portfolio — Services Data
// ===================================================

export const services: Service[] = [
  {
    id: 'business-websites',
    icon: 'Globe',
    title: 'Business Websites',
    description:
      'Professional, responsive websites that represent organizations and brands online with clean design and reliable performance.',
    useCases: ['Company profiles', 'Landing pages', 'Organization portals', 'Blog platforms'],
    deliverable: 'Fully responsive website with CMS-ready architecture',
  },
  {
    id: 'booking-systems',
    icon: 'CalendarCheck',
    title: 'Booking & Reservation Systems',
    description:
      'Web applications that handle appointments, scheduling, and reservations — with real-time availability, confirmation, and management dashboards.',
    useCases: ['Appointment scheduling', 'Room/venue booking', 'Service reservations', 'Queue management'],
    deliverable: 'Full-stack booking system with admin control panel',
  },
  {
    id: 'ui-ux-design',
    icon: 'Palette',
    title: 'UI/UX Design',
    description:
      'Clean, accessible, and intentional interface design that prioritizes usability and visual clarity for web and application projects.',
    useCases: ['Website mockups', 'App wireframes', 'Design system setup', 'Interface redesigns'],
    deliverable: 'High-fidelity designs with responsive specifications',
  },
  {
    id: 'online-stores',
    icon: 'ShoppingBag',
    title: 'Online Stores',
    description:
      'Modern e-commerce interfaces with product listings, cart functionality, and clean checkout experiences.',
    useCases: ['Product catalogues', 'Shopping cart systems', 'Order management', 'E-commerce front ends'],
    deliverable: 'E-commerce web interface with product and order management',
  },
  {
    id: 'web-applications',
    icon: 'LayoutDashboard',
    title: 'Web Applications',
    description:
      'Interactive, data-driven web applications designed around specific business or academic requirements.',
    useCases: ['Custom management tools', 'Academic systems', 'Workflow applications', 'Internal tools'],
    deliverable: 'Full-stack web application with responsive UI',
  },
  {
    id: 'api-backend',
    icon: 'Plug',
    title: 'API & Backend Development',
    description:
      'RESTful API design, database integration, authentication systems, and backend logic for web and mobile applications.',
    useCases: ['REST API development', 'Database schema design', 'Auth systems', 'Third-party integrations'],
    deliverable: 'Documented REST API with authentication and database layer',
  },
  {
    id: 'dashboards',
    icon: 'BarChart2',
    title: 'Dashboard & Management Systems',
    description:
      'Administrative dashboards, reporting systems, and CRUD applications for managing data, users, and operations.',
    useCases: ['Admin panels', 'Analytics dashboards', 'CRUD systems', 'Report generators'],
    deliverable: 'Role-based dashboard with data visualization and reporting',
  },
]

// ── FAQ Data ────────────────────────────────────────
export const faqs: FAQItem[] = [
  {
    question: 'What type of websites can you build?',
    answer:
      'I can build business websites, landing pages, portfolios, booking systems, e-commerce interfaces, web applications, and administrative dashboards. My focus is on clean, functional, and maintainable solutions using modern web technologies.',
  },
  {
    question: 'Can you create responsive websites?',
    answer:
      'Yes — responsive design is a core requirement for every project. All websites I build are tested and optimized for desktop, tablet, and mobile screen sizes.',
  },
  {
    question: 'Can you build database-driven applications?',
    answer:
      'Yes. I work with both SQL (MySQL, PostgreSQL) and NoSQL (MongoDB, Firebase, Supabase) databases. I can design schemas, build relationships, and integrate them with backend frameworks like Laravel and Node.js.',
  },
  {
    question: 'Do you create booking systems?',
    answer:
      'Yes — booking and reservation systems are one of my core service offerings. I can build complete scheduling platforms with availability management, confirmation flows, and admin dashboards.',
  },
  {
    question: 'Can you work with APIs?',
    answer:
      'Absolutely. I build REST APIs using Laravel (PHP) and Express.js (Node.js), and I have experience consuming third-party APIs and integrating them into web applications.',
  },
  {
    question: 'Can you build an online store?',
    answer:
      'Yes — I can build custom e-commerce interfaces with product listings, cart systems, and checkout flows. For complex commerce needs, I can also integrate with existing e-commerce solutions.',
  },
  {
    question: 'Can you redesign an existing website?',
    answer:
      'Yes — I can audit an existing website, identify UX/UI issues, and redesign or rebuild it with improved structure, visual design, and performance.',
  },
  {
    question: 'What technologies do you use?',
    answer:
      'On the frontend: React, Vue.js, Next.js, TypeScript, and Tailwind CSS. On the backend: Laravel, Node.js, Express.js, and PHP. For databases: MySQL, PostgreSQL, MongoDB, Supabase, and Firebase. I also use Git, Docker, and Postman in my workflow.',
  },
  {
    question: 'Are you available for freelance projects?',
    answer:
      'I am currently an incoming 4th year BSIT student, so my availability depends on my academic schedule. I am open to freelance and collaborative projects, especially during semester breaks and flexible periods. Feel free to reach out and we can discuss timing and scope.',
  },
]
