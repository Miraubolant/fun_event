import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
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

  // Email de l'administrateur unique
  const ADMIN_EMAIL = 'admin@funevent.fr';

  useEffect(() => {
    // Vérifier si Supabase est configuré
    if (!supabase) {
      console.warn('Supabase non configuré pour l\'authentification');
      setLoading(false);
      return;
    }
    
    // Récupérer la session actuelle
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setSupabaseUser(session.user);
        if (session.user.email === ADMIN_EMAIL) {
          setUser({
            id: session.user.id,
            email: session.user.email,
            role: 'admin'
          });
        }
      }
      setLoading(false);
    });

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setSupabaseUser(session.user);
          if (session.user.email === ADMIN_EMAIL) {
            setUser({
              id: session.user.id,
              email: session.user.email,
              role: 'admin'
            });
          } else {
            // Si ce n'est pas l'admin, déconnecter
            await supabase.auth.signOut();
            setUser(null);
            setSupabaseUser(null);
          }
        } else {
          setUser(null);
          setSupabaseUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    if (!supabase) {
      console.error('Supabase non configuré');
      return false;
    }
    
    try {
      // Vérifier que c'est l'email admin
      if (email !== ADMIN_EMAIL) {
        throw new Error('Accès non autorisé');
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user && data.user.email === ADMIN_EMAIL) {
        setSupabaseUser(data.user);
        setUser({
          id: data.user.id,
          email: data.user.email,
          role: 'admin'
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error('Erreur de connexion:', error);
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    if (!supabase) {
      console.error('Supabase non configuré');
      return;
    }
    
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSupabaseUser(null);
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
    }
  };

  const isAdmin = user?.role === 'admin' && user?.email === ADMIN_EMAIL;

  return (
    <AuthContext.Provider value={{ 
      user, 
      supabaseUser, 
      login, 
      logout, 
      isAdmin, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};