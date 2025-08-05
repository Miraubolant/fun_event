import React from 'react';
import { X, Users, Ruler, Heart, Weight, Shield, Clock, ShoppingCart, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
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
  
  // Toutes les images (principale + additionnelles)
  const allImages = [structure.image, ...(structure.additionalImages || [])].filter(Boolean);
  
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Reset l'index quand la modal s'ouvre
  React.useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0);
    }
  }, [isOpen, structure.id]);

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
          
          {/* Carrousel d'images */}
          <div className="relative">
            <img 
              src={allImages[currentImageIndex]} 
              alt={`${structure.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-64 md:h-80 object-cover rounded-t-xl"
              onError={(e) => {
                e.currentTarget.src = 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400';
              }}
            />
            
            {/* Navigation si plusieurs images */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-700" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6 text-gray-700" />
                </button>
                
                {/* Indicateurs */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToImage(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentImageIndex === index
                          ? 'bg-white scale-125'
                          : 'bg-white/60 hover:bg-white/80'
                      }`}
                    />
                  ))}
                </div>
                
                {/* Compteur */}
                <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {allImages.length}
                </div>
              </>
            )}
          </div>
          
        </div>
        
        <div className="p-6 md:p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{structure.name}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <Ruler className="w-5 h-5 mr-3 text-blue-500" />
                <div>
                  <span className="font-semibold">Dimensions:</span>
                  <p className="text-sm">{structure.size}</p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-700">
                <Users className="w-5 h-5 mr-3 text-orange-500" />
                <div>
                  <span className="font-semibold">Capacité:</span>
                  <p className="text-sm">{structure.capacity}</p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-700">
                <Heart className="w-5 h-5 mr-3 text-pink-500" />
                <div>
                  <span className="font-semibold">Âge recommandé:</span>
                  <p className="text-sm">{structure.age}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {structure.maxWeight && (
                <div className="flex items-center text-gray-700">
                  <Weight className="w-5 h-5 mr-3 text-purple-500" />
                  <div>
                    <span className="font-semibold">Poids maximum:</span>
                    <p className="text-sm">{structure.maxWeight}kg</p>
                  </div>
                </div>
              )}
              
              <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-4 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  Tarifs
                </h3>
                <div className="space-y-1">
                  {structure.customPricing ? (
                    <p className="text-lg font-bold text-orange-600">Prix sur Devis</p>
                  ) : (
                    <>
                      <p className="text-lg font-bold text-blue-600">1 jour: {structure.price}€</p>
                      {structure.price2Days && (
                        <p className="text-lg font-bold text-orange-600">2 jours: {structure.price2Days}€</p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
              {structure.description}
            </div>
          </div>
          
          {structure.services && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-500" />
                Services et Normes
              </h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-gray-700">{structure.services}</p>
              </div>
            </div>
          )}
          
          <div className="flex gap-4 justify-center">
            {!structure.customPricing && (
              <button
                onClick={() => {
                  addToCart(structure);
                  onClose();
                }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-8 rounded-lg font-bold hover:from-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 shadow-lg flex items-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Ajouter au panier
              </button>
            )}
            <a
              href="https://wa.me/33663528072"
              target="_blank"
              rel="noopener noreferrer"
              className={`bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 px-8 rounded-lg font-bold hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg flex items-center ${structure.customPricing ? 'flex-1 justify-center' : ''}`}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {structure.customPricing ? 'Demander un devis' : 'Contact WhatsApp'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructureModal;