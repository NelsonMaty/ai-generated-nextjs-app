'use client';

import { useState } from 'react';
import Link from 'next/link';
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (formData: LoginFormData) => Promise<void>;
  error: string;
}

export default function LoginForm({ onSubmit, error }: LoginFormProps) {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        <InputField
          id="email-address"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
        />
        <InputField
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}

      <Button type="submit" fullWidth>
        Sign in
      </Button>

      <div className="text-center">
        <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
          Don't have an account? Sign up
        </Link>
      </div>
    </form>
  );
}