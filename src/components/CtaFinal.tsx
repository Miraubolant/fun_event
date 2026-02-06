import React from 'react';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { Page } from '../types';

interface CtaFinalProps {
  onNavigate: (page: Page) => void;
}

const CtaFinal: React.FC<CtaFinalProps> = ({ onNavigate }) => {
  return (
    <section className="py-24 bg-gradient-to-br from-white via-blue-50/30 to-orange-50/20 text-gray-900 relative overflow-hidden">
      {/* Animations de fond harmonisées */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-blue-100/30 to-blue-200/15 rounded-full animate-float blur-sm"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-orange-100/30 to-orange-200/15 rounded-full animate-bounce-slow blur-sm"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-purple-100/25 to-purple-200/10 rounded-full animate-pulse-slow delay-1000 blur-sm"></div>
        <div className="absolute top-20 right-1/4 w-28 h-28 bg-gradient-to-br from-green-100/25 to-green-200/10 rounded-full animate-wiggle blur-sm"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight tracking-tight">
            Prêt à Créer des Souvenirs <span className="text-orange-500">Inoubliables</span> ?
          </h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 max-w-5xl mx-auto shadow-xl border border-white/20 mb-8">
            <p className="text-2xl md:text-3xl mb-4 text-gray-800 font-bold max-w-4xl mx-auto">
            Transformez votre événement en moment magique avec nos structures gonflables premium
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Devis gratuit sous 48h • Livraison incluse • Service 7j/7 dans toute l'Île-de-France
            </p>
          </div>
        </div>

        {/* Boutons d'action harmonisés */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-16">
          <button
            onClick={() => onNavigate('devis')}
            className="group text-white px-12 py-5 rounded-full font-bold text-xl transition-all duration-500 transform hover:scale-110 shadow-2xl flex items-center backdrop-blur-sm border border-white/20"
            style={{background: 'linear-gradient(to right, #0F97F6, #FF5722)'}}
            onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #0E87E0, #E64A19)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #0F97F6, #FF5722)'}
          >
            <ArrowRight className="w-6 h-6 mr-4 group-hover:translate-x-2 transition-transform duration-300" />
            Demander un Devis Gratuit
          </button>
          <a
            href="https://wa.me/33663528072"
            target="_blank"
            rel="noopener noreferrer"
            className="group border-2 px-12 py-5 rounded-full font-bold text-xl transition-all duration-500 transform hover:scale-110 flex items-center hover:shadow-xl backdrop-blur-sm bg-white/50"
            style={{borderColor: '#0F97F6', color: '#0F97F6'}}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#0F97F6';
              e.currentTarget.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
              e.currentTarget.style.color = '#0F97F6';
            }}
          >
            <MessageCircle className="w-6 h-6 mr-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
            WhatsApp : 06 63 52 80 72
          </a>
        </div>

        {/* Contact rapide harmonisé */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 max-w-4xl mx-auto shadow-2xl border border-white/50">
          <h3 className="text-3xl font-bold mb-6">Besoin d'un conseil personnalisé ?</h3>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Notre équipe d'experts vous accompagne dans le choix des structures parfaites pour votre événement
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a
              href="tel:0663528072"
              className="text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 flex items-center justify-center shadow-xl backdrop-blur-sm border border-white/20"
              style={{background: 'linear-gradient(to right, #FF5722, #E64A19)'}}
              onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #E64A19, #D84315)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #FF5722, #E64A19)'}
            >
              <Phone className="w-6 h-6 mr-3" />
              Appeler maintenant
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="text-white px-10 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-xl backdrop-blur-sm border border-white/20"
              style={{background: 'linear-gradient(to right, #0F97F6, #0E87E0)'}}
              onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #0E87E0, #0D77CC)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #0F97F6, #0E87E0)'}
            >
              Formulaire de contact
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaFinal;
