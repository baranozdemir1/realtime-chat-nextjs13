import { db } from '@/lib/db'

export default async function Home() {
  await db.set('hello', 'hello')
  return <h1 className="text-red-500">Hello world!</h1>
}
