
import Login from '../../../models/user';
import { connectToDatabase } from '../../lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    await connectToDatabase();

    
    const user = await Login.findOne({ username });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    
    if (user.password !== password) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    
    const response = NextResponse.json({
      message: 'Login successful',
      user: { username: user.username }
    }, { status: 200 });

   response.cookies.set('session', 'loggedin', {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    })

    return response

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
