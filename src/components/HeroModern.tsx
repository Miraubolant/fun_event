import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, Star, Shield, Truck, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStructures } from '../contexts/StructuresContext';
import SEOHead from './SEOHead';
import { Page } from '../types';

interface HeroModernProps {
  onNavigate: (page: Page) => void;
}

const HeroModern: React.FC<HeroModernProps> = ({ onNavigate }) => {
  const { structures } = useStructures();
  const [currentSlide, setCurrentSlide] = useState(0);

  const availableStructures = structures
    .filter(s => s.available)
    .sort((a, b) => (a.order || 1) - (b.order || 1))
    .slice(0, 6);

  // Auto-slide pour le carrousel mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(1, availableStructures.length));
    }, 4000);
    return () => clearInterval(interval);
  }, [availableStructures.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % availableStructures.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + availableStructures.length) % availableStructures.length);
  };

  // Navigate to structure page
  const navigateToStructure = (structureId: string) => {
    onNavigate(`structure-${structureId}` as Page);
  };

  return (
    <>
      <SEOHead
        title="Fun Event - Location Structures Gonflables Premium Île-de-France | Devis Gratuit"
        description="Spécialiste location structures gonflables premium en Île-de-France. Châteaux gonflables, toboggans géants, jeux aquatiques. Livraison gratuite Paris 75-95. Devis sous 24h."
        keywords="location structures gonflables Paris, château gonflable Île-de-France, toboggan gonflable géant, jeux gonflables anniversaire, animation enfant Paris"
        canonicalUrl="https://funevent.fr/"
        pageType="home"
      />

      {/* Hero Principal */}
      <section className="relative bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30 overflow-hidden">
        {/* Fond animé */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
          {/* Header Section */}
          <div className="text-center mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-green-700">Disponible 7j/7 en Île-de-France</span>
            </div>

            {/* Titre principal */}
            <h1 className="text-5xl md:text-7xl font-black leading-tight text-gray-900 mb-6">
              Transformez vos
              <span className="relative mx-3">
                <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  Événements
                </span>
              </span>
              <br />
              en <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Souvenirs Magiques</span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Louez des <strong className="text-gray-900">structures gonflables premium</strong> pour créer des moments inoubliables.
              Anniversaires, mariages, événements d'entreprise... Livraison et installation incluses.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={() => onNavigate('devis')}
                className="group relative px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/30 hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Devis Gratuit en 24h
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>

              <button
                onClick={() => onNavigate('catalogue')}
                className="group px-10 py-5 bg-white text-gray-800 font-bold text-lg rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 shadow-lg"
              >
                <Play className="w-5 h-5 text-blue-500" />
                Voir le Catalogue Complet
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex -space-x-3">
                  {[
                    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=100&h=100&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
                    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face'
                  ].map((url, i) => (
                    <img
                      key={i}
                      src={url}
                      alt={`Client satisfait ${i + 1}`}
                      className="w-10 h-10 rounded-full border-3 border-white object-cover shadow-md"
                    />
                  ))}
                </div>
                <div className="text-sm text-left">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-gray-900 font-bold ml-1">4.9/5</span>
                  </div>
                  <span className="text-gray-500">+500 clients satisfaits</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Showcase Structures - Full Width */}
        <div className="relative pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
              Découvrez nos <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">Structures Premium</span>
            </h2>

            {/* Desktop Grid - 6 structures */}
            <div className="hidden lg:grid grid-cols-3 gap-6">
              {availableStructures.map((structure, index) => (
                <div
                  key={structure.id}
                  onClick={() => navigateToStructure(structure.id)}
                  className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-200 cursor-pointer hover:scale-[1.03] transition-all duration-500 shadow-lg hover:shadow-2xl ${
                    index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                  }`}
                >
                  <div className={`overflow-hidden ${index === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
                    <img
                      src={structure.image}
                      alt={structure.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className={`font-bold text-white mb-1 ${index === 0 ? 'text-2xl' : 'text-lg'}`}>
                          {structure.name}
                        </h3>
                        <p className="text-white/80 text-sm">{structure.capacity} - {structure.age}</p>
                      </div>
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 rounded-xl shadow-lg">
                        <span className="text-white font-bold text-sm">
                          {structure.customPricing ? 'Sur devis' : `${structure.price}€`}
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500/20">
                    <div className="w-14 h-14 bg-white shadow-xl rounded-full flex items-center justify-center">
                      <ArrowRight className="w-7 h-7 text-blue-600" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tablet Grid - 4 structures */}
            <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
              {availableStructures.slice(0, 4).map((structure) => (
                <div
                  key={structure.id}
                  onClick={() => navigateToStructure(structure.id)}
                  className="group relative bg-white rounded-3xl overflow-hidden border border-gray-200 cursor-pointer hover:scale-[1.03] transition-all duration-500 shadow-lg hover:shadow-2xl"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={structure.image}
                      alt={structure.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{structure.name}</h3>
                        <p className="text-white/80 text-sm">{structure.capacity}</p>
                      </div>
                      <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1.5 rounded-xl shadow-lg">
                        <span className="text-white font-bold text-sm">
                          {structure.customPricing ? 'Sur devis' : `${structure.price}€`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Carousel */}
            <div className="md:hidden relative">
              <div className="overflow-hidden rounded-3xl">
                <div
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {availableStructures.map((structure) => (
                    <div
                      key={structure.id}
                      className="w-full flex-shrink-0 px-2"
                    >
                      <div
                        onClick={() => navigateToStructure(structure.id)}
                        className="relative bg-white rounded-3xl overflow-hidden border border-gray-200 cursor-pointer shadow-lg"
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={structure.image}
                            alt={structure.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <div className="flex items-end justify-between">
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1">{structure.name}</h3>
                              <p className="text-white/80 text-sm">{structure.capacity}</p>
                            </div>
                            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 rounded-xl shadow-lg">
                              <span className="text-white font-bold">
                                {structure.customPricing ? 'Sur devis' : `${structure.price}€`}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation mobile */}
              {availableStructures.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center"
                  >
                    <ChevronLeft className="w-6 h-6 text-gray-700" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center"
                  >
                    <ChevronRight className="w-6 h-6 text-gray-700" />
                  </button>

                  {/* Dots */}
                  <div className="flex justify-center gap-2 mt-4">
                    {availableStructures.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentSlide ? 'bg-orange-500 w-6' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* CTA Catalogue */}
            <div className="text-center mt-10">
              <button
                onClick={() => onNavigate('catalogue')}
                className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                style={{ background: 'linear-gradient(to right, #0F97F6, #0B7BC9)' }}
              >
                Voir toutes nos structures
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Avantages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Sécurité Certifiée', desc: 'Normes NF EN 14960', color: 'blue' },
              { icon: Truck, title: 'Livraison Gratuite', desc: 'Toute Île-de-France', color: 'orange' },
              { icon: Clock, title: 'Réponse 24h', desc: 'Devis ultra-rapide', color: 'green' },
              { icon: Users, title: 'Service 7j/7', desc: 'Toujours disponible', color: 'purple' },
            ].map((item, index) => (
              <div key={index} className="group text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-${item.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-8 h-8 text-${item.color}-600`} />
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroModern;
