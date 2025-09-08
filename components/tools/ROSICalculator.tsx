"use client"

import ROSIForm from '@/components/tools/ROSIForm'
import ROSIResults from '@/components/tools/ROSIResults'
import ROSIScenarios from '@/components/tools/ROSIScenarios'
import ROSICharts from '@/components/tools/ROSICharts'
import Link from 'next/link'

export default function ROSICalculator() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-8" id="rosi-report">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ROSI Calculator</h1>
        <div className="flex items-center gap-3 print:hidden">
          <Link href="/tools/rosi-calculator/report" className="btn-cyber px-4 py-2 rounded">
            Gerar relatório
          </Link>
          <button className="btn-cyber px-4 py-2 rounded" onClick={() => window.print()}>
            Exportar PDF
          </button>
        </div>
      </div>
      <ROSIForm />
      <ROSIResults />
      <ROSICharts />
      <ROSIScenarios />

      {/* CTA abaixo de Cenários Salvos */}
      <div className="mt-6 card-cyber p-6 rounded text-center">
        <p className="mb-3 font-semibold">Quer conhecer a empresa que tem o melhor ROSI do mercado? Entre em contato</p>
        <a className="btn-cyber px-6 py-2 inline-block rounded" href="https://www.pereirapelizzari.tech/contato" target="_blank" rel="noopener noreferrer">
          Falar com a PP_Tech
        </a>
      </div>
    </div>
  )
}
