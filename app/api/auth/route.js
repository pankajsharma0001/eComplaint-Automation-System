import Login from '../../../models/user';
import { connectToDatabase } from '../../lib/mongodb';


export async function POST(request) {
  try {
    const { username, password } = await request.json();

    await connectToDatabase();

    const user = await Login.findOne({ username });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 401 });
    }

    if (user.password !== password) {  // For now plain comparison; replace with bcrypt for hashing
      return new Response(JSON.stringify({ error: 'Incorrect password' }), { status: 401 });
    }

    return new Response(
      JSON.stringify({ message: 'Login successful', user: { username: user.username } }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
