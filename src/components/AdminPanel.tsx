import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Upload, Users, Tag, Image, Settings, BarChart3, Eye, EyeOff, GripVertical, Share2, ExternalLink, ToggleLeft, ToggleRight } from 'lucide-react';
import { useStructures } from '../contexts/StructuresContext';
import { useAuth } from '../contexts/AuthContext';
import { Structure, Category, CarouselPhoto } from '../types';

const AdminPanel: React.FC = () => {
  const { structures, categories, carouselPhotos, socialLinks, loading, addStructure, updateStructure, deleteStructure, addCategory, updateCategory, deleteCategory, addCarouselPhoto, updateCarouselPhoto, deleteCarouselPhoto, reorderCarouselPhotos, reorderStructures, addSocialLink, updateSocialLink, deleteSocialLink, reorderSocialLinks } = useStructures();
  const { logout } = useAuth();
  
  // États pour les modales
  const [showStructureModal, setShowStructureModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [editingStructureId, setEditingStructureId] = useState<string | null>(null);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    type: 'structure' | 'category' | 'photo';
    id: string;
    name: string;
  } | null>(null);
  
  const [formData, setFormData] = useState<Partial<Structure>>({});
  const [categoryData, setCategoryData] = useState<Partial<Category>>({});
  const [photoData, setPhotoData] = useState<Partial<CarouselPhoto>>({});
  const [newImageUrl, setNewImageUrl] = useState('');
  
  // États pour le glisser-déposer
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [draggedOver, setDraggedOver] = useState<string | null>(null);

  // Fonctions pour ouvrir les modales
  const openStructureModal = () => {
    setFormData({});
    setEditingStructureId(null);
    setShowStructureModal(true);
  };

  const openCategoryModal = () => {
    setCategoryData({});
    setShowCategoryModal(true);
  };

  const openPhotoModal = () => {
    setPhotoData({});
    setEditingPhotoId(null);
    setShowPhotoModal(true);
  };

  // Fonctions pour fermer les modales
  const closeAllModals = () => {
    setShowStructureModal(false);
    setShowCategoryModal(false);
    setShowPhotoModal(false);
    setEditingStructureId(null);
    setEditingPhotoId(null);
    setFormData({});
    setCategoryData({});
    setPhotoData({});
    setNewImageUrl('');
  };

  const handleEditStructure = (structure: Structure) => {
    setFormData(structure);
    setEditingStructureId(structure.id);
    setShowStructureModal(true);
  };

  const handleSaveStructure = () => {
    if (formData.name && formData.category) {
      const categoryExists = categories.find(c => c.id === formData.category);
      if (!categoryExists) {
        alert('Veuillez sélectionner une catégorie valide.');
        return;
      }
      
      // Vérifier que le prix est fourni si ce n'est pas un prix sur mesure
      if (!formData.customPricing && !formData.price) {
        alert('Veuillez saisir un prix ou cocher "Prix sur mesure".');
        return;
      }
      
      if (editingStructureId) {
        // Modification
        updateStructure(editingStructureId, formData);
        closeAllModals();
      } else {
        // Ajout
        const newStructure = {
          name: formData.name,
          category: formData.category,
          size: formData.size || '',
          capacity: formData.capacity || '',
          age: formData.age || '',
          price: formData.customPricing ? 0 : (formData.price || 0),
          price2Days: formData.price2Days,
          maxWeight: formData.maxWeight,
          services: formData.services,
          image: formData.image || 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400',
          additionalImages: formData.additionalImages || [],
          description: formData.description || '',
          available: formData.available ?? true,
          customPricing: formData.customPricing ?? false
        };
        
        addStructure(newStructure).then(() => {
          setFormData({});
        }).catch(error => {
          console.error('Erreur lors de l\'ajout:', error);
          alert(`Erreur lors de l'ajout de la structure: ${error.message || 'Vérifiez votre connexion.'}`);
        });
      }
    }
  };

  const handleSaveCategory = () => {
    if (categoryData.label && categoryData.icon) {
      const newCategory = {
        label: categoryData.label,
        icon: categoryData.icon
      };
      
      addCategory(newCategory).then(() => {
        setCategoryData({});
      }).catch(error => {
        console.error('Erreur lors de l\'ajout:', error);
        alert(`Erreur lors de l'ajout de la catégorie: ${error.message || 'Vérifiez votre connexion.'}`);
      });
    }
  };

  const handleSavePhoto = () => {
    if (photoData.url && photoData.alt) {
      if (editingPhotoId) {
        // Modification
        updateCarouselPhoto(editingPhotoId, photoData).then(() => {
          closeAllModals();
        }).catch(error => {
          console.error('Erreur lors de la modification:', error);
          alert(`Erreur lors de la modification de la photo: ${error.message || 'Vérifiez votre connexion.'}`);
        });
      } else {
        // Ajout
        const maxOrder = Math.max(...carouselPhotos.map(p => p.order), 0);
        const newPhoto = {
          url: photoData.url,
          alt: photoData.alt,
          title: photoData.title,
          location: photoData.location,
          order: photoData.order || maxOrder + 1
        };
        
        addCarouselPhoto(newPhoto).then(() => {
          setPhotoData({});
        }).catch(error => {
          console.error('Erreur lors de l\'ajout:', error);
          alert(`Erreur lors de l'ajout de la photo: ${error.message || 'Vérifiez votre connexion.'}`);
        });
      }
    }
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
    setShowPhotoModal(true);
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

    const newStructures = [...sortedStructures];
    const [draggedStructure] = newStructures.splice(draggedIndex, 1);
    newStructures.splice(targetIndex, 0, draggedStructure);

    newStructures.forEach((structure, index) => {
      updateStructure(structure.id, { order: index + 1 });
    });

    setDraggedItem(null);
    setDraggedOver(null);
  };

  // Fonctions pour gérer les images additionnelles
  const addAdditionalImage = () => {
    if (newImageUrl.trim()) {
      const currentImages = formData.additionalImages || [];
      setFormData({
        ...formData,
        additionalImages: [...currentImages, newImageUrl.trim()]
      });
      setNewImageUrl('');
    }
  };

  const removeAdditionalImage = (index: number) => {
    const currentImages = formData.additionalImages || [];
    setFormData({
      ...formData,
      additionalImages: currentImages.filter((_, i) => i !== index)
    });
  };

  // Composant pour l'onglet Réseaux Sociaux
  const SocialLinksTab = () => {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Gestion des Réseaux Sociaux</h2>
          <button
            onClick={() => setShowSocialForm(true)}
            className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Ajouter un lien
          </button>
        </div>

        {/* Formulaire d'ajout */}
        {showSocialForm && (
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">Nouveau lien social</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plateforme</label>
                <input
                  type="text"
                  value={newSocialLink.platform}
                  onChange={(e) => setNewSocialLink({...newSocialLink, platform: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="instagram, facebook, tiktok..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Libellé</label>
                <input
                  type="text"
                  value={newSocialLink.label}
                  onChange={(e) => setNewSocialLink({...newSocialLink, label: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Instagram, Facebook..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                <input
                  type="url"
                  value={newSocialLink.url}
                  onChange={(e) => setNewSocialLink({...newSocialLink, url: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icône/Emoji</label>
                <input
                  type="text"
                  value={newSocialLink.icon}
                  onChange={(e) => setNewSocialLink({...newSocialLink, icon: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="📷, 👻, 🎵..."
                />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="socialActive"
                checked={newSocialLink.active}
                onChange={(e) => setNewSocialLink({...newSocialLink, active: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="socialActive" className="text-sm text-gray-700">Lien actif</label>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddSocialLink}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Ajouter
              </button>
              <button
                onClick={() => {
                  setShowSocialForm(false);
                  setNewSocialLink({ platform: '', url: '', icon: '🔗', label: '', active: true, order: 1 });
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Liste des liens sociaux */}
        <div className="space-y-4">
          {socialLinks.map((link) => (
            <div key={link.id} className="bg-white border border-gray-200 rounded-lg p-4">
              {editingSocialLink?.id === link.id ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Plateforme</label>
                    <input
                      type="text"
                      value={editingSocialLink.platform}
                      onChange={(e) => setEditingSocialLink({...editingSocialLink, platform: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Libellé</label>
                    <input
                      type="text"
                      value={editingSocialLink.label}
                      onChange={(e) => setEditingSocialLink({...editingSocialLink, label: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                    <input
                      type="url"
                      value={editingSocialLink.url}
                      onChange={(e) => setEditingSocialLink({...editingSocialLink, url: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icône/Emoji</label>
                    <input
                      type="text"
                      value={editingSocialLink.icon}
                      onChange={(e) => setEditingSocialLink({...editingSocialLink, icon: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={editingSocialLink.active}
                      onChange={(e) => setEditingSocialLink({...editingSocialLink, active: e.target.checked})}
                      className="mr-2"
                    />
                    <label className="text-sm text-gray-700">Lien actif</label>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleUpdateSocialLink}
                      className="bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      Sauver
                    </button>
                    <button
                      onClick={() => setEditingSocialLink(null)}
                      className="bg-gray-500 text-white px-3 py-2 rounded-lg hover:bg-gray-600 transition-colors flex items-center"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Annuler
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{link.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{link.label}</h3>
                      <p className="text-sm text-gray-600">{link.platform}</p>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700 text-sm flex items-center"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {link.url}
                      </a>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      link.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {link.active ? 'Actif' : 'Inactif'}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setEditingSocialLink(link)}
                      className="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSocialLink(link.id)}
                      className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {socialLinks.length === 0 && (
          <div className="text-center py-12">
            <Share2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun lien social</h3>
            <p className="text-gray-600">Ajoutez vos premiers liens vers les réseaux sociaux.</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-8 lg:py-16 bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/30 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:justify-start lg:items-center gap-6 mb-8 lg:mb-12">
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
                  {structures.length > 0 ? Math.round(structures.reduce((acc, s) => acc + s.price, 0) / structures.length) : 0}€
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

        {/* Section des catégories */}
        <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Catégories ({categories.length})</h2>
            <button
              onClick={openCategoryModal}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle catégorie
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

        {/* Section des photos */}
        <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Photos Carrousel ({carouselPhotos.length})</h2>
            <button
              onClick={openPhotoModal}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all flex items-center text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle photo
            </button>
          </div>
          
          <div className="space-y-4">
            {[...carouselPhotos].sort((a, b) => a.order - b.order).map((photo, index) => (
              <div key={photo.id} className="bg-gray-50 p-3 lg:p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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

        {/* Onglet Réseaux Sociaux */}
        {activeTab === 'social' && (
          <div className="space-y-8">
            {/* Formulaire d'ajout/modification */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Share2 className="w-6 h-6 mr-2 text-blue-500" />
                {editingSocial ? 'Modifier le lien social' : 'Ajouter un lien social'}
              </h3>
              
              <form onSubmit={handleSocialSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plateforme *
                    </label>
                    <input
                      type="text"
                      value={socialFormData.platform}
                      onChange={(e) => setSocialFormData(prev => ({ ...prev, platform: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Instagram, Facebook, Twitter..."
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Libellé *
                    </label>
                    <input
                      type="text"
                      value={socialFormData.label}
                      onChange={(e) => setSocialFormData(prev => ({ ...prev, label: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Nom affiché"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL *
                  </label>
                  <input
                    type="url"
                    value={socialFormData.url}
                    onChange={(e) => setSocialFormData(prev => ({ ...prev, url: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://..."
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icône/Emoji
                    </label>
                    <input
                      type="text"
                      value={socialFormData.icon}
                      onChange={(e) => setSocialFormData(prev => ({ ...prev, icon: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      placeholder="📷, 👻, 🔗..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Statut
                    </label>
                    <button
                      type="button"
                      onClick={() => setSocialFormData(prev => ({ ...prev, active: !prev.active }))}
                      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                        socialFormData.active
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {socialFormData.active ? (
                        <>
                          <ToggleRight className="w-5 h-5 mr-2" />
                          Actif
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="w-5 h-5 mr-2" />
                          Inactif
                        </>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-orange-600 transition-all flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingSocial ? 'Modifier' : 'Ajouter'}
                  </button>
                  
                  {editingSocial && (
                    <button
                      type="button"
                      onClick={cancelSocialEdit}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </div>
            
            {/* Liste des liens sociaux */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Liens sociaux ({socialLinks.length})
              </h3>
              
              {socialLinks.length === 0 ? (
                <div className="text-center py-12">
                  <Share2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun lien social</h3>
                  <p className="text-gray-600">Ajoutez votre premier lien social ci-dessus</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {socialLinks
                    .sort((a, b) => a.order - b.order)
                    .map((social) => (
                    <div key={social.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{social.icon || '🔗'}</span>
                            <div>
                              <h4 className="font-semibold text-gray-900">{social.label}</h4>
                              <p className="text-sm text-gray-600">{social.platform}</p>
                              <a 
                                href={social.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:text-blue-700 text-sm flex items-center"
                              >
                                <ExternalLink className="w-3 h-3 mr-1" />
                                {social.url.length > 50 ? social.url.substring(0, 50) + '...' : social.url}
                              </a>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            social.active 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {social.active ? 'Actif' : 'Inactif'}
                          </span>
                          
                          <button
                            onClick={() => handleEditSocial(social)}
                            className="text-blue-500 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                            title="Modifier"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          
                          <button
                            onClick={() => handleDeleteSocial(social.id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Liste des structures avec glisser-déposer */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg lg:text-xl font-bold text-gray-900">
                Structures Existantes ({structures.length})
                <span className="text-sm font-normal text-gray-600 ml-2">
                  - Glissez-déposez pour réorganiser l'ordre d'affichage
                </span>
              </h2>
              <button
                onClick={openStructureModal}
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle structure
              </button>
            </div>
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
                        {structure.customPricing ? (
                          <div className="text-orange-600">Prix sur Devis</div>
                        ) : (
                          <>
                            <div>{structure.price}€/jour</div>
                            {structure.price2Days && (
                              <div className="text-xs text-gray-600 hidden lg:block">{structure.price2Days}€/2j</div>
                            )}
                          </>
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
                          onClick={() => handleEditStructure(structure)}
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

      {/* Modale Structure */}
      {showStructureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                  {editingStructureId ? 'Modifier la structure' : 'Ajouter une nouvelle structure'}
                </h3>
                <button
                  onClick={closeAllModals}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Nom de la structure *"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                >
                  <option value="">Sélectionner une catégorie *</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Dimensions (ex: 7,7m x 6,6m x 1,5m)"
                  value={formData.size || ''}
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <input
                  type="text"
                  placeholder="Capacité (ex: 2 personnes max)"
                  value={formData.capacity || ''}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <input
                  type="text"
                  placeholder="Âge (ex: 3-77 ans)"
                  value={formData.age || ''}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <input
                  type="number"
                  placeholder="Prix (€) *"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({...formData, price: Number(e.target.value) || 0})}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <input
                  type="number"
                  placeholder="Prix 2 jours (€)"
                  value={formData.price2Days || ''}
                  onChange={(e) => setFormData({...formData, price2Days: Number(e.target.value) || undefined})}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <input
                  type="number"
                  placeholder="Poids max (kg)"
                  value={formData.maxWeight || ''}
                  onChange={(e) => setFormData({...formData, maxWeight: Number(e.target.value) || undefined})}
                  className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    💡 Pour Imgur: utilisez https://i.imgur.com/ID.extension (ex: https://i.imgur.com/fLqAlJ1.png)
                  </p>
                  {formData.image && (
                    <div className="mt-3">
                      <img 
                        src={formData.image} 
                        alt="Aperçu" 
                        className="w-32 h-24 object-cover rounded-lg border-2 border-gray-200 shadow-md"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <ImagePlus className="w-4 h-4 inline mr-1" />
                    Images additionnelles (optionnel)
                  </label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://i.imgur.com/example.png"
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                        className="flex-1 px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all text-sm"
                      />
                      <button
                        type="button"
                        onClick={addAdditionalImage}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold"
                      >
                        Ajouter
                      </button>
                    </div>
                    
                    {formData.additionalImages && formData.additionalImages.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Images additionnelles ({formData.additionalImages.length}) :</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {formData.additionalImages.map((imageUrl, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <img 
                                src={imageUrl} 
                                alt={`Image ${index + 1}`}
                                className="w-16 h-12 object-cover rounded border"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400';
                                }}
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs text-gray-600 truncate">{imageUrl}</p>
                                <p className="text-xs text-gray-500">Image {index + 1}</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeAdditionalImage(index)}
                                className="text-red-500 hover:text-red-700 transition-colors p-1 hover:bg-red-100 rounded"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description complète *
                  </label>
                  <textarea
                    placeholder="Description complète avec emojis et détails..."
                    value={formData.description || ''}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                    rows={4}
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
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
                  <label className="flex items-center mt-3">
                    <input
                      type="checkbox"
                      checked={formData.customPricing ?? false}
                      onChange={(e) => setFormData({...formData, customPricing: e.target.checked})}
                      className="mr-2 w-4 h-4 text-orange-600 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">Prix sur mesure (devis personnalisé)</span>
                  </label>
                  {formData.customPricing && (
                    <div className="mt-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <p className="text-sm text-orange-700">
                        ⚠️ <strong>Prix sur mesure activé</strong> - Les champs prix ne sont plus obligatoires
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleSaveStructure}
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {editingStructureId ? 'Modifier' : 'Ajouter'}
                </button>
                <button
                  onClick={closeAllModals}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <X className="w-5 h-5 mr-2" />
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modale Catégorie */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Ajouter une catégorie</h3>
                <button
                  onClick={closeAllModals}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nom de la catégorie *"
                  value={categoryData.label || ''}
                  onChange={(e) => setCategoryData({...categoryData, label: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <input
                  type="text"
                  placeholder="Emoji (ex: 🏰) *"
                  value={categoryData.icon || ''}
                  onChange={(e) => setCategoryData({...categoryData, icon: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleSaveCategory}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Save className="w-5 h-5 mr-2" />
                  Ajouter
                </button>
                <button
                  onClick={closeAllModals}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <X className="w-5 h-5 mr-2" />
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modale Photo */}
      {showPhotoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingPhotoId ? 'Modifier la photo' : 'Ajouter une photo au carrousel'}
                </h3>
                <button
                  onClick={closeAllModals}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL de l'image *
                  </label>
                  <input
                    type="url"
                    placeholder="https://i.imgur.com/example.png"
                    value={photoData.url || ''}
                    onChange={(e) => setPhotoData({...photoData, url: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description (Alt text) *
                  </label>
                  <input
                    type="text"
                    placeholder="Description de l'image"
                    value={photoData.alt || ''}
                    onChange={(e) => setPhotoData({...photoData, alt: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
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
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Structure associée (optionnel)
                  </label>
                  <select
                    value={photoData.structureId || ''}
                    onChange={(e) => setPhotoData({...photoData, structureId: e.target.value || undefined})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  >
                    <option value="">Aucune structure associée</option>
                    {structures.map(structure => (
                      <option key={structure.id} value={structure.id}>{structure.name}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    💡 Si sélectionnée, le nom de la structure s'affichera au survol de la photo
                  </p>
                </div>
              </div>
              
              {photoData.url && (
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Aperçu :</label>
                  <img 
                    src={photoData.url} 
                    alt="Aperçu" 
                    className="w-48 h-32 object-cover rounded-lg border-2 border-gray-200 shadow-md"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleSavePhoto}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {editingPhotoId ? 'Modifier' : 'Ajouter'}
                </button>
                <button
                  onClick={closeAllModals}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center justify-center shadow-lg hover:shadow-xl"
                >
                  <X className="w-5 h-5 mr-2" />
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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