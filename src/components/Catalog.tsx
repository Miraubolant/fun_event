import React, { useState } from 'react';
import { Users, Ruler, Heart, Eye, ShoppingCart } from 'lucide-react';
import { useStructures } from '../contexts/StructuresContext';
import { useCart } from '../contexts/CartContext';
import StructureModal from './StructureModal';
import SEOHead from './SEOHead';
import { Structure } from '../types';

const Catalog: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('tous');
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [selectedStructure, setSelectedStructure] = useState<Structure | null>(null);
  const { structures, categories, subcategories, loading } = useStructures();
  const { addToCart, items } = useCart();

  const allCategories = [
    { id: 'tous', label: 'Tous', icon: '🎪' },
    ...categories
  ];

  const filteredStructures = structures.filter(s => {
    if (!s.available) return false;
    if (activeCategory === 'tous') return true;
    if (s.category !== activeCategory) return false;
    if (activeSubcategory && s.subcategory !== activeSubcategory) return false;
    return true;
  }).sort((a, b) => (a.order || 1) - (b.order || 1));

  // Obtenir les sous-catégories de la catégorie active
  const availableSubcategories = activeCategory !== 'tous'
    ? subcategories.filter(sub => sub.category_id === activeCategory)
    : [];

  // Reset sous-catégorie quand on change de catégorie
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveSubcategory(null);
  };

  // Précharger les images des premières structures
  React.useEffect(() => {
    const preloadImages = () => {
      filteredStructures.slice(0, 6).forEach(structure => {
        const img = new Image();
        img.src = structure.image;
      });
    };
    
    if (filteredStructures.length > 0) {
      preloadImages();
    }
  }, [filteredStructures]);

  // Vérifier si une structure est dans le panier
  const isInCart = (structureId: string) => {
    return items.some(item => item.structure.id === structureId);
  };

  // Obtenir la quantité d'une structure dans le panier
  const getCartQuantity = (structureId: string) => {
    const item = items.find(item => item.structure.id === structureId);
    return item ? item.quantity : 0;
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden min-h-screen">
        {/* Formes décoratives en arrière-plan */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="text-center">
          <div className="relative z-10">
            <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6 shadow-lg"></div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Chargement du catalogue...</h2>
            <p className="text-xl text-gray-600">Préparation de nos structures premium</p>
          </div>
        </div>
      </section>
    );
  }

  const openModal = (structure: Structure) => {
    setSelectedStructure(structure);
  };

  const closeModal = () => {
    setSelectedStructure(null);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden" itemScope itemType="https://schema.org/ItemList">
      {/* Formes décoratives en arrière-plan */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-200/15 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
      </div>
      
      <SEOHead
        title="Catalogue Structures Gonflables - Fun Event | Châteaux, Toboggans, Jeux Aquatiques"
        description="🎪 Découvrez notre catalogue complet de structures gonflables premium : châteaux gonflables, toboggans géants, parcours aventure, jeux aquatiques. Location Île-de-France avec livraison gratuite."
        keywords="catalogue structures gonflables, château gonflable location Paris, toboggan gonflable géant, parcours aventure gonflable, jeux aquatiques enfant, location matériel animation Île-de-France"
        ogTitle="Catalogue Premium - Structures Gonflables Fun Event"
        ogDescription="Plus de 20 structures gonflables premium pour tous les âges. Châteaux, toboggans, parcours aventure. Livraison gratuite en Île-de-France."
        canonicalUrl="https://funevent.fr/catalogue"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Catalogue Structures Gonflables Fun Event",
          "description": "Collection complète de structures gonflables premium pour événements",
          "numberOfItems": filteredStructures.length,
          "itemListElement": filteredStructures.slice(0, 10).map((structure, index) => ({
            "@type": "Product",
            "position": index + 1,
            "name": structure.name,
            "description": structure.description,
            "image": structure.image,
            "category": categories.find(c => c.id === structure.category)?.label || "Structure Gonflable",
            "offers": {
              "@type": "Offer",
              "price": structure.price,
              "priceCurrency": "EUR",
              "availability": structure.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              "seller": {
                "@type": "Organization",
                "name": "Fun Event"
              }
            },
            "additionalProperty": [
              {
                "@type": "PropertyValue",
                "name": "Dimensions",
                "value": structure.size
              },
              {
                "@type": "PropertyValue", 
                "name": "Capacité",
                "value": structure.capacity
              },
              {
                "@type": "PropertyValue",
                "name": "Âge recommandé", 
                "value": structure.age
              }
            ]
          }))
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-black mb-8 leading-tight tracking-tight" itemProp="name">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent drop-shadow-sm">
                Notre
              </span>
              <br />
              <span className="bg-gradient-to-r text-transparent bg-clip-text animate-pulse drop-shadow-lg" style={{backgroundImage: 'linear-gradient(to right, #0F97F6, #FF5722)'}}>
                Catalogue ✨
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-semibold max-w-4xl mx-auto drop-shadow-sm" itemProp="description">
              🎪 Découvrez notre <span className="font-bold" style={{color: '#0F97F6'}}>large gamme</span> de structures gonflables 
              <span className="font-bold text-orange-500"> premium</span> pour tous les âges et tous les 
              <span className="font-bold" style={{color: '#0F97F6'}}> événements</span> 🎉
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {allCategories.map((category) => {
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`flex items-center px-8 py-4 rounded-full font-bold transition-all duration-700 transform hover:scale-110 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-2xl border-white/30'
                    : 'bg-white/80 text-gray-700 hover:bg-blue-50/90 hover:text-blue-600 hover:border-blue-200/50'
                }`}
                style={activeCategory === category.id ? { background: 'linear-gradient(to right, #2196F3, #FF5722)' } : {}}
              >
                <span className="text-2xl mr-3 drop-shadow-sm">{category.icon}</span>
                <span className="drop-shadow-sm">{category.label}</span>
              </button>
            );
          })}
        </div>

        {/* Menu déroulant des sous-catégories */}
        {availableSubcategories.length > 0 && (
          <div className="max-w-4xl mx-auto mb-16 animate-fade-in">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 p-4">
              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setActiveSubcategory(null)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeSubcategory === null
                      ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  Toutes
                </button>
                {availableSubcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    onClick={() => setActiveSubcategory(subcategory.id)}
                    className={`flex items-center px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                      activeSubcategory === subcategory.id
                        ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                    }`}
                  >
                    <span className="mr-2">{subcategory.icon}</span>
                    {subcategory.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredStructures.map((structure) => (
            <div 
              key={structure.id} 
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-3xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-2 group border border-white/20"
              itemScope 
              itemType="https://schema.org/Product"
              itemProp="itemListElement"
            >
              <div className="relative">
                {/* État de chargement */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse rounded-t-2xl"></div>
                <img 
                  src={structure.image} 
                  alt={structure.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700 relative z-10"
                  itemProp="image"
                  loading="eager"
                  onLoad={(e) => {
                    // Masquer le placeholder une fois l'image chargée
                    const placeholder = e.currentTarget.previousElementSibling;
                    if (placeholder) placeholder.style.display = 'none';
                  }}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400';
                    const placeholder = e.currentTarget.previousElementSibling;
                    if (placeholder) placeholder.style.display = 'none';
                  }}
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-2xl border border-white/20 backdrop-blur-sm">
                  <span itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    {structure.customPricing ? 'Prix sur Devis' : `${structure.price}€`}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-700 flex items-center justify-center backdrop-blur-0 group-hover:backdrop-blur-sm">
                  <button
                    onClick={() => openModal(structure)}
                    className="opacity-0 group-hover:opacity-100 bg-white/95 backdrop-blur-sm text-blue-600 px-8 py-4 rounded-full font-bold transform translate-y-6 group-hover:translate-y-0 transition-all duration-700 shadow-2xl hover:shadow-3xl border border-white/30 hover:scale-110"
                  >
                    <Eye className="w-5 h-5 inline mr-3 drop-shadow-sm" />
                    Voir les détails
                  </button>
                </div>
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 drop-shadow-sm" itemProp="name">{structure.name}</h3>
                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed" itemProp="description">
                  {structure.description.length > 120 
                    ? structure.description.substring(0, 120) + '...' 
                    : structure.description
                  }
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center text-sm text-gray-700 bg-gradient-to-r from-blue-50 to-blue-50/50 p-3 rounded-xl backdrop-blur-sm border border-blue-100/50">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                      <Ruler className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">Dimensions:</span>
                    <span className="ml-2 font-semibold">{structure.size}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 bg-gradient-to-r from-orange-50 to-orange-50/50 p-3 rounded-xl backdrop-blur-sm border border-orange-100/50">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">Capacité:</span>
                    <span className="ml-2 font-semibold">{structure.capacity}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 bg-gradient-to-r from-pink-50 to-pink-50/50 p-3 rounded-xl backdrop-blur-sm border border-pink-100/50">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-medium">Âge:</span>
                    <span className="ml-2 font-semibold">{structure.age}</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => openModal(structure)}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-xl font-bold transition-all duration-700 transform hover:scale-110 shadow-xl hover:shadow-2xl hover:from-orange-600 hover:to-orange-700 border border-orange-400/20 backdrop-blur-sm"
                  >
                    <Eye className="w-5 h-5 inline mr-3 drop-shadow-sm" />
                    Voir plus
                  </button>
                  <div className="relative">
                    <button
                      onClick={() => addToCart(structure)}
                      className={`relative px-6 py-4 rounded-xl font-bold transition-all duration-700 transform hover:scale-110 shadow-xl backdrop-blur-sm border ${
                        isInCart(structure.id)
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 border-blue-400/20 hover:shadow-2xl'
                          : 'border-2 border-blue-500/80 text-blue-500 hover:bg-blue-500 hover:text-white bg-white/80 hover:border-blue-600'
                      }`}
                      title={isInCart(structure.id) ? "Ajouter une autre" : "Ajouter au panier"}
                    >
                      <ShoppingCart className="w-5 h-5 inline drop-shadow-sm" />
                    </button>
                    {isInCart(structure.id) && (
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs rounded-full w-7 h-7 flex items-center justify-center font-bold shadow-2xl animate-pulse border-2 border-white backdrop-blur-sm">
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
          <div className="text-center py-20">
            <div className="text-8xl mb-8 animate-bounce-slow drop-shadow-lg">🎪</div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4 drop-shadow-sm">Aucune structure trouvée</h3>
            <p className="text-xl text-gray-600 drop-shadow-sm">
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