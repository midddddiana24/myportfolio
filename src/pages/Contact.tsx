import { useState, type FormEvent, type ChangeEvent } from 'react'
import { Send, CheckCircle, Mail, Github, Linkedin, Facebook, AlertCircle, MapPin, Clock } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTransition } from '@/components/layout/PageTransition'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { socialLinks, contactEmail } from '@/data/socials'

const iconMap: Record<string, React.ElementType> = { Github, Linkedin, Facebook }
type FormStatus = 'idle'|'sending'|'success'|'error'
interface FormState { name:string; email:string; subject:string; message:string }
const init: FormState = { name:'', email:'', subject:'', message:'' }

function inputCss(err?: boolean): React.CSSProperties {
  return { background:'var(--card)', border:`1px solid ${err?'#f87171':'var(--border)'}`, color:'var(--text-1)', borderRadius:'8px', padding:'0.625rem 0.875rem', width:'100%', fontSize:'0.875rem', fontFamily:"'Geist', sans-serif", outline:'none', transition:'border-color 0.15s' }
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(init)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<FormStatus>('idle')

  const validate = () => {
    const e: Partial<FormState> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.subject.trim()) e.subject = 'Subject is required'
    if (!form.message.trim() || form.message.trim().length < 20) e.message = 'Message must be at least 20 characters'
    setErrors(e); return Object.keys(e).length === 0
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]:e.target.value }))
    if (errors[e.target.name as keyof FormState]) setErrors(p => ({ ...p, [e.target.name]:undefined }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); if (!validate()) return
    setStatus('sending')
    await new Promise(r => setTimeout(r, 1500))
    // ← Connect EmailJS / Resend / Formspree here
    setStatus('success')
  }

  return (
    <PageTransition className="pt-28">
      <section className="rm-section pb-8">
        <div className="rm-container">
          <SectionHeading eyebrow="Contact" title="Let's build something great" subtitle="Have a project, collaboration, or just want to talk tech? I'd love to hear from you." />
        </div>
      </section>

      <section className="rm-section pt-0 pb-20">
        <div className="rm-container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

            {/* Sidebar */}
            <aside className="lg:col-span-2 flex flex-col gap-4">
              <ScrollReveal>
                <div className="bento-card">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background:'var(--accent-dim)', border:'1px solid rgba(207,69,0,0.15)' }}>
                    <Mail size={17} style={{ color:'var(--accent-h)' }} />
                  </div>
                  <p className="t-eyebrow mb-1">Email</p>
                  <a href={`mailto:${contactEmail}`} className="text-sm font-semibold transition-colors"
                    style={{ color:'var(--accent-h)', fontFamily:"'Geist', sans-serif" }}>{contactEmail}</a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.08}>
                <div className="bento-card flex flex-col gap-2">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} style={{ color:'var(--text-3)' }} />
                    <p className="t-eyebrow">Location</p>
                  </div>
                  <p className="text-sm font-semibold" style={{ color:'var(--text-1)', fontFamily:"'Geist', sans-serif" }}>Iloilo, Philippines</p>
                  <p className="font-mono text-xs" style={{ color:'var(--text-3)' }}>Available remotely</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.12}>
                <div className="bento-card">
                  <p className="t-eyebrow mb-3">Connect</p>
                  <div className="flex flex-col gap-2">
                    {socialLinks.map(link => {
                      const Icon = iconMap[link.icon] ?? Mail
                      return (
                        <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-3 p-2.5 rounded-lg border transition-all"
                          style={{ background:'var(--bg)', borderColor:'var(--border)' }}
                          onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.background='var(--accent-dim)' }}
                          onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg)' }}>
                          <Icon size={16} style={{ color:'var(--accent-h)' }} />
                          <span style={{ fontFamily:"'Geist', sans-serif", fontWeight:500, fontSize:'0.8125rem', color:'var(--text-2)' }}>{link.label}</span>
                        </a>
                      )
                    })}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.16}>
                <div className="p-4 rounded-xl border flex items-start gap-2.5"
                  style={{ background:'var(--accent-dim)', borderColor:'rgba(207,69,0,0.15)' }}>
                  <Clock size={13} style={{ color:'var(--accent-h)', marginTop:'0.125rem', flexShrink:0 }} />
                  <p className="text-xs leading-relaxed" style={{ color:'var(--text-2)', fontFamily:"'Geist', sans-serif" }}>
                    <strong style={{ color:'var(--accent-h)' }}>Response time:</strong> I typically reply within 24–48 hours.
                  </p>
                </div>
              </ScrollReveal>
            </aside>

            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal delay={0.1}>
                <div className="bento-card">
                  <AnimatePresence mode="wait">
                    {status==='success' ? (
                      <motion.div key="ok" initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
                        className="flex flex-col items-center justify-center text-center py-14 gap-4">
                        <CheckCircle size={44} style={{ color:'#4ade80' }} />
                        <h3 style={{ fontFamily:"'Geist', sans-serif", fontWeight:700, fontSize:'1.25rem', color:'var(--text-1)' }}>Message Received!</h3>
                        <p className="text-sm max-w-xs" style={{ color:'var(--text-3)' }}>Thanks, {form.name.split(' ')[0]}! I'll get back to you as soon as I can.</p>
                        <div className="font-mono text-xs px-3 py-2 rounded-lg border" style={{ background:'var(--card)', borderColor:'var(--border)', color:'var(--text-3)' }}>
                          ⚠ Connect an email service in Contact.tsx to actually send messages.
                        </div>
                        <button onClick={() => { setForm(init); setErrors({}); setStatus('idle') }} className="btn-ghost text-sm mt-1">Send Another</button>
                      </motion.div>
                    ) : (
                      <motion.form key="form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Name */}
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="name" className="t-eyebrow">Full Name *</label>
                            <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="Roberto Mediana"
                              style={inputCss(!!errors.name)}
                              onFocus={e=>{e.target.style.borderColor='var(--accent)'}}
                              onBlur={e=>{e.target.style.borderColor=errors.name?'#f87171':'var(--border)'}} autoComplete="name" />
                            {errors.name && <p className="flex items-center gap-1 text-xs" style={{ color:'#f87171' }}><AlertCircle size={11}/>{errors.name}</p>}
                          </div>
                          {/* Email */}
                          <div className="flex flex-col gap-1.5">
                            <label htmlFor="email" className="t-eyebrow">Email Address *</label>
                            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="your@email.com"
                              style={inputCss(!!errors.email)}
                              onFocus={e=>{e.target.style.borderColor='var(--accent)'}}
                              onBlur={e=>{e.target.style.borderColor=errors.email?'#f87171':'var(--border)'}} autoComplete="email" />
                            {errors.email && <p className="flex items-center gap-1 text-xs" style={{ color:'#f87171' }}><AlertCircle size={11}/>{errors.email}</p>}
                          </div>
                        </div>
                        {/* Subject */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="subject" className="t-eyebrow">Subject *</label>
                          <input id="subject" name="subject" type="text" value={form.subject} onChange={handleChange} placeholder="Project collaboration / General inquiry"
                            style={inputCss(!!errors.subject)}
                            onFocus={e=>{e.target.style.borderColor='var(--accent)'}}
                            onBlur={e=>{e.target.style.borderColor=errors.subject?'#f87171':'var(--border)'}} />
                          {errors.subject && <p className="flex items-center gap-1 text-xs" style={{ color:'#f87171' }}><AlertCircle size={11}/>{errors.subject}</p>}
                        </div>
                        {/* Message */}
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="message" className="t-eyebrow">Message *</label>
                          <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={6}
                            placeholder="Tell me about your project or what you'd like to discuss..."
                            style={{ ...inputCss(!!errors.message), resize:'vertical', minHeight:'130px' }}
                            onFocus={e=>{e.target.style.borderColor='var(--accent)'}}
                            onBlur={e=>{e.target.style.borderColor=errors.message?'#f87171':'var(--border)'}} />
                          {errors.message && <p className="flex items-center gap-1 text-xs" style={{ color:'#f87171' }}><AlertCircle size={11}/>{errors.message}</p>}
                        </div>
                        {status==='error' && (
                          <p className="flex items-center gap-2 text-sm p-3 rounded-lg border" style={{ background:'rgba(239,68,68,0.08)', borderColor:'rgba(239,68,68,0.2)', color:'#f87171' }}>
                            <AlertCircle size={15}/>Something went wrong. Please try again.
                          </p>
                        )}
                        <button type="submit" disabled={status==='sending'} className="btn-primary self-start disabled:opacity-60 disabled:cursor-not-allowed">
                          {status==='sending'
                            ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>Sending...</>
                            : <><Send size={14}/>Send Message</>
                          }
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
