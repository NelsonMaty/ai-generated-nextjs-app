'use client';

import { useState } from 'react';
import Link from 'next/link';
import InputField from '@/components/common/InputField';
import Button from '@/components/common/Button';

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignupFormProps {
  onSubmit: (formData: SignupFormData) => Promise<void>;
  error: string;
}

export default function SignupForm({ onSubmit, error }: SignupFormProps) {
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      // You might want to handle this error in the parent component
      console.error("Passwords don't match");
      return;
    }
    onSubmit(formData);
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm -space-y-px">
        <InputField
          id="first-name"
          name="firstName"
          type="text"
          required
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <InputField
          id="last-name"
          name="lastName"
          type="text"
          required
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
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
          autoComplete="new-password"
          required
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <InputField
          id="confirm-password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm mt-2">
          {error}
        </div>
      )}

      <Button type="submit" fullWidth>
        Sign up
      </Button>

      <div className="text-center">
        <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
          Already have an account? Sign in
        </Link>
      </div>
    </form>
  );
}