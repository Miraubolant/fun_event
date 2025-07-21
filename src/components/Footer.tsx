import React from 'react';
import { Phone, Mail, MapPin, Instagram, MessageSquare, Star, Award, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative overflow-hidden">
      {/* Fond dégradé principal */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-orange-600 text-white">
        {/* Formes décoratives en arrière-plan */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-300 rounded-full translate-x-40 translate-y-40"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-blue-300 rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Logo et description */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4 bg-white/20 backdrop-blur-sm border border-white/30 shadow-xl">
                  <img 
                    src="https://i.imgur.com/gfhDZfm.png" 
                    alt="Fun Event Logo" 
                    className="w-14 h-14 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-white">Fun Event</h2>
                  <p className="text-blue-100 text-lg">Location de structures gonflables</p>
                </div>
              </div>
              <p className="text-blue-50 mb-8 max-w-md leading-relaxed text-lg">
                🎪 Nous créons des moments magiques et festifs pour tous vos événements en Île-de-France. 
                Des souvenirs inoubliables garantis ! ✨
              </p>
              
              {/* Réseaux sociaux */}
              <div className="flex items-center space-x-4">
                <a 
                  href="https://instagram.com/FUN_EVENT" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-white/20 backdrop-blur-sm hover:bg-pink-500 transition-all p-3 rounded-xl border border-white/30 hover:scale-110 transform"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a 
                  href="https://snapchat.com/add/FUN_EVENTT" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-white/20 backdrop-blur-sm hover:bg-yellow-500 transition-all p-3 rounded-xl border border-white/30 hover:scale-110 transform"
                >
                  <div className="w-6 h-6 bg-yellow-400 rounded-sm flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                  </div>
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                <div className="w-8 h-8 bg-orange-500 rounded-lg mr-3 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded"></div>
                </div>
                Navigation
              </h3>
              <ul className="space-y-3">
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
                      className="text-blue-100 hover:text-white transition-all hover:translate-x-3 block py-2 px-3 rounded-lg hover:bg-white/20 backdrop-blur-sm text-lg"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white flex items-center">
                <div className="w-8 h-8 bg-orange-500 rounded-lg mr-3 flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                Contact
              </h3>
              <div className="space-y-4">
                <a 
                  href="https://wa.me/33663528072"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-100 hover:text-white transition-all hover:translate-x-3 p-3 rounded-xl hover:bg-white/20 backdrop-blur-sm border border-white/20"
                >
                  <MessageSquare className="w-6 h-6 mr-3 text-green-400" />
                  <div>
                    <div className="font-semibold">06 63 52 80 72</div>
                    <div className="text-sm text-blue-200">WhatsApp</div>
                  </div>
                </a>
                <a 
                  href="mailto:contact@funevent.fr"
                  className="flex items-center text-blue-100 hover:text-white transition-all hover:translate-x-3 p-3 rounded-xl hover:bg-white/20 backdrop-blur-sm border border-white/20"
                >
                  <Mail className="w-6 h-6 mr-3 text-blue-300" />
                  <div>
                    <div className="font-semibold">contact@funevent.fr</div>
                    <div className="text-sm text-blue-200">Email</div>
                  </div>
                </a>
                <div className="flex items-start text-blue-100 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <MapPin className="w-6 h-6 mr-3 mt-1 flex-shrink-0 text-orange-300" />
                  <div>
                    <p className="font-semibold text-white">Toute l'Île-de-France</p>
                    <p className="text-sm text-blue-200">75, 77, 78, 91, 92, 93, 94, 95</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Séparateur décoratif */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-12"></div>

          {/* Section copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-blue-100 text-lg mb-4 md:mb-0">
              © 2025 <span className="font-bold text-white">Fun Event</span>. Tous droits réservés.
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex space-x-4">
                <a 
                  href="https://instagram.com/FUN_EVENT" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-pink-400 transition-all transform hover:scale-125 p-2 rounded-full hover:bg-white/20"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://snapchat.com/add/FUN_EVENTT" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-200 hover:text-yellow-400 transition-all transform hover:scale-125 p-2 rounded-full hover:bg-white/20"
                >
                  <div className="w-5 h-5 bg-yellow-400 rounded-sm flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          
          {/* Liens légaux */}
          <div className="flex flex-wrap justify-center gap-8 text-lg mt-8 pt-6 border-t border-white/20">
            <a href="#" className="text-blue-200 hover:text-white transition-colors hover:underline">
              Mentions légales
            </a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors hover:underline">
              CGV
            </a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors hover:underline">
              Politique de confidentialité
            </a>
          </div>
        </div>
      </div>

      {/* Bande de message animée */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        <div className="relative text-center py-6">
          <p className="font-bold text-xl animate-bounce">
            🎉 Devis gratuit sous 48h - Service disponible 7j/7 - WhatsApp : 06 63 52 80 72 🎉
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;