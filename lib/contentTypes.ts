export interface ContactContent {
  phone: string
  email: string
  locationEn: string
  locationAr: string
  responseWindowEn: string
  responseWindowAr: string
  whatsapp?: string
  instagram?: string
}

export interface HeroSectionContent {
  badgeEn: string
  badgeAr: string
  titleEn: string
  titleAr: string
  highlightEn: string
  highlightAr: string
  subtitleEn: string
  subtitleAr: string
  exploreEn: string
  exploreAr: string
}

export interface ChapterContent {
  categoryEn: string
  categoryAr: string
  titleEn: string
  titleAr: string
  highlightEn: string
  highlightAr: string
  phraseEn: string
  phraseAr: string
}

export interface WorksSectionContent {
  badgeEn: string
  badgeAr: string
  titleEn: string
  titleAr: string
  highlightEn: string
  highlightAr: string
  subtitleEn: string
  subtitleAr: string
}

export interface ContactSectionContent {
  badgeEn: string
  badgeAr: string
  titleEn: string
  titleAr: string
  highlightEn: string
  highlightAr: string
  subtitleEn: string
  subtitleAr: string
}

export interface FooterContent {
  taglineEn: string
  taglineAr: string
  rightsEn: string
  rightsAr: string
  craftedEn: string
  craftedAr: string
  locationEn: string
  locationAr: string
}

export interface PortfolioWallContent {
  row1: string[]
  row2: string[]
  row3: string[]
  row4: string[]
}

export interface SiteContent {
  contact: ContactContent
  sections: {
    hero: HeroSectionContent
    chapter1: ChapterContent
    chapter2: ChapterContent
    chapter3: ChapterContent
    works: WorksSectionContent
    contact: ContactSectionContent
    footer: FooterContent
  }
  portfolioWall: PortfolioWallContent
  admin?: {
    password?: string
  }
}

export const defaultSiteContent: SiteContent = {
  contact: {
    phone: "07888909033",
    email: "ah.mu001@gmail.com",
    locationEn: "Al-Yarmouk, Opposite Al-Naji University",
    locationAr: "اليرموك، مقابل جامعة النجاة",
    responseWindowEn: "Guaranteed response within 24 hours",
    responseWindowAr: "رد مضمون خلال 24 ساعة",
    whatsapp: "+9647888909033",
    instagram: "https://instagram.com"
  },
  sections: {
    hero: {
      badgeEn: "HALO MARKETING AGENCY ✳ IRAQ & BAGHDAD",
      badgeAr: "وكالة هالو للتسويق ✳ IRAQ & BAGHDAD",
      titleEn: "Ideas with",
      titleAr: "أفكار ذات",
      highlightEn: "gravity.",
      highlightAr: "جاذبية.",
      subtitleEn: "An independent creative studio shaping visual identities, cinematic imagery, and digital worlds.",
      subtitleAr: "وكالة إبداعية مستقلة تصنع الهويات البصرية، الإنتاج السينمائي، والتجارب الرقمية الفريدة للعلامات الطموحة.",
      exploreEn: "Explore Chapters",
      exploreAr: "استكشف الفصول"
    },
    chapter1: {
      categoryEn: "Brand & Systems",
      categoryAr: "العلامات التجارية والأنظمة",
      titleEn: "Graphic",
      titleAr: "التصميم",
      highlightEn: "Design.",
      highlightAr: "الجرافيكي.",
      phraseEn: "Defining visual languages, art direction, and packaging systems that make brands unforgettable.",
      phraseAr: "صياغة لغات بصرية راقية، إدارة فنية استثنائية، وأنظمة هوية متكاملة تجعل علامتك التجارية راسخة ولا تُنسى."
    },
    chapter2: {
      categoryEn: "Editorial & Cinematography",
      categoryAr: "التحرير والسينماتوغرافيا",
      titleEn: "Editorial",
      titleAr: "التصوير",
      highlightEn: "Photography.",
      highlightAr: "الفوتوغرافي.",
      phraseEn: "A disciplined eye for lighting, composition, and texture that breathes authentic depth into brand campaigns.",
      phraseAr: "عين احترافية منضبطة للإضاءة والتكوين والملمس، تبث عمقاً أصيلاً وفخامة متناهية في الحملات الدعائية."
    },
    chapter3: {
      categoryEn: "Digital Engineering",
      categoryAr: "الهندسة الرقمية",
      titleEn: "Web",
      titleAr: "تطوير",
      highlightEn: "Development.",
      highlightAr: "الويب.",
      phraseEn: "Engineering high-performance web products, interactive 3D platforms, and fluid motion interfaces.",
      phraseAr: "هندسة منصات رقمية فائقة الأداء والسرعة، تجارب تفاعلية ثلاثية الأبعاد، وواجهات حركة انسيابية مبتكرة."
    },
    works: {
      badgeEn: "Selected Work",
      badgeAr: "أعمال مختارة",
      titleEn: "A continuous",
      titleAr: "معرض متواصل",
      highlightEn: "wall of work.",
      highlightAr: "من الأعمال.",
      subtitleEn: "A visual journey through identities, architectural forms, and digital artifacts crafted with precision.",
      subtitleAr: "رحلة بصرية تأخذك عبر الهويات الإبداعية، التصاميم المعمارية، والمشاريع الرقمية المصنوعة بدقة متناهية."
    },
    contact: {
      badgeEn: "Get in Touch",
      badgeAr: "تواصل معنا",
      titleEn: "Let's build",
      titleAr: "لنصنع معاً",
      highlightEn: "something great.",
      highlightAr: "شيئاً استثنائياً.",
      subtitleEn: "Tell us about your brand vision, project objectives, or what isn't working yet. We partner with teams ready to make a significant leap.",
      subtitleAr: "شاركنا رؤية علامتك وأهداف مشروعك القادم. نحن شريكك لصنع قفزة نوعية حقيقية تتفوق بها في مجالك."
    },
    footer: {
      taglineEn: "Ideas with gravity",
      taglineAr: "أفكار ذات جاذبية",
      rightsEn: "© 2026 HALO Marketing Agency. All rights reserved.",
      rightsAr: "© 2026 وكالة هالو للتسويق (HALO). جميع الحقوق محفوظة.",
      craftedEn: "Crafted with intention",
      craftedAr: "صُنع بشغف وإتقان",
      locationEn: "IRAQ & Baghdad ✳ Al-Yarmouk, Opposite Al-Naji University",
      locationAr: "العراق، بغداد ✳ اليرموك، مقابل جامعة النجاة"
    }
  },
  portfolioWall: {
    row1: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85"
    ],
    row2: [
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85"
    ],
    row3: [
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=85"
    ],
    "row4": [
      "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?auto=format&fit=crop&w=1000&q=85"
    ]
  },
  admin: {
    password: "halo2026"
  }
}
