'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'

interface ServiceHeroChapterProps {
  id: string
  chapterNumber: string
  category?: string
  title: string
  highlightWord?: string
  phrase: string
  videoSrc: string
  align?: 'left' | 'right'
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const badgeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.94,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 34,
    rotateX: 25,
    scale: 0.94,
    filter: 'blur(10px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const highlightVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 38,
    scale: 0.92,
    rotateX: 20,
    filter: 'blur(12px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.95,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const subtitleVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

export function ServiceHeroChapter({
  id,
  chapterNumber,
  category,
  title,
  highlightWord,
  phrase,
  videoSrc,
  align = 'left',
}: ServiceHeroChapterProps) {
  const isRight = align === 'right'

  return (
    <section
      id={id}
      className="relative w-full h-[100dvh] min-h-[600px] overflow-hidden flex items-end sm:items-center"
      aria-label={`${chapterNumber} ${title}`}
    >
      {/* Background Full-Screen Cinematic Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none filter brightness-90 contrast-[1.05]"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Cinematic Vignette & Ambient Gradient Overlays for Pure Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090b]/90 via-black/30 to-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />

      {/* Subtle Top & Bottom Seamless Section Blend */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#09090b] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />

      {/* Content Overlay: Refined Eyebrow + Headline + Supporting Line */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pb-20 sm:pb-0">
        <div
          className={`w-full flex ${
            isRight ? 'justify-start sm:justify-end text-left sm:text-right' : 'justify-start text-left'
          }`}
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25, margin: '-40px' }}
            variants={containerVariants}
            style={{ perspective: 1200 }}
            className={`max-w-xl flex flex-col ${isRight ? 'items-start sm:items-end' : 'items-start'}`}
          >
            {/* Elegant Chapter Index (Harmonious with Headline) */}
            <motion.div
              variants={badgeVariants}
              className={`mb-4 flex ${isRight ? 'justify-start sm:justify-end' : 'justify-start'}`}
            >
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-white/15 shadow-xl shadow-black/50">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.9)]" />
                <span className="text-[11px] font-mono tracking-[0.2em] text-purple-300 font-semibold">
                  {chapterNumber}
                </span>
                {category && (
                  <>
                    <span className="text-white/30 text-[10px]">/</span>
                    <span className="text-[11px] font-mono tracking-[0.2em] text-neutral-300 uppercase">
                      {category}
                    </span>
                  </>
                )}
              </div>
            </motion.div>

            {/* Headline with safe line-height and clearance to prevent any font collision */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-[1.22] sm:leading-[1.2] mb-4 sm:mb-5 drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
              <span className="inline-block overflow-hidden py-0.5">
                <motion.span variants={wordVariants} className="inline-block">
                  {title}
                </motion.span>
              </span>{' '}
              {highlightWord && (
                <span className="inline-block overflow-hidden py-0.5">
                  <motion.span
                    variants={highlightVariants}
                    className="inline-block italic font-serif font-light luxury-text-shimmer drop-shadow-[0_2px_16px_rgba(168,85,247,0.45)]"
                  >
                    {highlightWord}
                  </motion.span>
                </span>
              )}
            </h2>

            {/* Supporting Line with clear margin separation */}
            <motion.p
              variants={subtitleVariants}
              className={`text-sm sm:text-base md:text-lg text-neutral-200/90 font-normal leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.95)] ${
                isRight
                  ? 'text-left sm:text-right sm:ml-auto max-w-sm sm:max-w-[390px]'
                  : 'text-left max-w-lg'
              }`}
            >
              {phrase}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
