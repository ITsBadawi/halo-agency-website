'use client'

import React from 'react'
import { ArrowDown, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { LuxuryHeading } from '@/components/LuxuryHeading'
import { smoothScrollTo } from '@/lib/smoothScroll'
import { useLanguage } from '@/context/LanguageContext'
import { useSiteContent } from '@/context/SiteContentContext'

export function HeroVideo() {
  const { t, isRTL } = useLanguage()
  const { content } = useSiteContent()

  const heroData = content?.sections?.hero
  const title = isRTL ? (heroData?.titleAr || t.hero.title) : (heroData?.titleEn || t.hero.title)
  const highlight = isRTL ? (heroData?.highlightAr || t.hero.highlight) : (heroData?.highlightEn || t.hero.highlight)
  const subtitle = isRTL ? (heroData?.subtitleAr || t.hero.subtitle) : (heroData?.subtitleEn || t.hero.subtitle)
  const badge = isRTL ? (heroData?.badgeAr || t.hero.badge) : (heroData?.badgeEn || t.hero.badge)
  const explore = isRTL ? (heroData?.exploreAr || t.hero.explore) : (heroData?.exploreEn || t.hero.explore)

  const scrollToNext = () => {
    smoothScrollTo('graphic-design', 1200)
  }

  return (
    <section id="hero" className="snap-section relative w-full h-screen h-[100dvh] overflow-hidden flex items-center justify-center">
      {/* Background Full-Screen Cinematic Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none filter brightness-90"
      >
        <source src="/videos/main-hero.mp4" type="video/mp4" />
      </video>

      {/* Subtle Cinematic Vignette & Dark Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-black/25 to-black/50 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />

      {/* Minimal Visual-First Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center justify-center">
        <LuxuryHeading
          as="h1"
          title={title}
          highlight={highlight}
          subtitle={subtitle}
          badgeCustom={
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/15 shadow-xl shadow-black/50">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-purple-400 animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-neutral-200">
                {badge}
              </span>
            </div>
          }
          align="center"
          titleClassName="text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight sm:leading-[1.12]"
          subtitleClassName="max-w-md sm:max-w-lg text-xs sm:text-base md:text-lg text-neutral-300/90 mb-7 sm:mb-8"
        />

        {/* Minimal Scroll Down Button with smooth entrance */}
        <motion.button
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToNext}
          aria-label="Explore Sections"
          className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-purple-400 text-xs font-mono uppercase tracking-widest text-neutral-200 hover:text-white transition-all duration-300 cursor-pointer shadow-lg hover:shadow-purple-500/20 hover:-translate-y-0.5"
        >
          <span>{explore}</span>
          <ArrowDown className="w-3.5 h-3.5 text-purple-400 transition-transform group-hover:translate-y-0.5" />
        </motion.button>
      </div>

      {/* Subtle Bottom Fade to Page Background */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />
    </section>
  )
}
