import React, { useState } from 'react';
import { Lock, User, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

interface AdminLoginProps {
  onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      onClose();
    } catch (error: any) {
      const errorMessage = error.message;
      
      if (errorMessage === 'Email not confirmed') {
        setError('Veuillez vérifier votre email et cliquer sur le lien de confirmation avant de vous connecter.');
      } else if (errorMessage === 'User is not an admin') {
        setError('Accès refusé. Seuls les administrateurs peuvent se connecter.');
      } else if (errorMessage.includes('Invalid login credentials')) {
        setError('Email ou mot de passe incorrect');
      } else {
        setError(errorMessage || 'Erreur lors de la connexion');
      }
    }
    
    setLoading(false);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation côté client
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    try {
      // Créer le compte utilisateur
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        // Attendre que l'utilisateur soit authentifié avant d'insérer dans admin_users
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Ajouter l'utilisateur à la table admin_users avec l'utilisateur authentifié
          const { error: adminError } = await supabase
            .from('admin_users')
            .insert({
              id: data.user.id,
              email: data.user.email || email,
              role: 'admin'
            });

          if (adminError) {
            console.error('Admin user creation error:', adminError);
            // Si l'insertion échoue, on peut quand même considérer que le compte est créé
            setError('Compte créé mais erreur lors de l\'ajout des permissions admin. Contactez l\'administrateur.');
          } else {
            setError('');
            alert('Compte administrateur créé avec succès ! Vous pouvez maintenant vous connecter.');
          }
        } else {
          setError('Compte créé mais session non établie. Essayez de vous connecter.');
        }
        
        setShowSignup(false);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.message?.includes('weak_password')) {
        setError('Le mot de passe doit contenir au moins 6 caractères');
      } else if (error.message?.includes('User already registered')) {
        setError('Un compte avec cet email existe déjà');
      } else {
        setError(error.message || 'Erreur lors de la création du compte');
      }
    }
    
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            {showSignup ? <UserPlus className="w-8 h-8 text-white" /> : <Lock className="w-8 h-8 text-white" />}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            {showSignup ? 'Créer un Compte Admin' : 'Connexion Admin'}
          </h2>
          <p className="text-gray-600">
            {showSignup ? 'Créez votre compte administrateur' : 'Accédez au panneau d\'administration'}
          </p>
        </div>

        <form onSubmit={showSignup ? handleSignup : handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="votre@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {showSignup && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-orange-500 text-white px-4 py-3 rounded-lg hover:from-blue-600 hover:to-orange-600 transition-all disabled:opacity-50"
            >
              {loading ? (showSignup ? 'Création...' : 'Connexion...') : (showSignup ? 'Créer le compte' : 'Se connecter')}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setShowSignup(!showSignup);
              setError('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
            }}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            {showSignup ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? Créer un compte admin'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;