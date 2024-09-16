import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function PUT(req: NextRequest) {
  await dbConnect();

  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
    const { firstName, lastName } = await req.json();

    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    user.firstName = firstName;
    user.lastName = lastName;

    await user.save();

    return NextResponse.json({ message: 'Profile updated successfully', user: { firstName, lastName, email: user.email } });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Invalid token or server error' }, { status: 401 });
  }
}
