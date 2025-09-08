import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/ui/Header'

export const metadata: Metadata = {
  title: 'ROSI Calculator – Pereira & Pelizzari',
  description: 'Calculadora de ROSI (Return on Security Investment) e documentação O que é ROSI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}

