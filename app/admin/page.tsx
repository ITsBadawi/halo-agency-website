'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ExternalLink,
  Save,
  RotateCcw,
  Upload,
  Plus,
  Trash2,
  MoveLeft,
  MoveRight,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  Sparkles,
  LayoutGrid,
  FileText,
  Download,
  UploadCloud,
  Globe,
  Image as ImageIcon,
} from 'lucide-react'
import { defaultSiteContent, type SiteContent } from '@/lib/contentTypes'

type TabType = 'works' | 'contact' | 'sections' | 'backup'
type RowKey = 'row1' | 'row2' | 'row3' | 'row4'
type SectionKey = 'hero' | 'chapter1' | 'chapter2' | 'chapter3' | 'works' | 'contact' | 'footer'

export default function AdminPage() {
  // Content State
  const [content, setContent] = useState<SiteContent>(defaultSiteContent)
  const [originalContent, setOriginalContent] = useState<SiteContent>(defaultSiteContent)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  // Active Navigation & Sub-navigation
  const [activeTab, setActiveTab] = useState<TabType>('works')
  const [activeRow, setActiveRow] = useState<RowKey>('row1')
  const [activeSection, setActiveSection] = useState<SectionKey>('hero')
  const [activeLangTab, setActiveLangTab] = useState<'ar' | 'en'>('ar')

  // Image Upload & URL input
  const [imageUrlInput, setImageUrlInput] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Toast auto-clear
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000)
      return () => clearTimeout(timer)
    }
  }, [toast])

  // Fetch initial content
  useEffect(() => {
    const loadContent = async () => {
      try {
        const res = await fetch('/api/content', { cache: 'no-store' })
        const json = await res.json()
        if (json.success && json.data) {
          setContent(json.data)
          setOriginalContent(json.data)
        }
      } catch (err) {
        console.error('Failed to load content from API, using default content:', err)
      } finally {
        setIsLoading(false)
      }
    }
    loadContent()
  }, [])

  // Check dirty state
  useEffect(() => {
    const isDirty = JSON.stringify(content) !== JSON.stringify(originalContent)
    setHasChanges(isDirty)
  }, [content, originalContent])

  // Save changes
  const handleSaveAll = async () => {
    setIsSaving(true)
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(content),
      })
      const data = await res.json()
      if (data.success) {
        setOriginalContent(content)
        setHasChanges(false)
        setToast({ message: 'تم حفظ كافة التعديلات بنجاح وتم تحديث الموقع مباشرة! ✨', type: 'success' })
      } else {
        setToast({ message: data.error || 'حدث خطأ أثناء الحفظ', type: 'error' })
      }
    } catch {
      setToast({ message: 'حدث خطأ في الاتصال بالخادم', type: 'error' })
    } finally {
      setIsSaving(false)
    }
  }

  // Reset to original changes
  const handleDiscardChanges = () => {
    if (confirm('هل أنت متأكد من رغبتك في إلغاء التعديلات غير المحفوظة؟')) {
      setContent(originalContent)
      setToast({ message: 'تم التراجع عن التعديلات غير المحفوظة', type: 'success' })
    }
  }

  // Reset to default factory content
  const handleFactoryReset = async () => {
    if (confirm('تحذير: هل أنت متأكد من رغبتك في استعادة الإعدادات والنصوص الأصلية الافتراضية بالكامل؟')) {
      try {
        const res = await fetch('/api/content', { method: 'PUT' })
        const data = await res.json()
        if (data.success && data.data) {
          setContent(data.data)
          setOriginalContent(data.data)
          setToast({ message: 'تمت استعادة الإعدادات الأصلية بنجاح!', type: 'success' })
        }
      } catch {
        setToast({ message: 'فشلت استعادة الإعدادات', type: 'error' })
      }
    }
  }

  // Upload image handler
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const result = await res.json()
      if (result.success && result.url) {
        const updatedRow = [...(content.portfolioWall[activeRow] || []), result.url]
        setContent({
          ...content,
          portfolioWall: {
            ...content.portfolioWall,
            [activeRow]: updatedRow,
          },
        })
        setToast({ message: 'تم رفع الصورة وإضافتها بنجاح!', type: 'success' })
      } else {
        setToast({ message: result.error || 'فشل رفع الصورة', type: 'error' })
      }
    } catch {
      setToast({ message: 'حدث خطأ أثناء رفع الصورة', type: 'error' })
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  // Add image by URL
  const handleAddImageUrl = () => {
    if (!imageUrlInput.trim()) return
    const updatedRow = [...(content.portfolioWall[activeRow] || []), imageUrlInput.trim()]
    setContent({
      ...content,
      portfolioWall: {
        ...content.portfolioWall,
        [activeRow]: updatedRow,
      },
    })
    setImageUrlInput('')
    setToast({ message: 'تمت إضافة رابط الصورة بنجاح!', type: 'success' })
  }

  // Delete image from current row
  const handleDeleteImage = (index: number) => {
    const updatedRow = content.portfolioWall[activeRow].filter((_, idx) => idx !== index)
    setContent({
      ...content,
      portfolioWall: {
        ...content.portfolioWall,
        [activeRow]: updatedRow,
      },
    })
    setToast({ message: 'تم حذف الصورة من الصف', type: 'success' })
  }

  // Move image left/right
  const handleMoveImage = (index: number, direction: 'left' | 'right') => {
    const list = [...content.portfolioWall[activeRow]]
    const targetIdx = direction === 'left' ? index - 1 : index + 1
    if (targetIdx < 0 || targetIdx >= list.length) return
    const temp = list[index]
    list[index] = list[targetIdx]
    list[targetIdx] = temp

    setContent({
      ...content,
      portfolioWall: {
        ...content.portfolioWall,
        [activeRow]: list,
      },
    })
  }

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2))
    const dlAnchor = document.createElement('a')
    dlAnchor.setAttribute('href', dataStr)
    dlAnchor.setAttribute('download', `halo-site-content-backup-${new Date().toISOString().slice(0, 10)}.json`)
    dlAnchor.click()
  }

  // Import JSON
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string)
        if (parsed.sections && parsed.contact && parsed.portfolioWall) {
          setContent(parsed)
          setToast({ message: 'تم استيراد ملف النسخة الاحتياطية بنجاح! اضغط حفظ لاعتماده.', type: 'success' })
        } else {
          setToast({ message: 'صيغة الملف غير متوافقة', type: 'error' })
        }
      } catch {
        setToast({ message: 'الملف ليس بتنسيق JSON صحيح', type: 'error' })
      }
    }
    reader.readAsText(file)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center text-white gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
        <span className="text-xs font-mono text-neutral-400">جاري تحميل لوحة التحكم...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f4f6] font-sans selection:bg-purple-500 selection:text-white" dir="rtl">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl border shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-md ${
            toast.type === 'success'
              ? 'bg-[#121118]/95 border-purple-500/40 text-purple-300 shadow-purple-950/40'
              : 'bg-[#181112]/95 border-red-500/40 text-red-300 shadow-red-950/40'
          } backdrop-blur-xl`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          )}
          <span className="text-xs sm:text-sm font-medium leading-relaxed">{toast.message}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#09090b]/90 backdrop-blur-xl border-b border-white/10 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image src="/logo.png" alt="Halo Logo" fill className="object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white font-sans">
                  HALO<span className="text-purple-400">.</span>
                </span>
                <span className="text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  لوحة التحكم
                </span>
              </div>
              <p className="text-[11px] text-neutral-400 hidden sm:block">
                تحكم فوري وديناميكي بمحتوى الموقع
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* View Live Site */}
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer"
            >
              <span>معاينة الموقع الحي</span>
              <ExternalLink className="w-3.5 h-3.5 text-purple-400" />
            </Link>

            {/* Save Button */}
            <button
              onClick={handleSaveAll}
              disabled={isSaving || !hasChanges}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 shadow-lg cursor-pointer ${
                hasChanges
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/30 animate-pulse'
                  : 'bg-white/10 text-neutral-400 hover:bg-white/15'
              } disabled:opacity-60 disabled:cursor-not-allowed`}
            >
              {isSaving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>جاري الحفظ...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>{hasChanges ? 'حفظ التعديلات *' : 'تم الحفظ'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto select-none no-scrollbar">
          <button
            onClick={() => setActiveTab('works')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === 'works'
                ? 'bg-purple-600/20 border border-purple-500/50 text-white shadow-lg shadow-purple-950/50'
                : 'bg-white/[0.03] border border-white/5 text-neutral-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <LayoutGrid className="w-4 h-4 text-purple-400" />
            <span>جدار الأعمال (Wall of Works)</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === 'contact'
                ? 'bg-purple-600/20 border border-purple-500/50 text-white shadow-lg shadow-purple-950/50'
                : 'bg-white/[0.03] border border-white/5 text-neutral-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Phone className="w-4 h-4 text-purple-400" />
            <span>معلومات التواصل (Contact Info)</span>
          </button>

          <button
            onClick={() => setActiveTab('sections')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === 'sections'
                ? 'bg-purple-600/20 border border-purple-500/50 text-white shadow-lg shadow-purple-950/50'
                : 'bg-white/[0.03] border border-white/5 text-neutral-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span>عناوين ونصوص الأقسام (Sections)</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
              activeTab === 'backup'
                ? 'bg-purple-600/20 border border-purple-500/50 text-white shadow-lg shadow-purple-950/50'
                : 'bg-white/[0.03] border border-white/5 text-neutral-400 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            <Download className="w-4 h-4 text-purple-400" />
            <span>النسخ الاحتياطي (Backup & Restore)</span>
          </button>
        </div>

        {/* Tab 1: Wall of Works Images */}
        {activeTab === 'works' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Top row selector & Add Image section */}
            <div className="rounded-3xl border border-white/10 bg-[#121118]/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-purple-400" />
                    <span>إدارة صور جدار الأعمال التفاعلي</span>
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    جدار الأعمال يتكون من 4 صفوف تتحرك بشكل مستمر. يمكنك إضافة أو حذف الصور وإعادة ترتيبها لكل صف.
                  </p>
                </div>

                {/* Row Selector Pills */}
                <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10">
                  {(['row1', 'row2', 'row3', 'row4'] as RowKey[]).map((r, i) => (
                    <button
                      key={r}
                      onClick={() => setActiveRow(r)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                        activeRow === r
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-900/50 font-semibold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      الصف 0{i + 1} ({content.portfolioWall[r]?.length || 0})
                    </button>
                  ))}
                </div>
              </div>

              {/* Add New Image Controls */}
              <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Method 1: Upload from Device */}
                <div className="lg:col-span-6 p-5 rounded-2xl border border-dashed border-white/20 bg-white/[0.02] hover:bg-white/[0.04] transition-all flex flex-col items-center justify-center text-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1">رفع صورة مباشرة من جهازك</h3>
                  <p className="text-xs text-neutral-400 max-w-xs mb-4">
                    سيتم حفظ الصورة محلياً في الموقع وإضافتها للصف {activeRow.replace('row', '0')} مباشرة.
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer disabled:opacity-50 flex items-center gap-2"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>جاري الرفع...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>اختيار صورة من الجهاز</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Method 2: Add by URL */}
                <div className="lg:col-span-6 p-5 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <ExternalLink className="w-4 h-4 text-purple-400" />
                      <h3 className="text-sm font-semibold text-white">إضافة صورة عبر رابط خارجي (URL)</h3>
                    </div>
                    <p className="text-xs text-neutral-400 mb-4">
                      يمكنك لصق رابط صورة مباشرة من Unsplash أو أي خدمة استضافة صور سحابية.
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-500 text-xs font-mono focus:outline-none focus:border-purple-500"
                    />
                    <button
                      onClick={handleAddImageUrl}
                      disabled={!imageUrlInput.trim()}
                      className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-purple-600 hover:text-white text-neutral-200 text-xs font-mono uppercase font-semibold transition-all cursor-pointer disabled:opacity-40"
                    >
                      إضافة
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Row Images Grid */}
            <div className="rounded-3xl border border-white/10 bg-[#121118]/80 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>صور {activeRow.replace('row', 'الصف ')}</span>
                  <span className="text-xs font-mono text-purple-400 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20">
                    {content.portfolioWall[activeRow]?.length || 0} صورة
                  </span>
                </h3>
                <span className="text-xs text-neutral-400">
                  يمكنك تغيير الترتيب بواسطة أزرار الأسهم، أو حذف أي صورة.
                </span>
              </div>

              {content.portfolioWall[activeRow]?.length === 0 ? (
                <div className="py-12 text-center text-neutral-500 text-xs">
                  لا توجد صور في هذا الصف حالياً. قم برفع صورة أو إضافة رابط.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {content.portfolioWall[activeRow]?.map((src, index) => (
                    <div
                      key={`img-${index}-${src.slice(-10)}`}
                      className="group relative rounded-2xl overflow-hidden border border-white/10 bg-neutral-900 aspect-[16/10] flex flex-col justify-between"
                    >
                      <Image
                        src={src}
                        alt={`Project ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-2">
                        {/* Top bar in card */}
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold bg-black/60 px-2 py-0.5 rounded-md text-white border border-white/20">
                            #{index + 1}
                          </span>
                          <button
                            onClick={() => handleDeleteImage(index)}
                            className="w-6 h-6 rounded-md bg-red-600/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                            title="حذف الصورة"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Bottom reorder buttons */}
                        <div className="flex items-center justify-center gap-1.5" dir="ltr">
                          <button
                            onClick={() => handleMoveImage(index, 'left')}
                            disabled={index === 0}
                            className="p-1 rounded bg-black/60 hover:bg-purple-600 text-white disabled:opacity-30 cursor-pointer"
                            title="تحريك يساراً"
                          >
                            <MoveLeft className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleMoveImage(index, 'right')}
                            disabled={index === (content.portfolioWall[activeRow]?.length || 0) - 1}
                            className="p-1 rounded bg-black/60 hover:bg-purple-600 text-white disabled:opacity-30 cursor-pointer"
                            title="تحريك يميناً"
                          >
                            <MoveRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mini Marquee Preview */}
            <div className="rounded-3xl border border-white/10 bg-[#121118]/80 backdrop-blur-xl p-6 shadow-2xl overflow-hidden">
              <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>معاينة حية لحركة الصف {activeRow.replace('row', '0')}</span>
              </h4>
              <div className="overflow-hidden w-full select-none" dir="ltr">
                <div className="flex items-center gap-4 w-max animate-marquee-slow">
                  {(content.portfolioWall[activeRow] || []).concat(content.portfolioWall[activeRow] || []).map((s, i) => (
                    <div
                      key={`preview-${i}`}
                      className="relative w-[180px] h-[95px] rounded-xl overflow-hidden border border-white/10 bg-neutral-900 flex-shrink-0"
                    >
                      <Image src={s} alt="Preview" fill className="object-cover" unoptimized />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Contact Information */}
        {activeTab === 'contact' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="rounded-3xl border border-white/10 bg-[#121118]/80 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
              <div className="pb-6 border-b border-white/10 mb-8">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Phone className="w-5 h-5 text-purple-400" />
                  <span>تعديل بيانات ومعلومات التواصل الرسمية</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1">
                  تنعكس هذه التعديلات فوراً على أزرار الاتصال ومربعات العناوين في قسم التواصل وتذييل الموقع.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-400 mb-2 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-purple-400" />
                    <span>رقم الهاتف المباشر (Phone)</span>
                  </label>
                  <input
                    type="text"
                    value={content.contact.phone}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, phone: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-purple-500"
                    placeholder="07888909033"
                    dir="ltr"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1.5">
                    يتم استخدامه في روابط الاتصال السريع <span className="font-mono text-purple-400">tel:</span>
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-400 mb-2 flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-purple-400" />
                    <span>البريد الإلكتروني الرسمي (Email)</span>
                  </label>
                  <input
                    type="email"
                    value={content.contact.email}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, email: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-purple-500"
                    placeholder="agency@example.com"
                    dir="ltr"
                  />
                  <p className="text-[11px] text-neutral-500 mt-1.5">
                    يتم استخدامه في روابط المراسلة المباشرة <span className="font-mono text-purple-400">mailto:</span>
                  </p>
                </div>

                {/* Location Arabic */}
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-400 mb-2 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-purple-400" />
                    <span>العنوان الفعلي (باللغة العربية)</span>
                  </label>
                  <input
                    type="text"
                    value={content.contact.locationAr}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, locationAr: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                    placeholder="اليرموك، مقابل جامعة النجاة..."
                  />
                </div>

                {/* Location English */}
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-400 mb-2 flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-purple-400" />
                    <span>العنوان الفعلي (English)</span>
                  </label>
                  <input
                    type="text"
                    value={content.contact.locationEn}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, locationEn: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 font-sans"
                    placeholder="Al-Yarmouk, Opposite Al-Naji University"
                    dir="ltr"
                  />
                </div>

                {/* Response Window Arabic */}
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-400 mb-2 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    <span>زمن الاستجابة والرد (بالعربية)</span>
                  </label>
                  <input
                    type="text"
                    value={content.contact.responseWindowAr}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, responseWindowAr: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                    placeholder="رد مضمون خلال 24 ساعة"
                  />
                </div>

                {/* Response Window English */}
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-400 mb-2 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-purple-400" />
                    <span>زمن الاستجابة والرد (English)</span>
                  </label>
                  <input
                    type="text"
                    value={content.contact.responseWindowEn}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, responseWindowEn: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 font-sans"
                    placeholder="Guaranteed response within 24 hours"
                    dir="ltr"
                  />
                </div>

                {/* WhatsApp */}
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-400 mb-2">
                    رقم الواتساب المباشر (WhatsApp)
                  </label>
                  <input
                    type="text"
                    value={content.contact.whatsapp || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, whatsapp: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-purple-500"
                    placeholder="+9647888909033"
                    dir="ltr"
                  />
                </div>

                {/* Instagram */}
                <div>
                  <label className="block text-[11px] font-mono tracking-wider uppercase text-neutral-400 mb-2">
                    رابط الإنستغرام (Instagram URL)
                  </label>
                  <input
                    type="url"
                    value={content.contact.instagram || ''}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        contact: { ...content.contact, instagram: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-purple-500"
                    placeholder="https://instagram.com/haloagency"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Sections & Subtitles */}
        {activeTab === 'sections' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="rounded-3xl border border-white/10 bg-[#121118]/80 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10 mb-8">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-400" />
                    <span>تعديل اسم القسم والنص الذي تحته</span>
                  </h2>
                  <p className="text-xs text-neutral-400 mt-1">
                    اختر القسم من القائمة بالأسفل، ثم قم بتعديل العناوين والنصوص لكلا اللغتين.
                  </p>
                </div>

                {/* Language Switch for preview/edit */}
                <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-2xl border border-white/10">
                  <button
                    onClick={() => setActiveLangTab('ar')}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeLangTab === 'ar'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    العربية (AR)
                  </button>
                  <button
                    onClick={() => setActiveLangTab('en')}
                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      activeLangTab === 'en'
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    English (EN)
                  </button>
                </div>
              </div>

              {/* Section Selector Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-8">
                {[
                  { key: 'hero', label: 'الهيرو (Hero)' },
                  { key: 'chapter1', label: '01 جرافيك' },
                  { key: 'chapter2', label: '02 تصوير' },
                  { key: 'chapter3', label: '03 ويب' },
                  { key: 'works', label: 'الأعمال' },
                  { key: 'contact', label: 'التواصل' },
                  { key: 'footer', label: 'التذييل' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setActiveSection(key as SectionKey)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer text-center ${
                      activeSection === key
                        ? 'bg-purple-600 text-white font-semibold shadow-lg shadow-purple-900/40'
                        : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {/* Dynamic Section Form */}
              <div className="bg-black/30 rounded-2xl p-6 sm:p-8 border border-white/5 space-y-6">
                {/* 1. Hero */}
                {activeSection === 'hero' && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-purple-300 font-mono uppercase tracking-wider mb-4">
                      قسم البداية / Cinematic Main Hero
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                          الشارة العلوية (Badge) {activeLangTab === 'ar' ? 'بالعربية' : 'English'}
                        </label>
                        <input
                          type="text"
                          value={activeLangTab === 'ar' ? content.sections.hero.badgeAr : content.sections.hero.badgeEn}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: {
                                ...content.sections,
                                hero: {
                                  ...content.sections.hero,
                                  [activeLangTab === 'ar' ? 'badgeAr' : 'badgeEn']: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                          العنوان الأساسي (Title)
                        </label>
                        <input
                          type="text"
                          value={activeLangTab === 'ar' ? content.sections.hero.titleAr : content.sections.hero.titleEn}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: {
                                ...content.sections,
                                hero: {
                                  ...content.sections.hero,
                                  [activeLangTab === 'ar' ? 'titleAr' : 'titleEn']: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                          الكلمة المميزة اللامعة (Highlight Word)
                        </label>
                        <input
                          type="text"
                          value={activeLangTab === 'ar' ? content.sections.hero.highlightAr : content.sections.hero.highlightEn}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: {
                                ...content.sections,
                                hero: {
                                  ...content.sections.hero,
                                  [activeLangTab === 'ar' ? 'highlightAr' : 'highlightEn']: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-purple-300 text-sm font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                          نص زر الاستكشاف (CTA Button Text)
                        </label>
                        <input
                          type="text"
                          value={activeLangTab === 'ar' ? content.sections.hero.exploreAr : content.sections.hero.exploreEn}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: {
                                ...content.sections,
                                hero: {
                                  ...content.sections.hero,
                                  [activeLangTab === 'ar' ? 'exploreAr' : 'exploreEn']: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                        الوصف والنص الذي تحت العنوان (Subtitle)
                      </label>
                      <textarea
                        rows={3}
                        value={activeLangTab === 'ar' ? content.sections.hero.subtitleAr : content.sections.hero.subtitleEn}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            sections: {
                              ...content.sections,
                              hero: {
                                ...content.sections.hero,
                                [activeLangTab === 'ar' ? 'subtitleAr' : 'subtitleEn']: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {/* 2. Service Chapters (chapter1, chapter2, chapter3) */}
                {(activeSection === 'chapter1' || activeSection === 'chapter2' || activeSection === 'chapter3') && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-purple-300 font-mono uppercase tracking-wider mb-4">
                      {activeSection === 'chapter1' && 'الفصل 01: التصميم الجرافيكي والهوية'}
                      {activeSection === 'chapter2' && 'الفصل 02: التصوير الفوتوغرافي والسينمائي'}
                      {activeSection === 'chapter3' && 'الفصل 03: تطوير الويب والهندسة الرقمية'}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                          اسم التصنيف / Category Badge
                        </label>
                        <input
                          type="text"
                          value={activeLangTab === 'ar' ? content.sections[activeSection].categoryAr : content.sections[activeSection].categoryEn}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: {
                                ...content.sections,
                                [activeSection]: {
                                  ...content.sections[activeSection],
                                  [activeLangTab === 'ar' ? 'categoryAr' : 'categoryEn']: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                          العنوان الرئيسي / Title
                        </label>
                        <input
                          type="text"
                          value={activeLangTab === 'ar' ? content.sections[activeSection].titleAr : content.sections[activeSection].titleEn}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: {
                                ...content.sections,
                                [activeSection]: {
                                  ...content.sections[activeSection],
                                  [activeLangTab === 'ar' ? 'titleAr' : 'titleEn']: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                          الكلمة المميزة اللامعة / Highlight
                        </label>
                        <input
                          type="text"
                          value={activeLangTab === 'ar' ? content.sections[activeSection].highlightAr : content.sections[activeSection].highlightEn}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: {
                                ...content.sections,
                                [activeSection]: {
                                  ...content.sections[activeSection],
                                  [activeLangTab === 'ar' ? 'highlightAr' : 'highlightEn']: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-purple-300 text-sm font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                        النص الوصفي والعبارة التي تحته / Phrase
                      </label>
                      <textarea
                        rows={3}
                        value={activeLangTab === 'ar' ? content.sections[activeSection].phraseAr : content.sections[activeSection].phraseEn}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            sections: {
                              ...content.sections,
                              [activeSection]: {
                                ...content.sections[activeSection],
                                [activeLangTab === 'ar' ? 'phraseAr' : 'phraseEn']: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {/* 3. Works Section Heading */}
                {activeSection === 'works' && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-purple-300 font-mono uppercase tracking-wider mb-4">
                      عناوين قسم معرض الأعمال / Selected Works
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                          الشارة / Badge
                        </label>
                        <input
                          type="text"
                          value={activeLangTab === 'ar' ? content.sections.works.badgeAr : content.sections.works.badgeEn}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: {
                                ...content.sections,
                                works: {
                                  ...content.sections.works,
                                  [activeLangTab === 'ar' ? 'badgeAr' : 'badgeEn']: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                          العنوان / Title
                        </label>
                        <input
                          type="text"
                          value={activeLangTab === 'ar' ? content.sections.works.titleAr : content.sections.works.titleEn}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: {
                                ...content.sections,
                                works: {
                                  ...content.sections.works,
                                  [activeLangTab === 'ar' ? 'titleAr' : 'titleEn']: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                          الكلمة المميزة / Highlight
                        </label>
                        <input
                          type="text"
                          value={activeLangTab === 'ar' ? content.sections.works.highlightAr : content.sections.works.highlightEn}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: {
                                ...content.sections,
                                works: {
                                  ...content.sections.works,
                                  [activeLangTab === 'ar' ? 'highlightAr' : 'highlightEn']: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-purple-300 text-sm font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                        الوصف / Subtitle
                      </label>
                      <textarea
                        rows={3}
                        value={activeLangTab === 'ar' ? content.sections.works.subtitleAr : content.sections.works.subtitleEn}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            sections: {
                              ...content.sections,
                              works: {
                                ...content.sections.works,
                                [activeLangTab === 'ar' ? 'subtitleAr' : 'subtitleEn']: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {/* 4. Contact Section Heading */}
                {activeSection === 'contact' && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-purple-300 font-mono uppercase tracking-wider mb-4">
                      عناوين قسم التواصل / Contact Section
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                          الشارة / Badge
                        </label>
                        <input
                          type="text"
                          value={activeLangTab === 'ar' ? content.sections.contact.badgeAr : content.sections.contact.badgeEn}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: {
                                ...content.sections,
                                contact: {
                                  ...content.sections.contact,
                                  [activeLangTab === 'ar' ? 'badgeAr' : 'badgeEn']: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                          العنوان / Title
                        </label>
                        <input
                          type="text"
                          value={activeLangTab === 'ar' ? content.sections.contact.titleAr : content.sections.contact.titleEn}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: {
                                ...content.sections,
                                contact: {
                                  ...content.sections.contact,
                                  [activeLangTab === 'ar' ? 'titleAr' : 'titleEn']: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                          الكلمة المميزة / Highlight
                        </label>
                        <input
                          type="text"
                          value={activeLangTab === 'ar' ? content.sections.contact.highlightAr : content.sections.contact.highlightEn}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: {
                                ...content.sections,
                                contact: {
                                  ...content.sections.contact,
                                  [activeLangTab === 'ar' ? 'highlightAr' : 'highlightEn']: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-purple-300 text-sm font-semibold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                        الوصف الذي تحت العنوان / Subtitle
                      </label>
                      <textarea
                        rows={3}
                        value={activeLangTab === 'ar' ? content.sections.contact.subtitleAr : content.sections.contact.subtitleEn}
                        onChange={(e) =>
                          setContent({
                            ...content,
                            sections: {
                              ...content.sections,
                              contact: {
                                ...content.sections.contact,
                                [activeLangTab === 'ar' ? 'subtitleAr' : 'subtitleEn']: e.target.value,
                              },
                            },
                          })
                        }
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm leading-relaxed"
                      />
                    </div>
                  </div>
                )}

                {/* 5. Footer */}
                {activeSection === 'footer' && (
                  <div className="space-y-6">
                    <h3 className="text-sm font-semibold text-purple-300 font-mono uppercase tracking-wider mb-4">
                      نصوص تذييل الصفحة / Footer
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                          شعار الوكالة الجانبي / Tagline
                        </label>
                        <input
                          type="text"
                          value={activeLangTab === 'ar' ? content.sections.footer.taglineAr : content.sections.footer.taglineEn}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: {
                                ...content.sections,
                                footer: {
                                  ...content.sections.footer,
                                  [activeLangTab === 'ar' ? 'taglineAr' : 'taglineEn']: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                          حقوق النشر / Copyright Notice
                        </label>
                        <input
                          type="text"
                          value={activeLangTab === 'ar' ? content.sections.footer.rightsAr : content.sections.footer.rightsEn}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: {
                                ...content.sections,
                                footer: {
                                  ...content.sections.footer,
                                  [activeLangTab === 'ar' ? 'rightsAr' : 'rightsEn']: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                          نص الصنع / Crafted with
                        </label>
                        <input
                          type="text"
                          value={activeLangTab === 'ar' ? content.sections.footer.craftedAr : content.sections.footer.craftedEn}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: {
                                ...content.sections,
                                footer: {
                                  ...content.sections.footer,
                                  [activeLangTab === 'ar' ? 'craftedAr' : 'craftedEn']: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase text-neutral-400 mb-1.5">
                          الموقع الجغرافي بالتذييل / Location
                        </label>
                        <input
                          type="text"
                          value={activeLangTab === 'ar' ? content.sections.footer.locationAr : content.sections.footer.locationEn}
                          onChange={(e) =>
                            setContent({
                              ...content,
                              sections: {
                                ...content.sections,
                                footer: {
                                  ...content.sections.footer,
                                  [activeLangTab === 'ar' ? 'locationAr' : 'locationEn']: e.target.value,
                                },
                              },
                            })
                          }
                          className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-sm"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Backup & Restore */}
        {activeTab === 'backup' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="rounded-3xl border border-white/10 bg-[#121118]/80 backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                <Download className="w-5 h-5 text-purple-400" />
                <span>النسخ الاحتياطي واسترجاع البيانات</span>
              </h2>
              <p className="text-xs text-neutral-400 mb-6">
                تنزيل نسخة احتياطية من كافة نصوص وصور وإعدادات الموقع كملف JSON، أو استيرادها في أي وقت.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={handleExportJSON}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-purple-400" />
                  <span>تصدير نسخة احتياطية (Export JSON)</span>
                </button>

                <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] text-white text-xs font-mono uppercase tracking-wider transition-all cursor-pointer">
                  <UploadCloud className="w-4 h-4 text-purple-400" />
                  <span>استيراد نسخة احتياطية (Import JSON)</span>
                  <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
                </label>

                <button
                  onClick={handleFactoryReset}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ml-auto"
                >
                  <RotateCcw className="w-4 h-4 text-red-400" />
                  <span>إعادة ضبط المصنع (Factory Reset)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Floating Save Action Bar when changes detected */}
      {hasChanges && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-6 py-3.5 rounded-full border border-purple-500/50 bg-[#121118]/95 backdrop-blur-2xl shadow-2xl shadow-purple-950/60 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-6">
          <div className="flex items-center gap-2 text-xs text-neutral-300">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
            <span className="font-medium">لديك تعديلات غير محفوظة!</span>
          </div>

          <button
            onClick={handleDiscardChanges}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            تراجع
          </button>

          <button
            onClick={handleSaveAll}
            disabled={isSaving}
            className="px-5 py-1.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs font-semibold uppercase tracking-wider shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>جاري الحفظ...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>حفظ التعديلات الآن</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
