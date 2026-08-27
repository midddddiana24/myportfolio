import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const fn = () => setVisible(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) > 0.28)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:12 }}
          transition={{ duration:0.25 }}
          onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
          aria-label="Scroll to top"
          style={{
            position:'fixed', bottom:'1.75rem', right:'1.75rem', zIndex:500,
            width:'40px', height:'40px', border:'1px solid #1f1f1f',
            background:'transparent', color:'#5a5a5a',
            display:'flex', alignItems:'center', justifyContent:'center',
            borderRadius:0, transition:'border-color 0.2s, color 0.2s',
          }}
          whileHover={{ borderColor:'#c8f269', color:'#c8f269' }}
          whileTap={{ scale:0.94 }}
        >
          <ArrowUp size={15} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
