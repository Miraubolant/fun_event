import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Structure, Category, CarouselPhoto, FAQCategory, FAQQuestion, SocialLink, DeliveryZone, Subcategory } from '../types';
import { supabase } from '../lib/supabase';

interface StructuresContextType {
  structures: Structure[];
  categories: Category[];
  carouselPhotos: CarouselPhoto[];
  faqCategories: FAQCategory[];
  socialLinks: SocialLink[];
  deliveryZones: DeliveryZone[];
  subcategories: Subcategory[];
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
  addFAQCategory: (category: Omit<FAQCategory, 'id' | 'questions'>) => Promise<void>;
  updateFAQCategory: (id: string, category: Partial<Omit<FAQCategory, 'id' | 'questions'>>) => Promise<void>;
  deleteFAQCategory: (id: string) => Promise<void>;
  addFAQQuestion: (question: Omit<FAQQuestion, 'id'>) => Promise<void>;
  updateFAQQuestion: (id: string, question: Partial<FAQQuestion>) => Promise<void>;
  deleteFAQQuestion: (id: string) => Promise<void>;
  addSocialLink: (link: Omit<SocialLink, 'id'>) => Promise<void>;
  updateSocialLink: (id: string, link: Partial<SocialLink>) => Promise<void>;
  deleteSocialLink: (id: string) => Promise<void>;
  reorderSocialLinks: (links: SocialLink[]) => Promise<void>;
  addDeliveryZone: (zone: Omit<DeliveryZone, 'id'>) => Promise<void>;
  updateDeliveryZone: (id: string, zone: Partial<DeliveryZone>) => Promise<void>;
  deleteDeliveryZone: (id: string) => Promise<void>;
  addSubcategory: (subcategory: Omit<Subcategory, 'id'>) => Promise<void>;
  updateSubcategory: (id: string, subcategory: Partial<Subcategory>) => Promise<void>;
  deleteSubcategory: (id: string) => Promise<void>;
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
  const [faqCategories, setFaqCategories] = useState<FAQCategory[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [deliveryZones, setDeliveryZones] = useState<DeliveryZone[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Charger les données depuis Supabase
  const loadData = async () => {
    // Vérifier si Supabase est configuré
    if (!supabase) {
      console.warn('Supabase non configuré. Utilisation de données par défaut.');
      setCategories([]);
      setStructures([]);
      setCarouselPhotos([]);
      setFaqCategories([]);
      setSocialLinks([]);
      setDeliveryZones([]);
      setSubcategories([]);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      
      // Charger les données critiques en parallèle (structures + catégories)
      const [categoriesResult, structuresResult] = await Promise.allSettled([
        // Charger les catégories
        supabase.from('categories').select('*').order('label'),
        // Charger les structures (données critiques)
        supabase.from('structures').select(`
          id,
          name,
          category_id,
          subcategory_id,
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
        `).order('order_position', { ascending: true })
      ]);

      // Traiter les catégories
      if (categoriesResult.status === 'fulfilled' && !categoriesResult.value.error) {
        setCategories(categoriesResult.value.data || []);
      } else {
        console.warn('Erreur lors du chargement des catégories');
        setCategories([]);
      }

      // Traiter les structures (priorité)
      if (structuresResult.status === 'fulfilled' && !structuresResult.value.error) {
        const transformedStructures = (structuresResult.value.data || []).map(item => ({
          id: item.id,
          name: item.name,
          category: item.category_id,
          subcategory_id: item.subcategory_id,
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
      } else {
        console.warn('Erreur lors du chargement des structures');
        setStructures([]);
      }

      // Arrêter le loading principal une fois les structures chargées
      setLoading(false);

      // Charger les données secondaires en arrière-plan (non bloquantes)
      Promise.allSettled([
        // Photos du carrousel
        supabase.from('carousel_photos').select('*').order('order_position'),
        // FAQ catégories
        supabase.from('faq_categories').select('*').order('order_position'),
        // Liens sociaux
        supabase.from('social_links').select('*').eq('active', true).order('order_position'),
        // Zones de livraison
        supabase.from('delivery_zones').select('*').eq('active', true).order('order_position'),
        // Sous-catégories
        supabase.from('subcategories').select('*').eq('active', true).order('order_position')
      ]).then(async ([photosResult, faqCategoriesResult, socialLinksResult, deliveryZonesResult, subcategoriesResult]) => {
        
        // Traiter les photos du carrousel
        if (photosResult.status === 'fulfilled' && !photosResult.value.error) {
          const transformedPhotos = (photosResult.value.data || []).map(item => ({
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

        // Traiter les FAQ
        if (faqCategoriesResult.status === 'fulfilled' && !faqCategoriesResult.value.error) {
          const categoriesWithQuestions = await Promise.all(
            (faqCategoriesResult.value.data || []).map(async (category) => {
              const { data: questionsData } = await supabase
                .from('faq_questions')
                .select('*')
                .eq('category_id', category.id)
                .order('order_position');
              
              return {
                id: category.id,
                category: category.category,
                icon: category.icon,
                color: category.color,
                order: category.order_position,
                questions: (questionsData || []).map(q => ({
                  id: q.id,
                  categoryId: q.category_id,
                  question: q.question,
                  answer: q.answer,
                  order: q.order_position
                }))
              };
            })
          );
          setFaqCategories(categoriesWithQuestions);
        }

        // Traiter les liens sociaux
        if (socialLinksResult.status === 'fulfilled' && !socialLinksResult.value.error) {
          const transformedLinks = (socialLinksResult.value.data || []).map(item => ({
            id: item.id,
            platform: item.platform,
            url: item.url,
            icon: item.icon,
            label: item.label,
            active: item.active,
            order: item.order_position
          }));
          setSocialLinks(transformedLinks);
        }

        // Traiter les zones de livraison
        if (deliveryZonesResult.status === 'fulfilled' && !deliveryZonesResult.value.error) {
          const transformedZones = (deliveryZonesResult.value.data || []).map(item => ({
            id: item.id,
            name: item.name,
            code: item.code,
            active: item.active,
            order_position: item.order_position
          }));
          setDeliveryZones(transformedZones);
        }

        // Traiter les sous-catégories
        if (subcategoriesResult.status === 'fulfilled' && !subcategoriesResult.value.error) {
          const transformedSubcategories = (subcategoriesResult.value.data || []).map(item => ({
            id: item.id,
            name: item.name,
            category_id: item.category_id,
            icon: item.icon,
            active: item.active,
            order_position: item.order_position
          }));
          setSubcategories(transformedSubcategories);
        }
      });
      
    } catch (error) {
      console.error('Erreur lors du chargement des données:', error);
      // Initialiser avec des tableaux vides en cas d'erreur générale
      setCategories([]);
      setStructures([]);
      setCarouselPhotos([]);
      setFaqCategories([]);
      setSocialLinks([]);
      setDeliveryZones([]);
      setSubcategories([]);
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
      
      const { data, error} = await supabase
        .from('structures')
        .insert({
          name: newStructure.name,
          category_id: newStructure.category,
          subcategory_id: newStructure.subcategory_id || null,
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
      if (updatedStructure.subcategory_id !== undefined) updateData.subcategory_id = updatedStructure.subcategory_id || null;
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

  // Fonctions pour les FAQ
  const addFAQCategory = async (newCategory: Omit<FAQCategory, 'id' | 'questions'>) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      const { error } = await supabase
        .from('faq_categories')
        .insert({
          category: newCategory.category,
          icon: newCategory.icon,
          color: newCategory.color,
          order_position: newCategory.order
        });

      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la catégorie FAQ:', error);
      throw error;
    }
  };

  const updateFAQCategory = async (id: string, updatedCategory: Partial<Omit<FAQCategory, 'id' | 'questions'>>) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      const updateData: any = {};
      
      if (updatedCategory.category !== undefined) updateData.category = updatedCategory.category;
      if (updatedCategory.icon !== undefined) updateData.icon = updatedCategory.icon;
      if (updatedCategory.color !== undefined) updateData.color = updatedCategory.color;
      if (updatedCategory.order !== undefined) updateData.order_position = updatedCategory.order;

      const { error } = await supabase
        .from('faq_categories')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la catégorie FAQ:', error);
      throw error;
    }
  };

  const deleteFAQCategory = async (id: string) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      const { error } = await supabase
        .from('faq_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie FAQ:', error);
      throw error;
    }
  };

  const addFAQQuestion = async (newQuestion: Omit<FAQQuestion, 'id'>) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      const { error } = await supabase
        .from('faq_questions')
        .insert({
          category_id: newQuestion.categoryId,
          question: newQuestion.question,
          answer: newQuestion.answer,
          order_position: newQuestion.order
        });

      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la question FAQ:', error);
      throw error;
    }
  };

  const updateFAQQuestion = async (id: string, updatedQuestion: Partial<FAQQuestion>) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      const updateData: any = {};
      
      if (updatedQuestion.question !== undefined) updateData.question = updatedQuestion.question;
      if (updatedQuestion.answer !== undefined) updateData.answer = updatedQuestion.answer;
      if (updatedQuestion.order !== undefined) updateData.order_position = updatedQuestion.order;

      const { error } = await supabase
        .from('faq_questions')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la question FAQ:', error);
      throw error;
    }
  };

  const deleteFAQQuestion = async (id: string) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      const { error } = await supabase
        .from('faq_questions')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la suppression de la question FAQ:', error);
      throw error;
    }
  };

  // Fonctions pour les liens sociaux
  const addSocialLink = async (newLink: Omit<SocialLink, 'id'>) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }
    
    try {
      const { error } = await supabase
        .from('social_links')
        .insert({
          platform: newLink.platform,
          url: newLink.url,
          icon: newLink.icon,
          label: newLink.label,
          active: newLink.active,
          order_position: newLink.order
        });

      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de l\'ajout du lien social:', error);
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

  // Fonctions pour les zones de livraison
  const addDeliveryZone = async (newZone: Omit<DeliveryZone, 'id'>) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }

    try {
      const { error } = await supabase
        .from('delivery_zones')
        .insert({
          name: newZone.name,
          code: newZone.code,
          active: newZone.active,
          order_position: newZone.order_position
        });

      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la zone de livraison:', error);
      throw error;
    }
  };

  const updateDeliveryZone = async (id: string, updatedZone: Partial<DeliveryZone>) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }

    try {
      const updateData: any = {};

      if (updatedZone.name !== undefined) updateData.name = updatedZone.name;
      if (updatedZone.code !== undefined) updateData.code = updatedZone.code;
      if (updatedZone.active !== undefined) updateData.active = updatedZone.active;
      if (updatedZone.order_position !== undefined) updateData.order_position = updatedZone.order_position;

      const { error } = await supabase
        .from('delivery_zones')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la zone de livraison:', error);
      throw error;
    }
  };

  const deleteDeliveryZone = async (id: string) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }

    try {
      const { error } = await supabase
        .from('delivery_zones')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la suppression de la zone de livraison:', error);
      throw error;
    }
  };

  // Fonctions pour les sous-catégories
  const addSubcategory = async (newSubcategory: Omit<Subcategory, 'id'>) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }

    try {
      const { error } = await supabase
        .from('subcategories')
        .insert({
          name: newSubcategory.name,
          category_id: newSubcategory.category_id,
          icon: newSubcategory.icon,
          active: newSubcategory.active,
          order_position: newSubcategory.order_position
        });

      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la sous-catégorie:', error);
      throw error;
    }
  };

  const updateSubcategory = async (id: string, updatedSubcategory: Partial<Subcategory>) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }

    try {
      const updateData: any = {};

      if (updatedSubcategory.name !== undefined) updateData.name = updatedSubcategory.name;
      if (updatedSubcategory.category_id !== undefined) updateData.category_id = updatedSubcategory.category_id;
      if (updatedSubcategory.icon !== undefined) updateData.icon = updatedSubcategory.icon;
      if (updatedSubcategory.active !== undefined) updateData.active = updatedSubcategory.active;
      if (updatedSubcategory.order_position !== undefined) updateData.order_position = updatedSubcategory.order_position;

      const { error } = await supabase
        .from('subcategories')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la sous-catégorie:', error);
      throw error;
    }
  };

  const deleteSubcategory = async (id: string) => {
    if (!supabase) {
      throw new Error('Supabase non configuré');
    }

    try {
      const { error } = await supabase
        .from('subcategories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la suppression de la sous-catégorie:', error);
      throw error;
    }
  };

  return (
    <StructuresContext.Provider value={{
      structures,
      categories,
      carouselPhotos,
      faqCategories,
      socialLinks,
      deliveryZones,
      subcategories,
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
      addFAQCategory,
      updateFAQCategory,
      deleteFAQCategory,
      addFAQQuestion,
      updateFAQQuestion,
      deleteFAQQuestion,
      addSocialLink,
      updateSocialLink,
      deleteSocialLink,
      reorderSocialLinks,
      addDeliveryZone,
      updateDeliveryZone,
      deleteDeliveryZone,
      addSubcategory,
      updateSubcategory,
      deleteSubcategory,
      refreshData
    }}>
      {children}
    </StructuresContext.Provider>
  );
};