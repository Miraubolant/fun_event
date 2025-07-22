import React, { useState } from 'react';
import { Users, Ruler, Heart, Eye, ShoppingCart } from 'lucide-react';
import { useStructures } from '../contexts/StructuresContext';
import { useCart } from '../contexts/CartContext';
import StructureModal from './StructureModal';
import { Structure } from '../types';

const Catalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('tous');
  const [selectedStructure, setSelectedStructure] = useState<Structure | null>(null);
  const { structures, categories } = useStructures();
  const { addToCart, items } = useCart();

  const allCategories = [
    { id: 'tous', label: 'Tous', icon: '🎪' },
    ...categories
  ];

  const filteredStructures = activeCategory === 'tous'
    ? structures.filter(s => s.available)
    : structures.filter(s => s.category === activeCategory && s.available);

  // Vérifier si une structure est dans le panier
  const isInCart = (structureId: string) => {
    return items.some(item => item.structure.id === structureId);
  };

  // Obtenir la quantité d'une structure dans le panier
  const getCartQuantity = (structureId: string) => {
    const item = items.find(item => item.structure.id === structureId);
    return item ? item.quantity : 0;
  };
  const openModal = (structure: Structure) => {
    setSelectedStructure(structure);
  };

  const closeModal = () => {
    setSelectedStructure(null);
  };

  return (
    <section className="py-16 bg-gray-50" itemScope itemType="https://schema.org/ItemList">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight" itemProp="name">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Notre
              </span>
              <br />
              <span className="bg-gradient-to-r text-transparent bg-clip-text animate-pulse" style={{backgroundImage: 'linear-gradient(to right, #0F97F6, #FF5722)'}}>
                Catalogue ✨
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium max-w-4xl mx-auto" itemProp="description">
              🎪 Découvrez notre <span className="font-bold" style={{color: '#0F97F6'}}>large gamme</span> de structures gonflables 
              <span className="font-bold text-orange-500"> premium</span> pour tous les âges et tous les 
              <span className="font-bold" style={{color: '#0F97F6'}}> événements</span> 🎉
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {allCategories.map((category) => {
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow'
                }`}
                style={activeCategory === category.id ? { background: 'linear-gradient(to right, #2196F3, #FF5722)' } : {}}
              >
                <span className="text-xl mr-2">{category.icon}</span>
                {category.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStructures.map((structure) => (
            <div 
              key={structure.id} 
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all transform hover:scale-102 group"
              itemScope 
              itemType="https://schema.org/Product"
              itemProp="itemListElement"
            >
              <div className="relative">
                <img 
                  src={structure.image} 
                  alt={structure.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  itemProp="image"
                />
                <div className="absolute top-2 right-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  <span itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <span itemProp="price">{structure.price}</span>
                    <span itemProp="priceCurrency" content="EUR">€</span>
                  </span>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <button
                    onClick={() => openModal(structure)}
                    className="opacity-0 group-hover:opacity-100 bg-white text-blue-600 px-6 py-3 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <Eye className="w-5 h-5 inline mr-2" />
                    Voir les détails
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2" itemProp="name">{structure.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3" itemProp="description">
                  {structure.description.length > 120 
                    ? structure.description.substring(0, 120) + '...' 
                    : structure.description
                  }
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                    <Ruler className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="font-medium">Dimensions:</span>
                    <span className="ml-1">{structure.size}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                    <Users className="w-4 h-4 mr-2 text-orange-500" />
                    <span className="font-medium">Capacité:</span>
                    <span className="ml-1">{structure.capacity}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 bg-gray-50 p-2 rounded-lg">
                    <Heart className="w-4 h-4 mr-2 text-pink-500" />
                    <span className="font-medium">Âge:</span>
                    <span className="ml-1">{structure.age}</span>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => openModal(structure)}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-orange-700"
                  >
                    <Eye className="w-4 h-4 inline mr-2" />
                    Voir plus
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => addToCart(structure)}
                      className={`relative px-4 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg ${
                        isInCart(structure.id)
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
                          : 'border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white'
                      }`}
                      title={isInCart(structure.id) ? "Ajouter une autre" : "Ajouter au panier"}
                    >
                      <ShoppingCart className="w-4 h-4 inline" />
                    </button>
                    {isInCart(structure.id) && (
                      <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                        {getCartQuantity(structure.id)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStructures.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎪</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Aucune structure trouvée</h3>
            <p className="text-gray-600">
              Aucune structure n'est disponible dans cette catégorie pour le moment.
            </p>
          </div>
        )}
      </div>

      {selectedStructure && (
        <StructureModal
          structure={selectedStructure}
          isOpen={!!selectedStructure}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default Catalog;