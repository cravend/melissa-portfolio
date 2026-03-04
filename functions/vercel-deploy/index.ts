import { documentEventHandler } from '@sanity/functions'

export const handler = documentEventHandler(async ({ event }) => {
  const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL
  if (!deployHookUrl) {
    throw new Error('VERCEL_DEPLOY_HOOK_URL environment variable is not set')
  }

  const res = await fetch(deployHookUrl, { method: 'POST' })
  if (!res.ok) {
    throw new Error(`Vercel deploy hook failed: ${res.status} ${res.statusText}`)
  }

  console.log(`Triggered Vercel deploy for ${event.data._type} (${event.data._id})`)
})