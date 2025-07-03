
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  
  const cookieStore = await cookies()
  const session = cookieStore.get('session')

  
  if (!session || session.value !== 'loggedin') {
    redirect('/login')
  }

  return <div>This is the admin page</div>
}
