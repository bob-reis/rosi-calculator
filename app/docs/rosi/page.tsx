import Link from 'next/link'
import Section from '@/components/ui/Section'

export const metadata = {
  title: 'O que é ROSI',
  description: 'Entenda o que é ROSI (Return on Security Investment), como calcular e quando usar para justificar investimentos em segurança da informação.'
}

export default function Page() {
  return (
    <main className="min-h-screen py-10">
      <div className="container mx-auto px-4 space-y-10">
        <Section id="intro" title="O que é ROSI" description="Return on Security Investment: traduzindo segurança da informação para linguagem financeira.">
          <div className="space-y-3 text-text-muted">
            <p>ROSI (Return on Security Investment) é um indicador que estima o retorno financeiro de um investimento em segurança. Ele compara quanto você investe com quanto deixa de perder ao reduzir a probabilidade e o impacto de incidentes.</p>
            <p>O objetivo do ROSI é apoiar decisões: priorizar controles, justificar orçamentos e comunicar valor para quem decide (C‑Level, Financeiro, Conselho).</p>
          </div>
        </Section>

        <Section id="formula" title="Fórmula" description="Base simples para análise de viabilidade">
          <pre className="bg-dark/60 p-4 rounded border border-primary/20 overflow-auto"><code>
ROSI = [(Benefício − Custo) / Custo] × 100%
Benefício = Perda Potencial × Redução de Risco
          </code></pre>
          <ul className="list-disc list-inside text-text-muted space-y-1 mt-3">
            <li>Perda Potencial: valor anual estimado de perdas (fraudes, paradas, multas).</li>
            <li>Redução de Risco: eficácia do controle (% de perdas evitadas).</li>
            <li>Custo: investimento inicial e, quando aplicável, custos recorrentes.</li>
          </ul>
        </Section>

        <Section id="exemplo" title="Exemplo prático" description="Aplicando números reais">
          <div className="text-text-muted space-y-2">
            <p>Perda potencial anual: R$ 300.000 · Investimento: R$ 50.000 · Redução de risco: 40%</p>
            <p>Benefício = 300.000 × 0,40 = R$ 120.000</p>
            <p>Economia anual = 120.000 − 50.000 = R$ 70.000</p>
            <p>ROSI = (70.000 / 50.000) × 100% = 140% · Payback ≈ 0,71 ano</p>
          </div>
        </Section>

        <Section id="boas-praticas" title="Boas práticas" description="Como estimar com credibilidade">
          <ul className="list-disc list-inside text-text-muted space-y-1">
            <li>Use dados históricos e fontes setoriais para embasar perdas.</li>
            <li>Considere eficácia real de controles (camadas, cobertura, adesão).</li>
            <li>Documente premissas/limitações e mantenha versões por cenário.</li>
            <li>Inclua custos recorrentes e impacto operacional (treino, suporte).</li>
          </ul>
          <div className="text-center mt-6">
            <Link href="/tools/rosi-calculator" className="btn-cyber px-6 py-3 rounded">Calcular ROSI agora</Link>
          </div>
        </Section>
      </div>
    </main>
  )
}
