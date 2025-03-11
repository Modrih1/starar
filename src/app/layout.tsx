import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'Starar - Ваш модний магазин',
  description: 'Модний одяг та аксесуари за найкращими цінами',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="uk">
      <body className={inter.className}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  )
} 