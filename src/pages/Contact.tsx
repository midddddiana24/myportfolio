import { useState, type FormEvent, type ChangeEvent } from 'react'
import { Send, CheckCircle, Mail, Github, Linkedin, Facebook, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { socialLinks, contactEmail } from '@/data/socials'

// ===================================================
// Contact Page
// ===================================================

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

interface FormState {
  name: string
  email: string
  subject: string
  message: string
}

const initialState: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

const iconMap: Record<string, React.ElementType> = {
  Github, Linkedin, Facebook,
}

function FormField({
  label,
  id,
  error,
  children,
  required,
}: {
  label: string
  id: string
  error?: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-sm font-medium"
        style={{ color: 'var(--text-secondary)' }}
      >
        {label}
        {required && (
          <span style={{ color: 'var(--accent-light)' }} aria-label="required">
            {' '}*
          </span>
        )}
      </label>
      {children}
      {error && (
        <p
          className="text-xs flex items-center gap-1"
          style={{ color: '#f87171' }}
          role="alert"
        >
          <AlertCircle size={12} />
          {error}
        </p>
      )}
    </div>
  )
}

function inputStyle(hasError?: boolean) {
  return {
    background: 'var(--card)',
    border: `1px solid ${hasError ? '#f87171' : 'var(--border)'}`,
    color: 'var(--text-primary)',
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    width: '100%',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  } as const
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialState)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {}
    if (!form.name.trim()) newErrors.name = 'Name is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!form.subject.trim()) newErrors.subject = 'Subject is required'
    if (!form.message.trim()) newErrors.message = 'Message is required'
    else if (form.message.trim().length < 20)
      newErrors.message = 'Message must be at least 20 characters'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear error on change
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('sending')

    // ── Integration point ─────────────────────────
    // Connect a backend service here (EmailJS, Resend, Formspree, etc.)
    // For now, simulate a delay and show a pending message.
    await new Promise((r) => setTimeout(r, 1500))

    // NOTE: Replace this block with your actual email service call:
    // e.g. await emailjs.send(...) or await fetch('/api/contact', {...})
    // On success: setStatus('success')
    // On failure: setStatus('error')
    setStatus('success')
  }

  const handleReset = () => {
    setForm(initialState)
    setErrors({})
    setStatus('idle')
  }

  return (
    <PageTransition className="pt-24">

      {/* Header */}
      <section className="rm-section pb-8">
        <div className="rm-container">
          <SectionHeading
            eyebrow="Contact"
            title="Let's Build Something Together"
            subtitle="Have a project in mind, a collaboration to propose, or just want to talk tech? I'd love to hear from you."
          />
        </div>
      </section>

      {/* Main grid */}
      <section className="rm-section pt-0 pb-20">
        <div className="rm-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* ── Sidebar ──────────────────────────── */}
            <aside className="lg:col-span-2 flex flex-col gap-6">
              <ScrollReveal>
                <div className="bento-card">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: 'var(--accent-dim)',
                      border: '1px solid rgba(124,58,237,0.2)',
                    }}
                  >
                    <Mail size={18} style={{ color: 'var(--accent-light)' }} />
                  </div>
                  <p
                    className="text-xs font-mono uppercase tracking-widest mb-1"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Email
                  </p>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-sm font-medium transition-colors duration-200"
                    style={{ color: 'var(--accent-light)' }}
                  >
                    {contactEmail}
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="bento-card">
                  <p
                    className="text-xs font-mono uppercase tracking-widest mb-4"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    Connect With Me
                  </p>
                  <div className="flex flex-col gap-3">
                    {socialLinks.map((link) => {
                      const Icon = iconMap[link.icon] ?? Github
                      return (
                        <a
                          key={link.platform}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group"
                          style={{
                            background: 'var(--bg)',
                            border: '1px solid var(--border)',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = 'var(--accent)'
                            e.currentTarget.style.background = 'var(--accent-dim)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border)'
                            e.currentTarget.style.background = 'var(--bg)'
                          }}
                        >
                          <Icon size={18} style={{ color: 'var(--accent-light)' }} />
                          <span
                            className="text-sm font-medium"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {link.label}
                          </span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.15}>
                <div
                  className="p-4 rounded-xl border text-sm leading-relaxed"
                  style={{
                    background: 'var(--accent-dim)',
                    borderColor: 'rgba(124,58,237,0.2)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <strong style={{ color: 'var(--accent-light)' }}>Response time:</strong>{' '}
                  I typically reply within 24–48 hours. For urgent matters, email
                  is the fastest way to reach me.
                </div>
              </ScrollReveal>
            </aside>

            {/* ── Contact Form ─────────────────────── */}
            <div className="lg:col-span-3">
              <ScrollReveal delay={0.1}>
                <div className="bento-card">
                  <AnimatePresence mode="wait">
                    {status === 'success' ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center text-center py-12 gap-4"
                      >
                        <CheckCircle size={48} style={{ color: '#86efac' }} />
                        <h3
                          className="font-display font-bold text-xl"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Message Received!
                        </h3>
                        <p
                          className="text-sm max-w-sm"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          Thanks for reaching out, {form.name.split(' ')[0]}. I'll get back
                          to you as soon as I can!
                        </p>
                        <p
                          className="text-xs px-3 py-2 rounded-lg"
                          style={{
                            background: 'var(--card)',
                            color: 'var(--text-muted)',
                            border: '1px solid var(--border)',
                          }}
                        >
                          ⚠️ Note: Connect an email service (EmailJS, Resend, Formspree)
                          to actually send messages. See{' '}
                          <code style={{ color: 'var(--accent-light)' }}>Contact.tsx</code>.
                        </p>
                        <button
                          onClick={handleReset}
                          className="btn-ghost text-sm mt-2"
                        >
                          Send Another Message
                        </button>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="form"
                        onSubmit={handleSubmit}
                        noValidate
                        className="flex flex-col gap-5"
                        aria-label="Contact form"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <FormField label="Full Name" id="name" error={errors.name} required>
                            <input
                              id="name"
                              name="name"
                              type="text"
                              value={form.name}
                              onChange={handleChange}
                              placeholder="Roberto Mediana"
                              style={inputStyle(!!errors.name)}
                              onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }}
                              onBlur={(e) => { e.target.style.borderColor = errors.name ? '#f87171' : 'var(--border)' }}
                              autoComplete="name"
                            />
                          </FormField>

                          <FormField label="Email Address" id="email" error={errors.email} required>
                            <input
                              id="email"
                              name="email"
                              type="email"
                              value={form.email}
                              onChange={handleChange}
                              placeholder="your@email.com"
                              style={inputStyle(!!errors.email)}
                              onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }}
                              onBlur={(e) => { e.target.style.borderColor = errors.email ? '#f87171' : 'var(--border)' }}
                              autoComplete="email"
                            />
                          </FormField>
                        </div>

                        <FormField label="Subject" id="subject" error={errors.subject} required>
                          <input
                            id="subject"
                            name="subject"
                            type="text"
                            value={form.subject}
                            onChange={handleChange}
                            placeholder="Project collaboration / General inquiry"
                            style={inputStyle(!!errors.subject)}
                            onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }}
                            onBlur={(e) => { e.target.style.borderColor = errors.subject ? '#f87171' : 'var(--border)' }}
                          />
                        </FormField>

                        <FormField label="Message" id="message" error={errors.message} required>
                          <textarea
                            id="message"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Tell me about your project or what you'd like to discuss..."
                            rows={6}
                            style={{
                              ...inputStyle(!!errors.message),
                              resize: 'vertical',
                              minHeight: '140px',
                            }}
                            onFocus={(e) => { e.target.style.borderColor = 'var(--accent)' }}
                            onBlur={(e) => { e.target.style.borderColor = errors.message ? '#f87171' : 'var(--border)' }}
                          />
                        </FormField>

                        {status === 'error' && (
                          <p
                            className="text-sm flex items-center gap-2 p-3 rounded-xl"
                            style={{
                              background: 'rgba(239,68,68,0.1)',
                              border: '1px solid rgba(239,68,68,0.2)',
                              color: '#f87171',
                            }}
                          >
                            <AlertCircle size={16} />
                            Something went wrong. Please try again.
                          </p>
                        )}

                        <button
                          type="submit"
                          disabled={status === 'sending'}
                          className="btn-primary self-start disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                          {status === 'sending' ? (
                            <>
                              <span
                                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send size={16} />
                              Send Message
                            </>
                          )}
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

    </PageTransition>
  )
}
