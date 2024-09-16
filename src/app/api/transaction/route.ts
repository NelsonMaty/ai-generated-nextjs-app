import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { jwtAuth } from '@/middleware/jwtAuth';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const authResult = await jwtAuth(req);
    if ('error' in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { userId } = authResult;

    const { type, amount, description } = await req.json();
    console.log('Transaction details:', { type, amount, description });

    if (type !== 'deposit' && type !== 'withdrawal') {
      return NextResponse.json({ error: 'Invalid transaction type' }, { status: 400 });
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const user = await User.findById(userId);

    if (!user) {
      console.error('User not found:', userId);
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
  } catch (error) {
    console.error('Server error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
