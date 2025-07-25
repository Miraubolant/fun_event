import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Package, DollarSign, Tag, Image, Camera, ArrowUp, ArrowDown, AlertTriangle, LogOut, GripVertical } from 'lucide-react';
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
    reorderCarouselPhotos,
    reorderStructures
  } = useStructures();
  const { logout } = useAuth();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'structures' | 'categories' | 'photos' | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    type: 'structure' | 'category' | 'photo';
    id: string;
    name: string;
  } | null>(null);
  const [formData, setFormData] = useState<Partial<Structure>>({});
  const [categoryData, setCategoryData] = useState<Partial<Category>>({});
  const [photoData, setPhotoData] = useState<Partial<CarouselPhoto>>({});
  
  // États pour le glisser-déposer
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [draggedOver, setDraggedOver] = useState<string | null>(null);

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
    const structure = structures.find(s => s.id === id);
    setDeleteConfirm({
      isOpen: true,
      type: 'structure',
      id,
      name: structure?.name || 'cette structure'
    });
  };

  const handleDeleteCategory = (id: string) => {
    const category = categories.find(c => c.id === id);
    setDeleteConfirm({
      isOpen: true,
      type: 'category',
      id,
      name: category?.label || 'cette catégorie'
    });
  };

  const handleDeletePhoto = (id: string) => {
    const photo = carouselPhotos.find(p => p.id === id);
    setDeleteConfirm({
      isOpen: true,
      type: 'photo',
      id,
      name: photo?.title || photo?.alt || 'cette photo'
    });
  };

  const confirmDelete = () => {
    if (!deleteConfirm) return;
    
    switch (deleteConfirm.type) {
      case 'structure':
        deleteStructure(deleteConfirm.id);
        break;
      case 'category':
        deleteCategory(deleteConfirm.id);
        break;
      case 'photo':
        deleteCarouselPhoto(deleteConfirm.id);
        break;
    }
    
    setDeleteConfirm(null);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
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

  const moveStructure = (id: string, direction: 'up' | 'down') => {
    const sortedStructures = [...structures].sort((a, b) => (a.order || 1) - (b.order || 1));
    const currentIndex = sortedStructures.findIndex(s => s.id === id);
    
    if (direction === 'up' && currentIndex > 0) {
      const newStructures = [...sortedStructures];
      [newStructures[currentIndex], newStructures[currentIndex - 1]] = [newStructures[currentIndex - 1], newStructures[currentIndex]];
      newStructures.forEach((structure, index) => {
        updateStructure(structure.id, { order: index + 1 });
      });
    } else if (direction === 'down' && currentIndex < sortedStructures.length - 1) {
      const newStructures = [...sortedStructures];
      [newStructures[currentIndex], newStructures[currentIndex + 1]] = [newStructures[currentIndex + 1], newStructures[currentIndex]];
      newStructures.forEach((structure, index) => {
        updateStructure(structure.id, { order: index + 1 });
      });
    }
  };

  // Fonctions pour le glisser-déposer des structures
  const handleDragStart = (e: React.DragEvent, structureId: string) => {
    setDraggedItem(structureId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', structureId);
  };

  const handleDragOver = (e: React.DragEvent, structureId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDraggedOver(structureId);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDraggedOver(null);
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === targetId) return;

    const sortedStructures = [...structures].sort((a, b) => (a.order || 1) - (b.order || 1));
    const draggedIndex = sortedStructures.findIndex(s => s.id === draggedItem);
    const targetIndex = sortedStructures.findIndex(s => s.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    // Réorganiser le tableau
    const newStructures = [...sortedStructures];
    const [draggedStructure] = newStructures.splice(draggedIndex, 1);
    newStructures.splice(targetIndex, 0, draggedStructure);

    // Mettre à jour les ordres
    newStructures.forEach((structure, index) => {
      updateStructure(structure.id, { order: index + 1 });
    });

    setDraggedItem(null);
    setDraggedOver(null);
  };

  return (
    <section className="py-8 lg:py-16 bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8 lg:mb-12">
          <div>
            <div className="animate-fade-in">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                  Panneau
                </span>
                <br />
                <span className="bg-gradient-to-r text-transparent bg-clip-text animate-pulse" style={{backgroundImage: 'linear-gradient(to right, #0F97F6, #FF5722)'}}>
                  d'Administration ⚙️
                </span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 font-medium">
                🛠️ Gérez vos <span className="font-bold" style={{color: '#0F97F6'}}>structures</span> et 
                <span className="font-bold text-orange-500"> tarifs</span>
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 w-full lg:w-auto">
            <button
              onClick={() => openSection('structures')}
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center text-sm lg:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {activeSection === 'structures' ? 'Gérer Structures' : 'Ajouter Structure'}
            </button>
            <button
              onClick={() => openSection('categories')}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center text-sm lg:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Tag className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {activeSection === 'categories' ? 'Gérer Catégories' : 'Ajouter Catégorie'}
            </button>
            <button
              onClick={() => openSection('photos')}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all flex items-center justify-center text-sm lg:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {activeSection === 'photos' ? 'Gérer Photos' : 'Ajouter Photo'}
            </button>
            <button
              onClick={logout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 sm:px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all flex items-center justify-center text-sm lg:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <LogOut className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Déconnexion
            </button>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-3 lg:mr-4">
                <Package className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <p className="text-xs lg:text-sm text-gray-600 font-medium">Total Structures</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900">{structures.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3 lg:mr-4">
                <DollarSign className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <p className="text-xs lg:text-sm text-gray-600 font-medium">Prix Moyen</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900">
                  {Math.round(structures.reduce((acc, s) => acc + s.price, 0) / structures.length)}€
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-3 lg:mr-4">
                <Package className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <p className="text-xs lg:text-sm text-gray-600 font-medium">Disponibles</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900">
                  {structures.filter(s => s.available).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 lg:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3 lg:mr-4">
                <Camera className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <p className="text-xs lg:text-sm text-gray-600 font-medium">Photos Carrousel</p>
                <p className="text-xl lg:text-2xl font-bold text-gray-900">{carouselPhotos.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gestion des photos du carrousel */}
        {activeSection === 'photos' && (
          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">
              {editingPhotoId ? 'Modifier la Photo' : 'Gérer les Photos du Carrousel'}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  URL de l'image * {editingPhotoId && <span className="text-blue-600">(Modification en cours)</span>}
                </label>
                <input
                  type="url"
                  placeholder="https://i.imgur.com/example.png"
                  value={photoData.url || ''}
                  onChange={(e) => setPhotoData({...photoData, url: e.target.value})}
                  className="w-full px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description (Alt text) * {editingPhotoId && <span className="text-blue-600">(Modification en cours)</span>}
                </label>
                <input
                  type="text"
                  placeholder="Description de l'image"
                  value={photoData.alt || ''}
                  onChange={(e) => setPhotoData({...photoData, alt: e.target.value})}
                  className="w-full px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Titre de l'événement
                </label>
                <input
                  type="text"
                  placeholder="ex: Anniversaire Magique"
                  value={photoData.title || ''}
                  onChange={(e) => setPhotoData({...photoData, title: e.target.value})}
                  className="w-full px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Localisation
                </label>
                <input
                  type="text"
                  placeholder="ex: Paris 15ème"
                  value={photoData.location || ''}
                  onChange={(e) => setPhotoData({...photoData, location: e.target.value})}
                  className="w-full px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
            </div>
            
            {photoData.url && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Aperçu :</label>
                <img 
                  src={photoData.url} 
                  alt="Aperçu" 
                  className="w-32 sm:w-48 h-24 sm:h-32 object-cover rounded-lg border-2 border-gray-200 shadow-md"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {editingPhotoId ? (
                <>
                  <button
                    onClick={handleSavePhotoEdit}
                    className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 lg:px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Save className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                    Sauvegarder les modifications
                  </button>
                  <button
                    onClick={handleCancelPhotoEdit}
                    className="bg-gray-500 text-white px-4 lg:px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
                  >
                    <X className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                    Annuler la modification
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAddPhoto}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 lg:px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Save className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                  Ajouter une autre photo
                </button>
              )}
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 lg:px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <X className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Fermer
              </button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900">Photos actuelles :</h3>
              {[...carouselPhotos].sort((a, b) => a.order - b.order).map((photo, index) => (
                <div key={photo.id} className={`p-3 lg:p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  editingPhotoId === photo.id ? 'bg-blue-50 border-2 border-blue-300' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center flex-1">
                    <img 
                      src={photo.url} 
                      alt={photo.alt}
                      className="w-12 h-9 lg:w-16 lg:h-12 object-cover rounded mr-3 lg:mr-4 flex-shrink-0"
                    />
                    <div>
                      <p className="font-medium text-sm lg:text-base">{photo.title || photo.alt}</p>
                      {photo.location && (
                        <p className="text-xs lg:text-sm text-blue-600">📍 {photo.location}</p>
                      )}
                      <p className="text-xs lg:text-sm text-gray-500">Position: {index + 1}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 lg:gap-2 justify-end sm:justify-start">
                    <button
                      onClick={() => movePhoto(photo.id, 'up')}
                      disabled={index === 0}
                      className="p-1 lg:p-2 text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors hover:bg-blue-100 rounded"
                      title="Monter"
                    >
                      <ArrowUp className="w-3 h-3 lg:w-4 lg:h-4" />
                    </button>
                    <button
                      onClick={() => movePhoto(photo.id, 'down')}
                      disabled={index === carouselPhotos.length - 1}
                      className="p-1 lg:p-2 text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors hover:bg-blue-100 rounded"
                      title="Descendre"
                    >
                      <ArrowDown className="w-3 h-3 lg:w-4 lg:h-4" />
                    </button>
                    <button
                      onClick={() => handleEditPhoto(photo)}
                      className="p-1 lg:p-2 text-blue-600 hover:text-blue-800 transition-colors hover:bg-blue-100 rounded"
                      title="Modifier"
                    >
                      <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="p-1 lg:p-2 text-red-600 hover:text-red-800 transition-colors hover:bg-red-100 rounded"
                      title="Supprimer"
                    >
                      <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gestion des catégories */}
        {activeSection === 'categories' && (
          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Gérer les Catégories</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Nom de la catégorie"
                value={categoryData.label || ''}
                onChange={(e) => setCategoryData({...categoryData, label: e.target.value})}
                className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <input
                type="text"
                placeholder="Emoji (ex: 🏰)"
                value={categoryData.icon || ''}
                onChange={(e) => setCategoryData({...categoryData, icon: e.target.value})}
                className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <button
                onClick={handleAddCategory}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 lg:px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Save className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Ajouter une autre catégorie
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 lg:px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <X className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Fermer
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div key={category.id} className="bg-gray-50 p-3 lg:p-4 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors">
                  <div className="flex items-center">
                    <span className="text-xl lg:text-2xl mr-2 lg:mr-3">{category.icon}</span>
                    <span className="font-medium text-sm lg:text-base">{category.label}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="text-red-600 hover:text-red-800 transition-colors p-1 hover:bg-red-100 rounded"
                  >
                    <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formulaire d'ajout */}
        {activeSection === 'structures' && !showEditForm && (
          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Ajouter une nouvelle structure</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nom de la structure"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <select
                value={formData.category || ''}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
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
                className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <input
                type="text"
                placeholder="Capacité (ex: 2 personnes max)"
                value={formData.capacity || ''}
                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <input
                type="text"
                placeholder="Âge (ex: 3-77 ans)"
                value={formData.age || ''}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <input
                type="number"
                placeholder="Prix (€)"
                value={formData.price || ''}
                onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <input
                type="number"
                placeholder="Prix 2 jours (€)"
                value={formData.price2Days || ''}
                onChange={(e) => setFormData({...formData, price2Days: parseInt(e.target.value)})}
                className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <input
                type="number"
                placeholder="Poids max (kg)"
                value={formData.maxWeight || ''}
                onChange={(e) => setFormData({...formData, maxWeight: parseInt(e.target.value)})}
                className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Image className="w-4 h-4 inline mr-1" />
                  URL de l'image * (Lien direct vers l'image)
                </label>
                <input
                  type="url"
                  placeholder="https://i.imgur.com/fLqAlJ1.png (lien direct)"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 Pour Imgur: utilisez https://i.imgur.com/ID.extension (ex: https://i.imgur.com/fLqAlJ1.png)
                </p>
                {formData.image && (
                  <div className="mt-3">
                    <img 
                      src={formData.image} 
                      alt="Aperçu" 
                      className="w-24 sm:w-32 h-18 sm:h-24 object-cover rounded-lg border-2 border-gray-200 shadow-md"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description complète *
                </label>
                <textarea
                  placeholder="Description complète avec emojis et détails..."
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                  rows={6}
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Services et normes
                </label>
                <textarea
                  placeholder="Services et normes (ex: Enrouleur électrique inclus, Conforme EN 14960...)"
                  value={formData.services || ''}
                  onChange={(e) => setFormData({...formData, services: e.target.value})}
                  className="w-full px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                  rows={3}
                />
              </div>
              <div className="lg:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.available ?? true}
                    onChange={(e) => setFormData({...formData, available: e.target.checked})}
                    className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">Structure disponible</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleAdd}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 lg:px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Save className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Ajouter une autre structure
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 lg:px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <X className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Fermer
              </button>
            </div>
          </div>
        )}

        {/* Formulaire d'édition */}
        {showEditForm && (
          <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 mb-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Modifier la structure</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Nom de la structure"
                value={formData.name || ''}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <select
                value={formData.category || ''}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
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
                className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <input
                type="text"
                placeholder="Capacité (ex: 2 personnes max)"
                value={formData.capacity || ''}
                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <input
                type="text"
                placeholder="Âge (ex: 3-77 ans)"
                value={formData.age || ''}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
                className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <input
                type="number"
                placeholder="Prix (€)"
                value={formData.price || ''}
                onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <input
                type="number"
                placeholder="Prix 2 jours (€)"
                value={formData.price2Days || ''}
                onChange={(e) => setFormData({...formData, price2Days: parseInt(e.target.value)})}
                className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <input
                type="number"
                placeholder="Poids max (kg)"
                value={formData.maxWeight || ''}
                onChange={(e) => setFormData({...formData, maxWeight: parseInt(e.target.value)})}
                className="px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
              />
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Image className="w-4 h-4 inline mr-1" />
                  URL de l'image * (Lien direct vers l'image)
                </label>
                <input
                  type="url"
                  placeholder="https://i.imgur.com/fLqAlJ1.png (lien direct)"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 Pour Imgur: utilisez https://i.imgur.com/ID.extension (ex: https://i.imgur.com/fLqAlJ1.png)
                </p>
                {formData.image && (
                  <div className="mt-3">
                    <img 
                      src={formData.image} 
                      alt="Aperçu" 
                      className="w-24 sm:w-32 h-18 sm:h-24 object-cover rounded-lg border-2 border-gray-200 shadow-md"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description complète *
                </label>
                <textarea
                  placeholder="Description complète avec emojis et détails..."
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                  rows={6}
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Services et normes
                </label>
                <textarea
                  placeholder="Services et normes (ex: Enrouleur électrique inclus, Conforme EN 14960...)"
                  value={formData.services || ''}
                  onChange={(e) => setFormData({...formData, services: e.target.value})}
                  className="w-full px-3 lg:px-4 py-2 lg:py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                  rows={3}
                />
              </div>
              <div className="lg:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.available ?? true}
                    onChange={(e) => setFormData({...formData, available: e.target.checked})}
                    className="mr-2 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-semibold text-gray-700">Structure disponible</span>
                </label>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleSaveEdit}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 lg:px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Save className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Sauvegarder
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 lg:px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
              >
                <X className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Liste des structures avec glisser-déposer */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg lg:text-xl font-bold text-gray-900">
              Structures Existantes ({structures.length})
              <span className="text-sm font-normal text-gray-600 ml-2">
                - Glissez-déposez pour réorganiser l'ordre d'affichage
              </span>
            </h2>
          </div>
          
          <div className="overflow-x-auto min-h-0">
            <table className="w-full min-w-[720px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Glisser</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Ordre</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Structure</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Catégorie</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Prix</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                  <th className="px-3 lg:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[...structures].sort((a, b) => (a.order || 1) - (b.order || 1)).map((structure, index) => (
                  <tr 
                    key={structure.id} 
                    draggable
                    onDragStart={(e) => handleDragStart(e, structure.id)}
                    onDragOver={(e) => handleDragOver(e, structure.id)}
                    onDragEnd={handleDragEnd}
                    onDrop={(e) => handleDrop(e, structure.id)}
                    className={`hover:bg-gray-50 transition-all cursor-move ${
                      draggedItem === structure.id ? 'opacity-50 scale-95' : ''
                    } ${
                      draggedOver === structure.id && draggedItem !== structure.id ? 'bg-blue-50 border-t-2 border-blue-400' : ''
                    }`}
                  >
                    <td className="px-3 lg:px-6 py-4">
                      <div className="flex items-center justify-center">
                        <GripVertical className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                      <div className="flex items-center gap-1 lg:gap-2">
                        <span className="text-sm font-semibold text-gray-900 bg-blue-100 px-2 py-1 rounded-full min-w-[24px] text-center">
                          {index + 1}
                        </span>
                        <div className="flex flex-col gap-1">
                          <button
                            onClick={() => moveStructure(structure.id, 'up')}
                            disabled={index === 0}
                            className="p-1 text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors hover:bg-blue-100 rounded"
                            title="Monter"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => moveStructure(structure.id, 'down')}
                            disabled={index === structures.length - 1}
                            className="p-1 text-blue-600 hover:text-blue-800 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors hover:bg-blue-100 rounded"
                            title="Descendre"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                      <div className="flex items-center">
                        <img className="h-8 w-8 lg:h-12 lg:w-12 rounded-lg object-cover mr-2 lg:mr-4 flex-shrink-0" src={structure.image} alt={structure.name} />
                        <div>
                          <div className="text-xs lg:text-sm font-semibold text-gray-900 line-clamp-2">{structure.name}</div>
                          <div className="text-xs text-gray-500 hidden lg:block">{structure.size}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                      <span className="px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {categories.find(c => c.id === structure.category)?.label}
                      </span>
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                      <div className="text-xs lg:text-sm font-semibold text-gray-900">
                        <div>{structure.price}€/jour</div>
                        {structure.price2Days && (
                          <div className="text-xs text-gray-600 hidden lg:block">{structure.price2Days}€/2j</div>
                        )}
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                      <span className={`px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${
                        structure.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {structure.available ? '✓ Dispo' : '✗ Indispo'}
                      </span>
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                      <div className="flex gap-1 lg:gap-2">
                        <button
                          onClick={() => handleEdit(structure)}
                          className="text-blue-600 hover:text-blue-900 transition-colors p-1 hover:bg-blue-100 rounded"
                          title="Modifier"
                        >
                          <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(structure.id)}
                          className="text-red-600 hover:text-red-900 transition-colors p-1 hover:bg-red-100 rounded"
                          title="Supprimer"
                        >
                          <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
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

      {/* Modale de confirmation de suppression */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-900">Confirmer la suppression</h3>
                <p className="text-sm text-gray-600">Cette action est irréversible</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6 text-sm lg:text-base">
              Êtes-vous sûr de vouloir supprimer <strong>"{deleteConfirm.name}"</strong> ?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminPanel;