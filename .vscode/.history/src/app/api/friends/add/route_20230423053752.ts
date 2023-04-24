import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { addFriendValidator } from '@/lib/validations/add-friend'
import { getServerSession } from 'next-auth'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { email: emailToAdd } = addFriendValidator.parse(body.email)

    // const RESTResponse = await fetch(
    //   `${process.env.UPSTASH_REDIS_REST_URL}/get/user:email:${emailToAdd}`,
    //   {
    //     headers: {
    //       Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
    //     },
    //     cache: 'no-store',
    //   }
    // )

    // const data = (await RESTResponse.json()) as { result: string | null }

    // const idToAdd = data.result

    const idToAdd = await fetchRedis('get', `user:email:${emailToAdd}`)

    if (!idToAdd) {
      return new Response('This user does not exist.', { status: 400 })
    }

    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response('Unauthorized', { status: 401 })
    }

    if (idToAdd === session.user.id) {
      return new Response('You cannot add yourself as a friend.', {
        status: 400,
      })
    }

    const isAlreadyAdded = (await fetchRedis(
      'sismember',
      `user:${idToAdd}:incoming_friend_requests`,
      session.user.id
    )) as 0 | 1

    if (isAlreadyAdded) {
      return new Response('Already added this user', { status: 400 })
    }

    console.log(data)
  } catch (error) {}
}
