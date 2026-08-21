import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function HomeCTA() {
  return (
    <section className="rm-section" style={{ background: 'var(--surface)' }}>
      <div className="rm-container">
        <ScrollReveal>
          <div
            className="grain relative rounded-3xl overflow-hidden px-10 sm:px-16 py-16 sm:py-20 text-center"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
          >
            {/* Top gradient */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(212,82,10,0.10) 0%, transparent 60%)' }}
            />
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-64"
              style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
            />

            <div className="relative z-10">
              <p className="t-eyebrow mb-5">Get In Touch</p>

              <h2
                className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-3 text-balance"
                style={{ color: 'var(--text-primary)', letterSpacing: '-0.04em' }}
              >
                Have a project{' '}
                <em
                  style={{
                    fontFamily: '"Instrument Serif", serif',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    letterSpacing: '-0.01em',
                  }}
                >
                  or idea?
                </em>
              </h2>

              <p className="text-base sm:text-lg mb-8 max-w-md mx-auto leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                I'm open to collaborations, academic partnerships, and freelance projects.
                Let's talk.
              </p>

              <Link to="/contact" className="btn-primary text-base px-8 py-3.5">
                Get In Touch <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
