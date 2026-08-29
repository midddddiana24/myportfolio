import { useState } from 'react'
import { Globe, CalendarCheck, Palette, ShoppingBag, LayoutDashboard, Plug, BarChart2, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTransition }  from '@/components/layout/PageTransition'
import { TextReveal }      from '@/components/motion/TextReveal'
import { ClipReveal }      from '@/components/motion/ClipReveal'
import { MagneticButton }  from '@/components/motion/MagneticButton'
import { services, faqs } from '@/data/services'
import { DUR_SLOW }        from '@/lib/gsap'
import { Link }            from 'react-router-dom'
import { ArrowRight }      from 'lucide-react'

const iconMap: Record<string, React.ElementType> = { Globe, CalendarCheck, Palette, ShoppingBag, LayoutDashboard, Plug, BarChart2 }

export default function Services() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <PageTransition className="pt-28">
      {/* Header */}
      <section className="rm-section" style={{ background:'#0a0a0a' }}>
        <div className="rm-container">
          <div className="flex items-center gap-4 mb-16">
            <span className="eyebrow">/ Services</span>
            <div className="rule flex-1" />
          </div>

          <TextReveal as="h1" trigger="load" splitBy="words" delay={0.1} duration={DUR_SLOW} stagger={0.07} skewY={3}
            style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'clamp(2.5rem,8vw,7rem)', letterSpacing:'-0.04em', color:'#f0f0f0', lineHeight:1, marginBottom:'1.5rem' }}>
            What I build.
          </TextReveal>

          <ClipReveal direction="down">
            <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'1rem', color:'#5a5a5a', lineHeight:1.65, maxWidth:'520px' }}>
              From responsive websites to full-stack web applications — here's what I can build for you.
            </p>
          </ClipReveal>
        </div>
      </section>

      {/* Services list */}
      <section className="border-t" style={{ borderColor:'#1f1f1f', background:'#111111' }}>
        <div className="rm-container">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] ?? Globe
            return (
              <ClipReveal key={service.id} direction="right" delay={i * 0.06}>
                <div className="py-10 border-b grid grid-cols-1 lg:grid-cols-[3rem_280px_1fr_auto] gap-6 items-start"
                  style={{ borderColor:'#1f1f1f' }}>
                  {/* Number */}
                  <span style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.6875rem', color:'#2a2a2a', letterSpacing:'0.05em', paddingTop:'0.2rem' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Title + icon */}
                  <div style={{ display:'flex', alignItems:'flex-start', gap:'1rem' }}>
                    <div style={{ width:'40px', height:'40px', border:'1px solid #1f1f1f', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <Icon size={18} style={{ color:'#ffffff' }} />
                    </div>
                    {/* h2, not h3: these service titles are the first subsections
                        under the page h1 ("What I build."), so h3 skipped a level.
                        Same level as the FAQ heading further down, which is correct
                        — both are top-level sections of this page. */}
                    <h2 style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'1.125rem', letterSpacing:'-0.02em', color:'#f0f0f0', lineHeight:1.2 }}>
                      {service.title}
                    </h2>
                  </div>

                  {/* Description + use cases */}
                  <div>
                    <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'0.9375rem', color:'#5a5a5a', lineHeight:1.65, marginBottom:'1rem' }}>
                      {service.description}
                    </p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
                      {service.useCases.map(uc => (
                        <span key={uc} className="rm-tag">{uc}</span>
                      ))}
                    </div>
                  </div>

                  {/* Deliverable */}
                  <div style={{ minWidth:'180px' }}>
                    <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'#5a5a5a', marginBottom:'0.5rem' }}>
                      Deliverable
                    </p>
                    <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'0.8125rem', color:'#ffffff', lineHeight:1.5 }}>
                      {service.deliverable}
                    </p>
                  </div>
                </div>
              </ClipReveal>
            )
          })}
        </div>
      </section>

      {/* Availability note */}
      <section className="py-16" style={{ background:'#0a0a0a' }}>
        <div className="rm-container">
          <ClipReveal direction="down">
            <div style={{ border:'1px solid rgba(255,255,255,0.12)', padding:'2rem', background:'rgba(255,255,255,0.03)', display:'flex', alignItems:'flex-start', gap:'1.5rem' }}>
              <div style={{ width:'6px', height:'6px', borderRadius:'50%', background:'#ffffff', flexShrink:0, marginTop:'0.35rem', animation:'pulse 2s ease-in-out infinite' }} />
              <div>
                <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'#ffffff', marginBottom:'0.5rem' }}>
                  Availability Note
                </p>
                <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'0.9375rem', color:'#5a5a5a', lineHeight:1.65 }}>
                  I'm an incoming 4th year BSIT student. Availability depends on academic schedule.
                  I welcome collaborations during semester breaks. Reach out and let's discuss.
                </p>
              </div>
            </div>
          </ClipReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="rm-section border-t" style={{ borderColor:'#1f1f1f', background:'#111111' }}>
        <div className="rm-container">
          <div className="flex items-center gap-4 mb-16">
            <span className="eyebrow">/ FAQ</span>
            <div className="rule flex-1" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-16">
            <TextReveal as="h2" trigger="scroll" splitBy="words" duration={DUR_SLOW} stagger={0.07}
              style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:700, fontSize:'2rem', letterSpacing:'-0.04em', color:'#f0f0f0', lineHeight:1.1 }}>
              Frequently Asked Questions
            </TextReveal>

            <div className="border-t" style={{ borderColor:'#1f1f1f' }}>
              {faqs.map((faq, i) => (
                <ClipReveal key={i} direction="down" delay={i * 0.04}>
                  <div style={{ borderBottom:'1px solid #1f1f1f' }}>
                    <button
                      onClick={() => setOpen(open === i ? null : i)}
                      /* No `cursor:'none'` here: CustomCursor hides the pointer via
                         `html.custom-cursor *` (with !important), which already covers
                         this button. Declaring it inline also hid the cursor on
                         touchscreen laptops, where CustomCursor never mounts. */
                      style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.25rem 0', gap:'1rem', background:'transparent', border:'none', textAlign:'left' }}
                      aria-expanded={open === i}>
                      <span style={{ fontFamily:"'Space Grotesk', sans-serif", fontWeight:600, fontSize:'0.9375rem', letterSpacing:'-0.01em', color:'#f0f0f0' }}>
                        {faq.question}
                      </span>
                      <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration:0.2 }} style={{ flexShrink:0 }}>
                        <ChevronDown size={16} style={{ color:'#5a5a5a' }} />
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {open === i && (
                        <motion.div initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }}
                          transition={{ duration:0.22, ease:'easeInOut' }} style={{ overflow:'hidden' }}>
                          <p style={{ fontFamily:"'Space Grotesk', sans-serif", fontSize:'0.9375rem', color:'#5a5a5a', lineHeight:1.7, paddingBottom:'1.25rem' }}>
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </ClipReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t" style={{ borderColor:'#1f1f1f', background:'#0a0a0a' }}>
        <div className="rm-container text-center">
          <ClipReveal direction="down">
            <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'#5a5a5a', marginBottom:'1.5rem' }}>
              Ready to start?
            </p>
            <MagneticButton strength={0.3}>
              <Link to="/contact" className="btn-primary">
                Get In Touch <ArrowRight size={15} />
              </Link>
            </MagneticButton>
          </ClipReveal>
        </div>
      </section>
    </PageTransition>
  )
}
