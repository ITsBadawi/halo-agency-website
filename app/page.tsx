'use client'

import React, { useState, useEffect } from 'react'
import { Navbar } from '@/components/Navbar'
import { HeroVideo } from '@/components/HeroVideo'
import { ServiceHeroChapter } from '@/components/ServiceHeroChapter'
import { PortfolioWall } from '@/components/PortfolioWall'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'
import { RotatingBackgroundLogo } from '@/components/RotatingBackgroundLogo'

import { smoothScrollTo, isScrollAnimating } from '@/lib/smoothScroll'
import { useLanguage } from '@/context/LanguageContext'
import { useSiteContent } from '@/context/SiteContentContext'

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sections = ['hero', 'graphic-design', 'photography', 'web-development', 'work', 'contact']

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4

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

    const getCurrentSectionIndex = () => {
      const currentScrollY = window.scrollY
      let closestIdx = 0
      let minDistance = Infinity

      sections.forEach((id, idx) => {
        const el = document.getElementById(id)
        if (el) {
          const dist = Math.abs(el.offsetTop - currentScrollY)
          if (dist < minDistance) {
            minDistance = dist
            closestIdx = idx
          }
        }
      })
      return closestIdx
    }

    // Intercept mouse wheel to slow down and smooth out section transitions (1200ms)
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'TEXTAREA' || target.tagName === 'INPUT')) {
        return
      }

      // If already animating, prevent default to avoid queueing/jitter
      if (isScrollAnimating()) {
        e.preventDefault()
        return
      }

      // Filter out small trackpad vibrations
      if (Math.abs(e.deltaY) < 25) return

      e.preventDefault()

      const currentIdx = getCurrentSectionIndex()

      if (e.deltaY > 0) {
        if (currentIdx < sections.length - 1) {
          smoothScrollTo(sections[currentIdx + 1], 1200)
        }
      } else {
        if (currentIdx > 0) {
          smoothScrollTo(sections[currentIdx - 1], 1200)
        }
      }
    }

    // Keyboard navigation (Arrow keys / PageUp / PageDown)
    const handleKeyDown = (e: KeyboardEvent) => {
      const active = document.activeElement
      if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return

      if (['ArrowDown', 'PageDown', 'Space'].includes(e.code)) {
        e.preventDefault()
        if (isScrollAnimating()) return
        const currentIdx = getCurrentSectionIndex()
        if (currentIdx < sections.length - 1) {
          smoothScrollTo(sections[currentIdx + 1], 1200)
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.code)) {
        e.preventDefault()
        if (isScrollAnimating()) return
        const currentIdx = getCurrentSectionIndex()
        if (currentIdx > 0) {
          smoothScrollTo(sections[currentIdx - 1], 1200)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const { t, isRTL } = useLanguage()
  const { content } = useSiteContent()

  const c1 = content?.sections?.chapter1
  const c2 = content?.sections?.chapter2
  const c3 = content?.sections?.chapter3

  const ch1Category = isRTL ? (c1?.categoryAr || t.chapters.c1.category) : (c1?.categoryEn || t.chapters.c1.category)
  const ch1Title = isRTL ? (c1?.titleAr || t.chapters.c1.title) : (c1?.titleEn || t.chapters.c1.title)
  const ch1Highlight = isRTL ? (c1?.highlightAr || t.chapters.c1.highlight) : (c1?.highlightEn || t.chapters.c1.highlight)
  const ch1Phrase = isRTL ? (c1?.phraseAr || t.chapters.c1.phrase) : (c1?.phraseEn || t.chapters.c1.phrase)

  const ch2Category = isRTL ? (c2?.categoryAr || t.chapters.c2.category) : (c2?.categoryEn || t.chapters.c2.category)
  const ch2Title = isRTL ? (c2?.titleAr || t.chapters.c2.title) : (c2?.titleEn || t.chapters.c2.title)
  const ch2Highlight = isRTL ? (c2?.highlightAr || t.chapters.c2.highlight) : (c2?.highlightEn || t.chapters.c2.highlight)
  const ch2Phrase = isRTL ? (c2?.phraseAr || t.chapters.c2.phrase) : (c2?.phraseEn || t.chapters.c2.phrase)

  const ch3Category = isRTL ? (c3?.categoryAr || t.chapters.c3.category) : (c3?.categoryEn || t.chapters.c3.category)
  const ch3Title = isRTL ? (c3?.titleAr || t.chapters.c3.title) : (c3?.titleEn || t.chapters.c3.title)
  const ch3Highlight = isRTL ? (c3?.highlightAr || t.chapters.c3.highlight) : (c3?.highlightEn || t.chapters.c3.highlight)
  const ch3Phrase = isRTL ? (c3?.phraseAr || t.chapters.c3.phrase) : (c3?.phraseEn || t.chapters.c3.phrase)

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f6] selection:bg-purple-500 selection:text-white font-sans antialiased overflow-x-hidden w-full max-w-full">
      {/* Signature Rotating Background Emblem */}
      <RotatingBackgroundLogo />

      {/* Main Header / Sticky Navigation */}
      <Navbar activeSection={activeSection} />

      {/* 1. Main Hero: Full-Screen Cinematic Video */}
      <HeroVideo />

      {/* 2. Graphic Design Hero Chapter */}
      <ServiceHeroChapter
        id="graphic-design"
        chapterNumber="01"
        category={ch1Category}
        title={ch1Title}
        highlightWord={ch1Highlight}
        phrase={ch1Phrase}
        videoSrc="/videos/graphic-design.mp4"
        align={isRTL ? "right" : "left"}
      />

      {/* 3. Photography Hero Chapter */}
      <ServiceHeroChapter
        id="photography"
        chapterNumber="02"
        category={ch2Category}
        title={ch2Title}
        highlightWord={ch2Highlight}
        phrase={ch2Phrase}
        videoSrc="/videos/photography.mp4"
        align={isRTL ? "left" : "right"}
      />

      {/* 4. Web Development Hero Chapter */}
      <ServiceHeroChapter
        id="web-development"
        chapterNumber="03"
        category={ch3Category}
        title={ch3Title}
        highlightWord={ch3Highlight}
        phrase={ch3Phrase}
        videoSrc="/videos/web-development.mp4"
        align={isRTL ? "right" : "left"}
      />

      {/* 5. Portfolio / Our Works: Visual-Only Horizontal Showcase */}
      <PortfolioWall />

      {/* 6. Contact & Footer: Final Full-Screen Snap Section */}
      <section
        id="contact"
        className="snap-section relative w-full min-h-screen lg:h-screen lg:h-[100dvh] overflow-x-hidden overflow-y-visible lg:overflow-hidden bg-transparent flex flex-col justify-between pt-16 sm:pt-20 pb-4 sm:pb-6"
      >
        <div className="flex-1 flex items-center justify-center w-full my-auto py-6 lg:py-0">
          <ContactSection />
        </div>
        <Footer />
      </section>
    </div>
  )
}
