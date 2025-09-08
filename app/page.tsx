import Link from 'next/link'

export default function Page() {
  return (
    <main className="min-h-screen py-16">
      <div className="container mx-auto px-4 text-center space-y-6">
        <h1 className="text-3xl font-bold">ROSI Calculator</h1>
        <p className="text-text-muted">Ferramenta standalone pronta para deploy na Vercel.</p>
        <div className="flex items-center justify-center gap-3">
          <Link className="btn-cyber px-6 py-3 rounded" href="/tools/rosi-calculator">Ir para a Calculadora</Link>
          <Link className="text-primary hover:underline" href="/docs/rosi">O que é ROSI</Link>
        </div>
      </div>
    </main>
  )
}

