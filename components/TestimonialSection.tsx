'use client'

import React from 'react'
import { Quote } from 'lucide-react'

export function TestimonialSection() {
  return (
    <section className="relative py-24 px-6 sm:px-8 max-w-5xl mx-auto text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-8">
        <Quote className="w-5 h-5" />
      </div>

      <blockquote className="text-3xl sm:text-5xl lg:text-6xl font-serif italic text-white/95 leading-[1.15] tracking-tight mb-10 font-normal">
        &ldquo;Halo doesn&apos;t just make things look good. They make you see the thing differently. That shift changed everything for our brand.&rdquo;
      </blockquote>

      <div className="flex flex-col items-center justify-center gap-1">
        <span className="text-base font-bold text-white tracking-wide">
          Julia McKay
        </span>
        <span className="text-xs font-mono tracking-widest text-purple-400 uppercase">
          Founder & CEO, Northstar
        </span>
      </div>
    </section>
  )
}
