"use client"

import { useState } from 'react'
import Section from '@/components/ui/Section'
import { useROSIStore } from '@/store/rosi'
import { validateInput } from '@/lib/rosi/validation'

export default function ROSIForm() {
  const { currentInput, calculate, saveScenario } = useROSIStore()
  const [investment, setInvestment] = useState<string>(String(currentInput.initialInvestment))
  const [loss, setLoss] = useState<string>(String(currentInput.potentialLoss))
  const [risk, setRisk] = useState<string>(String(currentInput.riskReductionPercentage))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [scenarioName, setScenarioName] = useState('')

  const onlyDigits = (v: string) => v.replace(/\D+/g, '')

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const input = {
      initialInvestment: Number(investment || '0'),
      potentialLoss: Number(loss || '0'),
      riskReductionPercentage: Number(risk || '0'),
    }
    const validation = validateInput(input)
    if (validation.length) {
      const map: Record<string, string> = {}
      validation.forEach((v) => (map[v.field] = v.message))
      setErrors(map)
      return
    }
    setErrors({})
    calculate(input)
  }

  function onSaveScenario() {
    saveScenario(scenarioName)
    setScenarioName('')
  }

  return (
    <Section
      id="rosi-calculator"
      title="ROSI Calculator"
      description="Calcule o retorno do investimento em segurança (ROSI) com base em perdas potenciais, investimento e redução de risco. Nenhum dado é enviado ao servidor."
    >
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <label htmlFor="rosi-investment" className="block text-sm mb-1">Investimento Inicial (R$)</label>
          <input
            id="rosi-investment"
            type="text"
            inputMode="numeric"
            value={investment}
            onChange={(e) => setInvestment(onlyDigits(e.target.value))}
            className="w-full px-3 py-2 bg-dark/60 border border-primary/30 rounded outline-none focus:border-primary"
          />
          {errors.initialInvestment && (
            <p className="text-red-400 text-xs mt-1">{errors.initialInvestment}</p>
          )}
        </div>

        <div>
          <label htmlFor="rosi-loss" className="block text-sm mb-1">Perda Potencial Anual (R$)</label>
          <input
            id="rosi-loss"
            type="text"
            inputMode="numeric"
            value={loss}
            onChange={(e) => setLoss(onlyDigits(e.target.value))}
            className="w-full px-3 py-2 bg-dark/60 border border-primary/30 rounded outline-none focus:border-primary"
          />
          {errors.potentialLoss && (
            <p className="text-red-400 text-xs mt-1">{errors.potentialLoss}</p>
          )}
        </div>

        <div>
          <label htmlFor="rosi-risk" className="block text-sm mb-1">Redução de Risco (%)</label>
          <input
            id="rosi-risk"
            type="text"
            inputMode="numeric"
            value={risk}
            onChange={(e) => setRisk(onlyDigits(e.target.value))}
            className="w-full px-3 py-2 bg-dark/60 border border-primary/30 rounded outline-none focus:border-primary"
          />
          {errors.riskReductionPercentage && (
            <p className="text-red-400 text-xs mt-1">{errors.riskReductionPercentage}</p>
          )}
        </div>

        <div className="md:col-span-3 flex items-end gap-3">
          <button type="submit" className="btn-cyber px-6 py-2 rounded">Calcular</button>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onSaveScenario} className="btn-cyber px-4 py-2 rounded">Salvar cenário</button>
            <input
              type="text"
              placeholder="Nome do cenário"
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              className="px-3 py-2 bg-dark/60 border border-primary/30 rounded outline-none focus:border-primary"
            />
          </div>
        </div>
      </form>
    </Section>
  )
}

