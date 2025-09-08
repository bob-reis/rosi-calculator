export function formatCurrencyBRL(n: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(n)
}

export function formatPercent(n: number, digits = 2) {
  return `${n.toFixed(digits)}%`
}

