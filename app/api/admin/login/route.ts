import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json()

    const validUsername = process.env.ADMIN_USERNAME || 'admin'
    const validPassword = process.env.ADMIN_PASSWORD || 'halo2026'

    if (username === validUsername && password === validPassword) {
      return NextResponse.json({ success: true, message: 'Authenticated successfully' })
    }

    return NextResponse.json(
      { success: false, error: 'اسم المستخدم أو كلمة المرور غير صحيحة' },
      { status: 401 }
    )
  } catch (error) {
    console.error('Error during admin authentication:', error)
    return NextResponse.json(
      { success: false, error: 'حدث خطأ في الخادم أثناء التحقق' },
      { status: 500 }
    )
  }
}
