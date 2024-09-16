'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCheckAuth } from '@/hooks/useCheckAuth';

interface UserBalance {
  balance: number;
}

export default function Dashboard() {
  const { userId, isLoading: isAuthLoading, error: authError } = useCheckAuth();
  const [balance, setBalance] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      fetchBalance(userId);
    }
  }, [userId]);

  const fetchBalance = async (userId: string) => {
    try {
      const response = await fetch(`/api/user/${userId}/balance`);
      if (!response.ok) {
        throw new Error('Failed to fetch balance');
      }
      const data: UserBalance = await response.json();
      setBalance(data.balance);
    } catch (err) {
      setError('Error fetching balance');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthLoading || isLoading) {
    return <div>Loading...</div>;
  }

  if (authError || error) {
    return <div>Error: {authError || error}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 p-10 bg-gray-50">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Balance</h1>
        <p className="text-gray-600 mb-6">Quick access to your account</p>

        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          ${balance !== null ? balance.toFixed(2) : '0.00'}
        </h2>

        <div className="space-y-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-800">Deposit money</h3>
              <p className="text-sm text-gray-600">Add money to your account</p>
            </div>
            <Link href="/deposit">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Deposit</button>
            </Link>
          </div>

          <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="font-bold text-gray-800">Withdraw money</h3>
              <p className="text-sm text-gray-600">Take money out of your account</p>
            </div>
            <Link href="/withdraw">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">Withdraw</button>
            </Link>
          </div>
        </div>

        <div className="bg-white p-2 rounded-lg mb-4 flex items-center shadow">
          <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            type="text"
            placeholder="Search transactions"
            className="bg-transparent outline-none flex-1 text-gray-700 placeholder-gray-500"
          />
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Date</th>
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
                <th className="py-2 px-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                <th className="py-2 px-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}