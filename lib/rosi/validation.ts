import { BasicROSIInput } from '@/types/rosi-basic'

export interface ValidationError {
  field: keyof BasicROSIInput
  message: string
}

export function validateInput(input: BasicROSIInput): ValidationError[] {
  const errors: ValidationError[] = []
  if (!Number.isFinite(input.initialInvestment) || input.initialInvestment < 0) {
    errors.push({ field: 'initialInvestment', message: 'Investimento deve ser um número ≥ 0.' })
  }
  if (!Number.isFinite(input.potentialLoss) || input.potentialLoss < 0) {
    errors.push({ field: 'potentialLoss', message: 'Perda potencial deve ser um número ≥ 0.' })
  }
  if (!Number.isFinite(input.riskReductionPercentage) || input.riskReductionPercentage < 0 || input.riskReductionPercentage > 100) {
    errors.push({ field: 'riskReductionPercentage', message: 'Redução de risco deve estar entre 0 e 100%.' })
  }
  return errors
}

