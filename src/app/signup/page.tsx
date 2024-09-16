'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignupForm from '@/components/auth/SignupForm';
import AuthLayout from '@/components/layouts/AuthLayout';

export default function SignupPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSignup = async (formData: SignupFormData) => {
    setError('');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('An error occurred during signup');
    }
  };

  return (
    <AuthLayout title="Create your account">
      <SignupForm onSubmit={handleSignup} error={error} />
    </AuthLayout>
  );
}
