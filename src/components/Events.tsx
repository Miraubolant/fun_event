import React, { useState } from 'react';
import { Camera, Calendar, MapPin, Users, X } from 'lucide-react';
import { useStructures } from '../contexts/StructuresContext';

const Events: React.FC = () => {
  const { carouselPhotos } = useStructures();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  
  // Trier les photos par ordre
  const sortedPhotos = [...carouselPhotos].sort((a, b) => a.order - b.order);

  const openModal = (photoUrl: string) => {
    setSelectedPhoto(photoUrl);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <>
      <section className="py-16 bg-gray-50" itemScope itemType="https://schema.org/ImageGallery">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight" itemProp="name">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Nos
                </span>
                <br />
                <span className="bg-gradient-to-r text-transparent bg-clip-text animate-pulse" style={{backgroundImage: 'linear-gradient(to right, #0F97F6, #FF5722)'}}>
                  Événements 📸
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium max-w-4xl mx-auto" itemProp="description">
                🎪 Découvrez nos <span className="font-bold" style={{color: '#0F97F6'}}>structures gonflables</span> en action lors d'événements 
                <span className="font-bold text-orange-500"> réels</span> ! Laissez-vous inspirer par ces moments 
                <span className="font-bold" style={{color: '#0F97F6'}}> magiques</span> 🎉
              </p>
            </div>
          </div>

          {/* Statistiques des événements */}
          <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto mb-16 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Camera className="w-8 h-8 text-white animate-pulse" />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-gray-900">{sortedPhotos.length}</h3>
                <p className="text-lg font-semibold text-gray-800 mb-1">Photos</p>
                <p className="text-sm text-gray-600">Événements capturés</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Calendar className="w-8 h-8 text-white animate-bounce" />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-gray-900">100+</h3>
                <p className="text-lg font-semibold text-gray-800 mb-1">Événements</p>
                <p className="text-sm text-gray-600">Organisés avec succès</p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <Users className="w-8 h-8 text-white animate-spin-slow" />
                </div>
                <h3 className="text-3xl font-bold mb-2 text-gray-900">1000+</h3>
                <p className="text-lg font-semibold text-gray-800 mb-1">Participants</p>
                <p className="text-sm text-gray-600">Moments de joie partagés</p>
              </div>
            </div>
          </div>

          {/* Galerie de photos */}
          {sortedPhotos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPhotos.map((photo, index) => (
                <div 
                  key={photo.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden cursor-pointer"
                  onClick={() => openModal(photo.url)}
                  itemScope 
                  itemType="https://schema.org/Photograph"
                  itemProp="associatedMedia"
                >
                  <div className="relative">
                    <img 
                      src={photo.url} 
                      alt={photo.alt}
                      className="w-full h-64 sm:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      itemProp="contentUrl"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-lg font-bold mb-1" itemProp="name">{photo.alt}</h3>
                      <div className="flex items-center text-sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>Île-de-France</span>
                      </div>
                    </div>
                    {/* Badge numéro */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📸</div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Galerie en Construction</h3>
              <p className="text-xl text-gray-600 mb-8">
                Nos plus beaux événements arrivent bientôt ! Restez connectés pour découvrir nos réalisations.
              </p>
              <div className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold inline-block">
                Bientôt disponible
              </div>
            </div>
          )}

          {/* Call to action */}
          <div className="mt-20 bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl p-8 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Votre Événement Sera le Prochain !</h3>
            <p className="text-xl mb-6 opacity-90">
              Rejoignez nos clients satisfaits et créez des souvenirs inoubliables
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/33663528072"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all inline-flex items-center justify-center transform hover:scale-105"
              >
                <Camera className="w-5 h-5 mr-2" />
                Planifier mon événement
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal pour affichage en grand */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={handleBackdropClick}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <img 
              src={selectedPhoto} 
              alt="Événement Fun Event"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Events;