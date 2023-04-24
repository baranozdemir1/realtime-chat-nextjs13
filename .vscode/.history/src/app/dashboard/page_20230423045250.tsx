import Button from '@/components/ui/Button'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { FC } from 'react'

const Dashboard = async () => {
  const session = await getServerSession(authOptions)

  return <pre>asdasd</pre>
}

export default Dashboard
