import { Redis } from '@upstash/redis'

export const db = new Redis({
  url: process.env.,
  token: process.env.TOKEN,
})
