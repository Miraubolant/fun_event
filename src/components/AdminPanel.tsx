import React, { useState, useRef } from 'react';
import { Plus, Edit, Trash2, Save, X, Package, DollarSign, Tag, Image, Camera, GripVertical, AlertTriangle, LogOut, Eye, EyeOff } from 'lucide-react';
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
  
  // États du composant
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
  
  // États pour le drag & drop
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);
  const draggedOverRef = useRef<string | null>(null);

  // Fonctions de gestion des structures
  const handleEdit = (structure: Structure) => {
    setShowEditForm(true);
    setFormData(structure);
    setActiveSection('structures');
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
      const categoryExists = categories.find(c => c.id === formData.category);
      if (!categoryExists) {
        alert('Veuillez sélectionner une catégorie valide.');
        return;
      }
      
      const maxOrder = Math.max(...structures.map(s => s.order || 1), 0);
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
        available: formData.available ?? true,
        order: maxOrder + 1
      };
      
      addStructure(newStructure).catch(error => {
        console.error('Erreur lors de l\'ajout:', error);
        alert(`Erreur lors de l'ajout de la structure: ${error.message || 'Vérifiez votre connexion.'}`);
      });
      
      setFormData({});
    }
  };

  // Fonctions de gestion des catégories
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
      
      setCategoryData({});
    }
  };

  // Fonctions de gestion des photos
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
      
      setPhotoData({});
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

  // Fonctions de gestion générale
  const handleCancel = () => {
    setActiveSection(null);
    setEditingPhotoId(null);
    setShowEditForm(false);
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

  const openSection = (section: 'structures' | 'categories' | 'photos') => {
    setActiveSection(section);
    setShowAddForm(section === 'structures');
    setShowCategoryForm(section === 'categories');
    setShowPhotoForm(section === 'photos');
    setShowEditForm(false);
  };

  // Fonctions de drag & drop pour les structures
  const handleDragStart = (e: React.DragEvent, structureId: string) => {
    setDraggedItem(structureId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', structureId);
  };

  const handleDragOver = (e: React.DragEvent, structureId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedOverRef.current !== structureId) {
      setDragOverItem(structureId);
      draggedOverRef.current = structureId;
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    if (x < rect.left || x >= rect.right || y < rect.top || y >= rect.bottom) {
      setDragOverItem(null);
      draggedOverRef.current = null;
    }
  };

  const handleDrop = (e: React.DragEvent, dropTargetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === dropTargetId) {
      setDraggedItem(null);
      setDragOverItem(null);
      draggedOverRef.current = null;
      return;
    }

    const sortedStructures = [...structures].sort((a, b) => (a.order || 1) - (b.order || 1));
    const draggedIndex = sortedStructures.findIndex(s => s.id === draggedItem);
    const dropIndex = sortedStructures.findIndex(s => s.id === dropTargetId);

    if (draggedIndex === -1 || dropIndex === -1) return;

    // Réorganiser les structures
    const newStructures = [...sortedStructures];
    const [draggedStructure] = newStructures.splice(draggedIndex, 1);
    newStructures.splice(dropIndex, 0, draggedStructure);

    // Mettre à jour les ordres
    newStructures.forEach((structure, index) => {
      updateStructure(structure.id, { order: index + 1 });
    });

    setDraggedItem(null);
    setDragOverItem(null);
    draggedOverRef.current = null;
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
    draggedOverRef.current = null;
  };

  // Fonctions de drag & drop pour les photos
  const handlePhotoDragStart = (e: React.DragEvent, photoId: string) => {
    setDraggedItem(photoId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handlePhotoDragOver = (e: React.DragEvent, photoId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem(photoId);
  };

  const handlePhotoDrop = (e: React.DragEvent, dropTargetId: string) => {
    e.preventDefault();
    
    if (!draggedItem || draggedItem === dropTargetId) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }

    const sortedPhotos = [...carouselPhotos].sort((a, b) => a.order - b.order);
    const draggedIndex = sortedPhotos.findIndex(p => p.id === draggedItem);
    const dropIndex = sortedPhotos.findIndex(p => p.id === dropTargetId);

    if (draggedIndex === -1 || dropIndex === -1) return;

    // Réorganiser les photos
    const newPhotos = [...sortedPhotos];
    const [draggedPhoto] = newPhotos.splice(draggedIndex, 1);
    newPhotos.splice(dropIndex, 0, draggedPhoto);

    // Mettre à jour les ordres
    newPhotos.forEach((photo, index) => {
      updateCarouselPhoto(photo.id, { order: index + 1 });
    });

    setDraggedItem(null);
    setDragOverItem(null);
  };

  const toggleAvailability = (structureId: string, currentAvailability: boolean) => {
    updateStructure(structureId, { available: !currentAvailability });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl font-bold">
                <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Panneau d'Administration
                </span>
              </h1>
              <p className="text-lg text-slate-600 font-medium">
                Gérez vos structures, catégories et médias en toute simplicité
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => openSection('structures')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  activeSection === 'structures' 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white' 
                    : 'bg-white text-orange-600 border-2 border-orange-200 hover:border-orange-300'
                }`}
              >
                <Package className="w-5 h-5" />
                Structures
              </button>
              
              <button
                onClick={() => openSection('categories')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  activeSection === 'categories' 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                    : 'bg-white text-blue-600 border-2 border-blue-200 hover:border-blue-300'
                }`}
              >
                <Tag className="w-5 h-5" />
                Catégories
              </button>
              
              <button
                onClick={() => openSection('photos')}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  activeSection === 'photos' 
                    ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white' 
                    : 'bg-white text-purple-600 border-2 border-purple-200 hover:border-purple-300'
                }`}
              >
                <Camera className="w-5 h-5" />
                Photos
              </button>
              
              <button
                onClick={logout}
                className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <LogOut className="w-5 h-5" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Package className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Total Structures</p>
                <p className="text-3xl font-bold text-slate-900">{structures.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                <DollarSign className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Prix Moyen</p>
                <p className="text-3xl font-bold text-slate-900">
                  {structures.length > 0 ? Math.round(structures.reduce((acc, s) => acc + s.price, 0) / structures.length) : 0}€
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Disponibles</p>
                <p className="text-3xl font-bold text-slate-900">
                  {structures.filter(s => s.available).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Camera className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-600">Photos Carrousel</p>
                <p className="text-3xl font-bold text-slate-900">{carouselPhotos.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Gestion des photos du carrousel */}
        {activeSection === 'photos' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Tag className="w-7 h-7 text-blue-600" />
              Gérer les Catégories
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Nom de la catégorie *
                </label>
                <input
                  type="text"
                  placeholder="ex: Châteaux gonflables"
                  value={categoryData.label || ''}
                  onChange={(e) => setCategoryData({...categoryData, label: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 bg-white/70"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Emoji de la catégorie *
                </label>
                <input
                  type="text"
                  placeholder="🏰"
                  value={categoryData.icon || ''}
                  onChange={(e) => setCategoryData({...categoryData, icon: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 bg-white/70"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={handleAddCategory}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                Ajouter la catégorie
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-slate-500 text-white rounded-xl font-semibold hover:bg-slate-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <X className="w-5 h-5" />
                Fermer
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div key={category.id} className="bg-white/70 border-2 border-slate-200 p-4 rounded-xl flex items-center justify-between hover:border-slate-300 hover:shadow-lg transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{category.icon}</span>
                    <span className="font-medium text-slate-900">{category.label}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(category.id)}
                    className="p-2 text-red-600 hover:text-red-800 transition-colors hover:bg-red-100 rounded-lg"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formulaire d'ajout/modification de structure */}
        {activeSection === 'structures' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
              <Package className="w-7 h-7 text-orange-600" />
              {showEditForm ? 'Modifier la structure' : 'Ajouter une nouvelle structure'}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Nom de la structure *</label>
                <input
                  type="text"
                  placeholder="ex: Château des Princesses"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 bg-white/70"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Catégorie *</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 bg-white/70"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.icon} {cat.label}</option>
                  ))}
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Dimensions</label>
                <input
                  type="text"
                  placeholder="ex: 7,7m x 6,6m x 1,5m"
                  value={formData.size || ''}
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 bg-white/70"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Capacité</label>
                <input
                  type="text"
                  placeholder="ex: 2 personnes max"
                  value={formData.capacity || ''}
                  onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 bg-white/70"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Âge recommandé</label>
                <input
                  type="text"
                  placeholder="ex: 3-77 ans"
                  value={formData.age || ''}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 bg-white/70"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Prix (€) *</label>
                <input
                  type="number"
                  placeholder="150"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 bg-white/70"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Prix 2 jours (€)</label>
                <input
                  type="number"
                  placeholder="250"
                  value={formData.price2Days || ''}
                  onChange={(e) => setFormData({...formData, price2Days: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 bg-white/70"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Poids maximum (kg)</label>
                <input
                  type="number"
                  placeholder="150"
                  value={formData.maxWeight || ''}
                  onChange={(e) => setFormData({...formData, maxWeight: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 bg-white/70"
                />
              </div>
              
              <div className="lg:col-span-2 space-y-2">
                <label className="block text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  URL de l'image * (Lien direct)
                </label>
                <input
                  type="url"
                  placeholder="https://i.imgur.com/fLqAlJ1.png"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 bg-white/70"
                />
                <p className="text-xs text-slate-500">
                  💡 Utilisez un lien direct vers l'image (Imgur, Google Drive, etc.)
                </p>
                {formData.image && (
                  <div className="mt-3">
                    <img 
                      src={formData.image} 
                      alt="Aperçu" 
                      className="w-32 h-24 object-cover rounded-xl border-2 border-slate-200 shadow-lg"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div className="lg:col-span-2 space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Description complète *</label>
                <textarea
                  placeholder="Description complète avec emojis et détails..."
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 bg-white/70 resize-none"
                  rows={5}
                />
              </div>
              
              <div className="lg:col-span-2 space-y-2">
                <label className="block text-sm font-semibold text-slate-700">Services et normes</label>
                <textarea
                  placeholder="Services inclus et normes de sécurité..."
                  value={formData.services || ''}
                  onChange={(e) => setFormData({...formData, services: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-200 bg-white/70 resize-none"
                  rows={3}
                />
              </div>
              
              <div className="lg:col-span-2">
                <label className="flex items-center gap-3 p-4 bg-slate-50/80 rounded-xl border-2 border-slate-200 cursor-pointer hover:border-slate-300 transition-all duration-200">
                  <input
                    type="checkbox"
                    checked={formData.available ?? true}
                    onChange={(e) => setFormData({...formData, available: e.target.checked})}
                    className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm font-semibold text-slate-700">Structure disponible à la location</span>
                </label>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-6">
              {showEditForm ? (
                <>
                  <button
                    onClick={handleSaveEdit}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Save className="w-5 h-5" />
                    Sauvegarder
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-slate-500 text-white rounded-xl font-semibold hover:bg-slate-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <X className="w-5 h-5" />
                    Annuler
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleAdd}
                    className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Plus className="w-5 h-5" />
                    Ajouter la structure
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-slate-500 text-white rounded-xl font-semibold hover:bg-slate-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <X className="w-5 h-5" />
                    Fermer
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Liste des structures avec drag & drop */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200/50 bg-gradient-to-r from-slate-50/80 to-white/80">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <Package className="w-6 h-6 text-slate-600" />
              Structures Existantes ({structures.length})
              <span className="text-sm font-normal text-slate-600 bg-slate-100/80 px-3 py-1 rounded-full">
                Glissez pour réorganiser
              </span>
            </h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-3">
              {[...structures].sort((a, b) => (a.order || 1) - (b.order || 1)).map((structure, index) => (
                <div 
                  key={structure.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, structure.id)}
                  onDragOver={(e) => handleDragOver(e, structure.id)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, structure.id)}
                  onDragEnd={handleDragEnd}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 cursor-move ${
                    draggedItem === structure.id 
                      ? 'opacity-50 scale-95' 
                      : dragOverItem === structure.id
                      ? 'border-orange-400 bg-orange-50/80 shadow-lg transform scale-105'
                      : 'border-slate-200 bg-white/70 hover:border-slate-300 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Poignée de drag & ordre */}
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-5 h-5 text-slate-400" />
                      <div className="w-8 h-8 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center text-orange-700 font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    
                    {/* Image et informations */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <img 
                        className="w-16 h-12 rounded-lg object-cover border border-slate-200 shadow-sm flex-shrink-0" 
                        src={structure.image} 
                        alt={structure.name} 
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate">{structure.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {categories.find(c => c.id === structure.category)?.icon} {categories.find(c => c.id === structure.category)?.label}
                          </span>
                          <span className="text-sm text-slate-600">{structure.size}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Prix */}
                    <div className="text-right">
                      <div className="font-bold text-slate-900">{structure.price}€</div>
                      {structure.price2Days && (
                        <div className="text-xs text-slate-600">{structure.price2Days}€/2j</div>
                      )}
                    </div>
                    
                    {/* Statut */}
                    <button
                      onClick={() => toggleAvailability(structure.id, structure.available)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        structure.available 
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' 
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                      title={structure.available ? 'Marquer comme indisponible' : 'Marquer comme disponible'}
                    >
                      {structure.available ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                    
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(structure)}
                        className="p-2 text-blue-600 hover:text-blue-800 transition-colors hover:bg-blue-100 rounded-lg"
                        title="Modifier"
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(structure.id)}
                        className="p-2 text-red-600 hover:text-red-800 transition-colors hover:bg-red-100 rounded-lg"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {structures.length === 0 && (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">Aucune structure</h3>
                  <p className="text-slate-500">Commencez par ajouter votre première structure</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modale de confirmation de suppression */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-white/50">
            <div className="flex items-center mb-6">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mr-4">
                <AlertTriangle className="w-7 h-7 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Confirmer la suppression</h3>
                <p className="text-sm text-slate-600">Cette action est irréversible</p>
              </div>
            </div>
            
            <p className="text-slate-700 mb-6">
              Êtes-vous sûr de vouloir supprimer <strong>"{deleteConfirm.name}"</strong> ?
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-semibold"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
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
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  URL de l'image * {editingPhotoId && <span className="text-blue-600">(Modification en cours)</span>}
                </label>
                <input
                  type="url"
                  placeholder="https://i.imgur.com/example.png"
                  value={photoData.url || ''}
                  onChange={(e) => setPhotoData({...photoData, url: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-200 bg-white/70"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Description (Alt text) *
                </label>
                <input
                  type="text"
                  placeholder="Description de l'image"
                  value={photoData.alt || ''}
                  onChange={(e) => setPhotoData({...photoData, alt: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-200 bg-white/70"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Titre de l'événement
                </label>
                <input
                  type="text"
                  placeholder="ex: Anniversaire Magique"
                  value={photoData.title || ''}
                  onChange={(e) => setPhotoData({...photoData, title: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-200 bg-white/70"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Localisation
                </label>
                <input
                  type="text"
                  placeholder="ex: Paris 15ème"
                  value={photoData.location || ''}
                  onChange={(e) => setPhotoData({...photoData, location: e.target.value})}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 transition-all duration-200 bg-white/70"
                />
              </div>
            </div>
            
            {photoData.url && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-slate-700 mb-3">Aperçu :</label>
                <div className="relative inline-block">
                  <img 
                    src={photoData.url} 
                    alt="Aperçu" 
                    className="w-48 h-32 object-cover rounded-xl border-2 border-slate-200 shadow-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-3 mb-6">
              {editingPhotoId ? (
                <>
                  <button
                    onClick={handleSavePhotoEdit}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Save className="w-5 h-5" />
                    Sauvegarder
                  </button>
                  <button
                    onClick={handleCancelPhotoEdit}
                    className="px-6 py-3 bg-slate-500 text-white rounded-xl font-semibold hover:bg-slate-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <X className="w-5 h-5" />
                    Annuler
                  </button>
                </>
              ) : (
                <button
                  onClick={handleAddPhoto}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Plus className="w-5 h-5" />
                  Ajouter la photo
                </button>
              )}
              <button
                onClick={handleCancel}
                className="px-6 py-3 bg-slate-500 text-white rounded-xl font-semibold hover:bg-slate-600 transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <X className="w-5 h-5" />
                Fermer
              </button>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
                <GripVertical className="w-5 h-5 text-slate-500" />
                Photos actuelles (glissez pour réorganiser)
              </h3>
              {[...carouselPhotos].sort((a, b) => a.order - b.order).map((photo, index) => (
                <div 
                  key={photo.id} 
                  draggable
                  onDragStart={(e) => handlePhotoDragStart(e, photo.id)}
                  onDragOver={(e) => handlePhotoDragOver(e, photo.id)}
                  onDrop={(e) => handlePhotoDrop(e, photo.id)}
                  onDragEnd={handleDragEnd}
                  className={`p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-200 cursor-move border-2 ${
                    editingPhotoId === photo.id 
                      ? 'bg-blue-50/80 border-blue-300 shadow-lg' 
                      : dragOverItem === photo.id
                      ? 'bg-purple-50/80 border-purple-300 shadow-lg transform scale-105'
                      : 'bg-white/70 border-slate-200 hover:border-slate-300 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center text-purple-700 font-bold text-sm">
                      {index + 1}
                    </div>
                    <img 
                      src={photo.url} 
                      alt={photo.alt}
                      className="w-16 h-12 object-cover rounded-lg border border-slate-200 shadow-sm"
                    />
                    <div>
                      <p className="font-medium text-slate-900">{photo.title || photo.alt}</p>
                      {photo.location && (
                        <p className="text-sm text-purple-600 flex items-center gap-1">
                          📍 {photo.location}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditPhoto(photo)}
                      className="p-2 text-blue-600 hover:text-blue-800 transition-colors hover:bg-blue-100 rounded-lg"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePhoto(photo.id)}
                      className="p-2 text-red-600 hover:text-red-800 transition-colors hover:bg-red-100 rounded-lg"
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
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-xl p-6 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-