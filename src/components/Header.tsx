import React, { useState } from 'react';
import { Menu, X, Phone, LogOut, ShoppingCart, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import CartModal from './CartModal';
import { Page } from '../types';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { isAdmin, logout } = useAuth();
  const { getItemCount } = useCart();

  const menuItems = [
    { id: 'accueil', label: 'Accueil' },
    { id: 'catalogue', label: 'Catalogue' },
    { id: 'evenements', label: 'Événements' },
    { id: 'faq', label: 'FAQ' },
    { id: 'devis', label: 'Devis' },
    { id: 'contact', label: 'Contact' },
  ].concat(isAdmin ? [{ id: 'admin', label: 'Admin' }] : []) as Array<{ id: Page; label: string }>;

  return (
    <header className="bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-100 sticky top-0 z-50">
      {/* Barre colorée animée en haut */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 animate-gradient-x"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 lg:py-6">
          
          {/* Logo et nom modernisé */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('accueil')}
          >
            <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mr-4 shadow-lg group-hover:shadow-2xl transition-all duration-300 transform group-hover:scale-110 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 p-0.5">
              <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                <img 
                  src="https://i.imgur.com/gfhDZfm.png" 
                  alt="Fun Event Logo" 
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl object-cover"
                />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-4 h-4 text-orange-500 animate-pulse" />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">
                Fun Event
              </h1>
              <p className="text-sm lg:text-base font-semibold text-gray-600 tracking-wide">
                Location de structures gonflables premium
              </p>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-700">
                Fun Event
              </h1>
            </div>
          </div>

          {/* Navigation desktop modernisée */}
          <nav className="hidden lg:flex items-center space-x-1 bg-gray-50/80 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/50">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${
                  currentPage === item.id
                    ? 'bg-white text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-600 shadow-lg ring-1 ring-gray-200'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white/70'
                }`}
              >
                {currentPage === item.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-orange-100/50 rounded-xl"></div>
                )}
                <span className="relative">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Actions desktop modernisées */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAdmin && (
              <button
                onClick={logout}
                className="flex items-center justify-center w-10 h-10 text-gray-500 hover:text-red-600 transition-all duration-300 rounded-xl hover:bg-red-50 group"
                title="Déconnexion"
              >
                <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </button>
            )}
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 text-gray-600 hover:text-blue-600 transition-all duration-300 rounded-xl hover:bg-blue-50 group"
              title="Panier"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {getItemCount()}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => onNavigate('devis')}
              className="relative text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden group bg-gradient-to-r from-blue-600 to-orange-600"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center">
                Devis Gratuit
                <Sparkles className="w-4 h-4 ml-2 group-hover:animate-spin" />
              </span>
            </button>
          </div>

          {/* Menu mobile modernisé */}
          <div className="lg:hidden flex items-center space-x-3">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 text-gray-600 hover:text-blue-600 transition-all duration-300 rounded-xl hover:bg-blue-50"
              title="Panier"
            >
              <ShoppingCart className="w-5 h-5" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {getItemCount()}
                </span>
              )}
            </button>
            
            <button
              className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? 
                <X className="w-6 h-6 text-gray-700" /> : 
                <Menu className="w-6 h-6 text-gray-700" />
              }
            </button>
          </div>
        </div>

        {/* Menu mobile ouvert modernisé */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-gray-100 mt-2 animate-fadeIn">
            <div className="flex flex-col space-y-3 pt-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left px-5 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-4 border-t border-gray-200 space-y-3">
                {isAdmin && (
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center text-gray-600 px-5 py-3 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-300 border border-gray-200"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    <span>Déconnexion</span>
                  </button>
                )}
                
                <button 
                  onClick={() => {
                    onNavigate('devis');
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-white px-6 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-r from-blue-600 to-orange-600 flex items-center justify-center"
                >
                  Devis Gratuit
                  <Sparkles className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        onNavigateToQuote={() => {
          setIsCartOpen(false);
          onNavigate('devis');
        }}
      />

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;