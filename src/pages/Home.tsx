import { PageTransition } from '@/components/layout/PageTransition'
import { Hero } from '@/components/home/Hero'
import { AboutPreview } from '@/components/home/AboutPreview'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { ProjectsPreview } from '@/components/home/ProjectsPreview'
import { HomeCTA } from '@/components/home/HomeCTA'

// ===================================================
// Home Page
// ===================================================

export default function Home() {
  return (
    <PageTransition>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <ProjectsPreview />
      <HomeCTA />
    </PageTransition>
  )
}
