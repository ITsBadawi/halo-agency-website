'use client'

import Image from 'next/image'

export function RotatingBackgroundLogo() {
  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center"
      aria-hidden="true"
    >
      {/* Soft ambient gradient orb behind the logo */}
      <div className="absolute w-[700px] h-[700px] rounded-full bg-purple-600/10 blur-[150px] -top-32 -right-32 pointer-events-none" />
      <div className="absolute w-[600px] h-[600px] rounded-full bg-violet-800/10 blur-[140px] -bottom-32 -left-32 pointer-events-none" />

      {/* Signature rotating background icon */}
      <div className="relative w-[750px] h-[750px] max-w-[90vw] max-h-[90vw] opacity-[0.08] select-none animate-spin-extremely-slow filter drop-shadow-[0_0_80px_rgba(147,51,234,0.3)]">
        <Image
          src="/logo.png"
          alt=""
          fill
          sizes="(max-width: 1200px) 90vw, 750px"
          priority
          className="object-contain filter contrast-125 saturate-150"
        />
      </div>
    </div>
  )
}
