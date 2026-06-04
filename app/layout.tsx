import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Neural Dashboard | Next-Gen Learning',
  description: 'A futuristic, high-performance student learning dashboard',
  keywords: ['education', 'dashboard', 'learning', 'next-gen'],
  openGraph: {
    title: 'Neural Dashboard',
    description: 'Experience the future of education',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans bg-neural-950 text-neural-50 antialiased`}>
        {children}
      </body>
    </html>
  )
}
