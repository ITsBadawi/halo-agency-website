'use client'

import React from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      role="group"
      aria-label="Language selector"
      className="inline-flex items-center gap-1 p-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/15 shadow-xl shadow-black/50 select-none"
    >
      <div className="pl-2 pr-1 text-purple-400/80">
        <Globe className="w-3.5 h-3.5" />
      </div>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 rounded-full text-[11px] font-mono tracking-wider transition-all duration-300 cursor-pointer ${
          language === 'en'
            ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold shadow-[0_0_12px_rgba(168,85,247,0.45)]'
            : 'text-neutral-400 hover:text-white'
        }`}
        aria-pressed={language === 'en'}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => setLanguage('ar')}
        className={`px-2.5 py-1 rounded-full text-[11px] font-sans font-medium tracking-wide transition-all duration-300 cursor-pointer ${
          language === 'ar'
            ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold shadow-[0_0_12px_rgba(168,85,247,0.45)]'
            : 'text-neutral-400 hover:text-white'
        }`}
        aria-pressed={language === 'ar'}
      >
        عربي
      </button>
    </div>
  )
}
