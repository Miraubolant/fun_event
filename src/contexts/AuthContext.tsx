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
          const { data: adminUser, error: adminError } = await supabase
            .from('admin_users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          console.log('🔍 Requête admin_users:', { adminUser, adminError });
          
          if (adminUser) {
            console.log('✅ Utilisateur admin confirmé');
            setUser({
              id: session.user.id,
              email: session.user.email || '',
              role: 'admin'
            });
          } else {
            console.log('❌ Utilisateur non-admin ou erreur:', adminError?.message);
          }
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
        const { data: adminUser, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        console.log('🔍 Vérification admin après connexion:', { adminUser, adminError });
        
        if (adminUser) {
          console.log('✅ Admin confirmé après connexion');
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: 'admin'
          });
        } else {
          console.log('❌ Non-admin après connexion');
          setUser(null);
        }
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
        
        // Attendre que la session soit établie
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('🔍 Vérification du statut admin...');
        
        // Vérifier si l'utilisateur est admin avec une requête simple
        const { data: adminUser, error: adminError } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        console.log('📊 Résultat vérification admin:', { 
          adminUser, 
          adminError: adminError?.message,
          userId: data.user.id 
        });

        if (adminUser) {
          console.log('🎉 Utilisateur admin confirmé:', adminUser);
          setUser({
            id: data.user.id,
            email: data.user.email || '',
            role: 'admin'
          });
          return true;
        } else if (adminError) {
          console.error('❌ Erreur lors de la vérification admin:', adminError.message);
          // Essayer de créer l'enregistrement admin si c'est le bon email
          if (data.user.email === 'victor@mirault.com') {
            console.log('🔧 Tentative de création de l\'enregistrement admin...');
            const { data: insertData, error: insertError } = await supabase
              .from('admin_users')
              .insert({
                id: data.user.id,
                email: data.user.email,
                role: 'admin'
              })
              .select()
              .single();
            
            if (insertData && !insertError) {
              console.log('✅ Enregistrement admin créé avec succès');
              setUser({
                id: data.user.id,
                email: data.user.email || '',
                role: 'admin'
              });
              return true;
            } else {
              console.error('❌ Erreur création admin:', insertError?.message);
            }
          }
        } else {
          console.log('❌ Utilisateur non-admin');
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