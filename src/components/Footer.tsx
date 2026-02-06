import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Instagram, MessageSquare, Award, Heart, Send, ChevronRight } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const quickLinks = [
    { path: '/', label: 'Accueil' },
    { path: '/catalogue', label: 'Catalogue' },
    { path: '/galerie', label: 'Galerie' },
    { path: '/blog', label: 'Blog' },
    { path: '/faq', label: 'FAQ' },
    { path: '/devis', label: 'Devis' },
    { path: '/contact', label: 'Contact' }
  ];

  const services = [
    'Structures gonflables',
    'Châteaux gonflables',
    'Toboggans',
    'Parcours d\'obstacles',
    'Jeux aquatiques',
    'Animation événements'
  ];

  const departments = [
    { path: '/location/75', label: 'Paris (75)' },
    { path: '/location/77', label: 'Seine-et-Marne (77)' },
    { path: '/location/78', label: 'Yvelines (78)' },
    { path: '/location/91', label: 'Essonne (91)' },
    { path: '/location/92', label: 'Hauts-de-Seine (92)' },
    { path: '/location/93', label: 'Seine-Saint-Denis (93)' },
    { path: '/location/94', label: 'Val-de-Marne (94)' },
    { path: '/location/95', label: 'Val-d\'Oise (95)' }
  ];

  return (
    <footer className="relative" itemScope itemType="https://schema.org/WPFooter">
      
      {/* Main Footer */}
      <div className="bg-white text-gray-900 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

            {/* Brand */}
            <div className="lg:col-span-1">
              <Link
                to="/"
                className="flex items-center mb-6 cursor-pointer group"
              >
                <div className="w-14 h-14">
                  <img
                    src="https://i.imgur.com/gfhDZfm.png"
                    alt="Fun Event Logo"
                    className="w-full h-full object-cover rounded-xl"
                    itemProp="logo"
                  />
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-900" itemProp="name">Fun Event</h2>
                  <p className="text-gray-500 text-sm" itemProp="description">Créateurs de souvenirs</p>
                </div>
              </Link>

              <p className="text-gray-600 mb-6 leading-relaxed" itemProp="description">
                Spécialistes de la location de structures gonflables en Île-de-France.
                Nous rendons vos événements inoubliables depuis 2020.
              </p>

              {/* Social Media */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/fun_eventt/?igsh=dWtwMXUzYjJ6NTJi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 hover:bg-pink-500 hover:text-white text-gray-600 rounded-lg transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://www.tiktok.com/@fun_eventt?_t=ZN-8yd95VMbOJ4&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 hover:bg-gray-900 hover:text-white text-gray-600 rounded-lg transition-colors duration-200"
                  aria-label="TikTok"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/33663528072"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-100 hover:bg-green-500 hover:text-white text-gray-600 rounded-lg transition-colors duration-200"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-900">
                <ChevronRight className="w-5 h-5 text-blue-500" />
                Navigation
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-gray-900 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Zones d'intervention */}
            <div>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-900">
                <MapPin className="w-5 h-5 text-orange-500" />
                Zones d'intervention
              </h3>
              <ul className="space-y-2">
                {departments.map((dept) => (
                  <li key={dept.path}>
                    <Link
                      to={dept.path}
                      className="text-gray-600 hover:text-gray-900 hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2 text-sm"
                    >
                      <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                      {dept.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-900">
                <Mail className="w-5 h-5 text-blue-500" />
                Contact
              </h3>

              <div className="space-y-4 mb-6">
                <a
                  href="https://wa.me/33663528072"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  itemProp="telephone"
                >
                  <Phone className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900">06 63 52 80 72</p>
                    <p className="text-xs text-gray-500">WhatsApp disponible</p>
                  </div>
                </a>

                <a
                  href="mailto:contact@funevent.fr"
                  className="flex items-center gap-3 p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  itemProp="email"
                >
                  <Mail className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">contact@funevent.fr</p>
                    <p className="text-xs text-gray-500">Réponse sous 24h</p>
                  </div>
                </a>

                <div
                  className="flex items-center gap-3 p-3 bg-gray-100 rounded-lg"
                  itemScope
                  itemType="https://schema.org/PostalAddress"
                >
                  <MapPin className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900" itemProp="addressRegion">Île-de-France</p>
                    <p className="text-xs text-gray-500" itemProp="postalCode">75, 77, 78, 91, 92, 93, 94, 95</p>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="p-4 bg-gray-100 rounded-xl">
                <p className="text-sm text-gray-600 mb-3">Recevez nos offres exclusives</p>
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.fr"
                    className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 text-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    aria-label="S'inscrire"
                  >
                    {isSubscribed ? (
                      <Heart className="w-4 h-4 text-pink-400" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gray-200 my-10" />

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-500 text-sm">
              © 2026 <span className="text-gray-900 font-medium">Fun Event</span>. Tous droits réservés.
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <Link
                to="/mentions-legales"
                className="text-gray-500 hover:text-gray-900 transition-colors text-sm"
              >
                Mentions légales
              </Link>
              <Link
                to="/politique-confidentialite"
                className="text-gray-500 hover:text-gray-900 transition-colors text-sm"
              >
                Politique de confidentialité
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/fun_eventt/?igsh=dWtwMXUzYjJ6NTJi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.tiktok.com/@fun_eventt?_t=ZN-8yd95VMbOJ4&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-500 hover:text-gray-900 transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
