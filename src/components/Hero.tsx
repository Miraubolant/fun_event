import React from 'react';
import { ArrowRight, Shield, Truck, Clock, Star, Users, Award, Phone, MessageCircle, Ruler, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useStructures } from '../contexts/StructuresContext';
import StructureModal from './StructureModal';
import { Page } from '../types';
import { Structure } from '../types';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { structures } = useStructures();
  const [selectedStructure, setSelectedStructure] = React.useState<Structure | null>(null);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  // Toutes les structures disponibles pour le carrousel
  const availableStructures = structures.filter(s => s.available);
  
  // Nombre d'éléments par slide selon la taille d'écran
  const [itemsPerSlide, setItemsPerSlide] = React.useState(3);
  const [totalSlides, setTotalSlides] = React.useState(Math.ceil(availableStructures.length / itemsPerSlide));
  
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
      
      // Ne mettre à jour que si la valeur change
      if (items !== itemsPerSlide) {
        setItemsPerSlide(items);
        setTotalSlides(Math.ceil(availableStructures.length / items));
        
        // Réajuster currentSlide si nécessaire
        const maxSlide = Math.ceil(availableStructures.length / items) - 1;
        if (currentSlide > maxSlide) {
          setCurrentSlide(0);
        }
      }
    };
    
    updateItemsPerSlide();
    window.addEventListener('resize', updateItemsPerSlide);
    
    return () => window.removeEventListener('resize', updateItemsPerSlide);
  }, [availableStructures.length, itemsPerSlide, currentSlide]);
  
  // Reset du carrousel quand les structures changent
  React.useEffect(() => {
    setCurrentSlide(0);
  }, [availableStructures.length]);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlide = Math.ceil(availableStructures.length / itemsPerSlide) - 1;
      return prev >= maxSlide ? 0 : prev + 1;
    });
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => {
      const maxSlide = Math.ceil(availableStructures.length / itemsPerSlide) - 1;
      return prev <= 0 ? maxSlide : prev - 1;
    });
  };
  
  const goToSlide = (index: number) => {
    const maxSlide = Math.ceil(availableStructures.length / itemsPerSlide) - 1;
    if (index >= 0 && index <= maxSlide) {
      setCurrentSlide(index);
    }
  };

  // Recalcul du nombre total de slides
  React.useEffect(() => {
    const newTotalSlides = Math.ceil(availableStructures.length / itemsPerSlide);
    if (newTotalSlides !== totalSlides) {
      setTotalSlides(newTotalSlides);
      
      // S'assurer que currentSlide est valide
      const maxSlide = newTotalSlides - 1;
      if (currentSlide > maxSlide) {
        setCurrentSlide(0);
      }
    }
  }, [availableStructures.length, itemsPerSlide, totalSlides, currentSlide]);

  const openModal = (structure: Structure) => {
    setSelectedStructure(structure);
  };

  const closeModal = () => {
    setSelectedStructure(null);
  };

  return (
    <>
      {/* Hero Principal */}
      <section className="relative bg-white text-gray-900 overflow-hidden min-h-screen">
        
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
              <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Créez des Moments
                </span>
                <br />
                <span className="bg-gradient-to-r text-transparent bg-clip-text animate-pulse" style={{backgroundImage: 'linear-gradient(to right, #0F97F6, #FF5722)'}}>
                  Magiques ✨
                </span>
              </h1>
              <p className="text-xl md:text-3xl mb-10 max-w-5xl mx-auto text-gray-700 leading-relaxed font-medium">
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
                    className="flex transition-transform duration-500 ease-in-out gap-4 md:gap-8"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                      <div key={slideIndex} className="w-full flex-shrink-0">
                        <div className={`grid gap-4 md:gap-8 px-4 ${
                          itemsPerSlide === 1 ? 'grid-cols-1' :
                          itemsPerSlide === 2 ? 'grid-cols-2' :
                          'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        }`}>
                          {availableStructures
                            .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                            .map((structure, index) => (
                            <div 
                              key={structure.id}
                              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 animate-fade-in-up overflow-hidden cursor-pointer w-full"
                              style={{ animationDelay: `${index * 0.1}s` }}
                              onClick={() => openModal(structure)}
                            >
                              {/* Image en bulle */}
                              <div className="relative p-6 pb-0">
                                <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4">
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
                                    {structure.price}€
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
                    {Array.from({ length: totalSlides }).map((_, index) => (
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
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Clock className="w-8 h-8 text-white animate-spin-slow" />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-gray-900">7j/7</h3>
                <p className="text-lg font-semibold text-gray-800 mb-1">Service</p>
                <p className="text-sm text-gray-600">Disponible toujours</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Star className="w-8 h-8 text-white animate-twinkle" />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-gray-900">5★</h3>
                <p className="text-lg font-semibold text-gray-800 mb-1">Satisfaction</p>
                <p className="text-sm text-gray-600">Clients ravis</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Transition fluide vers la section suivante */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

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

export default Hero;