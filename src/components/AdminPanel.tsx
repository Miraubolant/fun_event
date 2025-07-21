import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Package, DollarSign, Tag, Image } from 'lucide-react';
import { useStructures } from '../contexts/StructuresContext';
import { useAuth } from '../contexts/AuthContext';
import { Structure, Category } from '../types';

const AdminPanel: React.FC = () => {
  const { structures, categories, addStructure, updateStructure, deleteStructure, addCategory, updateCategory, deleteCategory } = useStructures();
  const { logout } = useAuth();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState<Partial<Structure>>({});
  const [categoryData, setCategoryData] = useState<Partial<Category>>({});

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
      addStructure({
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
      });
      setShowAddForm(false);
      setFormData({});
    }
  };

  const handleAddCategory = () => {
    if (categoryData.label && categoryData.icon) {
      addCategory({
        label: categoryData.label,
        icon: categoryData.icon
      });
      setShowCategoryForm(false);
      setCategoryData({});
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setShowEditForm(false);
    setShowCategoryForm(false);
    setFormData({});
    setCategoryData({});
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
              onClick={() => setShowAddForm(true)}
             className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Ajouter Structure
            </button>
            <button
              onClick={() => setShowCategoryForm(true)}
             className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all flex items-center"
            >
              <Tag className="w-5 h-5 mr-2" />
              Gérer Catégories
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
        </div>

        {/* Gestion des catégories */}
        {showCategoryForm && (
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
                Ajouter Catégorie
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors flex items-center"
              >
                <X className="w-5 h-5 mr-2" />
                Annuler
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
        {showAddForm && (
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
                Ajouter
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