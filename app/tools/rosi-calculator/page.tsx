import Link from 'next/link'
import ROSICalculator from '@/components/tools/ROSICalculator'

export const metadata = {
  title: 'ROSI Calculator',
}

export default function Page() {
  return (
    <main className="min-h-screen">
      <ROSICalculator />
      <div className="container mx-auto px-4 pb-12">
        <div className="mt-6 text-sm text-text-muted">
          <Link href="/docs/rosi" className="text-primary hover:underline inline-flex items-center gap-1">
            O que é ROSI →
          </Link>
        </div>
      </div>
    </main>
  )
}

