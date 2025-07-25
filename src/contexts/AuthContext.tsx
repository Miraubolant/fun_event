import React, { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Vérifier la session au chargement
  React.useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setSupabaseUser(session.user);
        await checkAdminStatus(session.user);
      }
      setLoading(false);
    };

    getSession();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        await checkAdminStatus(session.user);
      } else {
        setSupabaseUser(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: adminUser, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (adminUser && !error) {
        setUser({
          id: adminUser.id,
          email: adminUser.email,
          role: 'admin'
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Erreur lors de la vérification du statut admin:', error);
      setUser(null);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Erreur de connexion:', error.message);
        return false;
      }

      if (data.user) {
        setSupabaseUser(data.user);
        await checkAdminStatus(data.user);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      return false;
    }
  };

  const logout = () => {
    supabase.auth.signOut();
    setUser(null);
    setSupabaseUser(null);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, supabaseUser, login, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};