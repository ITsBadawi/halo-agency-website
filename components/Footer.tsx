'use client'

import React from 'react'
import Image from 'next/image'
import { ArrowUp } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 80
      const pos = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top: pos - offset, behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative py-16 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
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
          <span className="text-xl font-bold tracking-tight text-white">
            HALO<span className="text-purple-400">.</span>
          </span>
          <span className="text-xs text-neutral-500 ml-2 hidden sm:inline">
            |&nbsp;&nbsp;Ideas with gravity
          </span>
        </div>

        {/* Footer Navigation */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono uppercase tracking-wider text-neutral-400">
          <button
            onClick={() => scrollTo('work')}
            className="hover:text-purple-400 transition-colors cursor-pointer"
          >
            Work
          </button>
          <button
            onClick={() => scrollTo('services')}
            className="hover:text-purple-400 transition-colors cursor-pointer"
          >
            Services
          </button>
          <button
            onClick={() => scrollTo('process')}
            className="hover:text-purple-400 transition-colors cursor-pointer"
          >
            Process
          </button>
          <button
            onClick={() => scrollTo('studio')}
            className="hover:text-purple-400 transition-colors cursor-pointer"
          >
            Studio
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="hover:text-purple-400 transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-xs font-mono tracking-wider uppercase text-neutral-300 hover:text-white transition-all cursor-pointer group"
          aria-label="Back to top of page"
        >
          <span>Back to top</span>
          <ArrowUp className="w-3.5 h-3.5 text-purple-400 transition-transform group-hover:-translate-y-0.5" />
        </button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 pt-8 border-t border-white/5 font-mono">
        <p>© 2026 Halo Agency. All rights reserved.</p>
        <p className="flex items-center gap-2">
          <span>Crafted with intention</span>
          <span className="w-1 h-1 rounded-full bg-purple-500" />
          <span>NYC & Worldwide</span>
        </p>
      </div>
    </footer>
  )
}
