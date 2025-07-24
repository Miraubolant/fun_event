import React, { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';
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
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setSupabaseUser(session.user);
          
          // Vérifier si l'utilisateur est admin
          const { data: adminData } = await supabase
            .from('admin_users')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          if (adminData) {
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              role: 'admin'
            });
          }
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        
        // Vérifier si l'utilisateur est admin
        const { data: adminData } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (adminData) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: 'admin'
          });
        }
      } else {
        setSupabaseUser(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Login error:', error);
        throw new Error(error.message);
      }

      if (data.user) {
        // Vérifier si l'utilisateur est admin
        const { data: adminData } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (adminData) {
          setSupabaseUser(data.user);
          setUser({
            id: data.user.id,
            email: data.user.email || '',
            role: 'admin'
          });
          return true;
        } else {
          // Déconnecter si pas admin
          await supabase.auth.signOut();
          throw new Error('User is not an admin');
        }
      }
      
      throw new Error('Authentication failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSupabaseUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, supabaseUser, login, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};