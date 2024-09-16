'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Sidebar } from '@/components/Sidebar';

interface Transaction {
  date: string;
  description: string;
  category: string;
  amount: number;
}

interface User {
  name: string;
  email: string;
  accountNumber: string;
  balance: number;
  transactions: Transaction[];
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    fetch('/api/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => {
        console.error('Error fetching user data:', error);
        router.push('/login');
      });
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePage="dashboard" />

      {/* Main content */}
      <div className="flex-1 p-10 bg-gray-50">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">Balance</h1>
        <p className="text-gray-600 mb-6">Quick access to your account</p>

        <h2 className="text-4xl font-bold mb-6 text-gray-800">${user.balance.toFixed(2)}</h2>

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
              {user.transactions && user.transactions
                .filter(t =>
                  t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  t.category.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((transaction, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 whitespace-nowrap text-gray-700">{transaction.date}</td>
                    <td className="py-2 px-4 whitespace-nowrap text-gray-700">{transaction.description}</td>
                    <td className="py-2 px-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {transaction.category}
                      </span>
                    </td>
                    <td className={`py-2 px-4 whitespace-nowrap text-right ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}