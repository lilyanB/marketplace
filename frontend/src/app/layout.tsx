import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NextUiProvider } from '@/providers/nextUiProvider'
import Navbar from '@/components/Navbar'
import { RainbowProvider } from '@/providers/rainbowProvider'
import '@rainbow-me/rainbowkit/styles.css'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PEGO Marketplace',
  description: 'Pego, marketplace for all NFT',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <NextUiProvider>
          <RainbowProvider>
            <Navbar />
            <div className="min-h-screen">{children}</div>
            <Footer />
          </RainbowProvider>
        </NextUiProvider>
      </body>
    </html>
  )
}
