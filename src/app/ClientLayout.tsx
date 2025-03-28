'use client';

import { usePathname } from 'next/navigation';
import Header from '../components/Header';
import { Providers } from '../lib/providers';

const ClientLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login' || pathname === '/';

  return (
    <Providers>
      {!isLoginPage && <Header />}
      <main className="min-h-screen bg-gray-100">{children}</main>
    </Providers>
  );
};

export default ClientLayout; 