// ================================================================
// GSAP — Global setup · Register plugins once here
// Import from here everywhere to avoid double-registration
// ================================================================
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Premium easing curves used consistently across the site
export const EASE_POWER4 = 'power4.out'
export const EASE_EXPO   = 'expo.out'
export const EASE_CIRC   = 'circ.out'

// Standard durations
export const DUR_FAST   = 0.55
export const DUR_NORMAL = 0.9
export const DUR_SLOW   = 1.2
export const DUR_XSLOW  = 1.6

export { gsap, ScrollTrigger }
