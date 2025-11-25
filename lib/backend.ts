export const getBackendBaseUrl = (): string => {
  return (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001").replace(/\/$/, "")
}

async function handleResponse(resp: Response) {
  if (!resp.ok) {
    let body = null
    try {
      body = await resp.json()
    } catch (_) {
      body = await resp.text().catch(() => null)
    }
    console.error(`HTTP ${resp.status} error:`, body)
    throw new Error(`HTTP ${resp.status} - ${JSON.stringify(body)}`)
  }
  return resp.json()
}

export async function fetchUserContent(walletAddress: string): Promise<{
  wallet_address: string
  count: number
  content: Array<{
    id: string
    job_id: string
    title: string
    duration_sec: number | null
    format: string
    content_type: string
    created_at: string
    url: string
    preview_url: string
  }>
}> {
  const url = `${getBackendBaseUrl()}/api/wallet/${encodeURIComponent(walletAddress)}/content`
  console.log("Fetching content from:", url)
  const resp = await fetch(url)
  return handleResponse(resp)
}

export async function fetchUserPoints(walletAddress: string): Promise<{ points?: number; trial_expires_at?: string }>{
  const url = `${getBackendBaseUrl()}/api/users/${encodeURIComponent(walletAddress)}/points`
  const resp = await fetch(url)
  return handleResponse(resp)
}

export default {
  getBackendBaseUrl,
  fetchUserContent,
  fetchUserPoints,
}
