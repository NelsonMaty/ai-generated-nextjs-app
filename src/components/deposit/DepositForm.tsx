'use client';

import { useState } from 'react';
import Button from '@/components/common/Button';
import AmountInput from '@/components/common/AmountInput';
import DescriptionTextarea from '@/components/common/DescriptionTextarea';

interface DepositFormData {
  amount: string;
  description: string;
}

interface DepositFormProps {
  onSubmit: (formData: DepositFormData) => Promise<void>;
  isLoading: boolean;
}

export default function DepositForm({ onSubmit, isLoading }: DepositFormProps) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ amount, description });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="mb-6">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
        <AmountInput
          value={amount}
          onChange={setAmount}
          placeholder="Enter deposit amount"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <DescriptionTextarea
          value={description}
          onChange={setDescription}
          placeholder="Optional note for your deposit (150 characters)"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Deposit funds'}
        </Button>
      </div>
    </form>
  );
}