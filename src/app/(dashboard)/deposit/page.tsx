'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function DepositPage() {
  const [amount, setAmount] = useState('0.00');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          type: 'deposit',
          amount: parseFloat(amount),
          description
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Deposit successful:', data);
        router.push('/dashboard');
      } else {
        console.error('Deposit failed:', data.error);
        // Handle error (e.g., show error message to user)
      }
    } catch (error) {
      console.error('Error during deposit:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-2">Deposit funds</h1>
        <p className="text-gray-500 mb-6">Deposit money into your account using a bank transfer or wire.</p>

        <form onSubmit={handleDeposit} className="max-w-md">
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
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
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
            >
              Deposit funds
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
