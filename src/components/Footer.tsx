import React from 'react';
import { Phone, Mail, MapPin, Instagram, MessageSquare, Star, Award, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative overflow-hidden" itemScope itemType="https://schema.org/WPFooter">
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
                <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4 bg-white/20 backdrop-blur-sm border border-white/30 shadow-xl" itemScope itemType="https://schema.org/Organization">
                  <img 
                    src="https://i.imgur.com/gfhDZfm.png" 
                    alt="Fun Event Logo" 
                    className="w-14 h-14 rounded-full object-cover"
                    itemProp="logo"
                  />
                </div>
                <div>
                  <h2 className="text-4xl font-bold text-white" itemProp="name">Fun Event</h2>
                  <p className="text-blue-100 text-lg" itemProp="description">Location de structures gonflables</p>
                </div>
              </div>
              <p className="text-blue-50 mb-8 max-w-md leading-relaxed text-lg" itemProp="description">
                🎪 Nous créons des moments magiques et festifs pour tous vos événements en Île-de-France. 
                Des souvenirs inoubliables garantis ! ✨
              </p>
              
              {/* Réseaux sociaux */}
              <div className="flex items-center space-x-4">
                <a 
                  href="https://www.instagram.com/fun_eventt/?igsh=dWtwMXUzYjJ6NTJi" 
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
                  className="flex items-center bg-white/20 backdrop-blur-sm hover:bg-yellow-500 hover:text-white transition-all p-3 rounded-xl border border-white/30 hover:scale-110 transform"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
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
                  itemProp="telephone"
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
                  itemProp="email"
                >
                  <Mail className="w-6 h-6 mr-3 text-blue-300" />
                  <div>
                    <div className="font-semibold">contact@funevent.fr</div>
                    <div className="text-sm text-blue-200">Email</div>
                  </div>
                </a>
                <div className="flex items-start text-blue-100 p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20" itemScope itemType="https://schema.org/PostalAddress">
                  <MapPin className="w-6 h-6 mr-3 mt-1 flex-shrink-0 text-orange-300" />
                  <div>
                    <p className="font-semibold text-white" itemProp="addressRegion">Toute l'Île-de-France</p>
                    <p className="text-sm text-blue-200" itemProp="postalCode">75, 77, 78, 91, 92, 93, 94, 95</p>
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
                {activeSocialLinks.map((link) => {
                  const getHoverColor = (platform: string) => {
                    switch (platform.toLowerCase()) {
                      case 'instagram': return 'hover:text-pink-400';
                      case 'snapchat': return 'hover:text-yellow-400';
                      case 'facebook': return 'hover:text-blue-400';
                      case 'tiktok': return 'hover:text-white hover:bg-black/20';
                      case 'twitter': return 'hover:text-blue-300';
                      case 'youtube': return 'hover:text-red-400';
                      default: return 'hover:text-white';
                    }
                  };

                  const renderSmallIcon = (platform: string, icon: string) => {
                    if (platform.toLowerCase() === 'instagram') {
                      return <Instagram className="w-5 h-5" />;
                    } else if (platform.toLowerCase() === 'snapchat') {
                      return (
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                        </svg>
                      );
                    } else {
                      return <span className="text-lg">{icon}</span>;
                    }
                  };

                  return (
                    <a 
                      key={link.id}
                      href={link.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-blue-200 ${getHoverColor(link.platform)} transition-all transform hover:scale-125 p-2 rounded-full hover:bg-white/20`}
                      title={link.label}
                    >
                      {renderSmallIcon(link.platform, link.icon)}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Liens légaux */}
          <div className="flex flex-wrap justify-center gap-8 text-lg mt-8 pt-6 border-t border-white/20">
            <button 
              onClick={() => onNavigate('mentions-legales')}
              className="text-blue-200 hover:text-white transition-colors hover:underline"
            >
              Mentions légales
            </button>
            <button 
              onClick={() => onNavigate('politique-confidentialite')}
              className="text-blue-200 hover:text-white transition-colors hover:underline"
            >
              Politique de confidentialité
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;