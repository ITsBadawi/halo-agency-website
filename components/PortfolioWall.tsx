'use client'

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Curated high-aesthetic images representing branding, digital products, 3D art, and cinematography
const row1Images = [
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85',
]

const row2Images = [
  'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
]

const row3Images = [
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1000&q=85',
]

const row4Images = [
  'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85',
]

export function PortfolioWall() {
  const containerRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const row3Ref = useRef<HTMLDivElement>(null)
  const row4Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ticking = false

    const updateRows = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowH = window.innerHeight

      // Calculate progress: 0 when top enters bottom of screen, 1 when bottom leaves top
      const totalDist = windowH + rect.height
      const currentDist = windowH - rect.top
      const rawProgress = currentDist / totalDist
      const progress = Math.max(0, Math.min(1, rawProgress))

      // Row 1: Moves RIGHT as user scrolls down (-18% to +8%)
      if (row1Ref.current) {
        const x = -18 + progress * 26
        row1Ref.current.style.transform = `translate3d(${x}%, 0, 0)`
      }

      // Row 2: Moves LEFT as user scrolls down (+8% to -18%)
      if (row2Ref.current) {
        const x = 8 - progress * 26
        row2Ref.current.style.transform = `translate3d(${x}%, 0, 0)`
      }

      // Row 3: Moves RIGHT as user scrolls down (-22% to +10%)
      if (row3Ref.current) {
        const x = -22 + progress * 32
        row3Ref.current.style.transform = `translate3d(${x}%, 0, 0)`
      }

      // Row 4: Moves LEFT as user scrolls down (+10% to -22%)
      if (row4Ref.current) {
        const x = 10 - progress * 32
        row4Ref.current.style.transform = `translate3d(${x}%, 0, 0)`
      }

      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateRows)
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    // Run initial update on mount
    updateRows()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      id="work"
      ref={containerRef}
      className="relative py-28 overflow-hidden bg-transparent"
      aria-label="Selected Works Showcase"
    >
      {/* Background Ambient Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 mb-16 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="mb-4">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/15 shadow-xl shadow-black/50">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.9)]" />
              <span className="text-[11px] font-mono tracking-[0.2em] text-purple-300 font-semibold">
                04
              </span>
              <span className="text-white/30 text-[10px]">/</span>
              <span className="text-[11px] font-mono tracking-[0.2em] text-neutral-300 uppercase">
                Selected Work
              </span>
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white leading-[1.22]">
            A continuous{' '}
            <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-200 to-indigo-300">wall of work.</span>
          </h2>
        </div>
        <p className="text-neutral-300/90 text-sm sm:text-base max-w-sm leading-relaxed font-normal">
          A visual journey through identities, architectural forms, and digital artifacts crafted with precision.
        </p>
      </div>

      {/* Moving Rows Container - Scrolls Exclusively on User Scroll */}
      <div className="flex flex-col gap-4 sm:gap-6 md:gap-8 w-full select-none pointer-events-none">
        {/* Row 1: Moves to the Right on Scroll */}
        <div className="overflow-hidden w-full">
          <div
            ref={row1Ref}
            className="flex items-center gap-4 sm:gap-6 md:gap-7 w-max will-change-transform transition-transform duration-75 ease-out"
            style={{ transform: 'translate3d(-18%, 0, 0)' }}
          >
            {row1Images.map((src, i) => (
              <div
                key={`r1-${i}`}
                className="relative w-[220px] sm:w-[340px] md:w-[440px] h-[150px] sm:h-[220px] md:h-[290px] flex-shrink-0 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl shadow-black/80"
              >
                <Image
                  src={src}
                  alt="Selected Project Visual"
                  fill
                  sizes="(max-width: 640px) 220px, (max-width: 768px) 340px, 440px"
                  className="object-cover filter contrast-[1.05] brightness-95"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moves to the Left on Scroll */}
        <div className="overflow-hidden w-full">
          <div
            ref={row2Ref}
            className="flex items-center gap-4 sm:gap-6 md:gap-7 w-max will-change-transform transition-transform duration-75 ease-out"
            style={{ transform: 'translate3d(8%, 0, 0)' }}
          >
            {row2Images.map((src, i) => (
              <div
                key={`r2-${i}`}
                className="relative w-[240px] sm:w-[360px] md:w-[480px] h-[160px] sm:h-[230px] md:h-[300px] flex-shrink-0 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl shadow-black/80"
              >
                <Image
                  src={src}
                  alt="Selected Project Visual"
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 768px) 360px, 480px"
                  className="object-cover filter contrast-[1.05] brightness-95"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Moves to the Right on Scroll */}
        <div className="overflow-hidden w-full">
          <div
            ref={row3Ref}
            className="flex items-center gap-4 sm:gap-6 md:gap-7 w-max will-change-transform transition-transform duration-75 ease-out"
            style={{ transform: 'translate3d(-22%, 0, 0)' }}
          >
            {row3Images.map((src, i) => (
              <div
                key={`r3-${i}`}
                className="relative w-[220px] sm:w-[340px] md:w-[440px] h-[150px] sm:h-[220px] md:h-[290px] flex-shrink-0 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl shadow-black/80"
              >
                <Image
                  src={src}
                  alt="Selected Project Visual"
                  fill
                  sizes="(max-width: 640px) 220px, (max-width: 768px) 340px, 440px"
                  className="object-cover filter contrast-[1.05] brightness-95"
                  unoptimized
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 4: Moves to the Left on Scroll */}
        <div className="overflow-hidden w-full">
          <div
            ref={row4Ref}
            className="flex items-center gap-4 sm:gap-6 md:gap-7 w-max will-change-transform transition-transform duration-75 ease-out"
            style={{ transform: 'translate3d(10%, 0, 0)' }}
          >
            {row4Images.map((src, i) => (
              <div
                key={`r4-${i}`}
                className="relative w-[240px] sm:w-[360px] md:w-[480px] h-[160px] sm:h-[230px] md:h-[300px] flex-shrink-0 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl shadow-black/80"
              >
                <Image
                  src={src}
                  alt="Selected Project Visual"
                  fill
                  sizes="(max-width: 640px) 240px, (max-width: 768px) 360px, 480px"
                  className="object-cover filter contrast-[1.05] brightness-95"
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
