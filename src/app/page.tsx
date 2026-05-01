import Navbar        from '@/components/layout/Navbar'
import Footer        from '@/components/layout/Footer'
import Hero          from '@/components/sections/Hero'
import Services      from '@/components/sections/Services'
import Products      from '@/components/sections/Products'
import Differentials from '@/components/sections/Differentials'
import CTA           from '@/components/sections/CTA'
import ContactForm   from '@/components/sections/ContactForm'
import TechMarquee   from '@/components/ui/TechMarquee'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <div className="section-divider" />
        <Services />
        <div className="section-divider" />
        <Products />
        <div className="section-divider" />
        <Differentials />
        <div className="section-divider" />
        <CTA />
        <div className="section-divider" />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
