import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-darker/80 backdrop-blur border-b border-primary/30">
      <div className="container mx-auto px-4 h-36 flex items-center justify-between">
        <Link href="https://pereirapelizzari.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
          <img src="/images/logomarca_transp-red.png" alt="Pereira & Pelizzari" className="h-32 w-auto" />
          <span className="sr-only">Pereira & Pelizzari</span>
        </Link>
        <nav className="text-sm text-text-muted">
          <Link className="hover:text-primary" href="/tools/rosi-calculator">Calculadora</Link>
          <span className="mx-2">·</span>
          <Link className="hover:text-primary" href="/docs/rosi">O que é ROSI</Link>
        </nav>
      </div>
    </header>
  )
}
