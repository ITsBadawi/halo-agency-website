'use client'

import React, { useState } from 'react'
import { ArrowUpRight, CheckCircle, Mail, Phone, Clock, Send } from 'lucide-react'
import { LuxuryHeading } from '@/components/LuxuryHeading'

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <section id="contact" className="relative py-28 px-6 sm:px-8 max-w-7xl mx-auto bg-transparent border-t border-white/10">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading & Contact Info */}
        <div className="lg:col-span-5 overflow-visible">
          <LuxuryHeading
            as="h2"
            title="Let's build"
            highlight="something great."
            subtitle="Tell us about your brand vision, project objectives, or what isn't working yet. We partner with teams ready to make a significant leap."
            badge={{
              number: '05',
              category: 'Get in Touch',
            }}
            align="left"
            titleClassName="text-3xl sm:text-4xl lg:text-[42px] leading-[1.25]"
            subtitleClassName="mb-10 max-w-md"
          />

          {/* Contact Details (Simplified with requested placeholders only) */}
          <div className="space-y-6 pt-8 border-t border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 block mb-1">
                  Email
                </span>
                <span className="text-base font-semibold text-white tracking-wide">
                  [EMAIL ADDRESS]
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 block mb-1">
                  Phone
                </span>
                <span className="text-base font-semibold text-white tracking-wide">
                  [PHONE NUMBER]
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 block mb-1">
                  Response Window
                </span>
                <span className="text-sm font-medium text-neutral-300">
                  Guaranteed response within 24 hours
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Lead Form */}
        <div className="lg:col-span-7 rounded-3xl p-6 sm:p-10 md:p-12 border border-white/10 bg-gradient-to-b from-[#121118]/90 to-[#0b0b0f]/95 backdrop-blur-xl shadow-2xl shadow-purple-950/20">
          {submitted ? (
            <div className="py-12 sm:py-16 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-5 sm:mb-6">
                <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 sm:mb-3 tracking-tight">
                Message Received
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto mb-6 sm:mb-8 leading-relaxed">
                Thank you for reaching out. A senior member of our team will review your inquiry and follow up within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setFormData({ name: '', email: '', service: '', message: '' })
                }}
                className="px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-purple-300 border border-purple-500/30 hover:bg-purple-500/10 transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono tracking-wider uppercase text-neutral-400 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 text-base sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white/[0.05] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-mono tracking-wider uppercase text-neutral-400 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 text-base sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white/[0.05] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-mono tracking-wider uppercase text-neutral-400 mb-2">
                  Service of Interest
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-xl bg-[#14131b] border border-white/10 text-white text-base sm:text-sm focus:outline-none focus:border-purple-500 transition-all cursor-pointer"
                >
                  <option value="" disabled>Select a discipline</option>
                  <option value="Graphic Design">Graphic Design & Brand Identity</option>
                  <option value="Photography">Commercial Photography</option>
                  <option value="Web Development">Full-Stack Web Development</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] sm:text-xs font-mono tracking-wider uppercase text-neutral-400 mb-2">
                  Project Details *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the timeline, goals, and scope of your project..."
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 text-base sm:text-sm focus:outline-none focus:border-purple-500 focus:bg-white/[0.05] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-mono uppercase tracking-widest text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 transition-all duration-300 border border-purple-400/30 shadow-[0_4px_25px_rgba(147,51,234,0.35)] hover:shadow-[0_6px_35px_rgba(147,51,234,0.55)] hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="font-medium tracking-wider">{isSubmitting ? 'Sending...' : 'Send Enquiry'}</span>
                <Send className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
