import { BasicROSIInput, BasicROSIResult } from '@/types/rosi-basic'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function calculatePaybackPeriodYears(initialInvestment: number, annualizedSavings: number): number | null {
  if (annualizedSavings <= 0) return null
  if (initialInvestment <= 0) return 0
  return initialInvestment / annualizedSavings
}

export function calculateRiskScore(
  riskReductionPercentage: number,
  initialInvestment: number,
  potentialLoss: number
): number {
  const rr = clamp(riskReductionPercentage, 0, 100)
  const avoidedLoss = potentialLoss * (rr / 100)

  let efficiency: number
  if (initialInvestment > 0) {
    efficiency = avoidedLoss / initialInvestment
  } else if (avoidedLoss > 0) {
    efficiency = 10
  } else {
    efficiency = 0
  }

  const efficiencyScore = clamp(Math.log10(1 + efficiency) * 100, 0, 100)
  const score = 0.7 * rr + 0.3 * efficiencyScore
  return Math.round(clamp(score, 0, 100))
}

export function calculateROSI(input: BasicROSIInput): BasicROSIResult {
  const initialInvestment = Math.max(0, input.initialInvestment)
  const potentialLoss = Math.max(0, input.potentialLoss)
  const riskReductionPercentage = clamp(input.riskReductionPercentage, 0, 100)

  const avoidedLoss = potentialLoss * (riskReductionPercentage / 100)
  const annualizedSavings = avoidedLoss - initialInvestment

  let roiPercentage: number | 'infinite'
  if (initialInvestment === 0) {
    roiPercentage = annualizedSavings > 0 ? 'infinite' : 0
  } else {
    roiPercentage = (annualizedSavings / initialInvestment) * 100
  }

  const paybackPeriodYears = calculatePaybackPeriodYears(initialInvestment, annualizedSavings)
  const riskMitigationScore = calculateRiskScore(riskReductionPercentage, initialInvestment, potentialLoss)

  return {
    roiPercentage,
    annualizedSavings,
    avoidedLoss,
    paybackPeriodYears,
    riskMitigationScore,
  }
}

