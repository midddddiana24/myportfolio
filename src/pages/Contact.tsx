import { useState, useRef, type FormEvent, type ChangeEvent } from 'react'
import emailjs from '@emailjs/browser'
import { Send, CheckCircle, AlertCircle, Github, Linkedin, Facebook } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageTransition }    from '@/components/layout/PageTransition'
import { TextReveal }        from '@/components/motion/TextReveal'
import { ClipReveal }        from '@/components/motion/ClipReveal'
import { MagneticButton }    from '@/components/motion/MagneticButton'
import { socialLinks, contactEmail } from '@/data/socials'
import { DUR_SLOW }          from '@/lib/gsap'

const EMAILJS_SERVICE_ID  = (typeof import.meta !== 'undefined' && (import.meta as {env?:{VITE_EMAILJS_SERVICE_ID?:string}}).env?.VITE_EMAILJS_SERVICE_ID)  || 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = (typeof import.meta !== 'undefined' && (import.meta as {env?:{VITE_EMAILJS_TEMPLATE_ID?:string}}).env?.VITE_EMAILJS_TEMPLATE_ID) || 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = (typeof import.meta !== 'undefined' && (import.meta as {env?:{VITE_EMAILJS_PUBLIC_KEY?:string}}).env?.VITE_EMAILJS_PUBLIC_KEY)  || 'YOUR_PUBLIC_KEY'

const iconMap: Record<string, React.ElementType> = { Github, Linkedin, Facebook }
type Status = 'idle'|'sending'|'success'|'error'
interface Form { name:string; email:string; subject:string; message:string }
const init: Form = { name:'', email:'', subject:'', message:'' }

// No `cursor:'none'` in here. CustomCursor hides the pointer through
// `html.custom-cursor *` (with !important), which already covers these fields.
// Setting it inline also hid the I-beam on touchscreen laptops, where App.tsx's
// isTouch gate skips CustomCursor but the trackpad still reports a fine pointer —
// so the inputs had no visible caret cursor at all.
function field(err?: boolean): React.CSSProperties {
  return {
    background:'var(--bg-surface)', border:`1px solid ${err?'var(--accent)':'var(--border)'}`, color:'var(--text-1)',
    borderRadius:0, padding:'0.875rem 1rem', width:'100%',
    fontFamily:"'DM Sans', sans-serif", fontSize:'0.9375rem', outline:'none',
    transition:'border-color 0.2s',
  }
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState<Form>(init)
  const [errors, setErrors] = useState<Partial<Form>>({})
  const [status, setStatus] = useState<Status>('idle')

  const validate = () => {
    const e: Partial<Form> = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required'
    if (!form.subject.trim()) e.subject = 'Required'
    if (form.message.trim().length < 20) e.message = 'At least 20 characters'
    setErrors(e); return Object.keys(e).length === 0
  }

  const onChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    if (errors[e.target.name as keyof Form]) setErrors(p => ({ ...p, [e.target.name]: undefined }))
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault(); if (!validate() || !formRef.current) return
    setStatus('sending')
    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY)
      setStatus('success')
    } catch { setStatus('error') }
  }

  return (
    <PageTransition className="pt-28">
      <section className="rm-section" style={{ background:'var(--bg-base)' }}>
        <div className="rm-container">
          <div className="flex items-center gap-4 mb-16">
            <span className="eyebrow">/ Contact</span>
            <div className="rule flex-1" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left */}
            <div>
              <TextReveal as="h1" trigger="load" splitBy="words" delay={0.1} duration={DUR_SLOW} stagger={0.07} skewY={3}
                style={{ fontFamily:"'Anton', sans-serif", textTransform:'uppercase', fontWeight:400, fontSize:'clamp(2.5rem,7vw,5.5rem)', letterSpacing:'-0.015em', color:'var(--text-1)', lineHeight:1, marginBottom:'2rem' }}>
                Let's work together.
              </TextReveal>

              <ClipReveal direction="down">
                <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'1rem', color:'var(--text-muted)', lineHeight:1.75, marginBottom:'2.5rem' }}>
                  Open to collaborations, academic partnerships, and freelance projects. Reach out — I reply within 24–48 hours.
                </p>
              </ClipReveal>

              {/* Email big link */}
              <ClipReveal direction="down" delay={0.1}>
                <MagneticButton strength={0.2}>
                  <a href={`mailto:${contactEmail}`}
                    style={{ fontFamily:"'Anton', sans-serif", textTransform:'uppercase', fontWeight:400, fontSize:'clamp(0.9rem,2vw,1.25rem)', letterSpacing:'0em', color:'var(--text-1)', display:'block', paddingBottom:'0.25rem', borderBottom:'1px solid var(--border)', marginBottom:'2rem', transition:'color 0.2s, border-color 0.2s' }}
                    onMouseEnter={e=>{ e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.borderColor='var(--accent)' }}
                    onMouseLeave={e=>{ e.currentTarget.style.color='var(--text-1)'; e.currentTarget.style.borderColor='var(--border)' }}>
                    {contactEmail}
                  </a>
                </MagneticButton>
              </ClipReveal>

              {/* Socials */}
              <ClipReveal direction="down" delay={0.15}>
                <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.625rem', letterSpacing:'0.15em', textTransform:'uppercase', color:'var(--text-subtle)', marginBottom:'1rem' }}>Find me on</p>
                <div style={{ display:'flex', gap:'0.75rem' }}>
                  {socialLinks.map(link => {
                    const Icon = iconMap[link.icon] ?? Github
                    return (
                      <MagneticButton key={link.platform} strength={0.4}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer"
                          style={{ width:'40px', height:'40px', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--text-muted)', background:'transparent', transition:'border-color 0.2s, color 0.2s', borderRadius:0 }}
                          aria-label={link.label}
                          onMouseEnter={e=>{e.currentTarget.style.borderColor='var(--accent)'; e.currentTarget.style.color='var(--accent)'}}
                          onMouseLeave={e=>{e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.color='var(--text-muted)'}}>
                          <Icon size={16} />
                        </a>
                      </MagneticButton>
                    )
                  })}
                </div>
              </ClipReveal>
            </div>

            {/* Form */}
            <ClipReveal direction="left">
              <div style={{ border:'1px solid var(--border)', padding:'2.5rem' }}>
                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div key="ok" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                      role="status" aria-live="polite"
                      style={{ textAlign:'center', padding:'3rem 0', display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem' }}>
                      <CheckCircle size={36} style={{ color:'var(--accent)' }} />
                      {/* h2, not h3: the only other heading on this page is the h1,
                          so h3 skipped a level. role="status" above it means the
                          confirmation is announced — submitting replaces the whole
                          form, which a screen reader would otherwise pass silently. */}
                      <h2 style={{ fontFamily:"'Anton', sans-serif", textTransform:'uppercase', letterSpacing:'0em', fontWeight:400, fontSize:'1.25rem', color:'var(--text-1)' }}>Message Sent!</h2>
                      <p style={{ fontFamily:"'DM Sans', sans-serif", fontSize:'0.9375rem', color:'var(--text-muted)' }}>I'll reply within 24–48 hours.</p>
                      <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', letterSpacing:'0.1em', color:'var(--text-subtle)', padding:'0.5rem 1rem', border:'1px solid var(--border)' }}>Connect EmailJS in .env to enable real sending</p>
                      <button onClick={()=>{setForm(init);setErrors({});setStatus('idle')}} className="btn-ghost" style={{ marginTop:'0.5rem', fontSize:'0.75rem' }}>Send Another</button>
                    </motion.div>
                  ) : (
                    <motion.form key="form" ref={formRef} onSubmit={onSubmit} noValidate style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
                      <input type="hidden" name="to_name" value="Roberto Mediana Jr." />

                      <div className="grid grid-cols-2 gap-4">
                        {[{id:'name', name:'from_name', label:'Name', type:'text', placeholder:'Your name', auto:'name'}, {id:'email', name:'from_email', label:'Email', type:'email', placeholder:'your@email.com', auto:'email'}].map(f => (
                          <div key={f.id} style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
                            <label htmlFor={f.id} style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-muted)' }}>{f.label}</label>
                            <input id={f.id} name={f.name} type={f.type} placeholder={f.placeholder} autoComplete={f.auto}
                              value={form[f.id === 'name' ? 'name' : 'email']}
                              onChange={onChange}
                              style={field(!!errors[f.id === 'name' ? 'name' : 'email'])}
                              onFocus={e=>{ e.target.style.borderColor='var(--accent)' }}
                              onBlur={e=>{ e.target.style.borderColor=errors[f.id === 'name' ? 'name' : 'email']?'var(--accent)':'var(--border)' }} />
                            {errors[f.id === 'name' ? 'name' : 'email'] && <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', color:'var(--accent)', display:'flex', alignItems:'center', gap:'0.25rem' }}><AlertCircle size={10}/>{errors[f.id === 'name' ? 'name' : 'email']}</p>}
                          </div>
                        ))}
                      </div>

                      <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
                        <label htmlFor="subject" style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-muted)' }}>Subject</label>
                        <input id="subject" name="subject" type="text" placeholder="Project inquiry" value={form.subject} onChange={onChange}
                          style={field(!!errors.subject)}
                          onFocus={e=>{ e.target.style.borderColor='var(--accent)' }}
                          onBlur={e=>{ e.target.style.borderColor=errors.subject?'var(--accent)':'var(--border)' }} />
                        {errors.subject && <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', color:'var(--accent)', display:'flex', alignItems:'center', gap:'0.25rem' }}><AlertCircle size={10}/>{errors.subject}</p>}
                      </div>

                      <div style={{ display:'flex', flexDirection:'column', gap:'0.5rem' }}>
                        <label htmlFor="message" style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-muted)' }}>Message</label>
                        <textarea id="message" name="message" rows={5} placeholder="Tell me about your project…" value={form.message} onChange={onChange}
                          style={{ ...field(!!errors.message), resize:'vertical', minHeight:'120px' }}
                          onFocus={e=>{ e.target.style.borderColor='var(--accent)' }}
                          onBlur={e=>{ e.target.style.borderColor=errors.message?'var(--accent)':'var(--border)' }} />
                        {errors.message && <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', color:'var(--accent)', display:'flex', alignItems:'center', gap:'0.25rem' }}><AlertCircle size={10}/>{errors.message}</p>}
                      </div>

                      {status === 'error' && (
                        <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', color:'var(--accent)', padding:'0.75rem', border:'1px solid rgba(var(--figure-rgb), 0.18)', background:'rgba(var(--figure-rgb), 0.05)', display:'flex', gap:'0.5rem', alignItems:'center' }}>
                          <AlertCircle size={12}/>Failed to send. Check EmailJS config.
                        </p>
                      )}

                      <MagneticButton strength={0.2}>
                        <button type="submit" disabled={status==='sending'} className="btn-primary" style={{ width:'100%', justifyContent:'center', opacity: status==='sending'?0.6:1 }}>
                          {status==='sending'
                            ? <><span style={{ width:14, height:14, border:'1px solid rgba(var(--ground-rgb), 0.3)', borderTopColor:'var(--bg-base)', borderRadius:'50%', animation:'spin 0.8s linear infinite' }} />Sending…</>
                            : <><Send size={14}/>Send Message</>}
                        </button>
                      </MagneticButton>

                      <p style={{ fontFamily:"'DM Mono', monospace", fontSize:'0.5625rem', letterSpacing:'0.08em', color:'var(--text-subtle)', textAlign:'center' }}>
                        Set VITE_EMAILJS_* in .env · See .env.example
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </ClipReveal>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
