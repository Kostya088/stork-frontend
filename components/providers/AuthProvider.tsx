'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const setInitialized = useAuthStore((state) => state.setInitialized);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await checkSession();

        if (!session.success) {
          clearIsAuthenticated();
          return;
        }

        const user = await getMe();

        if (user) {
          setUser(user);
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setInitialized();
      }
    };

    fetchUser();
  }, [clearIsAuthenticated, setUser, setInitialized]);

  useEffect(() => {
    window.addEventListener('auth:session-expired', clearIsAuthenticated);

    return () => {
      window.removeEventListener('auth:session-expired', clearIsAuthenticated);
    };
  }, [clearIsAuthenticated]);

  return <>{children}</>;
};

export default AuthProvider;
