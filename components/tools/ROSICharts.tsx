"use client"

import { useEffect, useMemo, useRef } from 'react'
import Section from '@/components/ui/Section'
import { useROSIStore } from '@/store/rosi'
import { formatCurrencyBRL } from '@/lib/format'
import Chart from 'chart.js/auto'
import { calculateROSI } from '@/lib/rosi/calc'

export default function ROSICharts() {
  const { currentResult } = useROSIStore()
  const barRef = useRef<HTMLCanvasElement | null>(null)
  const lineRef = useRef<HTMLCanvasElement | null>(null)
  const doughnutRef = useRef<HTMLCanvasElement | null>(null)

  const sensitivity = useMemo(() => {
    // Sample the ROI curve by varying only the reduction percentage
    const samples = Array.from({ length: 21 }, (_, i) => i * 5) // 0..100 step 5
    return samples.map((rr) => {
      const r = calculateROSI({
        initialInvestment: Math.max(0, (currentResult?.avoidedLoss || 0) - (currentResult?.annualizedSavings || 0)),
        potentialLoss: Math.max(0, (currentResult?.avoidedLoss || 0) / Math.max(1, (currentResult?.riskMitigationScore || 1) / 100)),
        riskReductionPercentage: rr,
      }).roiPercentage
      const y = typeof r === 'number' ? r : 300 // cap infinite for visualization
      return { x: rr, y }
    })
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
            backgroundColor: ['#EB33CC44', '#EB33CC88', '#EB33CCcc'],
            borderColor: '#EB33CC',
            borderWidth: 1,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              callbacks: { label: (ctx) => `${ctx.label}: ${formatCurrencyBRL(Number(ctx.parsed.y))}` },
            },
          },
          scales: {
            x: { grid: { color: 'rgba(255,255,255,0.08)' } },
            y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.08)' } },
          }
        }
      }))
    }

    if (lineRef.current) {
      const pts = sensitivity
      charts.push(new Chart(lineRef.current, {
        type: 'line',
        data: {
          labels: pts.map(p => `${p.x}%`),
          datasets: [{
            label: 'ROI (%)',
            data: pts.map(p => p.y),
            borderColor: '#EB33CC',
            backgroundColor: 'rgba(235, 51, 204, 0.15)',
            fill: true,
            tension: 0.3,
            pointRadius: 2,
            borderWidth: 2,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: true, callbacks: { label: (ctx) => `ROI: ${Number(ctx.parsed.y).toFixed(0)}%` } },
          },
          scales: {
            x: { grid: { color: 'rgba(255,255,255,0.08)' } },
            y: { beginAtZero: true, suggestedMax: 300, grid: { color: 'rgba(255,255,255,0.08)' } },
          }
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
            backgroundColor: ['#EB33CC', '#6b7280']
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          rotation: -90,
          circumference: 360,
          cutout: '70%'
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
