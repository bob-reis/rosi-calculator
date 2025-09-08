// Basic types for the ROSI calculator MVP

export interface BasicROSIInput {
  initialInvestment: number;
  potentialLoss: number;
  riskReductionPercentage: number; // 0-100
}

export interface BasicROSIResult {
  roiPercentage: number | 'infinite';
  annualizedSavings: number; // BRL
  avoidedLoss: number;
  paybackPeriodYears: number | null; // null when not applicable
  riskMitigationScore: number; // 0-100
}

