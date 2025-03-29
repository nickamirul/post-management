'use client';

import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="bg-white text-black p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/posts" className="text-2xl font-bold">
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: "flex",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Post<span className='text-orange-500'>Manager</span>
          </Typography>
        </Link>
        <nav>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span>Welcome, {user?.username}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
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