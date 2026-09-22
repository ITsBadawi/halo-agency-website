'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { smoothScrollTo } from '@/lib/smoothScroll'
import { useLanguage } from '@/context/LanguageContext'
import { LanguageToggle } from '@/components/LanguageToggle'

interface NavbarProps {
  activeSection?: string
}

export function Navbar({ activeSection = 'hero' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { t, isRTL } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    smoothScrollTo(id, 1200)
    setMobileOpen(false)
  }

  const navItems = [
    { label: t.nav.design, id: 'graphic-design' },
    { label: t.nav.photography, id: 'photography' },
    { label: t.nav.webDev, id: 'web-development' },
    { label: t.nav.works, id: 'work' },
    { label: t.nav.contact, id: 'contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#09090b]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/70'
          : 'py-5 bg-gradient-to-b from-black/70 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
        {/* Brand Logo & Wordmark */}
        <button
          onClick={() => smoothScrollTo('hero', 1200)}
          className="flex items-center gap-3 text-white group cursor-pointer"
          aria-label="Halo Agency Home"
        >
          <div className="relative w-8 h-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
            <Image
              src="/logo.png"
              alt="Halo Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white flex items-center font-sans">
            HALO<span className="text-purple-400 ml-0.5">.</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-mono uppercase tracking-widest text-neutral-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`transition-colors duration-200 hover:text-white cursor-pointer relative py-1 ${
                activeSection === item.id ? 'text-purple-400 font-semibold' : ''
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Desktop Actions: Language Toggle & CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle />

          <button
            onClick={() => scrollTo('contact')}
            className="group relative inline-flex items-center gap-3 px-5 py-2 rounded-full text-xs font-mono uppercase tracking-widest text-neutral-200 hover:text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-purple-400/50 backdrop-blur-xl transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(168,85,247,0.25)] hover:-translate-y-0.5 cursor-pointer"
          >
            <span className="font-medium tracking-wider">{t.nav.startProject}</span>
            <span className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300 group-hover:bg-purple-400 group-hover:text-black transition-all duration-300">
              <ArrowUpRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle & Mobile Lang Switch */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white p-2 focus:outline-none cursor-pointer"
            aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-[57px] bg-[#09090b]/95 backdrop-blur-2xl border-b border-neutral-800 px-6 py-8 flex flex-col gap-6 shadow-2xl animate-in fade-in duration-200">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left text-base font-medium tracking-wide text-neutral-300 hover:text-purple-400 transition-colors py-2 border-b border-neutral-800/50"
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            onClick={() => scrollTo('contact')}
            className="flex items-center justify-center gap-3 w-full py-3.5 rounded-full bg-white/[0.08] hover:bg-purple-950/40 border border-purple-500/30 text-white font-medium text-xs font-mono uppercase tracking-widest shadow-xl transition-all duration-300 cursor-pointer"
          >
            <span>{t.nav.startProject}</span>
            <ArrowUpRight className="w-4 h-4 text-purple-400" />
          </button>
        </div>
      )}
    </header>
  )
}
