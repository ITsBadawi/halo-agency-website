'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { defaultSiteContent, type SiteContent } from '@/lib/contentTypes'

interface SiteContentContextType {
  content: SiteContent
  isLoading: boolean
  reloadContent: () => Promise<void>
  updateContent: (newContent: SiteContent) => Promise<{ success: boolean; error?: string }>
  resetToDefaults: () => Promise<{ success: boolean; error?: string }>
}

const SiteContentContext = createContext<SiteContentContextType | undefined>(undefined)

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent)
  const [isLoading, setIsLoading] = useState(true)

  const reloadContent = useCallback(async () => {
    try {
      const res = await fetch('/api/content', { cache: 'no-store' })
      const data = await res.json()
      if (data.success && data.data) {
        setContent(data.data)
      }
    } catch (err) {
      console.error('Failed to load site content from API, using defaults:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    reloadContent()
  }, [reloadContent])

  const updateContent = async (newContent: SiteContent) => {
    try {
      setContent(newContent) // Optimistic update
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContent),
      })
      const result = await res.json()
      if (!result.success) {
        throw new Error(result.error || 'Failed to save')
      }
      return { success: true }
    } catch (error: any) {
      console.error('Error updating content:', error)
      return { success: false, error: error.message || 'Error updating content' }
    }
  }

  const resetToDefaults = async () => {
    try {
      const res = await fetch('/api/content', { method: 'PUT' })
      const result = await res.json()
      if (result.success && result.data) {
        setContent(result.data)
        return { success: true }
      }
      throw new Error(result.error || 'Failed to reset')
    } catch (error: any) {
      console.error('Error resetting content:', error)
      return { success: false, error: error.message || 'Error resetting' }
    }
  }

  return (
    <SiteContentContext.Provider
      value={{
        content,
        isLoading,
        reloadContent,
        updateContent,
        resetToDefaults,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  )
}

export function useSiteContent() {
  const context = useContext(SiteContentContext)
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider')
  }
  return context
}
