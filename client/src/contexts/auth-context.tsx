import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useSession, signIn, signOut } from '@/lib/auth-client';
import { setAuthHeadersGetter } from '@/lib/queryClient';

interface AuthContextType {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  getAuthHeaders: () => HeadersInit;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Use better-auth session hook
  const { data: session, isPending: isLoading } = useSession();

  const isAuthenticated = !!session?.user;
  const user = session?.user || null;

  // Set up auth headers getter for API requests
  useEffect(() => {
    setAuthHeadersGetter(getAuthHeaders);
  }, [session]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await signIn.email({
        email,
        password,
      });

      if (result.error) {
        console.error('Login error:', result.error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut();
      // Redirect to homepage after logout
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      // Still redirect even if logout fails
      window.location.href = '/';
    }
  };

  const getAuthHeaders = (): HeadersInit => {
    // Better-auth automatically handles session cookies
    // No need to manually add authorization headers
    // But we can still return empty headers for compatibility
    return {};
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    getAuthHeaders,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
