import { Suspense, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Settings } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { StructuresProvider } from './contexts/StructuresContext';
import { CartProvider } from './contexts/CartContext';
import AdminLogin from './components/AdminLogin';
import { router } from './router';

// Composant de chargement pendant le lazy loading
function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Chargement...</p>
      </div>
    </div>
  );
}

const AppContent = () => {
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { isAdmin } = useAuth();

  return (
    <>
      {/* Bouton admin flottant */}
      {!isAdmin && (
        <button
          onClick={() => setShowAdminLogin(true)}
          className="hidden md:flex fixed bottom-4 left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-40 items-center justify-center"
          title="Administration"
        >
          <Settings className="w-5 h-5" />
        </button>
      )}

      <Suspense fallback={<LoadingFallback />}>
        <RouterProvider router={router} />
      </Suspense>

      {showAdminLogin && (
        <AdminLogin onClose={() => setShowAdminLogin(false)} />
      )}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <StructuresProvider>
          <AppContent />
        </StructuresProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
