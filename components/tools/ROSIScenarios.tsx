"use client"

import { useROSIStore } from '@/store/rosi'
import Section from '@/components/ui/Section'

export default function ROSIScenarios() {
  const { scenarios, loadScenario, deleteScenario } = useROSIStore()

  return (
    <Section
      id="rosi-scenarios"
      title="Cenários Salvos"
      description="Compare diferentes hipóteses de investimento e redução de risco."
    >
      {scenarios.length === 0 ? (
        <p className="text-text-muted">Nenhum cenário salvo ainda.</p>
      ) : (
        <ul className="space-y-3">
          {scenarios.map((s) => (
            <li key={s.id} className="flex items-center justify-between card-cyber p-4 rounded">
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-sm text-text-muted">
                  Invest: R$ {s.initialInvestment.toLocaleString('pt-BR')} · Perda: R$ {s.potentialLoss.toLocaleString('pt-BR')} · Risco: {s.riskReductionPercentage}%
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => loadScenario(s.id)} className="btn-cyber px-3 py-2 rounded">Carregar</button>
                <button onClick={() => deleteScenario(s.id)} className="px-3 py-2 rounded border border-red-400/40 hover:bg-red-900/30">Excluir</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}

