'use client'

import React from 'react'
import Image from 'next/image'
import { ShieldCheck, Sparkles, HeartHandshake, Zap, ArrowUpRight } from 'lucide-react'

const values = [
  {
    title: 'Uncompromising Quality',
    desc: 'We obsess over typography, spacing, performance, and interaction until every touchpoint feels inevitable.',
    icon: ShieldCheck,
  },
  {
    title: 'Purposeful Innovation',
    desc: 'We use modern 3D and interaction design not for novelty, but to create undeniable emotional gravity.',
    icon: Zap,
  },
  {
    title: 'Senior Collaboration',
    desc: 'Direct access to senior makers without account managers or bloated agency layers in between.',
    icon: HeartHandshake,
  },
  {
    title: 'Enduring Craft',
    desc: 'Building digital worlds and brand identities that remain relevant, resilient, and distinct for years to come.',
    icon: Sparkles,
  },
]

const clients = ['Aesop', 'Northstar', 'Vitra', 'Kinfolk', 'Morrow', 'Acme Co']

export function StudioSection() {
  return (
    <section id="studio" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto border-t border-white/10">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
        {/* Left Column: Studio Narrative */}
        <div className="lg:col-span-7">
          <p className="text-[11px] font-mono tracking-widest text-purple-400 uppercase mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            04 / The Studio
          </p>
          <h2 className="text-4xl sm:text-6xl font-normal tracking-tight text-white leading-[1.05] mb-8">
            Small by design. <br />
            <span className="italic font-serif font-light text-purple-300">
              Big on belief.
            </span>
          </h2>
          <div className="space-y-5 text-neutral-400 text-base sm:text-lg leading-relaxed font-normal">
            <p>
              Halo is an independent creative studio engineered for high-conviction founders and brand leaders. We intentionally remain boutique: seasoned designers, 3D artists, and creative technologists working directly with you.
            </p>
            <p>
              No junior handoffs, no bureaucratic layers, and no cookie-cutter templates. Just pure, considered craft focused on making your brand impossible to overlook.
            </p>
          </div>

          {/* Core Values 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
            {values.map((val, idx) => {
              const ValIcon = val.icon
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <ValIcon className="w-4 h-4 text-purple-400 flex-shrink-0" />
                    <h3 className="text-sm font-semibold text-white tracking-tight">
                      {val.title}
                    </h3>
                  </div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Column: Studio Visual Atmosphere */}
        <div className="lg:col-span-5 relative">
          <div className="relative h-[480px] sm:h-[560px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-950/20 bg-neutral-900">
            <Image
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85"
              alt="Halo Creative Studio Space"
              fill
              className="object-cover filter contrast-[1.08] saturate-75"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-transparent to-transparent opacity-80" />

            {/* Corner Badge */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#121118]/90 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 block mb-1">
                    Studio Headquarters
                  </span>
                  <span className="text-sm font-bold text-white tracking-tight block">
                    Halo Creative Labs
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold text-neutral-400 block">
                    Est. 2019
                  </span>
                  <span className="text-[10px] text-emerald-400 uppercase tracking-widest flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active Studio
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Client Logos Row */}
      <div className="pt-12 border-t border-white/10">
        <p className="text-center text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-8">
          Trusted by pioneering brands and visionary founders
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-60">
          {clients.map((name) => (
            <span
              key={name}
              className="text-lg sm:text-xl font-serif italic text-neutral-400 tracking-wider hover:text-white transition-colors duration-200 cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
