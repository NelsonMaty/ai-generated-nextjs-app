'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '@/components/auth/LoginForm';
import AuthLayout from '@/components/layouts/AuthLayout';

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (formData: LoginFormData) => {
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
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
        setError(errorData.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <AuthLayout title="Sign in to your account">
      <LoginForm onSubmit={handleLogin} error={error} />
    </AuthLayout>
  );
}
