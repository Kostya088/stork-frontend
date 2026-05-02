"use client";

import { useEffect, useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/loading";

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

  return <>{loading ? <Loading /> : children}</>;
}
