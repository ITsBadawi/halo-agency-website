'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowUp } from 'lucide-react'
import { smoothScrollTo } from '@/lib/smoothScroll'
import { useLanguage } from '@/context/LanguageContext'
import { useSiteContent } from '@/context/SiteContentContext'

export function Footer() {
  const { t, isRTL } = useLanguage()
  const { content } = useSiteContent()

  const footerData = content?.sections?.footer
  const tagline = isRTL ? (footerData?.taglineAr || t.footer.tagline) : (footerData?.taglineEn || t.footer.tagline)
  const rights = isRTL ? (footerData?.rightsAr || t.footer.rights) : (footerData?.rightsEn || t.footer.rights)
  const crafted = isRTL ? (footerData?.craftedAr || t.footer.crafted) : (footerData?.craftedEn || t.footer.crafted)
  const location = isRTL ? (footerData?.locationAr || t.footer.location) : (footerData?.locationEn || t.footer.location)

  const scrollToTop = () => {
    smoothScrollTo('hero', 1200)
  }

  const scrollTo = (id: string) => {
    smoothScrollTo(id, 1200)
  }

  return (
    <footer className="relative py-4 sm:py-6 px-4 sm:px-8 max-w-7xl mx-auto border-t border-white/10 w-full overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Logo and Tagline */}
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Halo Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-sans">
            HALO<span className="text-purple-400">.</span>
          </span>
          <span className="text-xs text-neutral-500 ml-2 hidden sm:inline font-sans">
            |&nbsp;&nbsp;{tagline}
          </span>
        </div>

        {/* Footer Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-6 text-xs font-mono uppercase tracking-wider text-neutral-400">
          <button
            onClick={() => scrollTo('work')}
            className="hover:text-purple-400 transition-colors cursor-pointer"
          >
            {t.nav.works}
          </button>
          <button
            onClick={() => scrollTo('graphic-design')}
            className="hover:text-purple-400 transition-colors cursor-pointer"
          >
            {t.nav.design}
          </button>
          <button
            onClick={() => scrollTo('photography')}
            className="hover:text-purple-400 transition-colors cursor-pointer"
          >
            {t.nav.photography}
          </button>
          <button
            onClick={() => scrollTo('web-development')}
            className="hover:text-purple-400 transition-colors cursor-pointer"
          >
            {t.nav.webDev}
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="hover:text-purple-400 transition-colors cursor-pointer"
          >
            {t.nav.contact}
          </button>
        </nav>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono tracking-wider uppercase text-neutral-300 hover:text-white transition-all cursor-pointer group"
          aria-label={t.footer.backToTop}
        >
          <span>{t.footer.backToTop}</span>
          <ArrowUp className="w-3.5 h-3.5 text-purple-400 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500 pt-3 sm:pt-4 border-t border-white/5 font-mono">
        <p>{rights}</p>
        <p className="flex items-center gap-2">
          <span>{crafted}</span>
          <span className="w-1 h-1 rounded-full bg-purple-500" />
          <span>{location}</span>
        </p>
      </div>
    </footer>
  )
}
