import { NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 })
    }

    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml', 'image/avif']
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file format. Please upload an image (JPG, PNG, WebP, SVG, GIF).' },
        { status: 400 }
      )
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File size exceeds maximum limit of 10MB' },
        { status: 400 }
      )
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(uploadsDir, { recursive: true })

    // Generate safe unique filename
    const ext = path.extname(file.name) || '.jpg'
    const cleanBase = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 30)
    const uniqueName = `${Date.now()}-${cleanBase}${ext}`
    const targetPath = path.join(uploadsDir, uniqueName)

    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(targetPath, buffer)

    const publicUrl = `/uploads/${uniqueName}`
    return NextResponse.json({ success: true, url: publicUrl })
  } catch (error) {
    console.error('Error handling upload:', error)
    return NextResponse.json({ success: false, error: 'Failed to upload image' }, { status: 500 })
  }
}
