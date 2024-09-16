'use client';

import { useState } from 'react';
import Button from '@/components/common/Button';
import AmountInput from '@/components/common/AmountInput';
import DescriptionTextarea from '@/components/common/DescriptionTextarea';

interface WithdrawFormData {
  amount: string;
  description: string;
}

interface WithdrawFormProps {
  onSubmit: (formData: WithdrawFormData) => Promise<void>;
  isLoading: boolean;
}

export default function WithdrawForm({ onSubmit, isLoading }: WithdrawFormProps) {
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
          placeholder="Enter withdrawal amount"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <DescriptionTextarea
          value={description}
          onChange={setDescription}
          placeholder="Optional note for your withdrawal (150 characters)"
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Withdraw funds'}
        </Button>
      </div>
    </form>
  );
}