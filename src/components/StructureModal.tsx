import React from 'react';
import { X, Users, Ruler, Heart, Weight, Shield, Clock, ShoppingCart, MessageCircle, ChevronLeft, ChevronRight, Sparkles, CheckCircle } from 'lucide-react';
import { Structure } from '../types';
import { useCart } from '../contexts/CartContext';

interface StructureModalProps {
  structure: Structure;
  isOpen: boolean;
  onClose: () => void;
}

const StructureModal: React.FC<StructureModalProps> = ({ structure, isOpen, onClose }) => {
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isZoomed, setIsZoomed] = React.useState(false);

  // Toutes les images (principale + additionnelles)
  const allImages = [structure.image, ...(structure.additionalImages || [])].filter(Boolean);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const nextImage = () => {
    setImageLoaded(false);
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setImageLoaded(false);
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const goToImage = (index: number) => {
    if (index !== currentImageIndex) {
      setImageLoaded(false);
      setCurrentImageIndex(index);
    }
  };

  // Reset l'index quand la modal s'ouvre
  React.useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
      setImageLoaded(false);
      setIsZoomed(false);
      // Empêcher le scroll du body
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, structure.id]);

  // Gestion du clavier
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'ArrowRight') nextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-fade-in"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden animate-scale-in">
        {/* Header avec bouton fermer */}
        <div className="relative bg-gradient-to-r from-blue-600 via-blue-500 to-orange-500 p-3 sm:p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white truncate max-w-[200px] sm:max-w-none">{structure.name}</h2>
                <p className="text-white/80 text-xs sm:text-sm">Structure gonflable premium</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 sm:p-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all hover:scale-110"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Contenu scrollable */}
        <div className="overflow-y-auto max-h-[calc(95vh-80px)]">
          {/* Section Image */}
          <div className="relative bg-gradient-to-br from-gray-100 to-gray-50">
            {/* Image principale */}
            <div
              className={`relative w-full cursor-zoom-in ${isZoomed ? 'h-[70vh]' : 'h-56 sm:h-72 md:h-96'} transition-all duration-300`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-orange-100 animate-pulse flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={allImages[currentImageIndex]}
                alt={`${structure.name} - Image ${currentImageIndex + 1}`}
                className={`w-full h-full transition-all duration-500 ${
                  isZoomed ? 'object-contain' : 'object-cover'
                } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                onError={(e) => {
                  e.currentTarget.src = 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=800';
                  setImageLoaded(true);
                }}
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>

              {/* Badge prix sur l'image */}
              <div className="absolute bottom-4 right-4 z-10">
                {structure.customPricing ? (
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold shadow-xl backdrop-blur-sm border border-white/20">
                    <span className="text-xs sm:text-sm opacity-80 block">Prix</span>
                    <span className="text-base sm:text-lg">Sur Devis</span>
                  </div>
                ) : (
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl font-bold shadow-xl backdrop-blur-sm border border-white/20">
                    <span className="text-xs sm:text-sm opacity-80 block">A partir de</span>
                    <span className="text-xl sm:text-2xl">{structure.price}€</span>
                    <span className="text-xs opacity-80">/jour</span>
                  </div>
                )}
              </div>

              {/* Indicateur de zoom */}
              <div className="absolute top-4 right-4 bg-black/50 text-white px-2 sm:px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                {isZoomed ? 'Cliquez pour réduire' : 'Cliquez pour agrandir'}
              </div>
            </div>

            {/* Navigation si plusieurs images */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow-xl transition-all hover:scale-110 backdrop-blur-sm"
                  aria-label="Image précédente"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 sm:p-3 shadow-xl transition-all hover:scale-110 backdrop-blur-sm"
                  aria-label="Image suivante"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
                </button>

                {/* Compteur */}
                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </>
            )}
          </div>

          {/* Miniatures */}
          {allImages.length > 1 && (
            <div className="flex gap-2 p-3 sm:p-4 bg-gray-50 overflow-x-auto">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`relative flex-shrink-0 w-14 h-14 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-300 ${
                    currentImageIndex === index
                      ? 'ring-3 ring-blue-500 scale-105 shadow-lg'
                      : 'opacity-60 hover:opacity-100 hover:scale-105'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Miniature ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {currentImageIndex === index && (
                    <div className="absolute inset-0 border-2 border-blue-500 rounded-lg sm:rounded-xl"></div>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Informations */}
          <div className="p-4 sm:p-6 md:p-8">
            {/* Caractéristiques principales */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-blue-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                  <Ruler className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">Dimensions</p>
                <p className="text-xs sm:text-sm font-bold text-gray-900">{structure.size}</p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-orange-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">Capacité</p>
                <p className="text-xs sm:text-sm font-bold text-gray-900">{structure.capacity}</p>
              </div>

              <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-pink-100">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-pink-500 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                  <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">Age</p>
                <p className="text-xs sm:text-sm font-bold text-gray-900">{structure.age}</p>
              </div>

              {structure.maxWeight && (
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center border border-purple-100">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                    <Weight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <p className="text-xs text-gray-500 mb-0.5 sm:mb-1">Poids max</p>
                  <p className="text-xs sm:text-sm font-bold text-gray-900">{structure.maxWeight}kg</p>
                </div>
              )}
            </div>

            {/* Tarifs */}
            {!structure.customPricing && (
              <div className="bg-gradient-to-r from-blue-500 to-orange-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 text-white shadow-xl">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                  <h3 className="text-lg sm:text-xl font-bold">Tarifs de location</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                    <p className="text-xs sm:text-sm opacity-80 mb-1">1 jour</p>
                    <p className="text-2xl sm:text-3xl font-black">{structure.price}€</p>
                  </div>
                  {structure.price2Days && (
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
                      <p className="text-xs sm:text-sm opacity-80 mb-1">2 jours</p>
                      <p className="text-2xl sm:text-3xl font-black">{structure.price2Days}€</p>
                      <p className="text-xs opacity-70">Économisez {structure.price * 2 - structure.price2Days}€</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                <div className="w-1.5 h-6 sm:h-8 bg-gradient-to-b from-blue-500 to-orange-500 rounded-full"></div>
                Description
              </h3>
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-100">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {structure.description}
                </p>
              </div>
            </div>

            {/* Services et Normes */}
            {structure.services && (
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                  Services et Normes
                </h3>
                <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-100">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{structure.services}</p>
                </div>
              </div>
            )}

            {/* Points forts */}
            <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-100">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">Inclus dans votre location</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {['Livraison et installation', 'Récupération en fin de journée', 'Assurance RC Pro', 'Normes NF EN 14960', 'Support téléphonique', 'Équipement de sécurité'].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {!structure.customPricing && (
                <button
                  onClick={() => {
                    addToCart(structure);
                    onClose();
                  }}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-2 sm:gap-3"
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                  <span className="text-sm sm:text-base">Ajouter au panier</span>
                </button>
              )}
              <a
                href="https://wa.me/33663528072"
                target="_blank"
                rel="noopener noreferrer"
                className={`${structure.customPricing ? 'flex-1' : 'flex-1'} bg-gradient-to-r from-green-500 to-green-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-bold hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-2 sm:gap-3`}
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="text-sm sm:text-base">{structure.customPricing ? 'Demander un devis' : 'WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Styles pour les animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StructureModal;
