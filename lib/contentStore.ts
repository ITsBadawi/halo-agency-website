import fs from 'fs/promises'
import path from 'path'
import { defaultSiteContent, type SiteContent } from './contentTypes'

export * from './contentTypes'

const dataFilePath = path.join(process.cwd(), 'data', 'site-content.json')

let memoryCache: SiteContent | null = null

export async function getSiteContent(): Promise<SiteContent> {
  if (memoryCache) {
    return memoryCache
  }
  try {
    const raw = await fs.readFile(dataFilePath, 'utf-8')
    const parsed = JSON.parse(raw)
    // Deep merge with default to guarantee no missing fields
    const merged: SiteContent = {
      contact: { ...defaultSiteContent.contact, ...(parsed.contact || {}) },
      sections: {
        hero: { ...defaultSiteContent.sections.hero, ...(parsed.sections?.hero || {}) },
        chapter1: { ...defaultSiteContent.sections.chapter1, ...(parsed.sections?.chapter1 || {}) },
        chapter2: { ...defaultSiteContent.sections.chapter2, ...(parsed.sections?.chapter2 || {}) },
        chapter3: { ...defaultSiteContent.sections.chapter3, ...(parsed.sections?.chapter3 || {}) },
        works: { ...defaultSiteContent.sections.works, ...(parsed.sections?.works || {}) },
        contact: { ...defaultSiteContent.sections.contact, ...(parsed.sections?.contact || {}) },
        footer: { ...defaultSiteContent.sections.footer, ...(parsed.sections?.footer || {}) },
      },
      portfolioWall: {
        row1: Array.isArray(parsed.portfolioWall?.row1) ? parsed.portfolioWall.row1 : defaultSiteContent.portfolioWall.row1,
        row2: Array.isArray(parsed.portfolioWall?.row2) ? parsed.portfolioWall.row2 : defaultSiteContent.portfolioWall.row2,
        row3: Array.isArray(parsed.portfolioWall?.row3) ? parsed.portfolioWall.row3 : defaultSiteContent.portfolioWall.row3,
        row4: Array.isArray(parsed.portfolioWall?.row4) ? parsed.portfolioWall.row4 : defaultSiteContent.portfolioWall.row4,
      },
    }
    memoryCache = merged
    return merged
  } catch {
    memoryCache = defaultSiteContent
    return defaultSiteContent
  }
}

export async function saveSiteContent(content: SiteContent): Promise<void> {
  memoryCache = content
  try {
    const dir = path.dirname(dataFilePath)
    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(dataFilePath, JSON.stringify(content, null, 2), 'utf-8')
  } catch (err) {
    console.warn('Filesystem write not supported or failed (e.g. serverless readonly environment), saved in memory cache:', err)
  }
}
