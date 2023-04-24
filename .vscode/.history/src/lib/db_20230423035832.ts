import { Redis } from '@upstash/redis'

export const db = new Redis({
  url: process.env.ABC,
  token: process.env.token,
})
