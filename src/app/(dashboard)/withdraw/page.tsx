'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WithdrawPage() {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchUserBalance();
  }, []);

  const fetchUserBalance = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/user/balance', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setBalance(data.balance);
      } else {
        console.error('Failed to fetch balance:', data.error);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const validateAmount = (value: string) => {
    const numAmount = parseFloat(value);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount');
      return false;
    }
    if (numAmount < 1) {
      setError('Minimum withdrawal amount is $1.00');
      return false;
    }
    if (numAmount > 5000) {
      setError('Maximum withdrawal amount is $5,000 per day');
      return false;
    }
    if (numAmount > balance) {
      setError('Insufficient funds');
      return false;
    }
    setError('');
    return true;
  };

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAmount(amount)) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const response = await fetch('/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type: 'withdrawal',
          amount: parseFloat(amount),
          description
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Withdrawal successful:', data);
        router.push('/dashboard');
      } else {
        setError(data.error || 'Withdrawal failed');
      }
    } catch (error) {
      console.error('Error during withdrawal:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Main content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-2">Withdraw Money</h1>
        <p className="text-gray-500 mb-6">Withdraw money from your account</p>

        <form onSubmit={handleWithdraw} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                name="amount"
                id="amount"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="0.00"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  validateAmount(e.target.value);
                }}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Minimum $1.00, maximum $5,000 per day</p>
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
              placeholder="Optional: what's this for?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={!!error}
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
