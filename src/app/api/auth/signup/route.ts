import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { firstName, lastName, email, password } = await req.json();

    console.log('Received signup request for:', email);

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      console.log('User already exists:', email);
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Create new user
    user = new User({
      firstName,
      lastName,
      email,
      password: await bcrypt.hash(password, 10),
      accountNumber: Math.floor(100000000 + Math.random() * 900000000).toString(),
      balance: 0,
      transactions: []
    });

    await user.save();
    console.log('New user created:', email);

    // Create and return JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return NextResponse.json({ token, user: { id: user._id, name: `${user.firstName} ${user.lastName}`, email: user.email } });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
  }
}
