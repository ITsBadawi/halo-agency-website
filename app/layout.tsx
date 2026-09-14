import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HALO — Creative Agency | Ideas with gravity',
  description: 'Halo is an independent creative studio crafting visual identities, digital products, and cinematic experiences for ambitious brands.',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#09090b',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased bg-[#09090b] text-[#f4f4f6] font-sans selection:bg-purple-500 selection:text-white">
        {children}
      </body>
    </html>
  )
}
