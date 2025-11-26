/**
 * Lightweight Anthropic helper for server-side use.
 *
 * Usage:
 *  - Set `ANTHROPIC_API_KEY` in your server environment (never in client code).
 *  - Optionally set `ANTHROPIC_MODEL=claude-haiku-4.5` to enable Haiku 4.5.
 *  - Import `callAnthropic` from server code and use to make requests.
 */

const ANTHROPIC_API = "https://api.anthropic.com/v1/complete"

export type AnthropicParams = {
  prompt: string
  // any other options you want to allow
  max_tokens?: number
  temperature?: number
}

function getModel(): string {
  return process.env.ANTHROPIC_MODEL || "claude-haiku-4.5"
}

export async function callAnthropic(params: AnthropicParams) {
  if (typeof window !== "undefined") {
    throw new Error("callAnthropic must only be used server-side")
  }

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error("Missing ANTHROPIC_API_KEY in server environment")

  const body: Record<string, any> = {
    model: getModel(),
    prompt: params.prompt,
  }
  if (params.max_tokens != null) body.max_tokens = params.max_tokens
  if (params.temperature != null) body.temperature = params.temperature

  const resp = await fetch(ANTHROPIC_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  })

  if (!resp.ok) {
    const text = await resp.text().catch(() => "")
    throw new Error(`Anthropic API error ${resp.status}: ${text}`)
  }

  return resp.json()
}

export default { callAnthropic, getModel }
