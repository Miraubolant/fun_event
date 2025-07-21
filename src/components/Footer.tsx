import React from 'react';
import { Phone, Mail, MapPin, Instagram, MessageSquare, Star, Award, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo et description */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mr-4 shadow-lg" style={{ background: 'linear-gradient(to right, #0F97F6, #FF5722)' }}>
                <img 
                  src="/logo/cropped-thumbnail_Logo_prtit_fond-bleu.png" 
                  alt="Fun Event Logo" 
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Fun Event</h2>
                <p className="text-gray-600">Location de structures gonflables</p>
              </div>
            </div>
            <p className="text-gray-600 mb-6 max-w-md leading-relaxed">
              🎪 Nous créons des moments magiques et festifs pour tous vos événements en Île-de-France. 
              Des souvenirs inoubliables garantis ! ✨
            </p>
            
            {/* Réseaux sociaux */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://instagram.com/FUN_EVENT" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-pink-500 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://snapchat.com/add/FUN_EVENTT" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-yellow-500 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-6 h-6 bg-yellow-400 rounded-sm flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                </div>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">Navigation</h3>
            <ul className="space-y-2">
              {[
                { id: 'accueil', label: 'Accueil' },
                { id: 'catalogue', label: 'Catalogue' },
                { id: 'faq', label: 'FAQ' },
                { id: 'devis', label: 'Devis' },
                { id: 'contact', label: 'Contact' }
              ].map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-gray-600 hover:text-blue-600 transition-all hover:translate-x-2 block py-1"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6 text-gray-900">Contact</h3>
            <div className="space-y-4">
              <a 
                href="https://wa.me/33663528072"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 hover:text-green-600 transition-all hover:translate-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <MessageSquare className="w-5 h-5 mr-3 text-green-500" />
                06 63 52 80 72 (WhatsApp)
              </a>
              <a 
                href="mailto:contact@funevent.fr"
                className="flex items-center text-gray-600 hover:text-blue-600 transition-all hover:translate-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <Mail className="w-5 h-5 mr-3 text-blue-500" />
                contact@funevent.fr
              </a>
              <div className="flex items-start text-gray-600 p-2 rounded-lg hover:bg-gray-100 transition-all">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-red-500" />
                <div>
                  <p>Toute l'Île-de-France</p>
                  <p className="text-sm text-gray-500">75, 77, 78, 91, 92, 93, 94, 95</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-8"></div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 <span className="font-bold text-gray-900">Fun Event</span>. Tous droits réservés.
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com/FUN_EVENT" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-pink-500 transition-all transform hover:scale-110 p-2 rounded-full hover:bg-gray-100"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://snapchat.com/add/FUN_EVENTT" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-yellow-500 transition-all transform hover:scale-110 p-2 rounded-full hover:bg-gray-100"
              >
                <div className="w-5 h-5 bg-yellow-400 rounded-sm flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-sm"></div>
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm mt-6 pt-4 border-t border-gray-200">
          <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
            Mentions légales
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
            CGV
          </a>
          <a href="#" className="text-gray-500 hover:text-blue-600 transition-colors">
            Politique de confidentialité
          </a>
        </div>
      </div>

      {/* Bande de message simplifiée */}
      <div className="bg-gradient-to-r from-blue-500 to-orange-500 text-white text-center py-4">
        <p className="font-bold animate-pulse">
          🎉 Devis gratuit sous 48h - Service disponible 7j/7 - WhatsApp : 06 63 52 80 72 🎉
        </p>
      </div>
    </footer>
  );
};

export default Footer;