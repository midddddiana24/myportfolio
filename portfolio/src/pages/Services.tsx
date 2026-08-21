import { useState } from 'react'
import { Globe, CalendarCheck, Palette, ShoppingBag, LayoutDashboard, Plug, BarChart2, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal, StaggerReveal, staggerItemVariants } from '@/components/ui/ScrollReveal'
import { services, faqs } from '@/data/services'

const iconMap: Record<string, React.ElementType> = { Globe, CalendarCheck, Palette, ShoppingBag, LayoutDashboard, Plug, BarChart2 }

export default function Services() {
  const [open, setOpen] = useState<number|null>(null)

  return (
    <PageTransition className="pt-28">

      {/* Header */}
      <section className="rm-section pb-8">
        <div className="rm-container">
          <SectionHeading eyebrow="Services" title="What I can build for you" subtitle="From responsive business websites to full-stack web applications." align="center" />
        </div>
      </section>

      {/* Services grid */}
      <section className="rm-section pt-0" style={{ background:'var(--section-bg-alt)' }}>
        <div className="rm-container">
          <StaggerReveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(service => {
              const Icon = iconMap[service.icon] ?? Globe
              return (
                <motion.div key={service.id} variants={staggerItemVariants} className="bento-card flex flex-col gap-4 group">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{ background:'var(--accent-dim)', border:'1px solid rgba(207,69,0,0.15)' }}>
                    <Icon size={20} style={{ color:'var(--accent-h)' }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily:"'Geist', sans-serif", fontWeight:700, fontSize:'0.9375rem', letterSpacing:'-0.02em', color:'var(--text-1)', marginBottom:'0.4rem' }}>{service.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color:'var(--text-3)' }}>{service.description}</p>
                  </div>
                  <div className="flex-1">
                    <p className="t-eyebrow mb-2">Use Cases</p>
                    <ul className="flex flex-col gap-1.5">
                      {service.useCases.map(uc => (
                        <li key={uc} className="flex items-center gap-2 text-xs" style={{ color:'var(--text-2)', fontFamily:"'Geist', sans-serif" }}>
                          <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background:'var(--accent)' }} />{uc}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-3 border-t" style={{ borderColor:'var(--border)' }}>
                    <p className="t-eyebrow mb-1">Deliverable</p>
                    <p className="text-xs leading-relaxed" style={{ color:'var(--accent-h)', fontFamily:"'Geist', sans-serif" }}>{service.deliverable}</p>
                  </div>
                </motion.div>
              )
            })}
          </StaggerReveal>
        </div>
      </section>

      {/* Availability */}
      <section className="py-12">
        <div className="rm-container">
          <ScrollReveal>
            <div className="bento-card text-center py-10 max-w-xl mx-auto border" style={{ borderColor:'rgba(207,69,0,0.2)', background:'var(--accent-dim)' }}>
              <p style={{ fontFamily:"'Geist Mono', monospace", fontWeight:600, fontSize:'0.75rem', color:'var(--accent-h)', marginBottom:'0.5rem' }}>
                📅 AVAILABILITY NOTE
              </p>
              <p className="text-sm leading-relaxed" style={{ color:'var(--text-2)', fontFamily:"'Geist', sans-serif" }}>
                I am currently an incoming 4th year BSIT student. Availability depends on my academic schedule.
                I welcome collaborations during semester breaks and flexible periods.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="rm-section pt-4" style={{ background:'var(--section-bg-alt)' }}>
        <div className="rm-container">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" subtitle="Common questions about the work I do." />
          <div className="flex flex-col gap-1.5 max-w-2xl">
            {faqs.map((faq, i) => (
              <div key={i} className="rm-card overflow-hidden">
                <button className="w-full flex items-center justify-between p-5 text-left gap-4"
                  onClick={() => setOpen(open===i?null:i)} aria-expanded={open===i}>
                  <span style={{ fontFamily:"'Geist', sans-serif", fontWeight:600, fontSize:'0.9375rem', color:'var(--text-1)', letterSpacing:'-0.01em' }}>{faq.question}</span>
                  <motion.div animate={{ rotate:open===i?180:0 }} transition={{ duration:0.2 }}>
                    <ChevronDown size={16} style={{ color:'var(--text-3)', flexShrink:0 }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {open===i && (
                    <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.2 }} style={{ overflow:'hidden' }}>
                      <div className="px-5 pb-5 text-sm leading-relaxed border-t" style={{ color:'var(--text-2)', borderColor:'var(--border)', paddingTop:'1rem', fontFamily:"'Geist', sans-serif" }}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

    </PageTransition>
  )
}
