'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'

export interface LuxuryHeadingProps {
  as?: 'h1' | 'h2' | 'h3'
  title: string
  highlight?: string
  subtitle?: string
  badge?: {
    number: string
    category?: string
  }
  badgeCustom?: React.ReactNode
  align?: 'left' | 'right' | 'center'
  className?: string
  titleClassName?: string
  highlightClassName?: string
  subtitleClassName?: string
  delayOffset?: number
  once?: boolean
}

const containerVariants: Variants = {
  hidden: {},
  visible: (custom: number = 0) => ({
    transition: {
      staggerChildren: 0.06,
      delayChildren: custom,
    },
  }),
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

export function LuxuryHeading({
  as: Component = 'h2',
  title,
  highlight,
  subtitle,
  badge,
  badgeCustom,
  align = 'left',
  className = '',
  titleClassName = '',
  highlightClassName = '',
  subtitleClassName = '',
  delayOffset = 0,
  once = false,
}: LuxuryHeadingProps) {
  const isRight = align === 'right'
  const isCenter = align === 'center'

  const alignmentClasses = isCenter
    ? 'items-center text-center'
    : isRight
    ? 'items-start sm:items-end text-left sm:text-right'
    : 'items-start text-left'

  const words = title.trim().split(/\s+/)

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.25, margin: '-40px' }}
      custom={delayOffset}
      variants={containerVariants}
      className={`flex flex-col ${alignmentClasses} ${className}`}
      style={{ perspective: 1200 }}
    >
      {/* 1. Optional Eyebrow / Chapter Badge */}
      {badgeCustom ? (
        <motion.div variants={badgeVariants} className="mb-4">
          {badgeCustom}
        </motion.div>
      ) : badge ? (
        <motion.div
          variants={badgeVariants}
          className={`mb-4 flex ${
            isCenter
              ? 'justify-center'
              : isRight
              ? 'justify-start sm:justify-end'
              : 'justify-start'
          }`}
        >
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/15 shadow-xl shadow-black/50 transition-all duration-300 hover:border-purple-500/40">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.9)] animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.2em] text-purple-300 font-semibold">
              {badge.number}
            </span>
            {badge.category && (
              <>
                <span className="text-white/30 text-[10px]">/</span>
                <span className="text-[11px] font-mono tracking-[0.2em] text-neutral-300 uppercase">
                  {badge.category}
                </span>
              </>
            )}
          </div>
        </motion.div>
      ) : null}

      {/* 2. Main Heading with Word-by-Word Luxury Emergence */}
      <Component
        className={`font-normal tracking-tight text-white ${titleClassName}`}
      >
        <span className="inline-flex flex-wrap gap-x-[0.28em] gap-y-1 items-baseline">
          {words.map((word, idx) => (
            <span
              key={`word-${idx}`}
              className="inline-block overflow-hidden py-0.5"
            >
              <motion.span
                variants={wordVariants}
                className="inline-block drop-shadow-[0_2px_18px_rgba(0,0,0,0.95)]"
              >
                {word}
              </motion.span>
            </span>
          ))}

          {highlight && (
            <span className="inline-block overflow-hidden py-0.5 ml-[0.1em]">
              <motion.span
                variants={highlightVariants}
                className={`inline-block italic font-serif font-light luxury-text-shimmer drop-shadow-[0_2px_22px_rgba(168,85,247,0.45)] ${highlightClassName}`}
              >
                {highlight}
              </motion.span>
            </span>
          )}
        </span>
      </Component>

      {/* 3. Supporting Subtitle / Phrase */}
      {subtitle && (
        <motion.p
          variants={subtitleVariants}
          className={`mt-4 sm:mt-5 text-sm sm:text-base md:text-lg text-neutral-200/90 font-normal leading-relaxed drop-shadow-[0_1px_10px_rgba(0,0,0,0.95)] ${subtitleClassName}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
