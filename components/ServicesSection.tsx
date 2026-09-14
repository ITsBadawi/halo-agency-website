'use client'

import React, { useState } from 'react'
import { Palette, Camera, TrendingUp, Code, ArrowUpRight, CheckCircle2, Compass, Layers, Cpu, Rocket } from 'lucide-react'

const services = [
  {
    id: '01',
    title: 'Graphic Design',
    subtitle: 'Branding & Visual Systems',
    description: 'We craft comprehensive visual languages and identities that make brands memorable, distinct, and enduring across all mediums.',
    icon: Palette,
    deliverables: [
      'Visual Identity & Systems',
      'Art Direction & Style Guides',
      'Editorial & Packaging Design',
      'Custom Typography & Logotypes',
    ],
  },
  {
    id: '02',
    title: 'Photography',
    subtitle: 'Editorial & Visual Content',
    description: 'A disciplined, cinematic eye for texture, lighting, and composition that elevates product stories and campaign visuals.',
    icon: Camera,
    deliverables: [
      'Campaign & Lookbook Shoots',
      'High-end Product Photography',
      'Creative Editorial Direction',
      'Color Grading & Retouching',
    ],
  },
  {
    id: '03',
    title: 'Marketing',
    subtitle: 'Strategy & Brand Growth',
    description: 'Data-informed creative campaigns engineered to capture attention, build loyal communities, and generate real commercial velocity.',
    icon: TrendingUp,
    deliverables: [
      'Digital Strategy & Positioning',
      'High-impact Launch Campaigns',
      'Social Content Frameworks',
      'Conversion Rate Optimization',
    ],
  },
  {
    id: '04',
    title: 'Web Development',
    subtitle: 'Digital Products & Platforms',
    description: 'Modern, blazing-fast web experiences and interactive platforms built with cutting-edge 3D graphics, motion, and accessibility.',
    icon: Code,
    deliverables: [
      'Full-Stack Next.js & React',
      'Interactive 3D & WebGL (Three.js)',
      'Motion Systems & Micro-animations',
      'Performance & SEO Architecture',
    ],
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Discover',
    desc: 'Deep discovery into your vision, audience, market tension, and core opportunities.',
    icon: Compass,
  },
  {
    number: '02',
    title: 'Define',
    desc: 'Setting the strategic foundation, creative concept, and architectural blueprints.',
    icon: Layers,
  },
  {
    number: '03',
    title: 'Develop',
    desc: 'Translating concepts into pixel-perfect design, dynamic code, and interactive motion.',
    icon: Cpu,
  },
  {
    number: '04',
    title: 'Deliver',
    desc: 'Rigorous optimization, multi-device testing, smooth deployment, and ongoing scale.',
    icon: Rocket,
  },
]

export function ServicesSection() {
  const [activeService, setActiveService] = useState<string | null>(null)

  return (
    <section id="services" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto">
      {/* Background Glow */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Services Header */}
      <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="text-[11px] font-mono tracking-widest text-purple-400 uppercase mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
            02 / What We Do
          </p>
          <h2 className="text-4xl sm:text-6xl font-normal tracking-tight text-white leading-tight">
            Comprehensive <br />
            <span className="italic font-serif font-light text-purple-300">creative capabilities.</span>
          </h2>
        </div>
        <p className="text-neutral-400 text-sm sm:text-base max-w-md leading-relaxed font-normal">
          From brand origins to complex digital ecosystems, we provide holistic end-to-end craft under one roof.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-28">
        {services.map((service) => {
          const Icon = service.icon
          const isHovered = activeService === service.id

          return (
            <div
              key={service.id}
              onMouseEnter={() => setActiveService(service.id)}
              onMouseLeave={() => setActiveService(null)}
              className="relative rounded-3xl p-8 sm:p-10 border border-white/10 bg-gradient-to-b from-[#121118]/80 to-[#0b0b0f]/90 backdrop-blur-xl transition-all duration-300 hover:border-purple-500/40 hover:shadow-2xl hover:shadow-purple-950/20 group flex flex-col justify-between"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 transition-transform duration-300 group-hover:scale-110 group-hover:bg-purple-500/20">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-mono text-neutral-500 tracking-wider">
                    {service.id}
                  </span>
                </div>

                {/* Service Titles */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                  {service.title}
                </h3>
                <p className="text-xs font-semibold tracking-wider uppercase text-purple-400 mb-4">
                  {service.subtitle}
                </p>
                <p className="text-neutral-400 text-sm leading-relaxed mb-8">
                  {service.description}
                </p>
              </div>

              {/* Deliverables List */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-[11px] font-mono tracking-widest text-neutral-400 uppercase mb-4">
                  Key Deliverables
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.deliverables.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-neutral-300 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

      {/* 4-Step Process Section */}
      <div id="process" className="pt-16 border-t border-white/10">
        <div className="mb-14 text-center max-w-xl mx-auto">
          <p className="text-[11px] font-mono tracking-widest text-purple-400 uppercase mb-3">
            03 / Our Process
          </p>
          <h3 className="text-3xl sm:text-5xl font-normal text-white tracking-tight">
            How we bring ideas <span className="italic font-serif font-light text-purple-300">to life.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step) => {
            const StepIcon = step.icon
            return (
              <div
                key={step.number}
                className="rounded-2xl p-7 border border-white/10 bg-[#100f16]/60 backdrop-blur-md relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-serif italic text-purple-400 font-light">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-purple-300 transition-colors">
                    <StepIcon className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {step.title}
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
