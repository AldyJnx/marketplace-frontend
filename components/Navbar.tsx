'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuthUser } from '@/types/product';
import { getCurrentUser, clearSession } from '@/lib/auth';

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    clearSession();
    setUser(null);
    router.push('/login');
    router.refresh();
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-xl font-semibold text-gray-900">
            ProductStore
          </Link>
          <div className="flex gap-6 items-center">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              Productos
            </Link>
            {user?.role === 'ADMIN' && (
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition-colors">
                Admin
              </Link>
            )}
            {user ? (
              <>
                <span className="text-sm text-gray-600">{user.nombre}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    user.role === 'ADMIN'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {user.role}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <Link href="/login" className="text-gray-600 hover:text-gray-900 transition-colors">
                Ingresar
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
