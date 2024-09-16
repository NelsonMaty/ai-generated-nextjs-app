import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('No token provided');
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
      console.log('Decoded token:', decoded);

      const { type, amount, description } = await req.json();
      console.log('Transaction details:', { type, amount, description });

      if (type !== 'deposit' && type !== 'withdrawal') {
        return NextResponse.json({ error: 'Invalid transaction type' }, { status: 400 });
      }

      const numAmount = parseFloat(amount);
      if (isNaN(numAmount) || numAmount <= 0) {
        return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
      }

      const user = await User.findById(decoded.userId);

      if (!user) {
        console.error('User not found:', decoded.userId);
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      if (type === 'deposit') {
        user.balance += numAmount;
      } else if (type === 'withdrawal') {
        if (user.balance < numAmount) {
          return NextResponse.json({ error: 'Insufficient funds' }, { status: 400 });
        }
        user.balance -= numAmount;
      }

      const newTransaction = {
        type,
        amount: numAmount,
        description,
        date: new Date(),
        category: type === 'deposit' ? 'Income' : 'Expense'
      };

      if (!user.transactions) {
        user.transactions = [];
      }
      user.transactions.push(newTransaction);

      await user.save();

      console.log('Transaction successful:', newTransaction);

      return NextResponse.json({
        message: 'Transaction successful',
        balance: user.balance,
        transaction: newTransaction
      });
    } catch (jwtError) {
      console.error('JWT verification error:', jwtError);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
