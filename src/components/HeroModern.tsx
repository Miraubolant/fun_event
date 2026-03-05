import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Star, Shield, Truck, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStructures } from '../contexts/StructuresContext';
import SEOHead from './SEOHead';
import { generateSlug } from '../utils/generateSlug';

const HeroModern: React.FC = () => {
  const navigate = useNavigate();
  const { structures } = useStructures();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroImageIndex, setHeroImageIndex] = useState(0);
  const [prevHeroIndex, setPrevHeroIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const availableStructures = structures
    .filter(s => s.available)
    .sort((a, b) => (a.order || 1) - (b.order || 1))
    .slice(0, 6);

  const heroImages = availableStructures.map(s => s.image);

  const transitionHero = useCallback(() => {
    if (heroImages.length <= 1) return;
    setPrevHeroIndex(heroImageIndex);
    setIsTransitioning(true);
    setHeroImageIndex((prev) => (prev + 1) % heroImages.length);
    setTimeout(() => setIsTransitioning(false), 1200);
  }, [heroImageIndex, heroImages.length]);

  // Auto-slide hero background
  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(transitionHero, 6000);
    return () => clearInterval(interval);
  }, [transitionHero, heroImages.length]);

  // Auto-slide mobile carousel
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

  const navigateToStructure = (structureName: string) => {
    navigate(`/structure/${generateSlug(structureName)}`);
  };

  return (
    <>
      <style>{`
        @keyframes heroScale {
          from { transform: scale(1.0); }
          to { transform: scale(1.08); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .hero-img-active {
          animation: heroScale 7s ease-out forwards;
        }
        .hero-img-prev {
          animation: none;
        }
        .hero-fade-enter {
          animation: fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .hero-fade-delay-1 { animation-delay: 0.1s; opacity: 0; }
        .hero-fade-delay-2 { animation-delay: 0.25s; opacity: 0; }
        .hero-fade-delay-3 { animation-delay: 0.4s; opacity: 0; }
        .hero-fade-delay-4 { animation-delay: 0.55s; opacity: 0; }
        .hero-progress {
          animation: heroProgress 6s linear forwards;
        }
        @keyframes heroProgress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .shimmer-text {
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
      `}</style>

      <SEOHead
        title="Fun Event - Location Structures Gonflables Île-de-France | Devis Gratuit"
        description="Location de structures gonflables, photobooth et animations en Île-de-France. Livraison et installation incluses. Devis gratuit sous 24h."
        keywords="location structures gonflables Paris, château gonflable Île-de-France, toboggan gonflable géant, animation événement, photobooth"
        canonicalUrl="https://fun-event.fr/"
        pageType="home"
      />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">

        {/* Background images with Ken Burns */}
        <div className="absolute inset-0">
          {heroImages.length > 0 && (
            <>
              {/* Previous image (fading out) */}
              {isTransitioning && (
                <img
                  key={`prev-${prevHeroIndex}`}
                  src={heroImages[prevHeroIndex]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover hero-img-prev"
                  style={{ zIndex: 1 }}
                />
              )}
              {/* Active image (fading in + Ken Burns) */}
              <img
                key={`active-${heroImageIndex}`}
                src={heroImages[heroImageIndex]}
                alt={availableStructures[heroImageIndex]?.name || 'Structure gonflable'}
                className={`absolute inset-0 w-full h-full object-cover hero-img-active transition-opacity duration-1000 ${
                  isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
                style={{ zIndex: 2 }}
                onLoad={(e) => {
                  if (isTransitioning) {
                    requestAnimationFrame(() => {
                      (e.target as HTMLImageElement).style.opacity = '1';
                    });
                  }
                }}
              />
            </>
          )}

          {/* Overlay gradient — diagonal for depth */}
          <div
            className="absolute inset-0"
            style={{
              zIndex: 3,
              background: 'linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.25) 100%)',
            }}
          />

          {/* Subtle blue/orange tint at edges */}
          <div className="absolute inset-0" style={{ zIndex: 4 }}>
            <div className="absolute bottom-0 left-0 w-[40rem] h-[30rem] bg-blue-600/10 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3" />
            <div className="absolute top-0 right-0 w-[30rem] h-[25rem] bg-orange-500/10 rounded-full blur-[100px] translate-x-1/4 -translate-y-1/4" />
          </div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24" style={{ zIndex: 10 }}>
          <div className="max-w-3xl">

            {/* Badge */}
            <div className="hero-fade-enter hero-fade-delay-1 inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/15 mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
              </span>
              <span className="text-sm font-semibold text-white/95 tracking-wide">Disponible 7j/7 en Île-de-France</span>
            </div>

            {/* Headline */}
            <h1 className="hero-fade-enter hero-fade-delay-2 text-[2.75rem] sm:text-6xl md:text-7xl font-black leading-[1.08] text-white mb-6 tracking-tight">
              Transformez vos{' '}
              <span className="shimmer-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
                événements
              </span>
              <br />
              en{' '}
              <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                moments inoubliables
              </span>
            </h1>

            {/* Subtitle */}
            <p className="hero-fade-enter hero-fade-delay-3 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed mb-10">
              Location de structures gonflables, photobooth et animations pour tous vos événements.
            </p>

            {/* CTAs */}
            <div className="hero-fade-enter hero-fade-delay-4 flex flex-col sm:flex-row gap-4 mb-10">
              <Link
                to="/devis"
                className="group relative px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_-12px_rgba(249,115,22,0.45)] hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Devis Gratuit en 24h
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Link>

              <Link
                to="/catalogue"
                className="group px-10 py-5 bg-white/10 backdrop-blur-md text-white font-bold text-lg rounded-2xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" />
                Découvrir nos structures
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="hero-fade-enter hero-fade-delay-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15">
                <div className="flex -space-x-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-white/90">
                  <span className="font-bold text-white">5/5</span> — 7 avis Google
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15">
                <span className="text-sm font-semibold text-white/90">100% clients satisfaits</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide progress bar */}
        {heroImages.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10" style={{ zIndex: 10 }}>
            <div
              key={heroImageIndex}
              className="h-full bg-gradient-to-r from-blue-400 to-orange-400 hero-progress"
            />
          </div>
        )}

        {/* Image indicator dots */}
        {heroImages.length > 1 && (
          <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-2" style={{ zIndex: 10 }}>
            {heroImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrevHeroIndex(heroImageIndex);
                  setIsTransitioning(true);
                  setHeroImageIndex(idx);
                  setTimeout(() => setIsTransitioning(false), 1200);
                }}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  idx === heroImageIndex
                    ? 'w-8 bg-white'
                    : 'w-1.5 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Image ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* ═══════════ STRUCTURES SHOWCASE ═══════════ */}
      <section className="py-16 bg-gradient-to-br from-white via-blue-50/30 to-orange-50/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">
            Découvrir nos <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">structures gonflables</span>
          </h2>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {availableStructures.map((structure, index) => (
              <div
                key={structure.id}
                onClick={() => navigateToStructure(structure.name)}
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
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
                        {structure.customPricing ? 'Sur devis' : `À partir de ${structure.price}€`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-blue-500/20">
                  <div className="w-14 h-14 bg-white shadow-xl rounded-full flex items-center justify-center">
                    <ArrowRight className="w-7 h-7 text-blue-600" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tablet Grid */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
            {availableStructures.slice(0, 4).map((structure) => (
              <div
                key={structure.id}
                onClick={() => navigateToStructure(structure.name)}
                className="group relative bg-white rounded-3xl overflow-hidden border border-gray-200 cursor-pointer hover:scale-[1.03] transition-all duration-500 shadow-lg hover:shadow-2xl"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={structure.image}
                    alt={structure.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{structure.name}</h3>
                      <p className="text-white/80 text-sm">{structure.capacity}</p>
                    </div>
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-1.5 rounded-xl shadow-lg">
                      <span className="text-white font-bold text-sm">
                        {structure.customPricing ? 'Sur devis' : `À partir de ${structure.price}€`}
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
                  <div key={structure.id} className="w-full flex-shrink-0 px-2">
                    <div
                      onClick={() => navigateToStructure(structure.name)}
                      className="relative bg-white rounded-3xl overflow-hidden border border-gray-200 cursor-pointer shadow-lg"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={structure.image}
                          alt={structure.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-end justify-between">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{structure.name}</h3>
                            <p className="text-white/80 text-sm">{structure.capacity}</p>
                          </div>
                          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 rounded-xl shadow-lg">
                            <span className="text-white font-bold">
                              {structure.customPricing ? 'Sur devis' : `À partir de ${structure.price}€`}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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

          <div className="text-center mt-10">
            <Link
              to="/catalogue"
              className="inline-flex items-center gap-2 px-8 py-4 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              style={{ background: 'linear-gradient(to right, #0F97F6, #0B7BC9)' }}
            >
              Voir toutes nos structures
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════ AVANTAGES ═══════════ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'Sécurité Certifiée', desc: 'Normes NF EN 14960', color: 'blue' },
              { icon: Truck, title: 'Livraison & Installation', desc: 'Île-de-France et régions voisines', color: 'orange' },
              { icon: Clock, title: 'Réponse sous 24h', desc: 'Devis rapide et gratuit', color: 'green' },
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
