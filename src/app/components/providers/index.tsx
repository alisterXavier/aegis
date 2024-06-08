'use client';
import { NextUIProvider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { SessionProvider, useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>
      <NextUI>{children}</NextUI>
    </SessionProvider>
  );
};

const NextUI = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === 'authenticated') router.replace('/dashboard');
  }, [router, session]);

  return <NextUIProvider navigate={router.push}>{children}</NextUIProvider>;
};