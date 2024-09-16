'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckAuth } from '@/hooks/useCheckAuth';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import DepositForm from '@/components/deposit/DepositForm';

interface DepositFormData {
  amount: string;
  description: string;
}

export default function DepositPage() {
  const { userId, isLoading: isAuthLoading, error: authError } = useCheckAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDeposit = async (formData: DepositFormData) => {
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
          type: 'deposit',
          amount: parseFloat(formData.amount),
          description: formData.description,
          userId
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Deposit successful:', data);
        router.push('/dashboard');
      } else {
        setError(data.error || 'Deposit failed');
      }
    } catch (error) {
      console.error('Error during deposit:', error);
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
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Deposit funds</h1>
      <p className="text-gray-600 mb-6">Deposit money into your account using a bank transfer or wire.</p>
      
      <DepositForm onSubmit={handleDeposit} isLoading={isLoading} />

      {error && <p className="mt-4 text-red-600">{error}</p>}
    </DashboardLayout>
  );
}
