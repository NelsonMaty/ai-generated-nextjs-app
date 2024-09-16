'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCheckAuth } from '@/hooks/useCheckAuth';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import WithdrawForm from '@/components/withdraw/WithdrawForm';

interface WithdrawFormData {
  amount: string;
  description: string;
}

export default function WithdrawPage() {
  const { userId, isLoading: isAuthLoading, error: authError } = useCheckAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleWithdraw = async (formData: WithdrawFormData) => {
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
          amount: parseFloat(formData.amount),
          description: formData.description,
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
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Withdraw funds</h1>
      <p className="text-gray-600 mb-6">Withdraw money from your account to your linked bank account.</p>
      
      <WithdrawForm onSubmit={handleWithdraw} isLoading={isLoading} />

      {error && <p className="mt-4 text-red-600">{error}</p>}
    </DashboardLayout>
  );
}
