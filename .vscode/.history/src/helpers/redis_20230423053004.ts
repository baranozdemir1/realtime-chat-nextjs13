const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN

type TCommand = 'zrange' | 'sismember' | 'get' | 'smembers'

export async function fetchRedis(
  command: TCommand,
  ...args: (string | number)[]
) {}
