import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

// ===================================================
// HomeCTA — Final call-to-action section
// ===================================================

export function HomeCTA() {
  return (
    <section
      className="rm-section"
      style={{ background: 'var(--surface)' }}
      aria-label="Call to action"
    >
      <div className="rm-container">
        <ScrollReveal>
          <div
            className="relative rounded-3xl overflow-hidden p-10 sm:p-16 text-center"
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
            }}
          >
            {/* Background glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 60%)',
              }}
            />

            {/* Top accent line */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-48"
              style={{
                background:
                  'linear-gradient(90deg, transparent, var(--accent), transparent)',
              }}
              aria-hidden="true"
            />

            <div className="relative z-10">
              {/* Eyebrow */}
              <div className="flex items-center justify-center gap-2 mb-5">
                <MessageCircle size={16} style={{ color: 'var(--accent-light)' }} />
                <span
                  className="text-xs font-mono uppercase tracking-widest"
                  style={{ color: 'var(--accent-light)' }}
                >
                  Get In Touch
                </span>
              </div>

              {/* Heading */}
              <h2
                className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 text-balance"
                style={{ color: 'var(--text-primary)' }}
              >
                Have a project or idea?
              </h2>

              <p
                className="text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                I'm open to collaborations, academic partnerships, and freelance
                projects. Whether you have a project in mind or just want to chat
                about technology — let's connect.
              </p>

              {/* CTA button */}
              <Link
                to="/contact"
                className="btn-primary text-base px-8 py-3.5"
              >
                Get In Touch
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
