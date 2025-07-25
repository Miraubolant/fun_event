import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Package, DollarSign, Tag, Image, Camera, ArrowUp, ArrowDown } from 'lucide-react';
import { useStructures } from '../contexts/StructuresContext';
import { useAuth } from '../contexts/AuthContext';
import { Structure, Category, CarouselPhoto } from '../types';

const AdminPanel: React.FC = () => {
  const { 
    structures, 
    categories, 
    carouselPhotos,
    addStructure, 
    updateStructure, 
    deleteStructure, 
    addCategory, 
    updateCategory, 
    deleteCategory,
    addCarouselPhoto,
    updateCarouselPhoto,
    deleteCarouselPhoto,
    reorderCarouselPhotos
  } = useStructures();
  const { logout } = useAuth();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'structures' | 'categories' | 'photos' | null>(null);
  const [formData, setFormData] = useState<Partial<Structure>>({});
  const [categoryData, setCategoryData] = useState<Partial<Category>>({});
  const [photoData, setPhotoData] = useState<Partial<CarouselPhoto>>({});

  const handleEdit = (structure: Structure) => {
    setShowEditForm(true);
    setFormData(structure);
  };

  const handleSaveEdit = () => {
    if (formData.id && formData.name && formData.category && formData.price) {
      updateStructure(formData.id, formData);
      setShowEditForm(false);
      setFormData({});
    }
  };

  const handleAdd = () => {
    if (formData.name && formData.category && formData.price) {
      // Vérifier que la catégorie existe
      const categoryExists = categories.find(c => c.id === formData.category);
      if (!categoryExists) {
        alert('Veuillez sélectionner une catégorie valide.');
        return;
      }
      
      const newStructure = {
        name: formData.name,
        category: formData.category,
        size: formData.size || '',
        capacity: formData.capacity || '',
        age: formData.age || '',
        price: formData.price,
        price2Days: formData.price2Days,
        maxWeight: formData.maxWeight,
        services: formData.services,
        image: formData.image || 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: formData.description || '',
        available: formData.available ?? true
      };
      
      addStructure(newStructure).catch(error => {
        console.error('Erreur lors de l\'ajout:', error);
        alert(`Erreur lors de l'ajout de la structure: ${error.message || 'Vérifiez votre connexion.'}`);
      });
      
      // Ne pas fermer le formulaire, juste vider les données
      setFormData({});
    }
  };

  const handleAddCategory = () => {
    if (categoryData.label && categoryData.icon) {
      const newCategory = {
        label: categoryData.label,
        icon: categoryData.icon
      };
      
      addCategory(newCategory).catch(error => {
        console.error('Erreur lors de l\'ajout:', error);
        alert(`Erreur lors de l'ajout de la catégorie: ${error.message || 'Vérifiez votre connexion.'}`);
      });
      
      // Ne pas fermer le formulaire, juste vider les données
      setCategoryData({});
    }
  };

  const handleAddPhoto = () => {
    if (photoData.url && photoData.alt) {
      const maxOrder = Math.max(...carouselPhotos.map(p => p.order), 0);
      const newPhoto = {
        url: photoData.url,
        alt: photoData.alt,
        title: photoData.title,
        location: photoData.location,
        order: photoData.order || maxOrder + 1
      };
      
      addCarouselPhoto(newPhoto).catch(error => {
        console.error('Erreur lors de l\'ajout:', error);
        alert(`Erreur lors de l'ajout de la photo: ${error.message || 'Vérifiez votre connexion.'}`);
      });
      
      // Ne pas fermer le formulaire, juste vider les données
      setPhotoData({});
    }
  };

  const handleCancel = () => {
    setActiveSection(null);
    setEditingPhotoId(null);
    setFormData({});
    setCategoryData({});
    setPhotoData({});
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette structure ?')) {
      deleteStructure(id);
    }
  };

  const handleDeleteCategory = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      deleteCategory(id);
    }
  };

  const handleDeletePhoto = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette photo ?')) {
      deleteCarouselPhoto(id);
    }
  };

  const handleEditPhoto = (photo: CarouselPhoto) => {
    setEditingPhotoId(photo.id);
    setPhotoData({
      url: photo.url,
      alt: photo.alt,
      title: photo.title,
      location: photo.location,
      order: photo.order
    });
  };

  const handleSavePhotoEdit = () => {
    if (editingPhotoId && photoData.url && photoData.alt) {
      updateCarouselPhoto(editingPhotoId, photoData).then(() => {
        setEditingPhotoId(null);
        setPhotoData({});
      }).catch(error => {
        console.error('Erreur lors de la modification:', error);
        alert(`Erreur lors de la modification de la photo: ${error.message || 'Vérifiez votre connexion.'}`);
      });
    }
  };

  const handleCancelPhotoEdit = () => {
    setEditingPhotoId(null);
    setPhotoData({});
  };
  const openSection = (section: 'structures' | 'categories' | 'photos') => {
    setActiveSection(section);
    // Fermer les autres sections
    setShowAddForm(section === 'structures');
    setShowCategoryForm(section === 'categories');
    setShowPhotoForm(section === 'photos');
    setShowEditForm(false);
  };
  const movePhoto = (id: string, direction: 'up' | 'down') => {
    const sortedPhotos = [...carouselPhotos].sort((a, b) => a.order - b.order);
    const currentIndex = sortedPhotos.findIndex(p => p.id === id);
    
    if (direction === 'up' && currentIndex > 0) {
      const newPhotos = [...sortedPhotos];
      [newPhotos[currentIndex], newPhotos[currentIndex - 1]] = [newPhotos[currentIndex - 1], newPhotos[currentIndex]];
      newPhotos.forEach((photo, index) => {
        updateCarouselPhoto(photo.id, { order: index + 1 });
      });
    } else if (direction === 'down' && currentIndex < sortedPhotos.length - 1) {
      const newPhotos = [...sortedPhotos];
      [newPhotos[currentIndex], newPhotos[currentIndex + 1]] = [newPhotos[currentIndex + 1], newPhotos[currentIndex]];
      newPhotos.forEach((photo, index) => {
        updateCarouselPhoto(photo.id, { order: index + 1 });
      });
    }
  };

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Panneau
                </span>
                <br />
                <span className="bg-gradient-to-r text-transparent bg-clip-text animate-pulse" style={{backgroundImage: 'linear-gradient(to right, #0F97F6, #FF5722)'}}>
                  d'Administration ⚙️
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 font-medium">
                🛠️ Gérez vos <span className="font-bold" style={{color: '#0F97F6'}}>structures</span> et 
                <span className="font-bold text-orange-500"> tarifs</span>
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => openSection('structures')}
             className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              {activeSection === 'structures' ? 'Gérer Structures' : 'Ajouter Structure'}
            </button>
            <button
              onClick={() => openSection('categories')}
             className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center"
            >
              <Tag className="w-5 h-5 mr-2" />
              {activeSection === 'categories' ? 'Gérer Catégories' : 'Ajouter Catégorie'}
            </button>
            <button
              onClick={() => openSection('photos')}
             className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center"
            >
              <Camera className="w-5 h-5 mr-2" />
              {activeSection === 'photos' ? 'Gérer Photos' : 'Ajouter Photo'}
            </button>
            <button
              onClick={logout}
             className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Total Structures</p>
                <p className="text-2xl font-bold text-gray-900">{structures.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Prix Moyen</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(structures.reduce((acc, s) => acc + s.price, 0) / structures.length)}€
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-orange-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Disponibles</p>
                <p className="text-2xl font-bold text-gray-900">
                  {structures.filter(s => s.available).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center">
              <Camera className="w-8 h-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Photos Carrousel</p>
                <p className="text-2xl font-bold text-gray-900">{carouselPhotos.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gestion des photos du carrousel */}
        {activeSection === 'photos' && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingPhotoId ? 'Modifier la Photo' : 'Gérer les Photos du Carrousel'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL de l'image * {editingPhotoId && <span className="text-blue-600">(Modification en cours)</span>}
                </label>
                <input
                  type="url"
                  placeholder="https://i.imgur.com/example.png"
                  value={photoData.url || ''}
                  onChange={(e) => setPhotoData({...photoData, url: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (Alt text) * {editingPhotoId && <span className="text-blue-600">(Modification en cours)</span>}
                </label>
                <input
                  type="text"
                  placeholder="Description de l'image"
                  value={photoData.alt || ''}
                  onChange={(e) => setPhotoData({...photoData, alt: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Titre de l'événement
                </label>
                <input
                  type="text"
                  placeholder="ex: Anniversaire Magique"
                  value={photoData.title || ''}
                  onChange={(e) => setPhotoData({...photoData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localisation
                </label>
                <input
                  type="text"
                  placeholder="ex: Paris 15ème"
                  value={photoData.location || ''}
                  onChange={(e) => setPhotoData({...photoData, location: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
                />
              </div>
            </div>
            
            {photoData.url && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Aperçu :</label>
                <img 
                  src={photoData.url} 
                  alt="Aperçu" 
                  className="w-48 h-32 object-cover rounded-lg border-2 border-gray-200"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className="flex gap-3 mb-6">
              {editingPhotoId ? (
                <>
                  <button
                    onClick={handleSavePhotoEdit}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all flex items-center"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    Sauvegarder les modifications
                  </button>
                  <button
                    onClick={handleCancelPhotoEdit}
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Annuler la modification
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAddPhoto}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Ajouter une autre photo
                </button>
              )}
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center"
              >
                <X className="w-5 h-5 mr-2" />
                Fermer
              </button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Photos actuelles :</h3>
              {[...carouselPhotos].sort((a, b) => a.order - b.order).map((photo, index) => (
                <div key={photo.id} className={`p-4 rounded-lg flex items-center justify-between ${
                  editingPhotoId === photo.id ? 'bg-blue-50 border-2 border-blue-300' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center">
                    <img 
                      src={photo.url} 
                      alt={photo.alt}
                      className="w-16 h-12 object-cover rounded mr-4"
                    />
                    <div>
                      <p className="font-medium">{photo.title || photo.alt}</p>
                      {photo.location && (
                        <p className="text-sm text-blue-600">📍 {photo.location}</p>
                      )}
                      <p className="text-sm text-gray-500">Position: {index + 1}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => movePhoto(photo.id, 'up')}
                      disabled={index === 0}
                      className="p-2 text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                      title="Monter"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => movePhoto(photo.id, 'down')}
                      disabled={index === carouselPhotos.length - 1}
                      className="p-2 text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                      title="Descendre"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditPhoto(photo)}
                      className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="p-2 text-red-600 hover:text-red-800 transition-colors"
                      title="Supprimer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gestion des catégories */}
        {activeSection === 'categories' && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Gérer les Catégories</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Nom de la catégorie"
                value={categoryData.label || ''}
                onChange={(e) => setCategoryData({...categoryData, label: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Emoji (ex: 🏰)"
                value={categoryData.icon || ''}
                onChange={(e) => setCategoryData({...categoryData, icon: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
              />
            </div>
            
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddCategory}
               className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center"
              >
                <Save className="w-5 h-5 mr-2" />
                Ajouter une autre catégorie
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center"
              >
                <X className="w-5 h-5 mr-2" />
                Fermer
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div key={category.id} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{category.icon}</span>
                    <span className="font-medium">{category.label}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formulaire d'ajout */}
        {activeSection === 'structures' && !showEditForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ajouter une nouvelle structure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nom de la structure"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
              />
              <select
                value={formData.category || ''}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Dimensions (ex: 7,7m x 6,6m x 1,5m)"
                value={formData.size || ''}
                onChange={(e) => setFormData({...formData, size: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Capacité (ex: 2 personnes max)"
                value={formData.capacity || ''}
                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Âge (ex: 3-77 ans)"
                value={formData.age || ''}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Prix (€)"
                value={formData.price || ''}
                onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Prix 2 jours (€)"
                value={formData.price2Days || ''}
                onChange={(e) => setFormData({...formData, price2Days: parseInt(e.target.value)})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Poids max (kg)"
                value={formData.maxWeight || ''}
                onChange={(e) => setFormData({...formData, maxWeight: parseInt(e.target.value)})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Image className="w-4 h-4 inline mr-1" />
                  URL de l'image * (Lien direct vers l'image)
                </label>
                <input
                  type="url"
                  placeholder="https://i.imgur.com/fLqAlJ1.png (lien direct)"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 Pour Imgur: utilisez https://i.imgur.com/ID.extension (ex: https://i.imgur.com/fLqAlJ1.png)
                </p>
                {formData.image && (
                  <div className="mt-3">
                    <img 
                      src={formData.image} 
                      alt="Aperçu" 
                      className="w-32 h-24 object-cover rounded-lg border-2 border-gray-200"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description complète *
                </label>
                <textarea
                  placeholder="Description complète avec emojis et détails..."
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
                  rows={6}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services et normes
                </label>
                <textarea
                  placeholder="Services et normes (ex: Enrouleur électrique inclus, Conforme EN 14960...)"
                  value={formData.services || ''}
                  onChange={(e) => setFormData({...formData, services: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.available ?? true}
                    onChange={(e) => setFormData({...formData, available: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Structure disponible</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAdd}
               className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center"
              >
                <Save className="w-5 h-5 mr-2" />
                Ajouter une autre structure
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center"
              >
                <X className="w-5 h-5 mr-2" />
                Fermer
              </button>
            </div>
          </div>
        )}

        {/* Formulaire d'édition */}
        {showEditForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Modifier la structure</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nom de la structure"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
              />
              <select
                value={formData.category || ''}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
              >
                <option value="">Sélectionner une catégorie</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Dimensions (ex: 7,7m x 6,6m x 1,5m)"
                value={formData.size || ''}
                onChange={(e) => setFormData({...formData, size: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Capacité (ex: 2 personnes max)"
                value={formData.capacity || ''}
                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Âge (ex: 3-77 ans)"
                value={formData.age || ''}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Prix (€)"
                value={formData.price || ''}
                onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Prix 2 jours (€)"
                value={formData.price2Days || ''}
                onChange={(e) => setFormData({...formData, price2Days: parseInt(e.target.value)})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
              />
              <input
                type="number"
                placeholder="Poids max (kg)"
                value={formData.maxWeight || ''}
                onChange={(e) => setFormData({...formData, maxWeight: parseInt(e.target.value)})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
              />
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Image className="w-4 h-4 inline mr-1" />
                  URL de l'image * (Lien direct vers l'image)
                </label>
                <input
                  type="url"
                  placeholder="https://i.imgur.com/fLqAlJ1.png (lien direct)"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 Pour Imgur: utilisez https://i.imgur.com/ID.extension (ex: https://i.imgur.com/fLqAlJ1.png)
                </p>
                {formData.image && (
                  <div className="mt-3">
                    <img 
                      src={formData.image} 
                      alt="Aperçu" 
                      className="w-32 h-24 object-cover rounded-lg border-2 border-gray-200"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description complète *
                </label>
                <textarea
                  placeholder="Description complète avec emojis et détails..."
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
                  rows={6}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services et normes
                </label>
                <textarea
                  placeholder="Services et normes (ex: Enrouleur électrique inclus, Conforme EN 14960...)"
                  value={formData.services || ''}
                  onChange={(e) => setFormData({...formData, services: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500"
                  rows={3}
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.available ?? true}
                    onChange={(e) => setFormData({...formData, available: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm font-medium text-gray-700">Structure disponible</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveEdit}
               className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center"
              >
                <Save className="w-5 h-5 mr-2" />
                Sauvegarder
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center"
              >
                <X className="w-5 h-5 mr-2" />
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Liste des structures */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Structures Existantes</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Structure</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {structures.map((structure) => (
                  <tr key={structure.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img className="h-12 w-12 rounded-lg object-cover mr-4" src={structure.image} alt={structure.name} />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{structure.name}</div>
                          <div className="text-sm text-gray-500">{structure.size}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {categories.find(c => c.id === structure.category)?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        <div>{structure.price}€/jour</div>
                        {structure.price2Days && (
                          <div className="text-xs text-gray-600">{structure.price2Days}€/2j</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        structure.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {structure.available ? 'Disponible' : 'Indisponible'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(structure)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="Modifier"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(structure.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;