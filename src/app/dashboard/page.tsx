'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface Transaction {
  date: string;
  description: string;
  category: string;
  amount: number;
}

interface User {
  name: string;
  email: string;
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
    } else {
      fetchUserData(token);
    }
  }, [router]);

  const fetchUserData = async (token: string) => {
    try {
      const response = await fetch('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setUser(data);
    } catch (err) {
      console.error('Error fetching user data:', err);
      localStorage.removeItem('token');
      router.push('/login');
    }
  };

  const handleDeposit = () => {
    // Implement deposit logic
  };

  const handleWithdraw = () => {
    // Implement withdraw logic
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 flex items-center">
          <Image src="/path-to-logo.jpg" alt="FinanceCo Logo" width={40} height={40} className="rounded-full" />
          <div className="ml-2">
            <h2 className="font-bold">FinanceCo</h2>
            <p className="text-sm text-gray-500">Manage your money</p>
          </div>
        </div>
        <nav className="mt-4">
          <a href="#" className="flex items-center py-2 px-4 bg-gray-200">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </a>
          <a href="#" className="flex items-center py-2 px-4">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Deposit
          </a>
          <a href="#" className="flex items-center py-2 px-4">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Withdraw
          </a>
          <a href="#" className="flex items-center py-2 px-4">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </a>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-2">Balance</h1>
        <p className="text-gray-500 mb-6">Quick access to your account</p>

        <h2 className="text-4xl font-bold mb-6">${user.balance.toFixed(2)}</h2>

        <div className="space-y-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="font-bold">Deposit money</h3>
              <p className="text-sm text-gray-500">Add money to your account</p>
            </div>
            <button onClick={handleDeposit} className="bg-blue-500 text-white px-4 py-2 rounded">Deposit</button>
          </div>

          <div className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="font-bold">Withdraw money</h3>
              <p className="text-sm text-gray-500">Take money out of your account</p>
            </div>
            <button onClick={handleWithdraw} className="bg-blue-500 text-white px-4 py-2 rounded">Withdraw</button>
          </div>
        </div>

        <div className="bg-gray-200 p-2 rounded-lg mb-4 flex items-center">
          <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            type="text"
            placeholder="Search transactions"
            className="bg-transparent outline-none flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <table className="w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {user.transactions && user.transactions.length > 0 ? (
              user.transactions
                .filter(t =>
                  t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  t.category.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((transaction, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-4">{transaction.date}</td>
                    <td className="py-2 px-4">{transaction.description}</td>
                    <td className="py-2 px-4">
                      <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                        {transaction.category}
                      </span>
                    </td>
                    <td className={`py-2 px-4 text-right ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
