import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import Events from './components/Events';
import FAQ from './components/FAQ';
import Quote from './components/Quote';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LegalNotice from './components/LegalNotice';
import PrivacyPolicy from './components/PrivacyPolicy';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { StructuresProvider } from './contexts/StructuresContext';
import { CartProvider } from './contexts/CartContext';
import { Page } from './types';

const AppContent: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('accueil');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement de Fun Event...</p>
        </div>
      </div>
    );
  }

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
    // Scroll automatiquement en haut de la page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'accueil':
        return (
          <>
            <Hero onNavigate={handleNavigate} />
          </>
        );
      case 'catalogue':
        return <Catalog />;
      case 'evenements':
        return <Events />;
      case 'faq':
        return <FAQ />;
      case 'devis':
        return <Quote />;
      case 'contact':
        return <Contact />;
      case 'mentions-legales':
        return <LegalNotice />;
      case 'politique-confidentialite':
        return <PrivacyPolicy />;
      case 'admin':
        return isAdmin ? <AdminPanel /> : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={handleNavigate} />
      
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
      
      {renderPage()}
      <Footer onNavigate={handleNavigate} />
      
      {showAdminLogin && (
        <AdminLogin onClose={() => setShowAdminLogin(false)} />
      )}
    </div>
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