// frontend, lib/backend.ts
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
    const errorMsg = `HTTP ${resp.status} error: ${body ? JSON.stringify(body) : 'Empty response'}`
    console.error(errorMsg)
    throw new Error(errorMsg)
  }
  try {
    return await resp.json()
  } catch (e) {
    console.error(`Failed to parse JSON response: ${e}`)
    throw new Error(`Invalid JSON response from server`)
  }
}

export async function fetchUserContent(walletAddress: string): Promise<{
  wallet_address: string
  count: number
  content: Array<{
    id: string
    job_id: string
    title: string | null
    content_type: string
    duration_sec: number | null
    format: string
    created_at: string
    url: string
    preview_url: string
  }>
}> {
  const url = `${getBackendBaseUrl()}/api/wallet/${encodeURIComponent(walletAddress)}/content`
  console.log("Fetching content from:", url)
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
    const resp = await fetch(url, { signal: controller.signal })
    clearTimeout(timeout)
    return handleResponse(resp)
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('abort')) {
      throw new Error(`Request timeout while fetching content from ${url}`)
    }
    throw error
  }
}

export async function fetchGlobalStats(): Promise<{
  total_minutes: number
  total_users: number
  completed_jobs_count: number
  total_videos_created: number
  failed_jobs_count: number
  success_rate: number
}> {
  const url = `${getBackendBaseUrl()}/api/stats`
  console.log("Fetching global stats from:", url)
  const resp = await fetch(url)
  return handleResponse(resp)
}

export async function fetchUserPoints(walletAddress: string): Promise<{ points?: number; trial_expires_at?: string }>{
  const url = `${getBackendBaseUrl()}/api/users/${encodeURIComponent(walletAddress)}/points`
  console.log("Fetching user points from:", url)
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000) // 10 second timeout
    
    const resp = await fetch(url, { signal: controller.signal })
    clearTimeout(timeout)
    return handleResponse(resp)
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('abort')) {
      throw new Error(`Request timeout while fetching points from ${url}`)
    }
    throw error
  }
}

export default {
  getBackendBaseUrl,
  fetchUserContent,
  fetchUserPoints,
}
