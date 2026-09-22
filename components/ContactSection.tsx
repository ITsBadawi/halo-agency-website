'use client'

import React, { useState } from 'react'
import { CheckCircle, Mail, Phone, Clock, Send, MapPin } from 'lucide-react'
import { LuxuryHeading } from '@/components/LuxuryHeading'
import { useLanguage } from '@/context/LanguageContext'
import { useSiteContent } from '@/context/SiteContentContext'

export function ContactSection() {
  const { t, isRTL } = useLanguage()
  const { content } = useSiteContent()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  })
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactData = content?.sections?.contact
  const contactInfo = content?.contact

  const title = isRTL ? (contactData?.titleAr || t.contact.title) : (contactData?.titleEn || t.contact.title)
  const highlight = isRTL ? (contactData?.highlightAr || t.contact.highlight) : (contactData?.highlightEn || t.contact.highlight)
  const subtitle = isRTL ? (contactData?.subtitleAr || t.contact.subtitle) : (contactData?.subtitleEn || t.contact.subtitle)
  const badge = isRTL ? (contactData?.badgeAr || t.contact.badge) : (contactData?.badgeEn || t.contact.badge)

  const phone = contactInfo?.phone || t.contact.phoneValue
  const email = contactInfo?.email || 'ah.mu001@gmail.com'
  const location = isRTL
    ? (contactInfo?.locationAr || t.contact.locationValue)
    : (contactInfo?.locationEn || t.contact.locationValue)
  const responseWindow = isRTL
    ? (contactInfo?.responseWindowAr || t.contact.responseValue)
    : (contactInfo?.responseWindowEn || t.contact.responseValue)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || '470694bc-87be-4019-a7ec-8a90970aca04'

    if (!accessKey || accessKey === 'your_access_key_here') {
      setError(
        isRTL
          ? 'يرجى إضافة مفتاح Web3Forms في ملف .env.local لتفعيل الإرسال الحقيقي'
          : 'Please configure your Web3Forms Access Key in .env.local'
      )
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formData.name,
          email: formData.email,
          service: formData.service || (isRTL ? 'غير محدد' : 'Not specified'),
          message: formData.message,
          subject: `طلب تواصل جديد من: ${formData.name}`,
          from_name: 'Halo Agency Website',
        }),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitted(true)
        setFormData({ name: '', email: '', service: '', message: '' })
      } else {
        setError(
          result.message ||
            (isRTL ? 'تعذر إرسال الرسالة، يرجى المحاولة لاحقاً' : 'Submission failed, please try again.')
        )
      }
    } catch {
      setError(
        isRTL
          ? 'حدث خطأ في الاتصال، يرجى التحقق من اتصال الإنترنت والمحاولة لاحقاً'
          : 'Network error, please check your internet connection.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 bg-transparent overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-96 h-80 sm:h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none max-w-full" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full">
        {/* Left Column: Heading & Contact Info */}
        <div className="lg:col-span-5 w-full">
          <LuxuryHeading
            as="h2"
            title={title}
            highlight={highlight}
            subtitle={subtitle}
            badge={{
              number: '05',
              category: badge,
            }}
            align={isRTL ? "right" : "left"}
            titleClassName="text-3xl sm:text-4xl lg:text-[40px] leading-[1.22]"
            subtitleClassName="mb-6 sm:mb-8 max-w-md text-xs sm:text-sm text-neutral-300/90"
          />

          {/* Contact Details */}
          <div className="space-y-4 pt-6 border-t border-white/10">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 block mb-1">
                  {t.contact.phoneLabel}
                </span>
                <a
                  href={`tel:${phone}`}
                  className="text-base font-semibold text-white tracking-wide hover:text-purple-400 transition-colors font-mono"
                  dir="ltr"
                >
                  {phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 block mb-1">
                  {t.contact.locationLabel}
                </span>
                <span className="text-sm font-semibold text-white tracking-wide block font-sans">
                  {location}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 block mb-1">
                  {t.contact.emailLabel}
                </span>
                <a
                  href={`mailto:${email}`}
                  className="text-sm font-semibold text-white tracking-wide hover:text-purple-400 transition-colors font-mono"
                  dir="ltr"
                >
                  {email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-neutral-400 block mb-1">
                  {t.contact.responseLabel}
                </span>
                <span className="text-sm font-medium text-neutral-300">
                  {responseWindow}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Lead Form */}
        <div className="lg:col-span-7 w-full rounded-3xl p-5 sm:p-7 md:p-8 border border-white/10 bg-gradient-to-b from-[#121118]/90 to-[#0b0b0f]/95 backdrop-blur-xl shadow-2xl shadow-purple-950/20 overflow-hidden">
          {submitted ? (
            <div className="py-8 sm:py-12 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 sm:mb-5">
                <CheckCircle className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                {t.contact.successTitle}
              </h3>
              <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto mb-5 sm:mb-6 leading-relaxed">
                {t.contact.successDesc}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false)
                  setFormData({ name: '', email: '', service: '', message: '' })
                }}
                className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-purple-300 border border-purple-500/30 hover:bg-purple-500/10 transition-colors cursor-pointer"
              >
                {t.contact.successAnother}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              {error && (
                <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs sm:text-sm text-center animate-in fade-in duration-200">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-neutral-400 mb-1.5">
                    {t.contact.formName}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={isRTL ? 'الاسم الكريم' : 'Jane Doe'}
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-purple-500 focus:bg-white/[0.05] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-neutral-400 mb-1.5">
                    {t.contact.formEmail}
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={isRTL ? 'name@company.com' : 'jane@company.com'}
                    className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-purple-500 focus:bg-white/[0.05] transition-all"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-neutral-400 mb-1.5">
                  {t.contact.formService}
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-[#14131b] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition-all cursor-pointer"
                >
                  <option value="" disabled>{t.contact.formServicePlaceholder}</option>
                  <option value="Graphic Design">{t.contact.formServiceGraphic}</option>
                  <option value="Photography">{t.contact.formServicePhoto}</option>
                  <option value="Web Development">{t.contact.formServiceWeb}</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-neutral-400 mb-1.5">
                  {t.contact.formDetails}
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.contact.formDetailsPlaceholder}
                  className="w-full px-3.5 py-2.5 sm:py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-purple-500 focus:bg-white/[0.05] transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3 sm:py-3.5 rounded-full text-xs font-mono uppercase tracking-widest text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 transition-all duration-300 border border-purple-400/30 shadow-[0_4px_25px_rgba(147,51,234,0.35)] hover:shadow-[0_6px_35px_rgba(147,51,234,0.55)] hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="font-medium tracking-wider">
                  {isSubmitting ? t.contact.formSending : t.contact.formSubmit}
                </span>
                <Send className={`w-3.5 h-3.5 transition-transform ${isRTL ? 'group-hover:-translate-x-0.5 rotate-180' : 'group-hover:translate-x-0.5'}`} />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
