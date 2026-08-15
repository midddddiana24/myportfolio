import { Link } from 'react-router-dom'
import { ArrowRight, Globe, CalendarCheck, Palette, ShoppingBag, LayoutDashboard, Plug, BarChart2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { ScrollReveal, StaggerReveal, staggerItemVariants } from '@/components/ui/ScrollReveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { services } from '@/data/services'

// ===================================================
// ServicesPreview — Bento-grid services section
// ===================================================

const iconMap: Record<string, React.ElementType> = {
  Globe,
  CalendarCheck,
  Palette,
  ShoppingBag,
  LayoutDashboard,
  Plug,
  BarChart2,
}

// Featured 3 for homepage preview
const featuredServices = services.slice(0, 6)

export function ServicesPreview() {
  return (
    <section
      className="rm-section"
      style={{ background: 'var(--surface)' }}
      aria-labelledby="services-heading"
    >
      <div className="rm-container">
        <SectionHeading
          eyebrow="What I Can Build"
          title="Services I can provide"
          subtitle="From responsive websites to full-stack applications — here's what I build."
          align="center"
        />

        {/* Bento grid */}
        <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredServices.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Globe
            // Make first card span 2 columns on larger screens
            const isFirst = i === 0

            return (
              <motion.div
                key={service.id}
                variants={staggerItemVariants}
                className={`bento-card group cursor-default ${
                  isFirst ? 'sm:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                  style={{
                    background: 'var(--accent-dim)',
                    border: '1px solid rgba(124,58,237,0.2)',
                  }}
                >
                  <Icon
                    size={22}
                    style={{ color: 'var(--accent-light)' }}
                  />
                </div>

                {/* Title */}
                <h3
                  className="font-display font-bold text-base mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {service.description}
                </p>

                {/* Use case tags */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {service.useCases.slice(0, 2).map((useCase) => (
                    <span key={useCase} className="rm-tag text-xs">
                      {useCase}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </StaggerReveal>

        {/* View all */}
        <ScrollReveal delay={0.2} className="mt-10 flex justify-center">
          <Link to="/services" className="btn-ghost">
            View All Services
            <ArrowRight size={16} />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  )
}
