'use client';

import { useEffect, useState, startTransition } from 'react';
import Loading from '@/app/loading';

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    startTransition(() => {
      setLoading(false);
    });
  }, []);

  return <>{loading ? <Loading /> : children}</>;
}
