'use client';

import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/posts" className="text-2xl font-bold">
          Post Manager
        </Link>
        <nav>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {user?.username}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;