export interface Category {
  id: number;
  nombre: string;
}

export interface Product {
  id: number;
  nombre: string;
  precio: number;
  descripcion?: string;
  imageUrl?: string;
  CategoryId?: number;
  Category?: Category;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthUser {
  id: number;
  nombre: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
}

export interface AuthData {
  token: string;
  user: AuthUser;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
