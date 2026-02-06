import React from 'react';
import { ArrowRight, Phone, CheckCircle, MessageCircle } from 'lucide-react';
import { Page } from '../types';

interface HowItWorksProps {
  onNavigate: (page: Page) => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/20 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Header */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-6">
            Location simple et rapide
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">
            Demandez votre devis, on s'occupe du reste !
          </p>

          {/* Points clés */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12">
            <div className="flex items-center gap-2 text-white">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="font-medium">Devis gratuit sous 24h</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="font-medium">Livraison & installation incluses</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="font-medium">Récupération en fin de journée</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => onNavigate('devis')}
              className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-2xl hover:shadow-xl hover:shadow-orange-500/30 transition-all duration-300 flex items-center gap-2 hover:scale-105"
            >
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="https://wa.me/33663528072"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white font-bold text-lg rounded-2xl hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
          </div>

          {/* Phone */}
          <div className="mt-8">
            <a
              href="tel:0663528072"
              className="inline-flex items-center gap-2 text-blue-200 hover:text-white font-medium transition-colors"
            >
              <Phone className="w-5 h-5" />
              Ou appelez-nous : 06 63 52 80 72
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
