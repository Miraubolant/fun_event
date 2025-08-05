import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Structure, Category, CarouselPhoto, SocialLink } from '../types';
import { supabase } from '../lib/supabase';

interface StructuresContextType {
  structures: Structure[];
  categories: Category[];
  carouselPhotos: CarouselPhoto[];
  socialLinks: SocialLink[];
  loading: boolean;
  addStructure: (structure: Omit<Structure, 'id'>) => Promise<void>;
  updateStructure: (id: string, structure: Partial<Structure>) => Promise<void>;
  deleteStructure: (id: string) => Promise<void>;
  addCategory: (category: Omit<Category, 'id'>) => Promise<void>;
  updateCategory: (id: string, category: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addCarouselPhoto: (photo: Omit<CarouselPhoto, 'id'>) => Promise<void>;
  updateCarouselPhoto: (id: string, photo: Partial<CarouselPhoto>) => Promise<void>;
  deleteCarouselPhoto: (id: string) => Promise<void>;
  reorderCarouselPhotos: (photos: CarouselPhoto[]) => Promise<void>;
  reorderStructures: (structures: Structure[]) => Promise<void>;
  addSocialLink: (link: Omit<SocialLink, 'id'>) => Promise<void>;
  updateSocialLink: (id: string, link: Partial<SocialLink>) => Promise<void>;
  deleteSocialLink: (id: string) => Promise<void>;
  reorderSocialLinks: (links: SocialLink[]) => Promise<void>;
  refreshData: () => Promise<void>;
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
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les données depuis Supabase
  const loadData = async () => {
    // Vérifier si Supabase est configuré
    if (!supabase) {
      console.warn('Supabase non configuré. Utilisation de données par défaut.');
      setCategories([]);
      setStructures([]);
      setCarouselPhotos([]);
      setSocialLinks([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      
      // Charger les catégories avec gestion d'erreur
      try {
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('label');
        
        if (categoriesError) {
          if (categoriesError.code === '42P01') {
            console.warn('Table categories n\'existe pas encore. Veuillez exécuter les migrations.');
            setCategories([]);
          } else {
            console.error('Erreur lors du chargement des catégories:', categoriesError);
            setCategories([]);
          }
        } else {
          setCategories(categoriesData || []);
        }
      } catch (error) {
        console.warn('Impossible de charger les catégories:', error);
        setCategories([]);
      }

      // Charger les structures sans jointure complexe
      try {
        const { data: structuresData, error: structuresError } = await supabase
          .from('structures')
          .select(`
            id,
            name,
            category_id,
            size,
            capacity,
            age,
            price,
            price_2_days,
            max_weight,
            services,
            image,
            additional_images,
            description,
            available,
            order_position,
            custom_pricing,
            created_at,
            updated_at
          `)
          .order('order_position', { ascending: true });
        
        if (structuresError) {
          if (structuresError.code === '42P01') {
            console.warn('Table structures n\'existe pas encore. Veuillez exécuter les migrations.');
            setStructures([]);
          } else {
            console.error('Erreur lors du chargement des structures:', structuresError);
            setStructures([]);
          }
        } else {
          // Transformer les données pour correspondre au type Structure
          const transformedStructures = (structuresData || []).map(item => ({
            id: item.id,
            name: item.name,
            category: item.category_id, // Utiliser l'ID de la catégorie
            size: item.size || '',
            capacity: item.capacity || '',
            age: item.age || '',
            price: item.price || 0,
            price2Days: item.price_2_days,
            maxWeight: item.max_weight,
            services: item.services,
            image: item.image || '',
            additionalImages: item.additional_images || [],
            description: item.description || '',
            available: item.available ?? true,
            order: item.order_position || 1,
            customPricing: item.custom_pricing ?? false
          }));
          setStructures(transformedStructures);
        }
      } catch (error) {
        console.warn('Impossible de charger les structures:', error);
        setStructures([]);
      }

      // Charger les photos du carrousel avec gestion d'erreur
      try {
        const { data: photosData, error: photosError } = await supabase
          .from('carousel_photos')
          .select('*')
          .order('order_position');
        
        if (photosError) {
          if (photosError.code === '42P01') {
            console.warn('Table carousel_photos n\'existe pas encore. Veuillez exécuter les migrations.');
            setCarouselPhotos([]);
          } else {
            console.error('Erreur lors du chargement des photos:', photosError);
            setCarouselPhotos([]);
          }
        } else {
          // Transformer les données pour correspondre au type CarouselPhoto
          const transformedPhotos = (photosData || []).map(item => ({
            id: item.id,
            url: item.url,
            alt: item.alt,
            title: item.title,
            location: item.location,
            order: item.order_position,
            structureId: item.structure_id
          }));
          setCarouselPhotos(transformedPhotos);
        }
      } catch (error) {
        console.warn('Impossible de charger les photos du carrousel:', error);
        setCarouselPhotos([]);
      }

      // Charger les liens réseaux sociaux avec gestion d'erreur
      try {
        const { data: socialData, error: socialError } = await supabase
          .from('social_links')
          .select('*')
          .order('order_position');
        
        if (socialError) {
          if (socialError.code === '42P01') {
            console.warn('Table social_links n\'existe pas encore. Veuillez exécuter les migrations.');
            // Utiliser les liens par défaut si la table n'existe pas
            setSocialLinks([
              {
                id: 'default-instagram',
                platform: 'Instagram',
                url: 'https://www.instagram.com/fun_eventt/?igsh=dWtwMXUzYjJ6NTJi',
                icon: '📷',
                label: 'Instagram',
                active: true,
                order: 1
              },
              {
                id: 'default-snapchat',
                platform: 'Snapchat',
                url: 'https://snapchat.com/add/FUN_EVENTT',
                icon: '👻',
                label: 'Snapchat',
                active: true,
                order: 2
              }
            ]);
          } else {
            console.error('Erreur lors du chargement des liens sociaux:', socialError);
            // Utiliser les liens par défaut si la table n'existe pas
            setSocialLinks([
              {
                id: 'default-instagram',
                platform: 'Instagram',
                url: 'https://www.instagram.com/fun_eventt/?igsh=dWtwMXUzYjJ6NTJi',
                icon: '📷',
                label: 'Instagram',
                active: true,
                order: 1
              },
              {
                id: 'default-snapchat',
                platform: 'Snapchat',
                url: 'https://snapchat.com/add/FUN_EVENTT',
                icon: '👻',
                label: 'Snapchat',
                active: true,
                order: 2
              }
            ]);
          }
        } else {
          // Transformer les données pour correspondre au type SocialLink
          const transformedSocialLinks = (socialData || []).map(item => ({
            id: item.id,
            platform: item.platform,
            url: item.url,
            icon: item.icon,
            label: item.label,
            active: item.active,
            order: item.order_position
          }));
          setSocialLinks(transformedSocialLinks);
        }
      } catch (error) {
        console.warn('Impossible de charger les liens sociaux:', error);
        // Utiliser les liens par défaut en cas d'erreur
        setSocialLinks([
          {
            id: 'default-instagram',
            platform: 'Instagram',
            url: 'https://www.instagram.com/fun_eventt/?igsh=dWtwMXUzYjJ6NTJi',
            icon: '📷',
            label: 'Instagram',
            active: true,
            order: 1
          },
          {
            id: 'default-snapchat',
            platform: 'Snapchat',
            url: 'https://snapchat.com/add/FUN_EVENTT',
            icon: '👻',
            label: 'Snapchat',
            active: true,
            order: 2
          }
        ]);
        setSocialLinks([
          {
            id: 'default-instagram',
            platform: 'Instagram',
            url: 'https://www.instagram.com/fun_eventt/?igsh=dWtwMXUzYjJ6NTJi',
            icon: '📷',
            label: 'Instagram',
            active: true,
            order: 1
          },
          {
            id: 'default-snapchat',
            platform: 'Snapchat',
            url: 'https://snapchat.com/add/FUN_EVENTT',
            icon: '👻',
            label: 'Snapchat',
            active: true,
            order: 2
          }
        ]);
      }
      
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      // Initialiser avec des tableaux vides en cas d'erreur générale
      setCategories([]);
      setStructures([]);
      setCarouselPhotos([]);
      setSocialLinks([]);
    } finally {
      setLoading(false);
    }
  };

  // Charger les données au montage du composant
  useEffect(() => {
    loadData();
  }, []);

  const refreshData = async () => {
    await loadData();
  };

  // Fonctions pour les structures
  const addStructure = async (newStructure: Omit<Structure, 'id'>) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      // Vérifier que la catégorie existe
      const { data: categoryExists } = await supabase
        .from('categories')
        .select('id')
        .eq('id', newStructure.category)
        .single();
      
      if (!categoryExists) {
        throw new Error('La catégorie sélectionnée n\'existe pas');
      }
      
      // Obtenir la prochaine position
      const { data: maxOrderData } = await supabase
        .from('structures')
        .select('order_position')
        .order('order_position', { ascending: false })
        .limit(1);
      
      const nextOrder = maxOrderData && maxOrderData.length > 0 
        ? (maxOrderData[0].order_position || 0) + 1 
        : 1;
      
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
          additional_images: newStructure.additionalImages || [],
          description: newStructure.description,
          available: newStructure.available,
          order_position: nextOrder,
          custom_pricing: newStructure.customPricing ?? false
        })
        .select()
        .single();

      if (error) throw error;
      
      await refreshData();
    } catch (error) {
      if (error.code === '42P01') {
        console.error('Table structures n\'existe pas. Veuillez exécuter les migrations Supabase.');
        alert('Erreur: Les tables de la base de données n\'existent pas. Veuillez exécuter les migrations Supabase.');
      } else {
        console.error('Erreur lors de l\'ajout de la structure:', error);
      }
      throw error;
    }
  };

  const updateStructure = async (id: string, updatedStructure: Partial<Structure>) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      const updateData: any = {};
      
      if (updatedStructure.name !== undefined) updateData.name = updatedStructure.name;
      if (updatedStructure.category !== undefined) updateData.category_id = updatedStructure.category;
      if (updatedStructure.size !== undefined) updateData.size = updatedStructure.size;
      if (updatedStructure.capacity !== undefined) updateData.capacity = updatedStructure.capacity;
      if (updatedStructure.age !== undefined) updateData.age = updatedStructure.age;
      if (updatedStructure.price !== undefined) updateData.price = updatedStructure.price;
      if (updatedStructure.price2Days !== undefined) updateData.price_2_days = updatedStructure.price2Days;
      if (updatedStructure.maxWeight !== undefined) updateData.max_weight = updatedStructure.maxWeight;
      if (updatedStructure.services !== undefined) updateData.services = updatedStructure.services;
      if (updatedStructure.image !== undefined) updateData.image = updatedStructure.image;
      if (updatedStructure.additionalImages !== undefined) updateData.additional_images = updatedStructure.additionalImages;
      if (updatedStructure.description !== undefined) updateData.description = updatedStructure.description;
      if (updatedStructure.available !== undefined) updateData.available = updatedStructure.available;
      if (updatedStructure.order !== undefined) updateData.order_position = updatedStructure.order;
      if (updatedStructure.customPricing !== undefined) updateData.custom_pricing = updatedStructure.customPricing;

      const { error } = await supabase
        .from('structures')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la structure:', error);
      throw error;
    }
  };

  const deleteStructure = async (id: string) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      const { error } = await supabase
        .from('structures')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la suppression de la structure:', error);
      throw error;
    }
  };

  // Fonctions pour les catégories
  const addCategory = async (newCategory: Omit<Category, 'id'>) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      // Vérifier que la table existe
      const { error: testError } = await supabase
        .from('categories')
        .select('id')
        .limit(1);
      
      if (testError && testError.code === '42P01') {
        throw new Error('Table categories n\'existe pas. Veuillez exécuter les migrations Supabase.');
      }
      
      const { error } = await supabase
        .from('categories')
        .insert({
          label: newCategory.label,
          icon: newCategory.icon
        });

      if (error) throw error;
      
      await refreshData();
    } catch (error) {
      if (error.code === '42P01') {
        console.error('Table categories n\'existe pas. Veuillez exécuter les migrations Supabase.');
        alert('Erreur: Les tables de la base de données n\'existent pas. Veuillez exécuter les migrations Supabase.');
      } else {
        console.error('Erreur lors de l\'ajout de la catégorie:', error);
      }
      throw error;
    }
  };

  const updateCategory = async (id: string, updatedCategory: Partial<Category>) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      const updateData: any = {};
      
      if (updatedCategory.label !== undefined) updateData.label = updatedCategory.label;
      if (updatedCategory.icon !== undefined) updateData.icon = updatedCategory.icon;

      const { error } = await supabase
        .from('categories')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie:', error);
      throw error;
    }
  };

  const deleteCategory = async (id: string) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie:', error);
      throw error;
    }
  };

  // Fonctions pour les photos du carrousel
  const addCarouselPhoto = async (newPhoto: Omit<CarouselPhoto, 'id'>) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      // Vérifier que la table existe
      const { error: testError } = await supabase
        .from('carousel_photos')
        .select('id')
        .limit(1);
      
      if (testError && testError.code === '42P01') {
        throw new Error('Table carousel_photos n\'existe pas. Veuillez exécuter les migrations Supabase.');
      }
      
      const { error } = await supabase
        .from('carousel_photos')
        .insert({
          url: newPhoto.url,
          alt: newPhoto.alt,
          title: newPhoto.title,
          location: newPhoto.location,
          order_position: newPhoto.order,
          structure_id: newPhoto.structureId
        });

      if (error) throw error;
      
      await refreshData();
    } catch (error) {
      if (error.code === '42P01') {
        console.error('Table carousel_photos n\'existe pas. Veuillez exécuter les migrations Supabase.');
        alert('Erreur: Les tables de la base de données n\'existent pas. Veuillez exécuter les migrations Supabase.');
      } else {
        console.error('Erreur lors de l\'ajout de la photo:', error);
      }
      throw error;
    }
  };

  const updateCarouselPhoto = async (id: string, updatedPhoto: Partial<CarouselPhoto>) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      const updateData: any = {};
      
      if (updatedPhoto.url !== undefined) updateData.url = updatedPhoto.url;
      if (updatedPhoto.alt !== undefined) updateData.alt = updatedPhoto.alt;
      if (updatedPhoto.title !== undefined) updateData.title = updatedPhoto.title;
      if (updatedPhoto.location !== undefined) updateData.location = updatedPhoto.location;
      if (updatedPhoto.order !== undefined) updateData.order_position = updatedPhoto.order;
      if (updatedPhoto.structureId !== undefined) updateData.structure_id = updatedPhoto.structureId;

      const { error } = await supabase
        .from('carousel_photos')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la photo:', error);
      throw error;
    }
  };

  const deleteCarouselPhoto = async (id: string) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      const { error } = await supabase
        .from('carousel_photos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la suppression de la photo:', error);
      throw error;
    }
  };

  const reorderCarouselPhotos = async (photos: CarouselPhoto[]) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      // Mettre à jour l'ordre de chaque photo
      const updates = photos.map((photo, index) => 
        supabase
          .from('carousel_photos')
          .update({ order_position: index + 1 })
          .eq('id', photo.id)
      );

      await Promise.all(updates);
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la réorganisation des photos:', error);
      throw error;
    }
  };

  const reorderStructures = async (structures: Structure[]) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      // Mettre à jour l'ordre de chaque structure
      const updates = structures.map((structure, index) => 
        supabase
          .from('structures')
          .update({ order_position: index + 1 })
          .eq('id', structure.id)
      );

      await Promise.all(updates);
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la réorganisation des structures:', error);
      throw error;
    }
  };

  // Fonctions pour les liens réseaux sociaux
  const addSocialLink = async (newLink: Omit<SocialLink, 'id'>) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      // Vérifier que la table existe
      const { error: testError } = await supabase
        .from('social_links')
        .select('id')
        .limit(1);
      
      if (testError && testError.code === '42P01') {
        throw new Error('Table social_links n\'existe pas. Veuillez exécuter les migrations Supabase.');
      }
      
      // Obtenir la prochaine position
      const { data: maxOrderData } = await supabase
        .from('social_links')
        .select('order_position')
        .order('order_position', { ascending: false })
        .limit(1);
      
      const nextOrder = maxOrderData && maxOrderData.length > 0 
        ? (maxOrderData[0].order_position || 0) + 1 
        : 1;
      
      const { error } = await supabase
        .from('social_links')
        .insert({
          platform: newLink.platform,
          url: newLink.url,
          icon: newLink.icon,
          label: newLink.label,
          active: newLink.active,
          order_position: nextOrder
        });

      if (error) throw error;
      
      await refreshData();
    } catch (error) {
      if (error.code === '42P01') {
        console.error('Table social_links n\'existe pas. Veuillez exécuter les migrations Supabase.');
        alert('Erreur: Les tables de la base de données n\'existent pas. Veuillez exécuter les migrations Supabase.');
      } else {
        console.error('Erreur lors de l\'ajout du lien social:', error);
      }
      throw error;
    }
  };

  const updateSocialLink = async (id: string, updatedLink: Partial<SocialLink>) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      const updateData: any = {};
      
      if (updatedLink.platform !== undefined) updateData.platform = updatedLink.platform;
      if (updatedLink.url !== undefined) updateData.url = updatedLink.url;
      if (updatedLink.icon !== undefined) updateData.icon = updatedLink.icon;
      if (updatedLink.label !== undefined) updateData.label = updatedLink.label;
      if (updatedLink.active !== undefined) updateData.active = updatedLink.active;
      if (updatedLink.order !== undefined) updateData.order_position = updatedLink.order;

      const { error } = await supabase
        .from('social_links')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du lien social:', error);
      throw error;
    }
  };

  const deleteSocialLink = async (id: string) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      const { error } = await supabase
        .from('social_links')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la suppression du lien social:', error);
      throw error;
    }
  };

  const reorderSocialLinks = async (links: SocialLink[]) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      // Mettre à jour l'ordre de chaque lien
      const updates = links.map((link, index) => 
        supabase
          .from('social_links')
          .update({ order_position: index + 1 })
          .eq('id', link.id)
      );

      await Promise.all(updates);
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la réorganisation des liens sociaux:', error);
      throw error;
    }
  };

  return (
    <StructuresContext.Provider value={{ 
      structures, 
      categories, 
      carouselPhotos,
      socialLinks,
      loading,
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
      addSocialLink,
      updateSocialLink,
      deleteSocialLink,
      reorderSocialLinks,
      refreshData
    }}>
      {children}
    </StructuresContext.Provider>
  );
};