import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthCheckResult {
  userId: string | null;
  isLoading: boolean;
  error: string | null;
}

export function useCheckAuth(): AuthCheckResult {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check');
        if (!response.ok) {
          throw new Error('Not authenticated');
        }
        const data = await response.json();
        setUserId(data.userId);
      } catch (err) {
        console.error(err);
        setError('Authentication failed');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { userId, isLoading, error };
}