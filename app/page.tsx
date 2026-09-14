'use client'

import React, { useState, useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { HeroVideo } from '@/components/HeroVideo'
import { ServiceHeroChapter } from '@/components/ServiceHeroChapter'
import { PortfolioWall } from '@/components/PortfolioWall'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { RotatingBackgroundLogo } from '@/components/RotatingBackgroundLogo'

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'graphic-design', 'photography', 'web-development', 'work', 'contact']
      const scrollPos = window.scrollY + 250

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f6] selection:bg-purple-500 selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Signature Rotating Background Emblem */}
      <RotatingBackgroundLogo />

      {/* Main Header / Sticky Navigation */}
      <Navbar activeSection={activeSection} />

      {/* 1. Main Hero: Full-Screen Cinematic Video */}
      <div id="hero">
        <HeroVideo />
      </div>

      {/* 2. Graphic Design Hero Chapter */}
      <ServiceHeroChapter
        id="graphic-design"
        chapterNumber="01"
        category="Brand & Systems"
        title="Graphic"
        highlightWord="Design."
        phrase="Defining visual languages, art direction, and packaging systems that make brands unforgettable."
        videoSrc="/videos/graphic-design.mp4"
        align="left"
      />

      {/* 3. Photography Hero Chapter */}
      <ServiceHeroChapter
        id="photography"
        chapterNumber="02"
        category="Editorial & Cinematography"
        title="Editorial"
        highlightWord="Photography."
        phrase="A disciplined eye for lighting, composition, and texture that breathes authentic depth into brand campaigns."
        videoSrc="/videos/photography.mp4"
        align="right"
      />

      {/* 4. Web Development Hero Chapter */}
      <ServiceHeroChapter
        id="web-development"
        chapterNumber="03"
        category="Digital Engineering"
        title="Web"
        highlightWord="Development."
        phrase="Engineering high-performance web products, interactive 3D platforms, and fluid motion interfaces."
        videoSrc="/videos/web-development.mp4"
        align="left"
      />

      {/* 5. Portfolio / Our Works: Visual-Only Horizontal Showcase */}
      <PortfolioWall />

      {/* 6. Contact Section (Minimal Placeholders) */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </div>
  )
}
