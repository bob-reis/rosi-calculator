"use client"

import Section from '@/components/ui/Section'
import { useROSIStore } from '@/store/rosi'
import { formatCurrencyBRL } from '@/lib/format'

// Simplified charts section (no external libs) to keep the app standalone
export default function ROSICharts() {
  const { currentResult } = useROSIStore()

  return (
    <Section id="rosi-charts" title="Visualizações" description="Resumo visual simplificado.">
      {!currentResult ? (
        <p className="text-text-muted">Calcule primeiro para visualizar os gráficos.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="card-cyber p-5 rounded">
            <h4 className="font-semibold mb-2">Distribuição Financeira</h4>
            <ul className="text-sm text-text-muted">
              <li>Economia anual: <span className="text-text-light">{formatCurrencyBRL(currentResult.annualizedSavings)}</span></li>
              <li>Perda evitada: <span className="text-text-light">{formatCurrencyBRL(currentResult.avoidedLoss)}</span></li>
            </ul>
          </div>
          <div className="card-cyber p-5 rounded">
            <h4 className="font-semibold mb-2">Sensibilidade (conceitual)</h4>
            <p className="text-text-muted text-sm">Aumentos de 5% na redução de risco elevam o ROI de forma quase linear para este modelo simples.</p>
          </div>
          <div className="card-cyber p-5 rounded">
            <h4 className="font-semibold mb-2">Score de Mitigação</h4>
            <div className="text-3xl font-bold">{currentResult.riskMitigationScore}%</div>
            <p className="text-sm text-text-muted">Quanto maior, melhor a mitigação obtida.</p>
          </div>
        </div>
      )}
    </Section>
  )
}

