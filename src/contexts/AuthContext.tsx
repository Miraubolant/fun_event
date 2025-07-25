import React, { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
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
  const [loading, setLoading] = useState(true);

  const checkAdminStatus = async (userId: string) => {
    try {
      console.log('🔍 Vérification du statut admin pour:', userId);
      
      // Vérifier d'abord si l'utilisateur est connecté
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        console.log('❌ Pas de session active');
        return false;
      }
      
      const { data: adminUser, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('id', userId)
        .single();

      console.log('🔍 Résultat vérification admin:', { 
        adminUser, 
        adminError: adminError?.message,
        userId 
      });
      
      if (adminUser) {
        console.log('✅ Utilisateur admin confirmé:', adminUser);
        setUser({
          id: userId,
          email: adminUser.email || '',
          role: 'admin'
        });
        return true;
      } else if (adminError && adminError.code !== 'PGRST116') {
        console.error('❌ Erreur lors de la vérification admin:', adminError.message);
        return false;
      } else {
        console.log('❌ Utilisateur non-admin ou non trouvé');
        return false;
      }
    } catch (error) {
      console.error('❌ Erreur lors de checkAdminStatus:', error);
      return false;
    }
  };

  // Fonction pour créer un utilisateur admin
  const createAdminUser = async (userId: string, email: string) => {
    try {
      console.log('🔧 Tentative de création de l\'enregistrement admin...');
      const { data: insertData, error: insertError } = await supabase
        .from('admin_users')
        .insert({
          id: userId,
          email: email,
          role: 'admin'
        })
        .select()
        .single();
      
      if (insertData && !insertError) {
        console.log('✅ Enregistrement admin créé avec succès:', insertData);
        setUser({
          id: userId,
          email: email,
          role: 'admin'
        });
        return true;
      } else {
        console.error('❌ Erreur création admin:', insertError?.message);
        return false;
      }
    } catch (error) {
      console.error('❌ Erreur lors de createAdminUser:', error);
      return false;
    }
  };

  // Vérifier l'état d'authentification au chargement
  React.useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log('🔍 Vérification de l\'authentification...');
        const { data: { session } } = await supabase.auth.getSession();
        console.log('📋 Session actuelle:', session?.user?.id || 'Aucune session');
        
        if (session?.user) {
          console.log('👤 Utilisateur connecté, vérification du statut admin...');
          // Vérifier si l'utilisateur est admin
          const isAdmin = await checkAdminStatus(session.user.id);
          console.log('🎯 Résultat final checkAdminStatus:', isAdmin);
        } else {
          console.log('❌ Aucune session active');
        }
      } catch (error) {
        console.error('❌ Erreur lors de la vérification de l\'authentification:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 Changement d\'état auth:', event, session?.user?.id || 'Aucune session');
      
      if (event === 'SIGNED_IN' && session?.user) {
        console.log('✅ Connexion détectée, vérification admin...');
        // Vérifier si l'utilisateur est admin
        const isAdmin = await checkAdminStatus(session.user.id);
        console.log('🎯 Résultat final onAuthStateChange:', isAdmin);
      } else if (event === 'SIGNED_OUT') {
        console.log('🚪 Déconnexion détectée');
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('🔐 Tentative de connexion pour:', email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('❌ Erreur de connexion Supabase:', error.message);
        return false;
      }

      if (data.user) {
        console.log('✅ Utilisateur connecté:', data.user.id);
        console.log('📧 Email:', data.user.email);
        
        console.log('🔍 Vérification du statut admin...');
        
        // Vérifier le statut admin
        const isAdmin = await checkAdminStatus(data.user.id);
        
        if (isAdmin) {
          console.log('🎉 Connexion admin réussie !');
          return true;
        }
        
        // Si pas admin mais email autorisé, créer le compte admin
        if (data.user.email === 'victor@mirault.com') {
          console.log('📧 Email autorisé, création du compte admin...');
          const created = await createAdminUser(data.user.id, data.user.email);
          if (created) {
            console.log('🎉 Compte admin créé et connexion réussie !');
            return true;
          }
        } else {
          console.log('❌ Email non autorisé pour admin');
        }
        
        // Déconnecter si pas admin
        await supabase.auth.signOut();
        return false;
      }

      return false;
    } catch (error) {
      console.error('❌ Erreur lors de la connexion:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      console.log('🚪 Déconnexion...');
      await supabase.auth.signOut();
      setUser(null);
      console.log('✅ Déconnexion réussie');
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion:', error);
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};