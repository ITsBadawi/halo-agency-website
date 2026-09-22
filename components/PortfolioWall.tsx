'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { LuxuryHeading } from '@/components/LuxuryHeading'
import { useLanguage } from '@/context/LanguageContext'
import { useSiteContent } from '@/context/SiteContentContext'

// Curated high-aesthetic images fallback
const defaultRow1Images = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85',
]

const defaultRow2Images = [
  'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85',
]

const defaultRow3Images = [
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85',
]

const defaultRow4Images = [
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1000&q=85',
]

export function PortfolioWall() {
  const { t, isRTL } = useLanguage()
  const { content } = useSiteContent()

  const r1 = content?.portfolioWall?.row1?.length ? content.portfolioWall.row1 : defaultRow1Images
  const r2 = content?.portfolioWall?.row2?.length ? content.portfolioWall.row2 : defaultRow2Images
  const r3 = content?.portfolioWall?.row3?.length ? content.portfolioWall.row3 : defaultRow3Images
  const r4 = content?.portfolioWall?.row4?.length ? content.portfolioWall.row4 : defaultRow4Images

  // Ensure minimum elements for seamless loop
  const fullRow1 = r1.length > 5 ? [...r1, ...r1] : [...r1, ...r1, ...r1, ...r1]
  const fullRow2 = r2.length > 5 ? [...r2, ...r2] : [...r2, ...r2, ...r2, ...r2]
  const fullRow3 = r3.length > 5 ? [...r3, ...r3] : [...r3, ...r3, ...r3, ...r3]
  const fullRow4 = r4.length > 5 ? [...r4, ...r4] : [...r4, ...r4, ...r4, ...r4]

  const worksData = content?.sections?.works
  const title = isRTL ? (worksData?.titleAr || t.works.title) : (worksData?.titleEn || t.works.title)
  const highlight = isRTL ? (worksData?.highlightAr || t.works.highlight) : (worksData?.highlightEn || t.works.highlight)
  const badge = isRTL ? (worksData?.badgeAr || t.works.badge) : (worksData?.badgeEn || t.works.badge)
  const subtitle = isRTL ? (worksData?.subtitleAr || t.works.subtitle) : (worksData?.subtitleEn || t.works.subtitle)

  return (
    <section
      id="work"
      className="snap-section relative w-full h-screen h-[100dvh] overflow-hidden bg-transparent flex flex-col justify-center py-4 sm:py-6 md:py-8"
      aria-label="Selected Works Showcase"
    >
      {/* Background Ambient Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-4 sm:mb-6 md:mb-8 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 w-full">
        <div>
          <LuxuryHeading
            as="h2"
            title={title}
            highlight={highlight}
            badge={{
              number: '04',
              category: badge,
            }}
            align={isRTL ? "right" : "left"}
            titleClassName="text-2xl sm:text-3xl md:text-4xl font-normal leading-[1.22]"
          />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="text-neutral-300/90 text-xs sm:text-sm md:text-base max-w-sm leading-relaxed font-normal md:pb-1"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Moving Rows Container - Forced LTR to ensure continuous marquee without right-side gaps in RTL */}
      <div className="flex flex-col gap-2.5 sm:gap-3.5 md:gap-4 w-full select-none" dir="ltr">

        {/* Row 1: Moves Left continuously */}
        <div className="overflow-hidden w-full">
          <div className="flex items-center gap-3.5 sm:gap-5 md:gap-6 w-max animate-marquee-slow hover:[animation-play-state:paused] will-change-transform">
            {fullRow1.map((src, i) => (
              <div
                key={`r1-${i}`}
                className="group relative w-[170px] sm:w-[240px] md:w-[320px] lg:w-[380px] h-[90px] sm:h-[120px] md:h-[145px] lg:h-[165px] flex-shrink-0 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl shadow-black/80 cursor-pointer"
              >
                <Image
                  src={src}
                  alt="Selected Project Visual"
                  fill
                  sizes="(max-width: 640px) 170px, (max-width: 768px) 240px, 380px"
                  className="object-cover filter contrast-[1.05] brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-500"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moves Right continuously */}
        <div className="overflow-hidden w-full">
          <div className="flex items-center gap-3.5 sm:gap-5 md:gap-6 w-max animate-marquee-reverse-slow hover:[animation-play-state:paused] will-change-transform">
            {fullRow2.map((src, i) => (
              <div
                key={`r2-${i}`}
                className="group relative w-[180px] sm:w-[250px] md:w-[340px] lg:w-[400px] h-[90px] sm:h-[120px] md:h-[145px] lg:h-[165px] flex-shrink-0 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl shadow-black/80 cursor-pointer"
              >
                <Image
                  src={src}
                  alt="Selected Project Visual"
                  fill
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 250px, 400px"
                  className="object-cover filter contrast-[1.05] brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-500"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Moves Left continuously */}
        <div className="overflow-hidden w-full">
          <div className="flex items-center gap-3.5 sm:gap-5 md:gap-6 w-max animate-marquee-medium hover:[animation-play-state:paused] will-change-transform">
            {fullRow3.map((src, i) => (
              <div
                key={`r3-${i}`}
                className="group relative w-[170px] sm:w-[240px] md:w-[320px] lg:w-[380px] h-[90px] sm:h-[120px] md:h-[145px] lg:h-[165px] flex-shrink-0 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl shadow-black/80 cursor-pointer"
              >
                <Image
                  src={src}
                  alt="Selected Project Visual"
                  fill
                  sizes="(max-width: 640px) 170px, (max-width: 768px) 240px, 380px"
                  className="object-cover filter contrast-[1.05] brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-500"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 4: Moves Right continuously */}
        <div className="overflow-hidden w-full">
          <div className="flex items-center gap-3.5 sm:gap-5 md:gap-6 w-max animate-marquee-reverse-medium hover:[animation-play-state:paused] will-change-transform">
            {fullRow4.map((src, i) => (
              <div
                key={`r4-${i}`}
                className="group relative w-[180px] sm:w-[250px] md:w-[340px] lg:w-[400px] h-[90px] sm:h-[120px] md:h-[145px] lg:h-[165px] flex-shrink-0 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl shadow-black/80 cursor-pointer"
              >
                <Image
                  src={src}
                  alt="Selected Project Visual"
                  fill
                  sizes="(max-width: 640px) 180px, (max-width: 768px) 250px, 400px"
                  className="object-cover filter contrast-[1.05] brightness-95 group-hover:scale-105 group-hover:brightness-105 transition-all duration-500"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
