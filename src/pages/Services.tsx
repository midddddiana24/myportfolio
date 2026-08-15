import { useState } from 'react'
import {
  Globe, CalendarCheck, Palette, ShoppingBag,
  LayoutDashboard, Plug, BarChart2, ChevronDown,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal, StaggerReveal, staggerItemVariants } from '@/components/ui/ScrollReveal'
import { services, faqs } from '@/data/services'

// ===================================================
// Services Page
// ===================================================

const iconMap: Record<string, React.ElementType> = {
  Globe, CalendarCheck, Palette, ShoppingBag,
  LayoutDashboard, Plug, BarChart2,
}

// ── Service Card ────────────────────────────────────
function ServiceCard({ service }: { service: typeof services[0] }) {
  const Icon = iconMap[service.icon] ?? Globe

  return (
    <motion.div
      variants={staggerItemVariants}
      className="bento-card group flex flex-col gap-4"
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: 'var(--accent-dim)',
          border: '1px solid rgba(124,58,237,0.2)',
        }}
      >
        <Icon size={22} style={{ color: 'var(--accent-light)' }} />
      </div>

      {/* Title */}
      <div>
        <h3
          className="font-display font-bold text-base mb-1"
          style={{ color: 'var(--text-primary)' }}
        >
          {service.title}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          {service.description}
        </p>
      </div>

      {/* Use cases */}
      <div className="flex-1">
        <p
          className="text-xs font-mono uppercase tracking-widest mb-2"
          style={{ color: 'var(--text-muted)' }}
        >
          Use Cases
        </p>
        <ul className="flex flex-col gap-1.5">
          {service.useCases.map((uc) => (
            <li
              key={uc}
              className="text-xs flex items-center gap-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span
                className="w-1 h-1 rounded-full flex-shrink-0"
                style={{ background: 'var(--accent)' }}
              />
              {uc}
            </li>
          ))}
        </ul>
      </div>

      {/* Deliverable */}
      <div
        className="pt-3"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <p
          className="text-xs font-mono uppercase tracking-widest mb-1"
          style={{ color: 'var(--text-muted)' }}
        >
          Deliverable
        </p>
        <p
          className="text-xs leading-relaxed"
          style={{ color: 'var(--accent-light)' }}
        >
          {service.deliverable}
        </p>
      </div>
    </motion.div>
  )
}

// ── FAQ Accordion ───────────────────────────────────
function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-2">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="rm-card overflow-hidden"
        >
          <button
            className="w-full flex items-center justify-between p-5 text-left gap-4"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            aria-controls={`faq-answer-${i}`}
            id={`faq-question-${i}`}
          >
            <span
              className="font-medium text-sm"
              style={{ color: 'var(--text-primary)' }}
            >
              {faq.question}
            </span>
            <motion.div
              animate={{ rotate: open === i ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <ChevronDown
                size={18}
                style={{ color: 'var(--text-muted)' }}
              />
            </motion.div>
          </button>

          <AnimatePresence>
            {open === i && (
              <motion.div
                id={`faq-answer-${i}`}
                role="region"
                aria-labelledby={`faq-question-${i}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                style={{ overflow: 'hidden' }}
              >
                <div
                  className="px-5 pb-5 text-sm leading-relaxed"
                  style={{
                    color: 'var(--text-muted)',
                    borderTop: '1px solid var(--border)',
                    paddingTop: '1rem',
                  }}
                >
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

// ── Page ────────────────────────────────────────────
export default function Services() {
  return (
    <PageTransition className="pt-24">

      {/* Header */}
      <section className="rm-section pb-8">
        <div className="rm-container">
          <SectionHeading
            eyebrow="Services"
            title="What I can build for you"
            subtitle="From responsive business websites to full-stack web applications — here's what I specialize in."
            align="center"
          />
        </div>
      </section>

      {/* Services grid */}
      <section
        className="rm-section pt-4"
        style={{ background: 'var(--surface)' }}
        aria-labelledby="services-grid"
      >
        <div className="rm-container">
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Availability note */}
      <section className="py-12">
        <div className="rm-container">
          <ScrollReveal>
            <div
              className="bento-card text-center py-10 max-w-xl mx-auto"
              style={{
                border: '1px solid rgba(124,58,237,0.2)',
                background: 'var(--accent-dim)',
              }}
            >
              <p
                className="text-sm font-medium mb-2"
                style={{ color: 'var(--accent-light)' }}
              >
                📅 Availability Note
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                I am currently an incoming 4th year BSIT student. Availability
                for freelance projects depends on my academic schedule. I welcome
                collaborations during semester breaks and flexible periods.
                Reach out and let's discuss!
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section
        className="rm-section pt-4"
        style={{ background: 'var(--surface)' }}
        aria-labelledby="faq-heading"
      >
        <div className="rm-container">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            subtitle="Common questions about the work I do and how I operate."
          />
          <div style={{ maxWidth: '720px' }}>
            <FAQAccordion />
          </div>
        </div>
      </section>

    </PageTransition>
  )
}
