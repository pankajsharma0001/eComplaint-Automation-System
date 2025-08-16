import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AdminDashboard from '../Components/adminDashboard/page';

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');

  // if (!session || session.value !== 'loggedin') {
  //   redirect('/login');
  // }

  return (
    <div>
      <AdminDashboard />
    </div>
  );
}
