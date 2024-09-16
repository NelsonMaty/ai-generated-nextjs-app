'use client';

import { useState, useEffect } from 'react';
import { useCheckAuth } from '@/hooks/useCheckAuth';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import BalanceCard from '@/components/dashboard/BalanceCard';
import ActionCard from '@/components/dashboard/ActionCard';
import SearchBar from '@/components/dashboard/SearchBar';
import TransactionTable from '@/components/dashboard/TransactionTable';

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
    <DashboardLayout>
      <BalanceCard balance={balance} />

      <div className="space-y-4 mb-6">
        <ActionCard
          title="Deposit money"
          description="Add money to your account"
          buttonText="Deposit"
          href="/deposit"
        />
        <ActionCard
          title="Withdraw money"
          description="Take money out of your account"
          buttonText="Withdraw"
          href="/withdraw"
        />
      </div>

      <SearchBar />
      <TransactionTable />
    </DashboardLayout>
  );
}