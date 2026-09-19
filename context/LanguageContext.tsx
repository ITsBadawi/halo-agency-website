'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'en' | 'ar'

export interface Translations {
  nav: {
    design: string
    photography: string
    webDev: string
    works: string
    contact: string
    startProject: string
  }
  hero: {
    badge: string
    title: string
    highlight: string
    subtitle: string
    explore: string
  }
  chapters: {
    c1: {
      category: string
      title: string
      highlight: string
      phrase: string
    }
    c2: {
      category: string
      title: string
      highlight: string
      phrase: string
    }
    c3: {
      category: string
      title: string
      highlight: string
      phrase: string
    }
  }
  works: {
    badge: string
    title: string
    highlight: string
    subtitle: string
  }
  contact: {
    badge: string
    title: string
    highlight: string
    subtitle: string
    emailLabel: string
    phoneLabel: string
    phoneValue: string
    locationLabel: string
    locationValue: string
    responseLabel: string
    responseValue: string
    formName: string
    formEmail: string
    formService: string
    formServicePlaceholder: string
    formServiceGraphic: string
    formServicePhoto: string
    formServiceWeb: string
    formDetails: string
    formDetailsPlaceholder: string
    formSubmit: string
    formSending: string
    successTitle: string
    successDesc: string
    successAnother: string
  }
  footer: {
    tagline: string
    rights: string
    crafted: string
    location: string
    backToTop: string
  }
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      design: 'Design',
      photography: 'Photography',
      webDev: 'Web Dev',
      works: 'Works',
      contact: 'Contact',
      startProject: 'Start a Project',
    },
    hero: {
      badge: 'HALO MARKETING AGENCY ✳ IRAQ & BAGHDAD',
      title: 'Ideas with',
      highlight: 'gravity.',
      subtitle: 'An independent creative studio shaping visual identities, cinematic imagery, and digital worlds.',
      explore: 'Explore Chapters',
    },
    chapters: {
      c1: {
        category: 'Brand & Systems',
        title: 'Graphic',
        highlight: 'Design.',
        phrase: 'Defining visual languages, art direction, and packaging systems that make brands unforgettable.',
      },
      c2: {
        category: 'Editorial & Cinematography',
        title: 'Editorial',
        highlight: 'Photography.',
        phrase: 'A disciplined eye for lighting, composition, and texture that breathes authentic depth into brand campaigns.',
      },
      c3: {
        category: 'Digital Engineering',
        title: 'Web',
        highlight: 'Development.',
        phrase: 'Engineering high-performance web products, interactive 3D platforms, and fluid motion interfaces.',
      },
    },
    works: {
      badge: 'Selected Work',
      title: 'A continuous',
      highlight: 'wall of work.',
      subtitle: 'A visual journey through identities, architectural forms, and digital artifacts crafted with precision.',
    },
    contact: {
      badge: 'Get in Touch',
      title: "Let's build",
      highlight: 'something great.',
      subtitle: "Tell us about your brand vision, project objectives, or what isn't working yet. We partner with teams ready to make a significant leap.",
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      phoneValue: '07888909033',
      locationLabel: 'Location',
      locationValue: 'Al-Yarmouk, Opposite Al-Naji University',
      responseLabel: 'Response Window',
      responseValue: 'Guaranteed response within 24 hours',
      formName: 'Your Name *',
      formEmail: 'Your Email *',
      formService: 'Service of Interest',
      formServicePlaceholder: 'Select a discipline',
      formServiceGraphic: 'Graphic Design & Brand Identity',
      formServicePhoto: 'Commercial Photography',
      formServiceWeb: 'Full-Stack Web Development',
      formDetails: 'Project Details *',
      formDetailsPlaceholder: 'Tell us about the timeline, goals, and scope of your project...',
      formSubmit: 'Send Enquiry',
      formSending: 'Sending...',
      successTitle: 'Message Received',
      successDesc: 'Thank you for reaching out. A senior member of our team will review your inquiry and follow up within 24 hours.',
      successAnother: 'Send Another Message',
    },
    footer: {
      tagline: 'Ideas with gravity',
      rights: '© 2026 HALO Marketing Agency. All rights reserved.',
      crafted: 'Crafted with intention',
      location: 'IRAQ & Baghdad ✳ Al-Yarmouk, Opposite Al-Naji University',
      backToTop: 'Back to top',
    },
  },
  ar: {
    nav: {
      design: 'التصميم',
      photography: 'التصوير',
      webDev: 'تطوير الويب',
      works: 'أعمالنا',
      contact: 'تواصل معنا',
      startProject: 'ابدأ مشروعك',
    },
    hero: {
      badge: 'وكالة هالو للتسويق ✳ IRAQ & BAGHDAD',
      title: 'أفكار ذات',
      highlight: 'جاذبية.',
      subtitle: 'وكالة إبداعية مستقلة تصنع الهويات البصرية، الإنتاج السينمائي، والتجارب الرقمية الفريدة للعلامات الطموحة.',
      explore: 'استكشف الفصول',
    },
    chapters: {
      c1: {
        category: 'العلامات التجارية والأنظمة',
        title: 'التصميم',
        highlight: 'الجرافيكي.',
        phrase: 'صياغة لغات بصرية راقية، إدارة فنية استثنائية، وأنظمة هوية متكاملة تجعل علامتك التجارية راسخة ولا تُنسى.',
      },
      c2: {
        category: 'التحرير والسينماتوغرافيا',
        title: 'التصوير',
        highlight: 'الفوتوغرافي.',
        phrase: 'عين احترافية منضبطة للإضاءة والتكوين والملمس، تبث عمقاً أصيلاً وفخامة متناهية في الحملات الدعائية.',
      },
      c3: {
        category: 'الهندسة الرقمية',
        title: 'تطوير',
        highlight: 'الويب.',
        phrase: 'هندسة منصات رقمية فائقة الأداء والسرعة، تجارب تفاعلية ثلاثية الأبعاد، وواجهات حركة انسيابية مبتكرة.',
      },
    },
    works: {
      badge: 'أعمال مختارة',
      title: 'معرض متواصل',
      highlight: 'من الأعمال.',
      subtitle: 'رحلة بصرية تأخذك عبر الهويات الإبداعية، التصاميم المعمارية، والمشاريع الرقمية المصنوعة بدقة متناهية.',
    },
    contact: {
      badge: 'تواصل معنا',
      title: 'لنصنع معاً',
      highlight: 'شيئاً استثنائياً.',
      subtitle: 'شاركنا رؤية علامتك وأهداف مشروعك القادم. نحن شريكك لصنع قفزة نوعية حقيقية تتفوق بها في مجالك.',
      emailLabel: 'البريد الإلكتروني',
      phoneLabel: 'رقم الهاتف',
      phoneValue: '07888909033',
      locationLabel: 'الموقع',
      locationValue: 'Al-Yarmouk, Opposite Al-Naji University',
      responseLabel: 'وقت الاستجابة',
      responseValue: 'رد مضمون خلال 24 ساعة',
      formName: 'الاسم الكامل *',
      formEmail: 'البريد الإلكتروني *',
      formService: 'مجال الخدمة المطلوبة',
      formServicePlaceholder: 'اختر تخصص الخدمة',
      formServiceGraphic: 'التصميم الجرافيكي والهوية البصرية',
      formServicePhoto: 'التصوير التجاري والسينمائي',
      formServiceWeb: 'تطوير المواقع والمنصات الرقمية',
      formDetails: 'تفاصيل المشروع *',
      formDetailsPlaceholder: 'أخبرنا عن الجدول الزمني، الأهداف، ونطاق مشروعك...',
      formSubmit: 'إرسال الرسالة',
      formSending: 'جاري الإرسال...',
      successTitle: 'تم استلام رسالتك',
      successDesc: 'شكراً لتواصلك معنا. سيقوم أحد مسؤولي الفريق بمراجعة استفسارك والتواصل معك خلال 24 ساعة.',
      successAnother: 'إرسال رسالة أخرى',
    },
    footer: {
      tagline: 'أفكار ذات جاذبية',
      rights: '© 2026 وكالة هالو للتسويق (HALO). جميع الحقوق محفوظة.',
      crafted: 'صُنع بشغف وإتقان',
      location: 'IRAQ & Baghdad ✳ Al-Yarmouk, Opposite Al-Naji University',
      backToTop: 'العودة للأعلى',
    },
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: Translations
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar')

  useEffect(() => {
    const saved = localStorage.getItem('halo_lang') as Language | null
    if (saved === 'en' || saved === 'ar') {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('halo_lang', lang)
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    }
  }, [language])

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: translations[language],
        isRTL: language === 'ar',
      }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
