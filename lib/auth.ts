import { AuthData, AuthUser } from '@/types/product';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

export function saveSession(data: AuthData) {
  if (typeof document === 'undefined') return;
  document.cookie = `${TOKEN_KEY}=${data.token}; path=/; max-age=604800`;
  document.cookie = `role=${data.user.role}; path=/; max-age=604800`;
  localStorage.setItem(USER_KEY, JSON.stringify(data.user));
}

export function clearSession() {
  if (typeof document === 'undefined') return;
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
  document.cookie = `role=; path=/; max-age=0`;
  localStorage.removeItem(USER_KEY);
}

export function getToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function getCurrentUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
}
