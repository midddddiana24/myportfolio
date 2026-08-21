# Roberto Mediana Jr. — Developer Portfolio

> Personal portfolio website of Roberto Mediana Jr., BSIT student at West Visayas State University – Janiuay Campus. Aspiring Full-Stack Developer.

[![Live Demo](https://img.shields.io/badge/Live-Demo-7c3aed?style=flat-square)](https://rmjdev.vercel.app)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06b6d4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

---

## ✨ Features

- **Modern dark/light theme** with system preference detection and localStorage persistence
- **Animated 3D hero** using React Three Fiber — lightweight and performance-optimized
- **Smooth scroll animations** via Framer Motion with reduced-motion support
- **Bento-style layouts** for services and project sections
- **Interactive project filtering** by category (School / Capstone / Personal)
- **Project detail pages** with case study layout
- **FAQ accordion** on services page
- **Accessible contact form** with client-side validation
- **Live date/time display** using browser time
- **Scroll progress indicator**
- **Mobile-responsive** with a glass navbar and drawer menu
- **SEO-optimized** with Open Graph and Twitter card meta tags
- **Lazy-loaded pages** for fast initial load
- **Data-driven architecture** — update content without touching components

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| Framework | React 18 + TypeScript |
| Bundler | Vite 5 |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion |
| 3D | React Three Fiber + Three.js |
| Routing | React Router DOM v6 |
| Icons | Lucide React + React Icons |
| Fonts | Syne (display) + Inter (body) + JetBrains Mono (code) |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer, PageTransition
│   ├── ui/           # Reusable: Button, ScrollReveal, Logo, etc.
│   ├── home/         # Hero, AboutPreview, ServicesPreview, etc.
│   ├── 3d/           # Three.js scene components
│   └── ...
├── pages/            # Home, About, TechStack, Services, Projects, Contact
├── data/             # Content: projects, certifications, tech stack, services
├── hooks/            # useTheme, useDateTime, useScrollReveal
├── types/            # TypeScript interfaces
└── utils/            # cn() helper, animation variants
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/my-portfolio.git
cd my-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
npm run preview
```

---

## ✏️ Customization

### Adding Projects

Edit `src/data/projects.ts`:

```ts
{
  id: 'your-project',
  slug: 'your-project-slug',
  title: 'Your Project Title',
  category: 'personal', // 'school' | 'capstone' | 'personal'
  shortDescription: 'Brief description',
  fullDescription: 'Full description for the detail page',
  image: '/assets/projects/your-image.png',
  technologies: ['React', 'Node.js'],
  date: '2025',
  status: 'completed', // 'completed' | 'in-progress' | 'planned'
  role: 'Full-Stack Developer',
  type: 'web-app',
}
```

### Adding Certificates

1. Place the certificate image in `public/assets/certs/`
2. Edit `src/data/certifications.ts`:

```ts
{
  id: 'cert-001',
  title: 'Certificate Title',
  issuer: 'Organization Name',
  date: 'January 2025',
  image: '/assets/certs/certificate-name.png',
  credentialUrl: 'https://credential.url',
}
```

### Updating Social Links

Edit `src/data/socials.ts` — update URLs, contact email.

### Adding Your Photo

Replace the placeholder in `src/components/home/Hero.tsx` and `src/pages/About.tsx`:

```tsx
// Replace the placeholder <div> with:
<img
  src="/assets/your-photo.jpg"
  alt="Roberto Mediana Jr."
  className="w-full h-full object-cover"
/>
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Deploy — Vercel auto-detects Vite

No extra configuration needed for React Router.

### Netlify

1. Build command: `npm run build`
2. Publish directory: `dist`
3. Add `public/_redirects`:
   ```
   /* /index.html 200
   ```

### GitHub Pages

Use the `vite-plugin-gh-pages` package or GitHub Actions.

---

## 📧 Contact Form Setup

The form is UI-ready but requires a backend/email service.

**Options:**

1. **EmailJS** (no backend needed):
   ```bash
   npm install @emailjs/browser
   ```
   Then update the `handleSubmit` function in `src/pages/Contact.tsx`

2. **Formspree**: Change the form action URL
3. **Resend / SendGrid**: Build a simple API endpoint

---

## 🖼️ Screenshots

> *Add screenshots here after building*

---

## 👤 Author

**Roberto Mediana Jr.**
- BSIT Student — West Visayas State University – Janiuay Campus
- Incoming 4th Year · Expected Graduation: 2027
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [linkedin.com/in/yourprofile](https://linkedin.com/in/yourprofile)

---

## 📄 License

This project is personal and not licensed for reuse or redistribution without permission.

---

## v6 — Animation Stack (rojvillacampa-style)

### New packages
```bash
npm install gsap lenis
```

### Animation features
| Feature | Technology |
|---|---|
| Butter-smooth scroll | **Lenis** `duration: 1.3` with expo easing |
| Scroll-triggered animations | **GSAP ScrollTrigger** |
| Split-text character reveals | **TextReveal** component (custom, no paid plugin) |
| Magnetic buttons | **MagneticButton** — cursor attraction with elastic return |
| Page transition curtain | **PageCurtain** — color panel slides in/out on route change |
| Horizontal project scroll | **HorizontalScroll** — pinned GSAP scrub |
| Clip-path wipe reveals | **ClipReveal** — `inset()` animation on scroll entry |
| Parallax layers | **Parallax** — scroll-linked y-transform |
| GSAP hero timeline | Staggered entrance after preloader completes |

### How the text reveal works
Each `<TextReveal>` splits text into word-spans, each wrapped in `overflow:hidden`.  
Inner spans start at `translateY(110%)` and animate to `0%` — creating the  
"text slides up from behind an invisible line" effect seen on premium portfolios.

### How Lenis + GSAP sync works
```ts
lenis.on('scroll', ScrollTrigger.update)
// RAF loop keeps both in sync at 60fps
requestAnimationFrame(time => lenis.raf(time))
```
