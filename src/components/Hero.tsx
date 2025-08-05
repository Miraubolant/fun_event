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


  return (
    <>
      <SEOHead
        title="Fun Event - Location Structures Gonflables Premium Île-de-France | Devis Gratuit"
        description="🎪 Spécialiste location structures gonflables premium en Île-de-France. Châteaux gonflables, toboggans géants, jeux aquatiques. Livraison gratuite Paris 75-95. Devis sous 48h ✨"
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
      <main className="relative bg-white text-gray-900 overflow-hidden min-h-screen">
        
        {/* Animations de fond harmonisées */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-100 rounded-full animate-bounce" style={{backgroundColor: '#E3F2FD'}}></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-orange-100 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-1/4 w-12 h-12 bg-blue-50 rounded-full animate-bounce delay-1000" style={{backgroundColor: '#F3F9FF'}}></div>
          <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-orange-50 rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Section Titre et Présentation */}
          <div className="text-center mb-16">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight" itemProp="headline">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Créez des Moments
                </span>
                <br />
                <span className="bg-gradient-to-r text-transparent bg-clip-text animate-pulse" style={{backgroundImage: 'linear-gradient(to right, #0F97F6, #FF5722)'}}>
                  Magiques ✨
                </span>
              </h1>
              <p className="text-xl md:text-3xl mb-10 max-w-5xl mx-auto text-gray-700 leading-relaxed font-medium" itemProp="description">
                🎪 Des structures gonflables <span className="font-bold" style={{color: '#0F97F6'}}>premium</span> pour des événements 
                <span className="font-bold text-orange-500"> festifs</span> et <span className="font-bold" style={{color: '#0F97F6'}}>inoubliables </span> 
                 dans toute l'Île-de-France 🎉
              </p>
            </div>
          </div>

          {/* Structures en Bulles */}
          {availableStructures.length > 0 && (
            <div className="mb-16">
              {/* Carrousel Container */}
              <div className="relative max-w-6xl mx-auto">
                {/* Navigation Buttons */}
                {totalSlides > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute -left-4 sm:-left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110 border-2 border-gray-100"
                    >
                      <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 text-gray-600" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute -right-4 sm:-right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110 border-2 border-gray-100"
                    >
                      <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 text-gray-600" />
                    </button>
                  </>
                )}
                
                {/* Carrousel Content */}
                <div className="overflow-hidden rounded-2xl">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {Array.from({ length: totalSlides }, (_, slideIndex) => (
                      <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                        <div className={`grid gap-4 md:gap-8 ${
                          itemsPerSlide === 1 ? 'grid-cols-1' :
                          itemsPerSlide === 2 ? 'grid-cols-2' :
                          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        }`}>
                          {availableStructures
                            .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                            .map((structure) => (
                            <div 
                              key={structure.id}
                              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden cursor-pointer w-full"
                              onClick={() => openModal(structure)}
                            >
                              {/* Image en bulle */}
                              <div className="relative p-6 pb-0">
                                <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-4">
                                  <div className="w-full h-full rounded-full overflow-hidden shadow-xl border-4 border-white group-hover:border-blue-200 transition-all duration-300">
                                    <img 
                                      src={structure.image} 
                                      alt={structure.name}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                      loading="lazy"
                                      onError={(e) => {
                                        e.currentTarget.src = 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400';
                                      }}
                                    />
                                  </div>
                                  {/* Badge prix */}
                                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                                    {structure.customPricing ? 'Prix sur Devis' : `${structure.price}€`}
                                  </div>
                                </div>
                              </div>

                              {/* Description */}
                              <div className="px-6 pb-6">
                                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-blue-600 transition-colors">
                                  {structure.name}
                                </h3>
                                
                                <div className="space-y-2 mb-4">
                                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                                    <Ruler className="w-4 h-4 mr-2 text-blue-500" />
                                    <span>{structure.size}</span>
                                  </div>
                                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                                    <Users className="w-4 h-4 mr-2 text-orange-500" />
                                    <span>{structure.capacity}</span>
                                  </div>
                                  <div className="flex items-center text-xs sm:text-sm text-gray-600">
                                    <Heart className="w-4 h-4 mr-2 text-pink-500" />
                                    <span>{structure.age}</span>
                                  </div>
                                </div>

                                <p className="text-gray-600 text-xs sm:text-sm mb-4 line-clamp-3">
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
                  <div className="flex justify-center mt-8 space-x-2">
                    {Array.from({ length: totalSlides }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                          currentSlide === index
                            ? 'bg-gradient-to-r from-blue-500 to-orange-500 scale-125'
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
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-up">
            <button 
              onClick={() => onNavigate('catalogue')}
              className="group text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-3xl flex items-center animate-bounce-slow"
              style={{background: 'linear-gradient(to right, #0F97F6, #FF5722)'}}
              onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #0E87E0, #E64A19)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #0F97F6, #FF5722)'}
            >
              Découvrir toutes nos Structures
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </button>
          </div>

          {/* Stats harmonisées */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-6xl mx-auto animate-fade-in-up">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Shield className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-gray-900">100%</h3>
                <p className="text-lg font-semibold text-gray-800 mb-1">Sécurisé</p>
                <p className="text-sm text-gray-600">Normes CE & AFNOR</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Truck className="w-8 h-8 text-white animate-bounce" />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-gray-900">Gratuit</h3>
                <p className="text-lg font-semibold text-gray-800 mb-1">Livraison</p>
                <p className="text-sm text-gray-600">Toute l'Île-de-France</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Clock className="w-8 h-8 text-white animate-spin-slow" />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-gray-900">7j/7</h3>
                <p className="text-lg font-semibold text-gray-800 mb-1">Service</p>
                <p className="text-sm text-gray-600">Disponible toujours</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Star className="w-8 h-8 text-white animate-twinkle" />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-gray-900">5★</h3>
                <p className="text-lg font-semibold text-gray-800 mb-1">Satisfaction</p>
                <p className="text-sm text-gray-600">Clients ravis</p>
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
            <div className="text-6xl mb-4">🎪</div>
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

      {/* Call to action final harmonisé */}
      <section className="py-20 bg-white text-gray-900 relative overflow-hidden">
        {/* Animations de fond harmonisées */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full animate-float" style={{backgroundColor: '#E3F2FD'}}></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-orange-100 rounded-full animate-bounce-slow"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 rounded-full animate-pulse-slow delay-1000" style={{backgroundColor: '#F3F9FF'}}></div>
          <div className="absolute top-20 right-1/4 w-20 h-20 bg-blue-100 rounded-full animate-wiggle"></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Prêt à Créer des Souvenirs <span className="text-orange-500">Inoubliables</span> ?
            </h2>
            <p className="text-xl md:text-2xl mb-4 text-gray-700 max-w-5xl mx-auto">
              Transformez votre événement en moment magique avec nos structures gonflables premium
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Devis gratuit sous 48h • Livraison incluse • Service 7j/7 dans toute l'Île-de-France
            </p>
          </div>

          {/* Boutons d'action harmonisés */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <button 
              onClick={() => onNavigate('devis')}
              className="group text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-500 transform hover:scale-110 shadow-2xl flex items-center"
              style={{background: 'linear-gradient(to right, #0F97F6, #FF5722)'}}
              onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #0E87E0, #E64A19)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #0F97F6, #FF5722)'}
            >
              <ArrowRight className="w-5 h-5 mr-3 group-hover:translate-x-2 transition-transform duration-300" />
              Demander un Devis Gratuit
            </button>
            <a
              href="https://wa.me/33663528072"
              target="_blank"
              rel="noopener noreferrer"
              className="group border-2 px-10 py-4 rounded-full font-bold text-lg transition-all duration-500 transform hover:scale-110 flex items-center hover:shadow-xl"
              style={{borderColor: '#0F97F6', color: '#0F97F6'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0F97F6';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#0F97F6';
              }}
            >
              <MessageCircle className="w-5 h-5 mr-3 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
              WhatsApp : 06 63 52 80 72
            </a>
          </div>

          {/* Contact rapide harmonisé */}
          <div className="bg-gray-50 rounded-2xl p-8 max-w-3xl mx-auto shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Besoin d'un conseil personnalisé ?</h3>
            <p className="text-lg text-gray-600 mb-6">
              Notre équipe d'experts vous accompagne dans le choix des structures parfaites pour votre événement
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:0663528072" 
                className="text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
                style={{background: 'linear-gradient(to right, #FF5722, #E64A19)'}}
                onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #E64A19, #D84315)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #FF5722, #E64A19)'}
              >
                <Phone className="w-5 h-5 mr-2" />
                Appeler maintenant
              </a>
              <button 
                onClick={() => onNavigate('contact')}
                className="text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg"
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
  const { carouselPhotos } = useStructures();
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [itemsPerSlide, setItemsPerSlide] = React.useState(3);
  
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

  if (sortedPhotos.length === 0) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Nos Structures
            </span>
            <br />
            <span className="bg-gradient-to-r text-transparent bg-clip-text animate-pulse" style={{backgroundImage: 'linear-gradient(to right, #0F97F6, #FF5722)'}}>
              en Action 📸
            </span>
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed font-medium max-w-3xl mx-auto">
            🎪 Découvrez nos structures gonflables <span className="font-bold" style={{color: '#0F97F6'}}>en situation</span> lors d'événements 
            <span className="font-bold text-orange-500"> réels</span> ! 🎉
          </p>
        </div>

        {/* Carrousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Navigation Buttons */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute -left-4 sm:-left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110 border-2 border-gray-100"
              >
                <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 text-gray-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute -right-4 sm:-right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all hover:scale-110 border-2 border-gray-100"
              >
                <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 text-gray-600" />
              </button>
            </>
          )}
          
          {/* Carrousel Content */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0 px-4">
                  <div className={`grid gap-4 md:gap-8 ${
                    itemsPerSlide === 1 ? 'grid-cols-1' :
                    itemsPerSlide === 2 ? 'grid-cols-2' :
                    'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  }`}>
                    {sortedPhotos
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((photo) => (
                      <div 
                        key={photo.id}
                        className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden w-full"
                      >
                        <div className="relative">
                          <img 
                            src={photo.url} 
                            alt={photo.alt}
                            className="w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400';
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-gradient-to-r from-blue-500 to-orange-500 scale-125'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
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
      console.error('Erreur lors de la sauvegarde:', error);
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
    <section className="py-16 bg-gradient-to-br from-blue-50 to-orange-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
              Ils nous ont
            </span>
            <br />
            <span className="bg-gradient-to-r text-transparent bg-clip-text animate-pulse" style={{backgroundImage: 'linear-gradient(to right, #0F97F6, #FF5722)'}}>
              fait confiance 🤝
            </span>
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed font-medium max-w-3xl mx-auto">
            🎪 Rejoignez nos <span className="font-bold" style={{color: '#0F97F6'}}>clients satisfaits</span> et nos 
            <span className="font-bold text-orange-500"> partenaires</span> de confiance ! ⭐
          </p>
        </div>

        {/* Nouveau bouton admin en haut à droite */}
        {isAdmin && (
          <div className="absolute top-4 right-4">
            {!isEditing ? (
              <button
                type="button"
                onClick={() => {
                  console.log('Nouveau bouton cliqué !');
                  setIsEditing(true);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
                style={{ cursor: 'pointer' }}
              >
                ✏️ Éditer
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    console.log('Sauvegarde cliquée !');
                    saveChanges();
                  }}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg font-bold shadow-lg transition-all"
                  style={{ cursor: 'pointer' }}
                >
                  💾
                </button>
                <button
                  type="button"
                  onClick={() => {
                    console.log('Annuler cliqué !');
                    cancelEditing();
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg font-bold shadow-lg transition-all"
                  style={{ cursor: 'pointer' }}
                >
                  ❌
                </button>
                <button
                  type="button"
                  onClick={() => {
                    console.log('Ajouter cliqué !');
                    addNewLinkInEditing();
                  }}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-2 rounded-lg font-bold shadow-lg transition-all"
                  style={{ cursor: 'pointer' }}
                >
                  ➕
                </button>
              </div>
            )}
          </div>
        )}
        {/* Boutons d'édition pour l'admin */}
        {isAdmin && (
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 mb-4">Mode admin activé - Email: {user?.email}</p>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all inline-flex items-center"
              >
                ✏️ Modifier les partenaires
              </button>
            ) : (
              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={saveChanges}
                  className="bg-green-500 text-white px-6 py-3 rounded-full font-bold hover:bg-green-600 transition-all inline-flex items-center"
                >
                  💾 Sauvegarder
                </button>
                <button
                  onClick={cancelEditing}
                  className="bg-gray-500 text-white px-6 py-3 rounded-full font-bold hover:bg-gray-600 transition-all inline-flex items-center"
                >
                  ❌ Annuler
                </button>
                <button
                  onClick={addNewLinkInEditing}
                  className="bg-purple-500 text-white px-6 py-3 rounded-full font-bold hover:bg-purple-600 transition-all inline-flex items-center"
                >
                  ➕ Ajouter
                </button>
              </div>
            )}
          </div>
        )}

        {/* Grille des partenaires */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {dataToUse.map((link, index) => (
            <div key={link.id} className="group">
              {isEditing ? (
                <div className="bg-white rounded-2xl shadow-lg p-4 border-2 border-dashed border-gray-300">
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-700">Image (URL):</label>
                      <input
                        type="url"
                        value={link.icon}
                        onChange={(e) => updateLinkInEditing(index, 'icon', e.target.value)}
                        className="w-full text-xs bg-gray-50 border border-gray-300 rounded-lg p-2"
                        placeholder="https://imgur.com/fLqAlJ1.png"
                      />
                      {link.icon && (
                        <div className="flex justify-center">
                          <img 
                            src={link.icon} 
                            alt="Aperçu" 
                            className="w-12 h-12 object-cover rounded-lg border border-gray-200"
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
                      className="w-full text-sm font-bold bg-gray-50 border border-gray-300 rounded-lg p-2"
                      placeholder="Nom du client"
                    />
                    <input
                      type="text"
                      value={link.label}
                      onChange={(e) => updateLinkInEditing(index, 'label', e.target.value)}
                      className="w-full text-xs bg-gray-50 border border-gray-300 rounded-lg p-2"
                      placeholder="Description"
                    />
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateLinkInEditing(index, 'url', e.target.value)}
                      className="w-full text-xs bg-gray-50 border border-gray-300 rounded-lg p-2"
                      placeholder="https://..."
                    />
                    <div className="flex items-center justify-between">
                      <label className="flex items-center text-xs">
                        <input
                          type="checkbox"
                          checked={link.active}
                          onChange={(e) => updateLinkInEditing(index, 'active', e.target.checked)}
                          className="mr-1"
                        />
                        Actif
                      </label>
                      <button
                        onClick={() => deleteLinkInEditing(index)}
                        className="bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                        title="Supprimer"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  href={link.url}
                  target={link.url.startsWith('http') ? '_blank' : undefined}
                  rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 p-6 text-center"
                >
                  <div className="mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    <img 
                      src={link.icon} 
                      alt={link.platform}
                      className="w-16 h-16 object-cover rounded-lg shadow-md"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/64x64/3B82F6/FFFFFF?text=🤝';
                      }}
                    />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1 text-sm">
                    {link.platform}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {link.label}
                  </p>
                </a>
              )}
            </div>
          ))}
        </div>

        {dataToUse.length === 0 && isAdmin && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤝</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucun partenaire</h3>
            <p className="text-gray-600 mb-6">
              Ajoutez vos premiers clients et partenaires de confiance.
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-6 py-3 rounded-full font-bold hover:shadow-xl transition-all"
            >
              ➕ Ajouter des partenaires
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;