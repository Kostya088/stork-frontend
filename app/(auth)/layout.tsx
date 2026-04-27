"use client";

import { useEffect, useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header/Header";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    router.refresh();

    startTransition(() => {
      setLoading(false);
    });
  }, [router]);

  return <>{loading ? <div>Loading...</div> : children}</>;
}
