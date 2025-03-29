'use client';
// import LoginPage from '@/app/(auth)/login/page';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-screen text-center">
      {/* <LoginPage /> */}
      <div>
        <h1 className="text-2xl font-bold">Welcome to the Post Manager</h1>
        <p className="text-gray-600">Please log in to manage your posts and comments.</p>
        <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600" onClick={() => router.push('/login')}>Login</button>
      </div>
    </div>
  );
}
