import React, { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { Structure, Category, CarouselPhoto } from '../types';

interface StructuresContextType {
  structures: Structure[];
  categories: Category[];
  carouselPhotos: CarouselPhoto[];
  addStructure: (structure: Omit<Structure, 'id'>) => void;
  updateStructure: (id: string, structure: Partial<Structure>) => void;
  deleteStructure: (id: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addCarouselPhoto: (photo: Omit<CarouselPhoto, 'id'>) => void;
  updateCarouselPhoto: (id: string, photo: Partial<CarouselPhoto>) => void;
  deleteCarouselPhoto: (id: string) => void;
  reorderCarouselPhotos: (photos: CarouselPhoto[]) => void;
}

const StructuresContext = createContext<StructuresContextType | undefined>(undefined);

export const useStructures = () => {
  const context = useContext(StructuresContext);
  if (context === undefined) {
    throw new Error('useStructures must be used within a StructuresProvider');
  }
  return context;
};

interface StructuresProviderProps {
  children: ReactNode;
}

export const StructuresProvider: React.FC<StructuresProviderProps> = ({ children }) => {
  const [structures, setStructures] = useState<Structure[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [carouselPhotos, setCarouselPhotos] = useState<CarouselPhoto[]>([]);
  const [loading, setLoading] = useState(false);

  // Charger les données depuis Supabase au démarrage
  React.useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      
      // Charger les catégories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .order('label');

      if (categoriesError) {
        console.error('Erreur lors du chargement des catégories:', categoriesError);
      } else {
        const mappedCategories: Category[] = categoriesData.map(cat => ({
          id: cat.id,
          label: cat.label,
          icon: cat.icon
        }));
        setCategories(mappedCategories);
      }

      // Charger les structures avec leurs catégories
      const { data: structuresData, error: structuresError } = await supabase
        .from('structures')
        .select(`
          *,
          categories (
            id,
            label,
            icon
          )
        `)
        .order('name');

      if (structuresError) {
        console.error('Erreur lors du chargement des structures:', structuresError);
      } else {
        const mappedStructures: Structure[] = structuresData.map(struct => ({
          id: struct.id,
          name: struct.name,
          category: struct.category_id,
          size: struct.size || '',
          capacity: struct.capacity || '',
          age: struct.age || '',
          price: struct.price,
          price2Days: struct.price_2_days || undefined,
          maxWeight: struct.max_weight || undefined,
          services: struct.services || undefined,
          image: struct.image || '',
          description: struct.description || '',
          available: struct.available
        }));
        setStructures(mappedStructures);
      }

      // Charger les photos du carrousel
      const { data: photosData, error: photosError } = await supabase
        .from('carousel_photos')
        .select('*')
        .order('order_position');

      if (photosError) {
        console.error('Erreur lors du chargement des photos:', photosError);
      } else {
        const mappedPhotos: CarouselPhoto[] = photosData.map(photo => ({
          id: photo.id,
          url: photo.url,
          alt: photo.alt,
          title: photo.title || undefined,
          location: photo.location || undefined,
          order: photo.order_position
        }));
        setCarouselPhotos(mappedPhotos);
      }

    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
    }
  };

  const addStructure = async (newStructure: Omit<Structure, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('structures')
        .insert({
          name: newStructure.name,
          category_id: newStructure.category,
          size: newStructure.size,
          capacity: newStructure.capacity,
          age: newStructure.age,
          price: newStructure.price,
          price_2_days: newStructure.price2Days,
          max_weight: newStructure.maxWeight,
          services: newStructure.services,
          image: newStructure.image,
          description: newStructure.description,
          available: newStructure.available
        })
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de l\'ajout de la structure:', error);
        return;
      }

      // Recharger les données
      await loadData();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la structure:', error);
    }
  };

  const updateStructure = async (id: string, updatedStructure: Partial<Structure>) => {
    try {
      const { error } = await supabase
        .from('structures')
        .update({
          name: updatedStructure.name,
          category_id: updatedStructure.category,
          size: updatedStructure.size,
          capacity: updatedStructure.capacity,
          age: updatedStructure.age,
          price: updatedStructure.price,
          price_2_days: updatedStructure.price2Days,
          max_weight: updatedStructure.maxWeight,
          services: updatedStructure.services,
          image: updatedStructure.image,
          description: updatedStructure.description,
          available: updatedStructure.available
        })
        .eq('id', id);

      if (error) {
        console.error('Erreur lors de la mise à jour de la structure:', error);
        return;
      }

      // Recharger les données
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la structure:', error);
    }
  };

  const deleteStructure = async (id: string) => {
    try {
      const { error } = await supabase
        .from('structures')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erreur lors de la suppression de la structure:', error);
        return;
      }

      // Recharger les données
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la suppression de la structure:', error);
    }
  };

  const addCategory = async (newCategory: Omit<Category, 'id'>) => {
    try {
      const { error } = await supabase
        .from('categories')
        .insert({
          label: newCategory.label,
          icon: newCategory.icon
        });

      if (error) {
        console.error('Erreur lors de l\'ajout de la catégorie:', error);
        return;
      }

      // Recharger les données
      await loadData();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la catégorie:', error);
    }
  };

  const updateCategory = async (id: string, updatedCategory: Partial<Category>) => {
    try {
      const { error } = await supabase
        .from('categories')
        .update({
          label: updatedCategory.label,
          icon: updatedCategory.icon
        })
        .eq('id', id);

      if (error) {
        console.error('Erreur lors de la mise à jour de la catégorie:', error);
        return;
      }

      // Recharger les données
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erreur lors de la suppression de la catégorie:', error);
        return;
      }

      // Recharger les données
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
    }
  };

  const addCarouselPhoto = async (newPhoto: Omit<CarouselPhoto, 'id'>) => {
    try {
      const { error } = await supabase
        .from('carousel_photos')
        .insert({
          url: newPhoto.url,
          alt: newPhoto.alt,
          title: newPhoto.title,
          location: newPhoto.location,
          order_position: newPhoto.order
        });

      if (error) {
        console.error('Erreur lors de l\'ajout de la photo:', error);
        return;
      }

      // Recharger les données
      await loadData();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la photo:', error);
    }
  };

  const updateCarouselPhoto = async (id: string, updatedPhoto: Partial<CarouselPhoto>) => {
    try {
      const { error } = await supabase
        .from('carousel_photos')
        .update({
          url: updatedPhoto.url,
          alt: updatedPhoto.alt,
          title: updatedPhoto.title,
          location: updatedPhoto.location,
          order_position: updatedPhoto.order
        })
        .eq('id', id);

      if (error) {
        console.error('Erreur lors de la mise à jour de la photo:', error);
        return;
      }

      // Recharger les données
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la photo:', error);
    }
  };

  const deleteCarouselPhoto = async (id: string) => {
    try {
      const { error } = await supabase
        .from('carousel_photos')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erreur lors de la suppression de la photo:', error);
        return;
      }

      // Recharger les données
      await loadData();
    } catch (error) {
      console.error('Erreur lors de la suppression de la photo:', error);
    }
  };

  const reorderCarouselPhotos = (photos: CarouselPhoto[]) => {
    // Cette fonction est maintenant gérée par updateCarouselPhoto
    // pour chaque photo individuellement
  };

  return (
    <StructuresContext.Provider value={{ 
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
    }}>
      {children}
    </StructuresContext.Provider>
  );
};