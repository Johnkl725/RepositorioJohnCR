import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'John Luis Castillo - Data Engineer Portfolio',
  description: 'Portfolio profesional de John Luis Alberto Castillo Reupo - Data Engineer especializado en Azure, Python, SQL y Big Data',
  keywords: 'Data Engineer, Python, SQL, Azure, Big Data, Portfolio, John Castillo',
  authors: [{ name: 'John Luis Alberto Castillo Reupo' }],
  openGraph: {
    title: 'John Luis Castillo - Data Engineer Portfolio',
    description: 'Portfolio profesional de Data Engineer',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
