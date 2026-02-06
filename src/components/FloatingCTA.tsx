import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, X } from 'lucide-react';

interface FloatingCTAProps {
  variant?: 'default' | 'compact';
}

export default function FloatingCTA({ variant = 'default' }: FloatingCTAProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Afficher après 300px de scroll
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'
      }`}
    >
      {variant === 'default' ? (
        // Version complète avec texte
        <div className="relative group">
          {/* Bouton principal */}
          <Link
            to="/devis"
            className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="pr-2">
              <p className="font-bold text-sm">Devis Gratuit</p>
              <p className="text-xs opacity-90">Réponse en 48h</p>
            </div>
          </Link>

          {/* Bouton fermer */}
          <button
            onClick={() => setIsDismissed(true)}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-800 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-900"
            aria-label="Fermer"
          >
            <X className="w-3 h-3" />
          </button>

          {/* Animation de pulsation */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full animate-ping opacity-20 -z-10" />
        </div>
      ) : (
        // Version compacte (juste l'icône)
        <div className="relative group">
          <Link
            to="/devis"
            className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-orange-500 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300"
            title="Demander un devis gratuit"
          >
            <Sparkles className="w-6 h-6" />
          </Link>

          <button
            onClick={() => setIsDismissed(true)}
            className="absolute -top-1 -right-1 w-5 h-5 bg-gray-800 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
            aria-label="Fermer"
          >
            <X className="w-3 h-3" />
          </button>

          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-orange-500 rounded-full animate-ping opacity-20 -z-10" />
        </div>
      )}
    </div>
  );
}
