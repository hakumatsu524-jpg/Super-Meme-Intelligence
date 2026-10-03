import { generateText, gateway } from 'ai'

export type MemeCoinBrief = {
  symbol: string
  thesis: string
  narrative: string
  catalysts: string[]
  risks: string[]
  memeScore: number
  confidence: 'low' | 'medium' | 'high'
}

const SYSTEM_PROMPT = `You are Super Meme Intelligence, a skeptical research copilot for memecoin communities.
Analyze narratives and publicly supplied facts without hype, price promises, or personalized financial advice.
Always separate observed facts from speculation. Flag unverifiable claims, insider concentration, liquidity risk,
contract risk, impersonation, and coordinated manipulation. Return concise JSON matching the requested schema.`

export async function analyzeMemeCoin(input: {
  name: string
  symbol?: string
  facts: string
}): Promise<MemeCoinBrief> {
  const { text } = await generateText({
    model: gateway('openai/gpt-4.1-mini'),
    system: SYSTEM_PROMPT,
    prompt: `Analyze this memecoin brief. Name: ${input.name}. Symbol: ${input.symbol ?? 'unknown'}. Supplied facts: ${input.facts}
Return JSON only with keys: symbol, thesis, narrative, catalysts (string array), risks (string array), memeScore (0-100 number), confidence (low|medium|high).`,
  })

  return JSON.parse(text) as MemeCoinBrief
}

export function buildRiskChecklist(brief: MemeCoinBrief): string[] {
  return [
    'Verify the contract address from an official source before interacting.',
    'Check holder concentration, liquidity lock status, and deployer privileges independently.',
    'Treat social momentum as a signal to investigate, never as proof of value.',
    ...brief.risks.map((risk) => `Investigate: ${risk}`),
  ]
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [name, ...facts] = process.argv.slice(2)
  if (!name || facts.length === 0) {
    console.error('Usage: pnpm meme "Token name" "facts to analyze"')
    process.exit(1)
  }

  analyzeMemeCoin({ name, facts: facts.join(' ') })
    .then((brief) => console.log(JSON.stringify(brief, null, 2)))
    .catch((error: unknown) => {
      console.error(error instanceof Error ? error.message : error)
      process.exit(1)
    })
}

export { SYSTEM_PROMPT }

