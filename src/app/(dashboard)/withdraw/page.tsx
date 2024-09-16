'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckAuth } from '@/hooks/useCheckAuth';

export default function WithdrawPage() {
  const { userId, isLoading: isAuthLoading, error: authError } = useCheckAuth();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'withdraw',
          amount: parseFloat(amount),
          description,
          userId
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
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthLoading) {
    return <div className="flex-1 p-10 bg-gray-50 min-h-screen">Loading...</div>;
  }

  if (authError) {
    return <div className="flex-1 p-10 bg-gray-50 min-h-screen">Error: {authError}</div>;
  }

  return (
    <div className="flex-1 p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Withdraw funds</h1>
      <p className="text-gray-600 mb-6">Withdraw money from your account to your linked bank account.</p>
  
      <form onSubmit={handleWithdraw} className="max-w-md">
        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500 sm:text-sm">$</span>
            </div>
            <input
              type="text"
              name="amount"
              id="amount"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
  
        <div className="mb-6">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="shadow-sm focus:ring-blue-500 focus:border-blue-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
            placeholder="Optional note for your records (150 characters)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={150}
          ></textarea>
        </div>
  
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Withdraw funds'}
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}
