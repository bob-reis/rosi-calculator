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
        <Section id="intro" title="O que é ROSI" description="Return on Security Investment: traduzindo segurança para números de negócio.">
          <p className="text-text-muted">
            ROSI (Return on Security Investment) mede o retorno financeiro de um investimento
            em segurança. Ele compara o custo do controle com a economia obtida por evitar
            incidentes ou reduzir seu impacto.
          </p>
        </Section>

        <Section id="formula" title="Fórmula" description="Como o ROSI é calculado">
          <pre className="bg-dark/60 p-4 rounded border border-primary/20 overflow-auto"><code>
ROSI = [(Benefício da Segurança - Custo do Investimento) / Custo do Investimento] * 100%
          </code></pre>
          <ul className="list-disc list-inside text-text-muted space-y-1 mt-3">
            <li>Benefício da Segurança: perdas evitadas (perda potencial × redução de risco).</li>
            <li>Custo do Investimento: valor investido no controle/medida de segurança.</li>
          </ul>
        </Section>

        <Section id="exemplo" title="Exemplo" description="Passo a passo com números simples">
          <div className="text-text-muted space-y-2">
            <p>Perda potencial anual: R$ 300.000</p>
            <p>Investimento: R$ 50.000</p>
            <p>Redução de risco: 40%</p>
            <p className="mt-3">Perda evitada = 300.000 × 0,40 = R$ 120.000</p>
            <p>Economia anual = 120.000 − 50.000 = R$ 70.000</p>
            <p>ROSI = (70.000 / 50.000) × 100% = 140%</p>
            <p>Payback ≈ 50.000 / 70.000 = 0,71 ano</p>
          </div>
        </Section>

        <div className="text-center">
          <Link href="/tools/rosi-calculator" className="btn-cyber px-6 py-3 rounded">Calcular ROSI agora</Link>
        </div>
      </div>
    </main>
  )
}

