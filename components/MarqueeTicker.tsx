'use client'

import React from 'react'

export function MarqueeTicker() {
  const phrases = [
    'Make It Meaningful',
    'Make It Memorable',
    'Make It Move',
    'Ideas With Gravity',
    'Design That Endures',
    'Digital Without Friction',
  ]

  return (
    <div className="relative w-full overflow-hidden border-y border-white/10 bg-[#0c0c0f] py-5 select-none">
      <div className="flex w-max animate-marquee gap-12 whitespace-nowrap">
        {[...phrases, ...phrases].map((phrase, idx) => (
          <div key={idx} className="flex items-center gap-12">
            <span className="text-xl sm:text-2xl font-serif italic text-purple-300 font-light tracking-wide">
              {phrase}
            </span>
            <span className="text-purple-500 text-sm font-sans font-normal">✳</span>
          </div>
        ))}
      </div>
    </div>
  )
}
