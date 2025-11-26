**Enable Claude Haiku 4.5 (server-side) — quick guide**

Summary
- This document explains how to enable `claude-haiku-4.5` as the default Anthropic model for all server-side clients.

Options
- Recommended: set `ANTHROPIC_MODEL=claude-haiku-4.5` in your server environment (Vercel/Heroku/Docker) and use a server-side helper that enforces the env var.
- Alternate: update your Anthropic org settings / console if you control organization-level defaults.

Files added here
- `lib/anthropic.ts` — a small TypeScript helper that reads `ANTHROPIC_MODEL` (defaults to `claude-haiku-4.5`) and calls the Anthropic API.

Steps (server)
1. Add `ANTHROPIC_API_KEY` (your Anthropic API key) to your server environment (never commit it).
2. Add `ANTHROPIC_MODEL=claude-haiku-4.5` to your server environment.
   - Vercel: Project Settings → Environment Variables → Add key/value and redeploy.
   - Heroku: `heroku config:set ANTHROPIC_MODEL=claude-haiku-4.5 --app your-app-name`.
   - Docker / Kubernetes: set the env var in your container spec.
3. Replace direct Anthropic calls with the helper `lib/anthropic.ts` or call the env var directly so the server always uses the enforced model.

Example (Node/Express)
```js
import { callAnthropic } from './lib/anthropic'

app.post('/api/generate', async (req,res) => {
  const { prompt } = req.body
  try {
    const resp = await callAnthropic({ prompt, max_tokens: 800 })
    res.json(resp)
  } catch (err) {
    res.status(500).json({ error: String(err) })
  }
})
```

Important notes
- Keep API keys server-side only.
- If you need clients to be able to select different models, validate and whitelist allowed model names on the server and then override with `ANTHROPIC_MODEL` if you want to force Haiku 4.5 for all clients.
- After changing env vars you must redeploy the server.

Troubleshooting
- If requests return 401/403: ensure `ANTHROPIC_API_KEY` is correct and available to the runtime.
- If the server can't reach `api.anthropic.com`, check outbound networking and DNS.

Want me to apply this to your backend repo?
- If your backend lives in this workspace, I can patch its request code to import `lib/anthropic.ts` and use `callAnthropic`.
- If it lives in a separate repo, provide access or paste the relevant API file and I'll prepare a PR patch.
