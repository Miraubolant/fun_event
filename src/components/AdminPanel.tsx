import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Package, DollarSign, Image, Camera, ArrowUp, ArrowDown, AlertTriangle, GripVertical, Star } from 'lucide-react';
import { useStructures } from '../contexts/StructuresContext';
import { useAuth } from '../contexts/AuthContext';
import { Structure, Category, CarouselPhoto, DeliveryZone, Subcategory, Review } from '../types';

const AdminPanel: React.FC = () => {
  const {
    structures,
    categories,
    carouselPhotos,
    deliveryZones,
    subcategories,
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
    reorderStructures,
    addDeliveryZone,
    updateDeliveryZone,
    deleteDeliveryZone,
    addSubcategory,
    updateSubcategory,
    deleteSubcategory,
    reviews,
    addReview,
    updateReview,
    deleteReview
  } = useStructures();
  const { logout } = useAuth();
  
  // États pour les modales
  const [showStructureModal, setShowStructureModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [showZoneModal, setShowZoneModal] = useState(false);
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
  const [editingStructureId, setEditingStructureId] = useState<string | null>(null);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [editingZoneId, setEditingZoneId] = useState<string | null>(null);
  const [editingSubcategoryId, setEditingSubcategoryId] = useState<string | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    type: 'structure' | 'category' | 'photo' | 'zone' | 'subcategory';
    id: string;
    name: string;
  } | null>(null);

  const [formData, setFormData] = useState<Partial<Structure>>({});
  const [categoryData, setCategoryData] = useState<Partial<Category>>({});
  const [photoData, setPhotoData] = useState<Partial<CarouselPhoto>>({});
  const [zoneData, setZoneData] = useState<Partial<DeliveryZone>>({});
  const [subcategoryData, setSubcategoryData] = useState<Partial<Subcategory>>({});
  const [reviewData, setReviewData] = useState<Partial<Review>>({});
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

  const openZoneModal = () => {
    setZoneData({});
    setEditingZoneId(null);
    setShowZoneModal(true);
  };

  const openSubcategoryModal = () => {
    setSubcategoryData({});
    setEditingSubcategoryId(null);
    setShowSubcategoryModal(true);
  };

  const openReviewModal = () => {
    setReviewData({ rating: 5, visible: true });
    setEditingReviewId(null);
    setShowReviewModal(true);
  };

  // Fonctions pour fermer les modales
  const closeAllModals = () => {
    setShowStructureModal(false);
    setShowCategoryModal(false);
    setShowPhotoModal(false);
    setShowZoneModal(false);
    setShowSubcategoryModal(false);
    setShowReviewModal(false);
    setEditingStructureId(null);
    setEditingPhotoId(null);
    setEditingZoneId(null);
    setEditingSubcategoryId(null);
    setEditingReviewId(null);
    setFormData({});
    setCategoryData({});
    setPhotoData({});
    setZoneData({});
    setSubcategoryData({});
    setReviewData({});
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
          subcategory_id: formData.subcategory_id,
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
          customPricing: formData.customPricing ?? false,
          showDimensions: formData.showDimensions ?? true,
          showCapacity: formData.showCapacity ?? true,
          showAge: formData.showAge ?? true
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
    if (categoryData.label) {
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

  const handleDeleteZone = (id: string) => {
    const zone = deliveryZones.find(z => z.id === id);
    setDeleteConfirm({
      isOpen: true,
      type: 'zone',
      id,
      name: zone?.name || 'cette zone'
    });
  };

  const handleDeleteSubcategory = (id: string) => {
    const subcategory = subcategories.find(s => s.id === id);
    setDeleteConfirm({
      isOpen: true,
      type: 'subcategory',
      id,
      name: subcategory?.name || 'cette sous-catégorie'
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
      case 'zone':
        deleteDeliveryZone(deleteConfirm.id);
        break;
      case 'subcategory':
        deleteSubcategory(deleteConfirm.id);
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

  // Fonctions pour gérer les zones de livraison
  const handleSaveZone = () => {
    if (zoneData.name && zoneData.code) {
      if (editingZoneId) {
        // Modification
        updateDeliveryZone(editingZoneId, zoneData).then(() => {
          closeAllModals();
        }).catch(error => {
          console.error('Erreur lors de la modification:', error);
          alert(`Erreur lors de la modification de la zone: ${error.message || 'Vérifiez votre connexion.'}`);
        });
      } else {
        // Ajout
        const maxOrder = Math.max(...deliveryZones.map(z => z.order_position), 0);
        const newZone = {
          name: zoneData.name,
          code: zoneData.code,
          active: zoneData.active ?? true,
          order_position: zoneData.order_position || maxOrder + 1
        };

        addDeliveryZone(newZone).then(() => {
          setZoneData({});
          closeAllModals();
        }).catch(error => {
          console.error('Erreur lors de l\'ajout:', error);
          alert(`Erreur lors de l'ajout de la zone: ${error.message || 'Vérifiez votre connexion.'}`);
        });
      }
    }
  };

  const handleEditZone = (zone: DeliveryZone) => {
    setEditingZoneId(zone.id);
    setZoneData({
      name: zone.name,
      code: zone.code,
      active: zone.active,
      order_position: zone.order_position
    });
    setShowZoneModal(true);
  };

  // Fonctions pour gérer les sous-catégories
  const handleSaveSubcategory = () => {
    if (subcategoryData.name && subcategoryData.category_id) {
      if (editingSubcategoryId) {
        // Modification
        updateSubcategory(editingSubcategoryId, subcategoryData).then(() => {
          closeAllModals();
        }).catch(error => {
          console.error('Erreur lors de la modification:', error);
          alert(`Erreur lors de la modification de la sous-catégorie: ${error.message || 'Vérifiez votre connexion.'}`);
        });
      } else {
        // Ajout
        const maxOrder = Math.max(...subcategories.filter(s => s.category_id === subcategoryData.category_id).map(s => s.order_position), 0);
        const newSubcategory = {
          name: subcategoryData.name,
          category_id: subcategoryData.category_id,
          icon: subcategoryData.icon || '🎯',
          active: subcategoryData.active ?? true,
          order_position: subcategoryData.order_position || maxOrder + 1
        };

        addSubcategory(newSubcategory).then(() => {
          setSubcategoryData({});
          closeAllModals();
        }).catch(error => {
          console.error('Erreur lors de l\'ajout:', error);
          alert(`Erreur lors de l'ajout de la sous-catégorie: ${error.message || 'Vérifiez votre connexion.'}`);
        });
      }
    }
  };

  const handleEditSubcategory = (subcategory: Subcategory) => {
    setEditingSubcategoryId(subcategory.id);
    setSubcategoryData({
      name: subcategory.name,
      category_id: subcategory.category_id,
      icon: subcategory.icon,
      active: subcategory.active,
      order_position: subcategory.order_position
    });
    setShowSubcategoryModal(true);
  };

  // Fonctions pour les avis
  const handleSaveReview = () => {
    if (reviewData.name && reviewData.comment) {
      if (editingReviewId) {
        updateReview(editingReviewId, reviewData);
      } else {
        addReview({
          name: reviewData.name,
          rating: reviewData.rating || 5,
          comment: reviewData.comment,
          date: reviewData.date || new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
          visible: reviewData.visible ?? true,
          order: reviewData.order || 0
        });
      }
      closeAllModals();
    }
  };

  const handleEditReview = (review: Review) => {
    setEditingReviewId(review.id);
    setReviewData({
      name: review.name,
      rating: review.rating,
      comment: review.comment,
      date: review.date,
      visible: review.visible,
      order: review.order
    });
    setShowReviewModal(true);
  };

  const handleDeleteReview = (id: string) => {
    setDeleteConfirm({ isOpen: true, type: 'structure', id, name: 'cet avis' });
  };

  const confirmDeleteReview = async (id: string) => {
    try {
      await deleteReview(id);
    } catch (error) {
      alert('Erreur lors de la suppression de l\'avis');
    }
  };

  const handleToggleReviewVisibility = async (review: Review) => {
    try {
      await updateReview(review.id, { visible: !review.visible });
    } catch (error) {
      alert('Erreur lors de la mise à jour de l\'avis');
    }
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

        {/* Section des zones de livraison */}
        <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Zones de livraison ({deliveryZones.length})</h2>
            <button
              onClick={openZoneModal}
              className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all flex items-center text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle zone
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {deliveryZones.map((zone) => (
              <div key={zone.id} className="bg-gray-50 p-3 lg:p-4 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors">
                <div className="flex items-center flex-1">
                  <span className="text-lg lg:text-xl mr-2 lg:mr-3">🚚</span>
                  <div>
                    <span className="font-medium text-sm lg:text-base block">{zone.name}</span>
                    <span className="text-xs text-gray-500">Code: {zone.code}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEditZone(zone)}
                    className="text-blue-600 hover:text-blue-800 transition-colors p-1 hover:bg-blue-100 rounded"
                  >
                    <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteZone(zone.id)}
                    className="text-red-600 hover:text-red-800 transition-colors p-1 hover:bg-red-100 rounded"
                  >
                    <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section des sous-catégories */}
        <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Sous-catégories ({subcategories.length})</h2>
            <button
              onClick={openSubcategoryModal}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all flex items-center text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle sous-catégorie
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {subcategories.map((subcategory) => {
              const parentCategory = categories.find(c => c.id === subcategory.category_id);
              return (
                <div key={subcategory.id} className="bg-gray-50 p-3 lg:p-4 rounded-lg flex items-center justify-between hover:bg-gray-100 transition-colors">
                  <div className="flex items-center flex-1">
                    <span className="text-lg lg:text-xl mr-2 lg:mr-3">{subcategory.icon}</span>
                    <div>
                      <span className="font-medium text-sm lg:text-base block">{subcategory.name}</span>
                      <span className="text-xs text-gray-500">{parentCategory?.label || 'N/A'}</span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEditSubcategory(subcategory)}
                      className="text-blue-600 hover:text-blue-800 transition-colors p-1 hover:bg-blue-100 rounded"
                    >
                      <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSubcategory(subcategory.id)}
                      className="text-red-600 hover:text-red-800 transition-colors p-1 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="w-3 h-3 lg:w-4 lg:h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section des avis */}
        <div className="bg-white rounded-xl shadow-lg p-4 lg:p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Avis clients ({reviews.length})</h2>
            <button
              onClick={openReviewModal}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all flex items-center text-sm shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nouvel avis
            </button>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            Ces avis seront affichés sur la page d'accueil dans la section témoignages, en complément des avis Google existants.
          </p>

          <div className="space-y-3">
            {reviews.map((review) => (
              <div key={review.id} className={`p-4 rounded-lg border transition-all ${review.visible ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-gray-900">{review.name}</span>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                      {!review.visible && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Masqué</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{review.comment}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleToggleReviewVisibility(review)}
                      className={`p-1.5 rounded transition-colors ${review.visible ? 'text-green-600 hover:bg-green-100' : 'text-gray-400 hover:bg-gray-200'}`}
                      title={review.visible ? 'Masquer' : 'Afficher'}
                    >
                      {review.visible ? '👁️' : '🚫'}
                    </button>
                    <button
                      onClick={() => handleEditReview(review)}
                      className="text-blue-600 hover:text-blue-800 transition-colors p-1.5 hover:bg-blue-100 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => confirmDeleteReview(review.id)}
                      className="text-red-600 hover:text-red-800 transition-colors p-1.5 hover:bg-red-100 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {reviews.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                <Star className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>Aucun avis ajouté. Cliquez sur "Nouvel avis" pour en créer un.</p>
              </div>
            )}
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
                      <div className="space-y-1">
                        <span className="px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {categories.find(c => c.id === structure.category)?.label}
                        </span>
                        {structure.subcategory_id && (
                          <div>
                            <span className="px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full bg-purple-100 text-purple-800">
                              {subcategories.find(s => s.id === structure.subcategory_id)?.icon} {subcategories.find(s => s.id === structure.subcategory_id)?.name}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-3 lg:px-6 py-4">
                      <div className="text-xs lg:text-sm font-semibold text-gray-900">
                        {(structure.customPricing || structure.price === 0) ? (
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
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">
                    {editingStructureId ? '📝 Modifier la structure' : '✨ Nouvelle structure'}
                  </h3>
                  <p className="text-blue-100 text-sm mt-1">
                    {editingStructureId ? 'Modifiez les informations ci-dessous' : 'Créez une nouvelle structure pour votre catalogue'}
                  </p>
                </div>
                <button
                  onClick={closeAllModals}
                  className="text-white hover:bg-blue-800 transition-colors p-2 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Colonne 1: Informations de base */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Package className="w-4 h-4 mr-2 text-blue-500" />
                      Informations générales
                    </h4>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Nom de la structure *</label>
                        <input
                          type="text"
                          placeholder="ex: Château Gonflable Royal"
                          value={formData.name || ''}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Catégorie *</label>
                          <select
                            value={formData.category || ''}
                            onChange={(e) => setFormData({...formData, category: e.target.value, subcategory_id: undefined})}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                          >
                            <option value="">Sélectionner</option>
                            {categories.map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Sous-catégorie</label>
                          <select
                            value={formData.subcategory_id || ''}
                            onChange={(e) => setFormData({...formData, subcategory_id: e.target.value || undefined})}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:bg-gray-100"
                            disabled={!formData.category}
                          >
                            <option value="">{!formData.category ? 'Catégorie requise' : 'Aucune'}</option>
                            {subcategories
                              .filter(sub => sub.category_id === formData.category && sub.active)
                              .sort((a, b) => a.order_position - b.order_position)
                              .map(sub => (
                                <option key={sub.id} value={sub.id}>{sub.icon} {sub.name}</option>
                              ))}
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 pt-2">
                        <input
                          type="checkbox"
                          checked={formData.available ?? true}
                          onChange={(e) => setFormData({...formData, available: e.target.checked})}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <label className="text-sm text-gray-700">Structure disponible</label>
                      </div>
                    </div>
                  </div>
                  
                  {/* Caractéristiques techniques */}
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-green-500">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="w-4 h-4 mr-2 text-green-500">📏</span>
                      Caractéristiques
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Dimensions</label>
                        <input
                          type="text"
                          placeholder="7,7m x 6,6m x 1,5m"
                          value={formData.size || ''}
                          onChange={(e) => setFormData({...formData, size: e.target.value})}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Capacité</label>
                          <input
                            type="text"
                            placeholder="2 pers."
                            value={formData.capacity || ''}
                            onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Âge</label>
                          <input
                            type="text"
                            placeholder="3-77 ans"
                            value={formData.age || ''}
                            onChange={(e) => setFormData({...formData, age: e.target.value})}
                            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Poids max. (kg)</label>
                        <input
                          type="number"
                          placeholder="150"
                          value={formData.maxWeight || ''}
                          onChange={(e) => setFormData({...formData, maxWeight: Number(e.target.value) || undefined})}
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Colonne 2: Tarification & Images */}
                <div className="lg:col-span-1 space-y-4">
                  {/* Tarification */}
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-orange-500">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <DollarSign className="w-4 h-4 mr-2 text-orange-500" />
                      Tarification
                    </h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.customPricing ?? false}
                          onChange={(e) => setFormData({...formData, customPricing: e.target.checked})}
                          className="w-4 h-4 text-orange-600 rounded"
                        />
                        <label className="text-sm text-gray-700">Prix sur devis</label>
                      </div>
                      
                      {!formData.customPricing && (
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Prix 1j (€) *</label>
                            <input
                              type="number"
                              placeholder="150"
                              value={formData.price || ''}
                              onChange={(e) => setFormData({...formData, price: Number(e.target.value) || 0})}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">Prix 2j (€)</label>
                            <input
                              type="number"
                              placeholder="250"
                              value={formData.price2Days || ''}
                              onChange={(e) => setFormData({...formData, price2Days: Number(e.target.value) || undefined})}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                            />
                          </div>
                        </div>
                      )}
                      
                      {formData.customPricing && (
                        <div className="text-xs text-orange-700 bg-orange-100 p-2 rounded border">
                          ⚠️ Affichera "Prix sur devis"
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Affichage des caractéristiques */}
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-teal-500">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="w-4 h-4 mr-2">👁️</span>
                      Affichage sur la fiche
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.showDimensions ?? true}
                          onChange={(e) => setFormData({...formData, showDimensions: e.target.checked})}
                          className="w-4 h-4 text-teal-600 rounded"
                        />
                        <label className="text-sm text-gray-700">Afficher les dimensions</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.showCapacity ?? true}
                          onChange={(e) => setFormData({...formData, showCapacity: e.target.checked})}
                          className="w-4 h-4 text-teal-600 rounded"
                        />
                        <label className="text-sm text-gray-700">Afficher la capacité</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.showAge ?? true}
                          onChange={(e) => setFormData({...formData, showAge: e.target.checked})}
                          className="w-4 h-4 text-teal-600 rounded"
                        />
                        <label className="text-sm text-gray-700">Afficher l'âge recommandé</label>
                      </div>
                    </div>
                  </div>

                  {/* Image principale */}
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-500">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Image className="w-4 h-4 mr-2 text-purple-500" />
                      Image principale *
                    </h4>
                    
                    <div className="space-y-3">
                      <input
                        type="url"
                        placeholder="https://i.imgur.com/exemple.png"
                        value={formData.image || ''}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                      />
                      
                      {formData.image && (
                        <div className="relative">
                          <img 
                            src={formData.image} 
                            alt="Aperçu" 
                            className="w-full h-24 object-cover rounded-md border"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 rounded">✓</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Images additionnelles */}
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-indigo-500">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="w-4 h-4 mr-2 text-indigo-500">📷</span>
                      Images supplémentaires
                    </h4>
                    
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="url"
                          placeholder="URL image"
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                        <button
                          type="button"
                          onClick={addAdditionalImage}
                          disabled={!newImageUrl.trim()}
                          className="bg-indigo-500 text-white px-3 py-2 rounded-md text-sm hover:bg-indigo-600 disabled:bg-gray-300 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      
                      {formData.additionalImages && formData.additionalImages.length > 0 && (
                        <div className="max-h-32 overflow-y-auto space-y-1">
                          {formData.additionalImages.map((imageUrl, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-white rounded border text-sm">
                              <img 
                                src={imageUrl} 
                                alt={`${index + 1}`}
                                className="w-8 h-6 object-cover rounded"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://images.pexels.com/photos/1148998/pexels-photo-1148998.jpeg?auto=compress&cs=tinysrgb&w=400';
                                }}
                              />
                              <span className="flex-1 truncate text-xs text-gray-600">#{index + 1}</span>
                              <button
                                type="button"
                                onClick={() => removeAdditionalImage(index)}
                                className="text-red-500 hover:text-red-700 p-1"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Colonne 3: Descriptions */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-teal-500">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="w-4 h-4 mr-2 text-teal-500">📝</span>
                      Description *
                    </h4>
                    
                    <textarea
                      placeholder="Décrivez votre structure en détail...&#10;&#10;💡 Utilisez des émojis et des puces pour structurer"
                      value={formData.description || ''}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all resize-none"
                      rows={8}
                    />
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-cyan-500">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="w-4 h-4 mr-2 text-cyan-500">🛠️</span>
                      Services & Normes
                    </h4>
                    
                    <textarea
                      placeholder="• Enrouleur électrique inclus&#10;• Conforme EN 14960&#10;• Installation comprise"
                      value={formData.services || ''}
                      onChange={(e) => setFormData({...formData, services: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                      rows={5}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t flex justify-end gap-3">
              <button
                onClick={closeAllModals}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveStructure}
                className="px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-md hover:from-blue-700 hover:to-blue-800 transition-all flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingStructureId ? 'Enregistrer' : 'Créer'}
              </button>
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
                  placeholder="Emoji (ex: 🏰)"
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

      {/* Modale Sous-catégorie */}
      {showSubcategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingSubcategoryId ? 'Modifier la sous-catégorie' : 'Ajouter une sous-catégorie'}
                </h3>
                <button
                  onClick={closeAllModals}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Châteaux"
                    value={subcategoryData.name || ''}
                    onChange={(e) => setSubcategoryData({...subcategoryData, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Catégorie parente *
                  </label>
                  <select
                    value={subcategoryData.category_id || ''}
                    onChange={(e) => setSubcategoryData({...subcategoryData, category_id: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Icône (emoji)
                  </label>
                  <input
                    type="text"
                    placeholder="ex: 🏰"
                    value={subcategoryData.icon || ''}
                    onChange={(e) => setSubcategoryData({...subcategoryData, icon: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={subcategoryData.active ?? true}
                      onChange={(e) => setSubcategoryData({...subcategoryData, active: e.target.checked})}
                      className="mr-2 w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">Sous-catégorie active</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleSaveSubcategory}
                  className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {editingSubcategoryId ? 'Modifier' : 'Ajouter'}
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

      {/* Modale Zone de livraison */}
      {showZoneModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingZoneId ? 'Modifier la zone' : 'Ajouter une zone de livraison'}
                </h3>
                <button
                  onClick={closeAllModals}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom de la zone *
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Paris (75)"
                    value={zoneData.name || ''}
                    onChange={(e) => setZoneData({...zoneData, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Code département *
                  </label>
                  <input
                    type="text"
                    placeholder="ex: 75"
                    value={zoneData.code || ''}
                    onChange={(e) => setZoneData({...zoneData, code: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={zoneData.active ?? true}
                      onChange={(e) => setZoneData({...zoneData, active: e.target.checked})}
                      className="mr-2 w-4 h-4 text-green-600 rounded focus:ring-green-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">Zone active</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleSaveZone}
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {editingZoneId ? 'Modifier' : 'Ajouter'}
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

      {/* Modale Avis */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingReviewId ? 'Modifier l\'avis' : 'Ajouter un avis'}
                </h3>
                <button
                  onClick={closeAllModals}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom du client *
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Jean Dupont"
                    value={reviewData.name || ''}
                    onChange={(e) => setReviewData({...reviewData, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Note (1-5)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewData({...reviewData, rating: star})}
                        className="p-1"
                      >
                        <Star className={`w-8 h-8 transition-colors ${star <= (reviewData.rating || 5) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Commentaire *
                  </label>
                  <textarea
                    placeholder="Le commentaire du client..."
                    value={reviewData.comment || ''}
                    onChange={(e) => setReviewData({...reviewData, comment: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    placeholder="ex: Mars 2026"
                    value={reviewData.date || ''}
                    onChange={(e) => setReviewData({...reviewData, date: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 transition-all"
                  />
                </div>

                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={reviewData.visible ?? true}
                      onChange={(e) => setReviewData({...reviewData, visible: e.target.checked})}
                      className="mr-2 w-4 h-4 text-yellow-600 rounded focus:ring-yellow-500"
                    />
                    <span className="text-sm font-semibold text-gray-700">Visible sur la page d'accueil</span>
                  </label>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <button
                  onClick={handleSaveReview}
                  disabled={!reviewData.name || !reviewData.comment}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-yellow-600 hover:to-orange-600 transition-all flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {editingReviewId ? 'Modifier' : 'Ajouter'}
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
    </section>
  );
};

export default AdminPanel;