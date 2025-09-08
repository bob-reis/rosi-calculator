"use client"

import { useEffect, useMemo, useRef } from 'react'
import Section from '@/components/ui/Section'
import { useROSIStore } from '@/store/rosi'
import { formatCurrencyBRL } from '@/lib/format'
import Chart from 'chart.js/auto'

export default function ROSICharts() {
  const { currentResult } = useROSIStore()
  const barRef = useRef<HTMLCanvasElement | null>(null)
  const lineRef = useRef<HTMLCanvasElement | null>(null)
  const doughnutRef = useRef<HTMLCanvasElement | null>(null)

  const sensitivity = useMemo(() => {
    if (!currentResult) return [] as { rr: number; roi: number | 'infinite' }[]
    const pts: { rr: number; roi: number | 'infinite' }[] = []
    for (let rr = 0; rr <= 100; rr += 5) {
      const avoided = currentResult.avoidedLoss / (currentResult.riskMitigationScore ? (currentResult.riskMitigationScore / 100) : 1)
      const inv = avoided - currentResult.annualizedSavings
      const annual = (avoided * (rr / 100)) - inv
      const roi = inv === 0 ? (annual > 0 ? 'infinite' : 0) : (annual / inv) * 100
      pts.push({ rr, roi })
    }
    return pts
  }, [currentResult])

  useEffect(() => {
    if (!currentResult) return

    const charts: Chart[] = []

    if (barRef.current) {
      charts.push(new Chart(barRef.current, {
        type: 'bar',
        data: {
          labels: ['Investimento', 'Perda Evitada', 'Economia Anual'],
          datasets: [{
            label: 'R$ (BRL)',
            data: [
              Math.max(0, currentResult.avoidedLoss - currentResult.annualizedSavings),
              currentResult.avoidedLoss,
              currentResult.annualizedSavings
            ],
            backgroundColor: ['#EB33CC55', '#EB33CC88', '#EB33CCBB'],
            borderColor: '#EB33CC',
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } }
        }
      }))
    }

    if (lineRef.current) {
      const pts = sensitivity
      charts.push(new Chart(lineRef.current, {
        type: 'line',
        data: {
          labels: pts.map(p => `${p.rr}%`),
          datasets: [{
            label: 'ROI %',
            data: pts.map(p => (p.roi === 'infinite' ? 200 : Number(p.roi))),
            borderColor: '#EB33CC',
            backgroundColor: '#EB33CC55',
            tension: 0.2,
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } }
        }
      }))
    }

    if (doughnutRef.current) {
      charts.push(new Chart(doughnutRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Mitigação', 'Risco remanescente'],
          datasets: [{
            data: [currentResult.riskMitigationScore, 100 - currentResult.riskMitigationScore],
            backgroundColor: ['#EB33CC', '#6b7280'],
            cutout: '70%'
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          rotation: -90,
          circumference: 360,
        }
      }))
    }

    return () => charts.forEach(c => c.destroy())
  }, [currentResult, sensitivity])

  return (
    <Section id="rosi-charts" title="Visualizações" description="Gráficos interativos com eixos e tooltips.">
      {!currentResult ? (
        <p className="text-text-muted">Calcule primeiro para visualizar os gráficos.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card-cyber p-5 rounded">
            <h4 className="font-semibold mb-3">Distribuição Financeira</h4>
            <canvas ref={barRef} height={220} />
            <p className="text-xs text-text-muted mt-2">Valores em BRL — {formatCurrencyBRL(currentResult.annualizedSavings)} economia anual.</p>
          </div>
          <div className="card-cyber p-5 rounded">
            <h4 className="font-semibold mb-3">Sensibilidade (ROI vs Redução de Risco)</h4>
            <canvas ref={lineRef} height={220} />
          </div>
          <div className="card-cyber p-5 rounded text-center">
            <h4 className="font-semibold mb-3">Score de Mitigação</h4>
            <div className="w-full flex items-center justify-center">
              <div className="relative">
                <canvas ref={doughnutRef} width={220} height={220} />
                <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
                  {currentResult.riskMitigationScore}%
                </div>
              </div>
            </div>
            <p className="text-sm text-text-muted mt-2">Quanto maior, melhor a mitigação obtida</p>
          </div>
        </div>
      )}
    </Section>
  )
}
