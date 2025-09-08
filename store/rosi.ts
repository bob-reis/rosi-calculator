"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { BasicROSIInput, BasicROSIResult } from '@/types/rosi-basic'
import { calculateROSI } from '@/lib/rosi/calc'

export interface ROSIScenario extends BasicROSIInput {
  id: string
  name: string
  createdAt: string
  result: BasicROSIResult
}

interface ROSIStore {
  currentInput: BasicROSIInput
  currentResult: BasicROSIResult | null
  scenarios: ROSIScenario[]
  calculate: (input: BasicROSIInput) => BasicROSIResult
  saveScenario: (name: string) => void
  loadScenario: (id: string) => void
  deleteScenario: (id: string) => void
}

const defaultInput: BasicROSIInput = {
  initialInvestment: 50000,
  potentialLoss: 300000,
  riskReductionPercentage: 40,
}

export const useROSIStore = create<ROSIStore>()(
  persist(
    (set, get) => ({
      currentInput: defaultInput,
      currentResult: null,
      scenarios: [],

      calculate: (input) => {
        const result = calculateROSI(input)
        set({ currentInput: input, currentResult: result })
        return result
      },

      saveScenario: (name: string) => {
        const { currentInput, currentResult, scenarios } = get()
        if (!currentResult) return
        const scenario: ROSIScenario = {
          id: crypto.randomUUID(),
          name: name.trim() || 'Cenário sem nome',
          createdAt: new Date().toISOString(),
          ...currentInput,
          result: currentResult,
        }
        set({ scenarios: [scenario, ...scenarios] })
      },

      loadScenario: (id: string) => {
        const s = get().scenarios.find((x) => x.id === id)
        if (!s) return
        set({ currentInput: s, currentResult: s.result })
      },

      deleteScenario: (id: string) => {
        set({ scenarios: get().scenarios.filter((s) => s.id !== id) })
      },
    }),
    { name: 'rosi-store' }
  )
)

