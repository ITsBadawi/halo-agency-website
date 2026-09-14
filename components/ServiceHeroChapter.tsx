'use client'

import React from 'react'

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
          <div className="max-w-xl">
            {/* Elegant Chapter Index (Harmonious with Headline) */}
            <div className={`mb-4 flex ${isRight ? 'justify-start sm:justify-end' : 'justify-start'}`}>
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
            </div>

            {/* Headline with safe line-height and clearance to prevent any font collision */}
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-normal tracking-tight text-white leading-[1.22] sm:leading-[1.2] mb-4 sm:mb-5 drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
              {title}{' '}
              {highlightWord && (
                <span className="italic font-serif font-light text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-violet-200 to-indigo-300 drop-shadow-[0_2px_16px_rgba(0,0,0,0.95)]">
                  {highlightWord}
                </span>
              )}
            </h2>

            {/* Supporting Line with clear margin separation */}
            <p className="text-sm sm:text-base md:text-lg text-neutral-200/90 font-normal leading-relaxed max-w-lg drop-shadow-[0_1px_10px_rgba(0,0,0,0.95)]">
              {phrase}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
