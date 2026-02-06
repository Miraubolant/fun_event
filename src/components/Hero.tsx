import React from 'react';
import { ArrowRight, Shield, Truck, Clock, Star, Users, Award, Phone, MessageCircle, Ruler, Heart, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useStructures } from '../contexts/StructuresContext';
import { useAuth } from '../contexts/AuthContext';
import StructureModal from './StructureModal';
import SEOHead from './SEOHead';
import { Page } from '../types';
import { Structure, SocialLink } from '../types';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { structures, socialLinks, addSocialLink, updateSocialLink, deleteSocialLink } = useStructures();
  const { user, isAdmin } = useAuth();
  const [selectedStructure, setSelectedStructure] = React.useState<Structure | null>(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [imagesLoaded, setImagesLoaded] = React.useState<Set<string>>(new Set());
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  const [touchEnd, setTouchEnd] = React.useState<number | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  
  // Toutes les structures disponibles pour le carrousel
  const availableStructures = structures
    .filter(s => s.available)
    .sort((a, b) => (a.order || 1) - (b.order || 1));
  
  // Nombre d'éléments par slide selon la taille d'écran
  const [itemsPerSlide, setItemsPerSlide] = React.useState(3);
  
  // Fonction pour détecter la taille d'écran et ajuster le carrousel
  React.useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      let items;
      if (width < 768) {
        items = 1; // Mobile: 1 élément par slide
      } else if (width < 1024) {
        items = 2; // Tablet: 2 éléments par slide
      } else {
        items = 3; // Desktop: 3 éléments par slide
      }
      
      setItemsPerSlide(items);
      setCurrentSlide(0); // Reset à chaque changement de taille
    };
    
    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);
  
  // Reset du carrousel quand les structures changent
  React.useEffect(() => {
    setCurrentSlide(0);
  }, [availableStructures.length]);
  
  // Calcul du nombre total de slides
  const totalSlides = Math.max(1, Math.ceil(availableStructures.length / itemsPerSlide));
  
  // Distance minimale pour déclencher un swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    setTouchEnd(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
    setIsDragging(false);
  };
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  
  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  };
  
  // S'assurer que currentSlide reste valide
  React.useEffect(() => {
    if (currentSlide >= totalSlides) {
      setCurrentSlide(0);
    }
  }, [currentSlide, totalSlides]);

  const openModal = (structure: Structure) => {
    setSelectedStructure(structure);
  };

  const closeModal = () => {
    setSelectedStructure(null);
  };

  // Fonction pour précharger les images
  const preloadImage = (src: string) => {
    if (!imagesLoaded.has(src)) {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded(prev => new Set(prev).add(src));
      };
      img.src = src;
    }
  };

  // Précharger les images des structures visibles
  React.useEffect(() => {
    availableStructures.slice(0, 6).forEach(structure => {
      preloadImage(structure.image);
    });
  }, [availableStructures]);

  return (
    <>
      <SEOHead
        title="Fun Event - Location Structures Gonflables Premium Île-de-France | Devis Gratuit"
        description="Spécialiste location structures gonflables premium en Île-de-France. Châteaux gonflables, toboggans géants, jeux aquatiques. Livraison gratuite Paris 75-95. Devis sous 48h."
        keywords="location structures gonflables Paris, château gonflable Île-de-France, toboggan gonflable géant, jeux gonflables anniversaire, animation enfant Paris, location matériel festif 75 77 78 91 92 93 94 95"
        ogTitle="Fun Event - Structures Gonflables Premium pour Événements Magiques"
        ogDescription="Créez des moments inoubliables avec nos structures gonflables premium. Livraison gratuite en Île-de-France, installation incluse, service 7j/7."
        canonicalUrl="https://funevent.fr/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Fun Event",
          "description": "Location de structures gonflables premium pour événements en Île-de-France",
          "url": "https://funevent.fr",
          "telephone": "+33663528072",
          "email": "contact@funevent.fr",
          "logo": "https://i.imgur.com/gfhDZfm.png",
          "image": "https://i.imgur.com/gfhDZfm.png",
          "priceRange": "€€",
          "address": {
            "@type": "PostalAddress",
            "addressRegion": "Île-de-France",
            "addressCountry": "FR"
          },
          "areaServed": [
            { "@type": "City", "name": "Paris" },
            { "@type": "AdministrativeArea", "name": "Île-de-France" }
          ],
          "serviceType": "Location de structures gonflables",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Structures Gonflables Premium",
            "itemListElement": availableStructures.slice(0, 5).map((structure, index) => ({
              "@type": "Offer",
              "position": index + 1,
              "itemOffered": {
                "@type": "Product",
                "name": structure.name,
                "description": structure.description,
                "image": structure.image,
                "offers": {
                  "@type": "Offer",
                  "price": structure.price,
                  "priceCurrency": "EUR",
                  "availability": "https://schema.org/InStock"
                }
              }
            }))
          },
          "openingHours": "Mo-Su 08:00-20:00",
          "sameAs": [
            "https://instagram.com/FUN_EVENT",
            "https://snapchat.com/add/FUN_EVENTT"
          ]
        }}
      />
      {/* Hero Principal */}
      <main className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 text-gray-900 overflow-hidden min-h-screen">
        
        {/* Animations de fond modernisées */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-100/40 to-blue-200/20 rounded-full animate-float blur-sm"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-orange-100/40 to-orange-200/20 rounded-full animate-pulse-slow blur-sm"></div>
          <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-br from-blue-50/60 to-blue-100/30 rounded-full animate-bounce-slow delay-1000 blur-sm"></div>
          <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-gradient-to-br from-orange-50/50 to-orange-100/25 rounded-full animate-wiggle blur-sm"></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-br from-purple-100/30 to-purple-200/15 rounded-full animate-twinkle blur-sm"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Section Titre et Présentation */}
          <div className="text-center mb-20">
            <div className="animate-fade-in">
              <h1 className="text-6xl md:text-8xl font-black mb-10 leading-tight tracking-tight" itemProp="headline">
                <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent drop-shadow-sm">
                  Créez des Moments
                </span>
                <br />
                <span className="bg-gradient-to-r text-transparent bg-clip-text animate-pulse drop-shadow-lg" style={{backgroundImage: 'linear-gradient(135deg, #0F97F6, #FF5722, #0F97F6)'}}>
                  Magiques
                </span>
              </h1>
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 max-w-6xl mx-auto shadow-xl border border-white/20">
                <p className="text-2xl md:text-4xl mb-6 text-gray-800 leading-relaxed font-bold" itemProp="description">
                Des structures gonflables <span className="font-bold" style={{color: '#0F97F6'}}>premium</span> pour des événements
                <span className="font-bold text-orange-500"> festifs</span> et <span className="font-bold" style={{color: '#0F97F6'}}>inoubliables</span> dans toute l'Île-de-France
                </p>
                <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base text-gray-600">
                  <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                    Livraison gratuite
                  </div>
                  <div className="flex items-center bg-orange-50 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
                    Service 7j/7
                  </div>
                  <div className="flex items-center bg-green-50 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                    Devis sous 48h
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Structures en Bulles */}
          {availableStructures.length > 0 && (
            <div className="mb-24">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500">Structures</span> Premium
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Découvrez notre sélection de structures gonflables haut de gamme
                </p>
              </div>
              {/* Carrousel Container */}
              <div className="relative max-w-7xl mx-auto">
                {/* Navigation Buttons */}
                {totalSlides > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute -left-4 sm:-left-8 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-4 sm:p-5 shadow-2xl hover:shadow-3xl transition-all hover:scale-110 border border-white/50 hover:bg-white"
                    >
                      <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute -right-4 sm:-right-8 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-4 sm:p-5 shadow-2xl hover:shadow-3xl transition-all hover:scale-110 border border-white/50 hover:bg-white"
                    >
                      <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
                    </button>
                  </>
                )}
                
                {/* Carrousel Content */}
                <div className="overflow-hidden rounded-3xl">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {Array.from({ length: totalSlides }, (_, slideIndex) => (
                      <div key={slideIndex} className="w-full flex-shrink-0 px-6">
                        <div className={`grid gap-6 md:gap-10 ${
                          itemsPerSlide === 1 ? 'grid-cols-1' :
                          itemsPerSlide === 2 ? 'grid-cols-2' :
                          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        }`}>
                          {availableStructures
                            .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                            .map((structure) => (
                            <div 
                              key={structure.id}
                              className="group bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 overflow-hidden cursor-pointer w-full border border-white/50"
                              onClick={() => openModal(structure)}
                            >
                              {/* Image rectangulaire */}
                              <div className="relative">
                                <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-t-3xl">
                                  <img
                                    src={structure.image}
                                    alt={structure.name}
                                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${
                                      imagesLoaded.has(structure.image) ? 'opacity-100' : 'opacity-0'
                                    } ${isDragging ? 'pointer-events-none' : ''}`}
                                    loading="eager"
                                    onLoad={() => preloadImage(structure.image)}
                                    onError={(e) => {
                                      e.currentTarget.src = 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400';
                                    }}
                                  />
                                  {!imagesLoaded.has(structure.image) && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-orange-100 animate-pulse flex items-center justify-center">
                                      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                  )}
                                </div>
                                {/* Badge prix */}
                                <div className="absolute bottom-3 right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl">
                                  {structure.customPricing ? 'Prix sur Devis' : `${structure.price}€`}
                                </div>
                              </div>

                              {/* Description */}
                              <div className="px-6 pb-6">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-blue-600 transition-colors">
                                  {structure.name}
                                </h3>
                                
                                <div className="space-y-3 mb-6">
                                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                      <Ruler className="w-4 h-4 text-blue-600" />
                                    </div>
                                    <span>{structure.size}</span>
                                  </div>
                                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                                      <Users className="w-4 h-4 text-orange-600" />
                                    </div>
                                    <span>{structure.capacity}</span>
                                  </div>
                                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center mr-3">
                                      <Heart className="w-4 h-4 text-pink-600" />
                                    </div>
                                    <span>{structure.age}</span>
                                  </div>
                                </div>

                                <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                                  {structure.description.length > 100 
                                    ? structure.description.substring(0, 100) + '...' 
                                    : structure.description
                                  }
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Dots Indicators */}
                {totalSlides > 1 && (
                  <div className="flex justify-center mt-12 space-x-3 relative">
                    {/* Indicateur de swipe sur mobile */}
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 md:hidden">
                      <div className="flex items-center text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200/50">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        <span>Glissez</span>
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                    
                    {Array.from({ length: totalSlides }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                          currentSlide === index
                            ? 'bg-gradient-to-r from-blue-500 to-orange-500 scale-125 shadow-lg'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Boutons d'action principaux */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20 animate-slide-up">
            <button 
              onClick={() => onNavigate('catalogue')}
              className="group text-white px-12 py-5 rounded-full font-bold text-xl transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-3xl flex items-center animate-bounce-slow backdrop-blur-sm border border-white/20"
              style={{background: 'linear-gradient(to right, #0F97F6, #FF5722)'}}
              onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #0E87E0, #E64A19)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #0F97F6, #FF5722)'}
            >
              Découvrir toutes nos Structures
              <ArrowRight className="w-6 h-6 ml-4 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>

          {/* Stats harmonisées */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 max-w-7xl mx-auto animate-fade-in-up border border-white/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-xl">
                  <Shield className="w-10 h-10 text-white animate-pulse" />
                </div>
                <h3 className="text-4xl font-bold mb-3 text-gray-900">100%</h3>
                <p className="text-xl font-semibold text-gray-800 mb-2">Sécurisé</p>
                <p className="text-sm text-gray-600 leading-relaxed">Normes NF EN 14960</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-xl">
                  <Truck className="w-10 h-10 text-white animate-bounce" />
                </div>
                <h3 className="text-4xl font-bold mb-3 text-gray-900">Gratuit</h3>
                <p className="text-xl font-semibold text-gray-800 mb-2">Livraison</p>
                <p className="text-sm text-gray-600 leading-relaxed">Toute l'Île-de-France</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-xl">
                  <Clock className="w-10 h-10 text-white animate-spin-slow" />
                </div>
                <h3 className="text-4xl font-bold mb-3 text-gray-900">7j/7</h3>
                <p className="text-xl font-semibold text-gray-800 mb-2">Service</p>
                <p className="text-sm text-gray-600 leading-relaxed">Disponible toujours</p>
              </div>
              
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-xl">
                  <Star className="w-10 h-10 text-white animate-twinkle" />
                </div>
                <h3 className="text-4xl font-bold mb-3 text-gray-900">5★</h3>
                <p className="text-xl font-semibold text-gray-800 mb-2">Satisfaction</p>
                <p className="text-sm text-gray-600 leading-relaxed">Clients ravis</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Carrousel de photos */}
        <TrustedClientsSection 
          socialLinks={socialLinks} 
          isAdmin={isAdmin}
          addSocialLink={addSocialLink}
          updateSocialLink={updateSocialLink}
          deleteSocialLink={deleteSocialLink}
        />
        <PhotoCarousel />
        
        {/* Transition fluide vers la section suivante */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </main>

      {/* Message si aucune structure */}
      {availableStructures.length === 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Structures en Préparation</h2>
            <p className="text-lg text-gray-600 mb-8">
              Nos structures gonflables arrivent bientôt ! Contactez-nous pour plus d'informations.
            </p>
            <button 
              onClick={() => onNavigate('contact')}
              className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all"
            >
              Nous Contacter
            </button>
          </div>
        </section>
      )}

      {/* Modal pour les structures */}
      {selectedStructure && (
        <StructureModal
          structure={selectedStructure}
          isOpen={!!selectedStructure}
          onClose={closeModal}
        />
      )}
    </>
  );
};

// Composant PhotoCarousel
const PhotoCarousel: React.FC = () => {
  const { carouselPhotos, structures } = useStructures();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [itemsPerSlide, setItemsPerSlide] = React.useState(3);
  const [selectedStructure, setSelectedStructure] = React.useState<Structure | null>(null);
  const [imagesLoaded, setImagesLoaded] = React.useState<Set<string>>(new Set());
  
  // Trier les photos par ordre
  const sortedPhotos = [...carouselPhotos].sort((a, b) => a.order - b.order);
  
  // Fonction pour détecter la taille d'écran et ajuster le carrousel
  React.useEffect(() => {
    const updateItemsPerSlide = () => {
      const width = window.innerWidth;
      let items;
      if (width < 768) {
        items = 1; // Mobile: 1 élément par slide
      } else if (width < 1024) {
        items = 2; // Tablet: 2 éléments par slide
      } else {
        items = 3; // Desktop: 3 éléments par slide
      }
      
      setItemsPerSlide(items);
      setCurrentSlide(0); // Reset à chaque changement de taille
    };
    
    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, []);
  
  // Reset du carrousel quand les photos changent
  React.useEffect(() => {
    setCurrentSlide(0);
  }, [sortedPhotos.length]);
  
  // Calcul du nombre total de slides
  const totalSlides = Math.max(1, Math.ceil(sortedPhotos.length / itemsPerSlide));
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };
  
  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentSlide(index);
    }
  };
  
  // S'assurer que currentSlide reste valide
  React.useEffect(() => {
    if (currentSlide >= totalSlides) {
      setCurrentSlide(0);
    }
  }, [currentSlide, totalSlides]);

  const openStructureModal = (structure: Structure) => {
    setSelectedStructure(structure);
  };

  const closeStructureModal = () => {
    setSelectedStructure(null);
  };

  // Fonction pour précharger les images
  const preloadImage = (src: string) => {
    if (!imagesLoaded.has(src)) {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded(prev => new Set(prev).add(src));
      };
      img.src = src;
    }
  };

  // Précharger les images visibles
  React.useEffect(() => {
    sortedPhotos.slice(0, 6).forEach(photo => {
      preloadImage(photo.url);
    });
  }, [sortedPhotos]);

  if (sortedPhotos.length === 0) return null;

  return (
    <>
      <section className="py-20 bg-gradient-to-br from-white via-blue-50/20 to-orange-50/10 relative overflow-hidden">
        {/* Animations de fond */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-100/20 to-blue-200/10 rounded-full animate-float blur-sm"></div>
          <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-orange-100/20 to-orange-200/10 rounded-full animate-bounce-slow blur-sm"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent drop-shadow-sm">
                Nos Structures
              </span>
              <br />
              <span className="bg-gradient-to-r text-transparent bg-clip-text animate-pulse drop-shadow-lg" style={{backgroundImage: 'linear-gradient(135deg, #0F97F6, #FF5722, #0F97F6)'}}>
                en Action
              </span>
            </h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 max-w-4xl mx-auto shadow-xl border border-white/20">
              <p className="text-2xl text-gray-800 leading-relaxed font-bold">
              Découvrez nos structures gonflables <span className="font-bold" style={{color: '#0F97F6'}}>en situation</span> lors d'événements
              <span className="font-bold text-orange-500"> réels</span>
              </p>
            </div>
          </div>

          {/* Carrousel Container */}
          <div className="relative max-w-7xl mx-auto">
            {/* Navigation Buttons */}
            {totalSlides > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute -left-4 sm:-left-8 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-4 sm:p-5 shadow-2xl hover:shadow-3xl transition-all hover:scale-110 border border-white/50 hover:bg-white"
                >
                  <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute -right-4 sm:-right-8 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-4 sm:p-5 shadow-2xl hover:shadow-3xl transition-all hover:scale-110 border border-white/50 hover:bg-white"
                >
                  <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700" />
                </button>
              </>
            )}
            
            {/* Carrousel Content */}
            <div className="overflow-hidden rounded-3xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }, (_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0 px-6">
                    <div className={`grid gap-6 md:gap-10 ${
                      itemsPerSlide === 1 ? 'grid-cols-1' :
                      itemsPerSlide === 2 ? 'grid-cols-2' :
                      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                    }`}>
                      {sortedPhotos
                        .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                        .map((photo) => (
                        <div 
                          key={photo.id}
                          className="group bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 overflow-hidden w-full border border-white/50"
                        >
                          <div className="relative">
                            <img 
                              src={photo.url} 
                              alt={photo.alt}
                              className={`w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition-transform duration-700 ${
                                imagesLoaded.has(photo.url) ? 'opacity-100' : 'opacity-0'
                              }`}
                              loading="eager"
                              onLoad={() => preloadImage(photo.url)}
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400';
                              }}
                            />
                            {!imagesLoaded.has(photo.url) && (
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-orange-100 animate-pulse flex items-center justify-center">
                                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <h3 className="text-xl font-bold mb-2 drop-shadow-lg" itemProp="name">{photo.title || photo.alt}</h3>
                              <div className="flex items-center text-sm mb-3">
                                <MapPin className="w-5 h-5 mr-2" />
                                <span>{photo.location || 'Île-de-France'}</span>
                              </div>
                              {photo.structureId && (
                                <div className="mt-3">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const structure = structures.find(s => s.id === photo.structureId);
                                      if (structure) {
                                        openStructureModal(structure);
                                      }
                                    }}
                                    className="bg-gradient-to-r from-blue-500 to-orange-500 px-4 py-2 rounded-full text-sm font-bold inline-block hover:from-blue-600 hover:to-orange-600 transition-all transform hover:scale-105 shadow-lg backdrop-blur-sm border border-white/20"
                                  >
                                    {structures.find(s => s.id === photo.structureId)?.name || 'Structure'} - Voir détails
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Dots Indicators */}
            {totalSlides > 1 && (
              <div className="flex justify-center mt-12 space-x-3">
                {Array.from({ length: totalSlides }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? 'bg-gradient-to-r from-blue-500 to-orange-500 scale-125 shadow-lg'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal pour les structures */}
      {selectedStructure && (
        <StructureModal
          structure={selectedStructure}
          isOpen={!!selectedStructure}
          onClose={closeStructureModal}
        />
      )}
    </>
  );
};

// Composant TrustedClientsSection
interface TrustedClientsSectionProps {
  socialLinks: SocialLink[];
  isAdmin: boolean;
  addSocialLink: (link: Omit<SocialLink, 'id'>) => Promise<void>;
  updateSocialLink: (id: string, link: Partial<SocialLink>) => Promise<void>;
  deleteSocialLink: (id: string) => Promise<void>;
}

const TrustedClientsSection: React.FC<TrustedClientsSectionProps> = ({ 
  socialLinks, 
  isAdmin, 
  addSocialLink, 
  updateSocialLink, 
  deleteSocialLink 
}) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingData, setEditingData] = React.useState<SocialLink[]>([]);

  // Initialiser les données d'édition
  React.useEffect(() => {
    if (isEditing) {
      setEditingData([...socialLinks]);
    }
  }, [isEditing, socialLinks]);

  const updateLinkInEditing = (index: number, field: string, value: string | boolean) => {
    setEditingData(prev => prev.map((link, i) => 
      i === index ? { ...link, [field]: value } : link
    ));
  };

  const addNewLinkInEditing = () => {
    setEditingData(prev => [...prev, {
      id: `temp-${Date.now()}`,
      platform: 'Nouveau client',
      url: '#',
      icon: 'https://via.placeholder.com/64x64/3B82F6/FFFFFF?text=Logo',
      label: 'Nouveau partenaire',
      active: true,
      order: prev.length + 1
    }]);
  };

  const deleteLinkInEditing = (index: number) => {
    setEditingData(prev => prev.filter((_, i) => i !== index));
  };

  const saveChanges = async () => {
    try {
      // Sauvegarder les modifications
      for (const link of editingData) {
        if (link.id.startsWith('temp-')) {
          // Nouveau lien
          await addSocialLink({
            platform: link.platform,
            url: link.url,
            icon: link.icon,
            label: link.label,
            active: link.active,
            order: link.order
          });
        } else {
          // Lien existant - vérifier si modifié
          const originalLink = socialLinks.find(l => l.id === link.id);
          if (originalLink && (
            originalLink.platform !== link.platform ||
            originalLink.url !== link.url ||
            originalLink.icon !== link.icon ||
            originalLink.label !== link.label ||
            originalLink.active !== link.active
          )) {
            await updateSocialLink(link.id, {
              platform: link.platform,
              url: link.url,
              icon: link.icon,
              label: link.label,
              active: link.active,
              order: link.order
            });
          }
        }
      }
      
      // Supprimer les liens qui ont été retirés
      for (const originalLink of socialLinks) {
        if (!editingData.find(l => l.id === originalLink.id)) {
          await deleteSocialLink(originalLink.id);
        }
      }
      
      setIsEditing(false);
    } catch (error) {
            alert('Erreur lors de la sauvegarde. Veuillez réessayer.');
    }
  };

  const cancelEditing = () => {
    setEditingData([]);
    setIsEditing(false);
  };

  const dataToUse = isEditing ? editingData : socialLinks;

  if (dataToUse.length === 0 && !isAdmin) return null;

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50/50 to-orange-50/30 relative overflow-hidden">
      {/* Animations de fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-blue-100/20 to-blue-200/10 rounded-full animate-float blur-sm"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-br from-orange-100/20 to-orange-200/10 rounded-full animate-bounce-slow blur-sm"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Nos Partenaires
            </span>
            <span className="text-orange-500"> de Confiance</span>
          </h2>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 max-w-3xl mx-auto shadow-xl border border-white/20">
            <p className="text-xl text-gray-800 leading-relaxed font-medium">
              Des entreprises et organisations qui nous font confiance pour leurs événements
            </p>
          </div>
        </div>

        {/* Nouveau bouton admin en haut à droite */}
        {isAdmin && (
          <div className="absolute top-6 right-6">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => {
                                    setIsEditing(true);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-bold shadow-xl transition-all duration-300 transform hover:scale-105 backdrop-blur-sm border border-white/20"
                style={{ cursor: 'pointer' }}
              >
                Éditer
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                                        saveChanges();
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full font-bold shadow-xl transition-all backdrop-blur-sm border border-white/20"
                  style={{ cursor: 'pointer' }}
                >
                  Sauver
                </button>
                <button
                  type="button"
                  onClick={() => {
                                        cancelEditing();
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-full font-bold shadow-xl transition-all backdrop-blur-sm border border-white/20"
                  style={{ cursor: 'pointer' }}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => {
                                        addNewLinkInEditing();
                  }}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-full font-bold shadow-xl transition-all backdrop-blur-sm border border-white/20"
                  style={{ cursor: 'pointer' }}
                >
                  Ajouter
                </button>
              </div>
            )}
          </div>
        )}

        {/* Grille des partenaires */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {dataToUse.map((link, index) => (
            <div key={link.id} className="group">
              {isEditing ? (
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl p-6 border-2 border-dashed border-gray-300">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700">Image (URL):</label>
                      <input
                        type="url"
                        value={link.icon}
                        onChange={(e) => updateLinkInEditing(index, 'icon', e.target.value)}
                        className="w-full text-xs bg-gray-50 border border-gray-300 rounded-xl p-3"
                        placeholder="https://imgur.com/fLqAlJ1.png"
                      />
                      {link.icon && (
                        <div className="flex justify-center">
                          <img 
                            src={link.icon} 
                            alt="Aperçu" 
                            className="w-16 h-16 object-cover rounded-xl border border-gray-200 shadow-md"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                    </div>
                    <input
                      type="text"
                      value={link.platform}
                      onChange={(e) => updateLinkInEditing(index, 'platform', e.target.value)}
                      className="w-full text-sm font-bold bg-gray-50 border border-gray-300 rounded-xl p-3"
                      placeholder="Nom du client"
                    />
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => updateLinkInEditing(index, 'label', e.target.value)}
                      className="w-full text-xs bg-gray-50 border border-gray-300 rounded-xl p-3"
                      placeholder="Description"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateLinkInEditing(index, 'url', e.target.value)}
                      className="w-full text-xs bg-gray-50 border border-gray-300 rounded-xl p-3"
                      placeholder="https://..."
                    />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center text-xs">
                        <input
                          type="checkbox"
                          checked={link.active}
                          onChange={(e) => updateLinkInEditing(index, 'active', e.target.checked)}
                          className="mr-2 rounded"
                        />
                        Actif
                      </label>
                      <button
                        onClick={() => deleteLinkInEditing(index)}
                        className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg text-xs"
                        title="Supprimer"
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 p-6 text-center border border-gray-100">
                  <div className="mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center items-center h-24">
                    <img
                      src={link.icon}
                      alt={link.platform}
                      className="max-w-full max-h-24 w-auto h-auto object-contain"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIHJ4PSIxMiIgZmlsbD0iIzNCODJGNiIvPjx0ZXh0IHg9IjQwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TG9nbzwvdGV4dD48L3N2Zz4=';
                      }}
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">
                    {link.platform}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {link.label}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {dataToUse.length === 0 && isAdmin && (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Aucun partenaire</h3>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Ajoutez vos premiers clients et partenaires de confiance.
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-xl transition-all transform hover:scale-105"
            >
              Ajouter des partenaires
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;