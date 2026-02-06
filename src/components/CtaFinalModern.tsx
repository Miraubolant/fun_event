import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle, CheckCircle } from 'lucide-react';

const CtaFinalModern: React.FC = () => {
  const benefits = [
    'Devis gratuit sous 24h',
    'Livraison et installation incluses',
    'Structures certifiées et sécurisées',
    'Service disponible 7j/7',
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6 text-gray-900">
              Prêt à créer des
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                souvenirs magiques ?
              </span>
            </h2>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Rejoignez les <strong className="text-gray-900">500+ familles et entreprises</strong> qui nous ont fait confiance pour leurs événements en Île-de-France.
            </p>

            {/* Benefits */}
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/devis"
                className="group px-8 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-orange-500/40 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Demander mon devis gratuit
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="https://wa.me/33663528072"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-5 bg-green-500 text-white font-bold text-lg rounded-2xl hover:bg-green-600 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Right content - Contact card */}
          <div className="lg:pl-12">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50/50 rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Besoin d'un conseil ?
              </h3>

              <div className="space-y-4 mb-8">
                {/* Phone */}
                <a
                  href="tel:0663528072"
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:shadow-lg transition-all group border border-gray-100"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Appelez-nous</p>
                    <p className="text-xl font-bold text-gray-900">06 63 52 80 72</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/33663528072"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-white rounded-2xl hover:shadow-lg transition-all group border border-gray-100"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WhatsApp</p>
                    <p className="text-xl font-bold text-gray-900">Réponse rapide</p>
                  </div>
                </a>
              </div>

              {/* Hours */}
              <div className="text-center p-4 bg-white rounded-2xl border border-gray-100">
                <p className="text-sm text-gray-500 mb-1">Horaires d'ouverture</p>
                <p className="font-semibold text-gray-900">7j/7 de 8h à 20h</p>
              </div>

              {/* Trust badge */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Réponse garantie 24h</span>
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Sans engagement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaFinalModern;
