import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { jwtAuth } from '@/middleware/jwtAuth';

export async function PUT(req: NextRequest) {
  try {
    await dbConnect();

    const authResult = await jwtAuth(req);
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { userId } = authResult;
    const { name, email } = await req.json();

    const user = await User.findById(userId);

    if (!user) {
      console.error('User not found:', userId);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    return NextResponse.json({ message: 'User updated successfully', user });
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
