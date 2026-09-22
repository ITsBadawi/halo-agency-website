import { NextResponse } from 'next/server'
import { getSiteContent, saveSiteContent, defaultSiteContent, type SiteContent } from '@/lib/contentStore'

const jsonHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
}

export async function GET() {
  try {
    const content = await getSiteContent()
    return NextResponse.json({ success: true, data: content }, { headers: jsonHeaders })
  } catch (error) {
    console.error('Error fetching site content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch content' },
      { status: 500, headers: jsonHeaders }
    )
  }
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SiteContent
    if (!body || !body.sections || !body.contact || !body.portfolioWall) {
      return NextResponse.json(
        { success: false, error: 'Invalid content payload' },
        { status: 400, headers: jsonHeaders }
      )
    }

    await saveSiteContent(body)
    return NextResponse.json({ success: true, message: 'Content saved successfully' }, { headers: jsonHeaders })
  } catch (error) {
    console.error('Error saving site content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to save content' },
      { status: 500, headers: jsonHeaders }
    )
  }
}

// Reset to default
export async function PUT() {
  try {
    await saveSiteContent(defaultSiteContent)
    return NextResponse.json(
      { success: true, message: 'Reset to defaults successfully', data: defaultSiteContent },
      { headers: jsonHeaders }
    )
  } catch (error) {
    console.error('Error resetting site content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to reset content' },
      { status: 500, headers: jsonHeaders }
    )
  }
}
