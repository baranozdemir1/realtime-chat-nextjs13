import FriendRequests from '@/components/FriendRequests'
import { fetchRedis } from '@/helpers/redis'
import { authOptions } from '@/lib/auth'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'

interface IncomingFriendRequest {
  senderId: string
  senderEmail: string
}

interface FriendRequestsProps {
  incomingFriendRequests: IncomingFriendRequest[]
  sessionId: string
}

const RequestsPage = ({
  incomingFriendRequests,
  sessionId,
}: FriendRequestsProps) => {
  // const session = await getServerSession(authOptions)
  // if (!session) notFound()
  // const incomingSenderIds = (await fetchRedis(
  //   'smembers',
  //   `user:${session.user.id}:incoming_friend_requests`
  // )) as string[]
  // const incomingFriendRequests = await Promise.all(
  //   incomingSenderIds.map(async (senderId) => {
  //     const sender = (await fetchRedis('get', `user:${senderId}`)) as string
  //     const senderParsed = JSON.parse(sender) as User
  //     return {
  //       senderId,
  //       senderEmail: senderParsed.email,
  //     }
  //   })
  // )
  // return (
  //   <main className="pt-8">
  //     <h1 className="font-bold text-5xl mb-8">Add a friend</h1>
  //     <div className="flex flex-col gap-4">
  //       <FriendRequests
  //         incomingFriendRequests={incomingFriendRequests}
  //         sessionId={session.user.id}
  //       />
  //     </div>
  //   </main>
  // )
}

FriendRequests.get

export const getServerSideProps: GetServerSideProps<RequestsPageProps> = async (
  context
) => {
  const session = await getServerSession({ req: context.req, ...authOptions })
  if (!session) notFound()

  const incomingSenderIds = (await fetchRedis(
    'smembers',
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[]

  const incomingFriendRequests = await Promise.all(
    incomingSenderIds.map(async (senderId) => {
      const sender = (await fetchRedis('get', `user:${senderId}`)) as string
      const senderParsed = JSON.parse(sender) as User

      return {
        senderId,
        senderEmail: senderParsed.email,
      }
    })
  )

  return {
    props: {
      incomingFriendRequests,
      sessionId: session.user.id,
    },
  }
}

export default RequestsPage
