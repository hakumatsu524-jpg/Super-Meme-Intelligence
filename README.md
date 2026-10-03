# Super Meme Intelligence

![Super Meme Intelligence](./assets/super-meme-intelligence.png)

> A skeptical AI copilot for memecoin narratives, meme strength, and risk discovery.

Super Meme Intelligence is an open-source research tool inspired by the idea that powerful AI systems should be deployed with controls, monitoring, external review, and accountable oversight. It applies those principles to the memecoin information layer: separate facts from speculation, surface risks, and never present hype as financial advice.

## What it does

- Produces a structured narrative brief from user-supplied facts.
- Scores meme strength without making price predictions.
- Surfaces liquidity, concentration, contract, impersonation, and manipulation risks.
- Generates a repeatable risk checklist for human review.
- Uses the Vercel AI Gateway, so no provider SDK or hard-coded provider key is required.

## Quick start

Requires Node.js 22+.

```bash
pnpm install
pnpm meme "Example Token" "Community launched on a public chain; contract is verified; liquidity is unknown."
```

Set `AI_GATEWAY_API_KEY` only when running outside Vercel's managed preview/deployment environment.

## Project shape

- `src/super-meme.ts` — typed analysis function, safety-oriented system prompt, CLI entry point, and checklist helper.
- `assets/super-meme-intelligence.png` — project logo supplied for this repository.
- `app/` — the default Next.js shell retained so the repository opens cleanly in the v0 preview; the product logic lives outside the UI.

## Guardrails

This project is educational software, not investment advice or an automated trading system. It does not connect to wallets, execute trades, promote tokens, or infer certainty from social engagement. Production deployments should add authenticated data ingestion, provenance for every fact, rate limiting, audit logs, independent model evaluation, and human review before publishing conclusions.

## License

Choose a license before publishing the repository.
