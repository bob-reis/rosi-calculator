"use client"

import { useMemo } from 'react'
import Section from '@/components/ui/Section'
import { useROSIStore } from '@/store/rosi'
import { formatCurrencyBRL, formatPercent } from '@/lib/format'

function formatRoi(roi: number | 'infinite') {
  if (roi === 'infinite') return '∞'
  return formatPercent(roi)
}

export default function ROSIResults() {
  const { currentResult } = useROSIStore()

  const content = useMemo(() => {
    if (!currentResult) return (
      <p className="text-text-muted">Preencha os campos e clique em Calcular para ver os resultados.</p>
    )

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="card-cyber p-5 rounded">
          <div className="text-sm text-text-muted">ROSI</div>
          <div className="text-3xl font-bold">{formatRoi(currentResult.roiPercentage)}</div>
        </div>
        <div className="card-cyber p-5 rounded">
          <div className="text-sm text-text-muted">Economia Anual</div>
          <div className="text-3xl font-bold">{formatCurrencyBRL(currentResult.annualizedSavings)}</div>
        </div>
        <div className="card-cyber p-5 rounded">
          <div className="text-sm text-text-muted">Perda Evitada</div>
          <div className="text-3xl font-bold">{formatCurrencyBRL(currentResult.avoidedLoss)}</div>
        </div>
        <div className="card-cyber p-5 rounded md:col-span-3">
          <div className="text-sm text-text-muted">Payback</div>
          <div className="text-xl font-semibold">
            {currentResult.paybackPeriodYears === null ? 'Não aplicável' : `${currentResult.paybackPeriodYears.toFixed(2)} anos`}
          </div>
        </div>
      </div>
    )
  }, [currentResult])

  return (
    <Section
      id="rosi-results"
      title="Resultados"
      description="Resumo dos principais indicadores do cálculo."
    >
      {content}
    </Section>
  )
}

