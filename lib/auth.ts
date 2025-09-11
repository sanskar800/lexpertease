"use client";
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'client' | 'admin';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string, refreshToken: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Static AuthManager for utility functions
export class AuthManager {
  private static readonly TOKEN_KEY = 'token';
  private static readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private static readonly USER_KEY = 'user';

  static setAuthData(token: string, refreshToken: string, user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  static getAuthData(): { user: User | null; token: string | null; refreshToken: string | null } {
    if (typeof window === 'undefined') {
      return { user: null, token: null, refreshToken: null };
    }

    const token = localStorage.getItem(this.TOKEN_KEY);
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    const userStr = localStorage.getItem(this.USER_KEY);
    
    let user: User | null = null;
    if (userStr) {
      try {
        user = JSON.parse(userStr);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        this.clearAuthData();
      }
    }

    return { user, token, refreshToken };
  }

  static clearAuthData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.REFRESH_TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
  }

  static isAuthenticated(): boolean {
    const { token, user } = this.getAuthData();
    return !!(token && user);
  }

  static getToken(): string | null {
    return this.getAuthData().token;
  }

  static getUser(): User | null {
    return this.getAuthData().user;
  }

  static updateUser(user: User): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }
}

// Simple hook for authentication without context
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth data on mount
    const { user: storedUser } = AuthManager.getAuthData();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const login = (token: string, refreshToken: string, userData: User) => {
    AuthManager.setAuthData(token, refreshToken, userData);
    setUser(userData);
    // Navigate to home page
    window.location.href = '/';
  };

  const logout = () => {
    AuthManager.clearAuthData();
    setUser(null);
    // Navigate to home page
    window.location.href = '/';
  };

  return {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };
};

// Legacy hook for backward compatibility
export const useAuthHelpers = useAuth;