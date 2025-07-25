import React, { useState } from 'react';
import { Menu, X, Phone, LogOut, ShoppingCart } from 'lucide-react';
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
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Barre colorée en haut */}
      <div className="h-1 bg-gradient-to-r from-blue-500 to-orange-500" style={{background: 'linear-gradient(to right, #0F97F6, #FF5722)'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4 lg:py-6">
          
          {/* Logo et nom - Logo plus gros et responsive */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('accueil')}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mr-3 sm:mr-4 lg:mr-6 shadow-lg group-hover:shadow-xl transition-all transform group-hover:scale-105" style={{background: 'linear-gradient(to right, #0F97F6, #FF5722)'}}>
              <img 
                src="https://i.imgur.com/gfhDZfm.png" 
                alt="Fun Event Logo" 
                className="w-14 h-14 sm:w-18 sm:h-18 lg:w-22 lg:h-22 rounded-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-gray-900 leading-tight">
                Fun Event
              </h1>
              <p className="text-xs sm:text-sm lg:text-base font-semibold text-gray-700 leading-tight truncate">
                Location de structures gonflables premium
              </p>
            </div>
          </div>

          {/* Navigation desktop - Mieux espacée */}
          <nav className="hidden xl:flex space-x-1 lg:space-x-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 lg:px-4 py-2 lg:py-2.5 rounded-lg text-sm lg:text-base font-semibold transition-all duration-300 transform hover:scale-105 ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Navigation medium screens - Plus compact */}
          <nav className="hidden lg:flex xl:hidden space-x-1">
            {menuItems.filter(item => ['accueil', 'catalogue', 'devis', 'contact'].includes(item.id)).map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-orange-50 hover:text-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
          </nav>

          {/* Actions desktop - Responsive */}
          <div className="hidden lg:flex items-center space-x-2 lg:space-x-4">
            {isAdmin && (
              <button
                onClick={logout}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-lg hover:bg-gray-100"
                title="Déconnexion"
              >
                <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
            )}
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-lg hover:bg-gray-100"
              title="Panier"
            >
              <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 lg:w-5 lg:h-5 flex items-center justify-center font-bold text-[10px] lg:text-xs">
                  {getItemCount()}
                </span>
              )}
            </button>
            
            <button 
              onClick={() => onNavigate('devis')}
              className="text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg transition-all font-semibold shadow-md hover:shadow-lg text-sm lg:text-base"
              style={{background: 'linear-gradient(to right, #0F97F6, #FF5722)'}}
            >
              <span className="hidden lg:inline">Devis Gratuit</span>
              <span className="lg:hidden">Devis</span>
            </button>
          </div>

          {/* Menu mobile - Actions compactes */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center text-gray-600 hover:text-gray-800 transition-colors p-2 rounded-lg hover:bg-gray-100"
              title="Panier"
            >
              <ShoppingCart className="w-5 h-5" />
              {getItemCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getItemCount()}
                </span>
              )}
            </button>
            
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Menu mobile ouvert - Responsive */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-100 mt-2">
            <div className="flex flex-col space-y-2 pt-4">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                    currentPage === item.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  style={currentPage === item.id ? {backgroundColor: '#0F97F6'} : {}}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="pt-4 border-t border-gray-100 space-y-2">
                {isAdmin && (
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors w-full"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    <span>Déconnexion</span>
                  </button>
                )}
                
                <button 
                  onClick={() => {
                    onNavigate('devis');
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-white px-6 py-3 rounded-lg transition-all font-semibold shadow-md text-sm"
                  style={{background: 'linear-gradient(to right, #0F97F6, #FF5722)'}}
                >
                  Devis Gratuit
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
    </header>
  );
};

export default Header;