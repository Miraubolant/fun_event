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
  const [loading, setLoading] = useState(true);

  // Charger les données depuis Supabase
  React.useEffect(() => {
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
          setCategories(categoriesData || []);
        }

        // Charger les structures avec leurs catégories
        const { data: structuresData, error: structuresError } = await supabase
          .from('structures')
          .select(`
            *,
            categories!structures_category_id_fkey(id, label, icon)
          `)
          .order('name');

        if (structuresError) {
          console.error('Erreur lors du chargement des structures:', structuresError);
        } else {
          // Transformer les données pour correspondre au format attendu
          const transformedStructures = (structuresData || []).map(item => ({
            id: item.id,
            name: item.name,
            category: item.category_id,
            size: item.size || '',
            capacity: item.capacity || '',
            age: item.age || '',
            price: item.price,
            price2Days: item.price_2_days,
            maxWeight: item.max_weight,
            services: item.services,
            image: item.image || '',
            description: item.description || '',
            available: item.available
          }));
          setStructures(transformedStructures);
        }

        // Charger les photos du carrousel
        const { data: photosData, error: photosError } = await supabase
          .from('carousel_photos')
          .select('*')
          .order('order_position');

        if (photosError) {
          console.error('Erreur lors du chargement des photos:', photosError);
        } else {
          // Transformer les données pour correspondre au format attendu
          const transformedPhotos = (photosData || []).map(item => ({
            id: item.id,
            url: item.url,
            alt: item.alt,
            title: item.title,
            location: item.location,
            order: item.order_position
          }));
          setCarouselPhotos(transformedPhotos);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

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

      // Transformer et ajouter à l'état local
      const transformedStructure: Structure = {
        id: data.id,
        name: data.name,
        category: data.category_id,
        size: data.size || '',
        capacity: data.capacity || '',
        age: data.age || '',
        price: data.price,
        price2Days: data.price_2_days,
        maxWeight: data.max_weight,
        services: data.services,
        image: data.image || '',
        description: data.description || '',
        available: data.available
      };
      setStructures(prev => [...prev, transformedStructure]);
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

      // Mettre à jour l'état local
      setStructures(prev => 
        prev.map(structure => 
          structure.id === id ? { ...structure, ...updatedStructure } : structure
        )
      );
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

      // Mettre à jour l'état local
      setStructures(prev => prev.filter(structure => structure.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la structure:', error);
    }
  };

  const addCategory = async (newCategory: Omit<Category, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert({
          label: newCategory.label,
          icon: newCategory.icon
        })
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de l\'ajout de la catégorie:', error);
        return;
      }

      // Ajouter à l'état local
      const newCat: Category = {
        id: data.id,
        label: data.label,
        icon: data.icon
      };
      setCategories(prev => [...prev, newCat]);
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

      // Mettre à jour l'état local
      setCategories(prev => 
        prev.map(category => 
          category.id === id ? { ...category, ...updatedCategory } : category
        )
      );
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

      // Mettre à jour l'état local
      setCategories(prev => prev.filter(category => category.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
    }
  };

  const addCarouselPhoto = async (newPhoto: Omit<CarouselPhoto, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('carousel_photos')
        .insert({
          url: newPhoto.url,
          alt: newPhoto.alt,
          title: newPhoto.title,
          location: newPhoto.location,
          order_position: newPhoto.order
        })
        .select()
        .single();

      if (error) {
        console.error('Erreur lors de l\'ajout de la photo:', error);
        return;
      }

      // Ajouter à l'état local
      const newPhotoData: CarouselPhoto = {
        id: data.id,
        url: data.url,
        alt: data.alt,
        title: data.title,
        location: data.location,
        order: data.order_position
      };
      setCarouselPhotos(prev => [...prev, newPhotoData].sort((a, b) => a.order - b.order));
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

      // Mettre à jour l'état local
      setCarouselPhotos(prev => 
        prev.map(photo => 
          photo.id === id ? { ...photo, ...updatedPhoto } : photo
        ).sort((a, b) => a.order - b.order)
      );
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

      // Mettre à jour l'état local
      setCarouselPhotos(prev => prev.filter(photo => photo.id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la photo:', error);
    }
  };

  const reorderCarouselPhotos = (photos: CarouselPhoto[]) => {
    setCarouselPhotos(photos);
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