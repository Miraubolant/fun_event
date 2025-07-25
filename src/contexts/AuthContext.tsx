import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface AuthContextType {
  user: SupabaseUser | null;
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
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Récupérer la session actuelle
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        await checkAdminStatus(session.user.id);
      }
      setLoading(false);
    };

    getSession();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user);
          await checkAdminStatus(session.user.id);
        } else {
          setUser(null);
          setIsAdmin(false);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkAdminStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', userId)
        .single();

      if (error) {
        console.log('Supabase non configuré ou utilisateur non admin:', error);
        setIsAdmin(false);
        return;
      }

      setIsAdmin(data?.role === 'admin');
    } catch (error) {
      console.log('Supabase non configuré:', error);
      setIsAdmin(false);
    }
  };
  
  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('AuthContext: Tentative de connexion pour', email);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Erreur Supabase auth:', error.message);
        return false;
      }

      if (data.user) {
        console.log('Utilisateur connecté:', data.user.id);
        setUser(data.user);
        await checkAdminStatus(data.user.id);
        return true;
      }

      console.log('Aucun utilisateur retourné');
      return false;
    } catch (error) {
        console.log('Erreur lors de la vérification admin:', error.message);
      return false;
    }
  };

      console.log('Données admin récupérées:', data);
  const logout = () => {
      console.log('Statut admin défini:', data?.role === 'admin');
    console.log('Vérification du statut admin pour:', userId);
      console.log('Erreur catch admin check:', error);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};