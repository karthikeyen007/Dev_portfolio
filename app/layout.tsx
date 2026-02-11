import React from "react"
import type { Metadata } from 'next'
import { Montserrat, Fira_Code } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'

import './globals.css'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat', weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira-code' })

export const metadata: Metadata = {
  title: 'Karthikeyan V | ML & Cloud Engineer',
  description: 'ML & Cloud Engineer - Building intelligent systems with Machine Learning, Cloud Infrastructure, and DevOps',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${firaCode.variable} font-sans antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
