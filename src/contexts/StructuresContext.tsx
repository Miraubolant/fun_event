import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { Structure, Category, CarouselPhoto } from '../types';

const initialCategories: Category[] = [
  { id: 'gonflable', label: 'Location gonflable', icon: '🎪' },
  { id: 'evenementiel', label: 'Évènementiel', icon: '🎭' },
  { id: 'gourmandises', label: 'Gourmandises', icon: '🍭' },
];

const initialCarouselPhotos: CarouselPhoto[] = [
  { id: '1', url: 'https://i.imgur.com/kA2Secn.png', alt: 'Structure gonflable 1', title: 'Anniversaire Magique', location: 'Paris 15ème', order: 1 },
  { id: '2', url: 'https://i.imgur.com/yj3D8xk.png', alt: 'Structure gonflable 2', title: 'Fête d\'École', location: 'Boulogne-Billancourt', order: 2 },
  { id: '3', url: 'https://i.imgur.com/eJrSzxS.png', alt: 'Structure gonflable 3', title: 'Kermesse Paroissiale', location: 'Versailles', order: 3 },
  { id: '4', url: 'https://i.imgur.com/PpYERbM.png', alt: 'Structure gonflable 4', title: 'Team Building', location: 'La Défense', order: 4 },
  { id: '5', url: 'https://i.imgur.com/AdHVFs4.png', alt: 'Structure gonflable 5', title: 'Mariage Champêtre', location: 'Fontainebleau', order: 5 },
  { id: '6', url: 'https://i.imgur.com/6qMhuOF.png', alt: 'Structure gonflable 6', title: 'Fête de Quartier', location: 'Créteil', order: 6 },
];

const initialStructures: Structure[] = [
  {
    id: '1',
    name: 'Instables Gladiateurs',
    category: 'gonflable',
    size: '7,7m x 6,6m x 1,5m',
    capacity: '2 personnes max',
    age: '3-77 ans',
    price: 180,
    image: 'https://i.imgur.com/fLqAlJ1.png',
    description: 'Entrez dans l\'arène et relevez le défi des gladiateurs ! ⚔🔥\n\nAffrontez vos amis, votre famille ou vos collègues dans un duel d\'équilibre et de stratégie !\nSur cette plateforme gonflable, les gladiateurs doivent se battre pour rester debout tout en tentant de déséquilibrer leur adversaire.\n\n💪 Un jeu fun et compétitif : testez votre agilité, votre force et votre ruse pour triompher.\n🎭 Une animation garantie : fous rires et suspense assurés pour les joueurs comme pour les spectateurs !\n🌟 Idéal pour tous vos événements : anniversaires, team-building, kermesses, enterrements de vie de célibataire…\n\n👑 Qui restera le dernier debout ? Montez sur la plateforme et prouvez que vous êtes le véritable champion des gladiateurs !\n📅 Réservez dès maintenant pour un maximum de fun et de défis ! 🎉🔥',
    maxWeight: 100,
    services: 'Livraison 7 jours / 7 jours, Enrouleurs électrique inclus, Structures nettoyées entre chaque location',
    available: true
  },
  {
    id: '2',
    name: 'Château Cirque',
    category: 'gonflable',
    size: '3,8m x 2,8m x 2,8m',
    capacity: '12 personnes max',
    age: '3-77 ans',
    price: 150,
    maxWeight: 70,
    services: 'Conforme EN 14960, Livraison 7 jours / 7 jours, Enrouleurs électrique inclus, Structures nettoyées entre chaque location',
    image: 'https://i.imgur.com/XcGSPl6.png',
    description: '🤹 Toute la Magie du Cirque dans un Château Gonflable ! 🎪\n\n✨ Offrez aux enfants un moment de purement magique et fun avec notre château gonflable sur le thème du cirque ! 🤩\nIls pourront sauter, bondir, faire des galipettes et des cabrioles dans un espace entièrement sécurisé, rempli de multiples obstacles gonflés pour encore plus de défis et d\'amusement ! 🎈\n🔥 Pourquoi choisir cette structure gonflable ?\n\n✅ Un véritable parc d\'attractions miniature : Obstacles, espaces de saut et un super toboggan pour une sortie spectaculaire ! 🎢\n✅ Sécurité optimale : Conçu pour les jeunes enfants avec des matériaux résistants et un sol amortissant.\n✅ Un univers captivant : Plongez dans l\'ambiance magique du cirque et laissez les enfants devenir de vrais petits acrobates ! 🎭🤹\n✅ Parfait pour tous vos événements : Anniversaires, fêtes d\'école, kermesses, événements privés… 🥳\n📅 Ajoutez une touche de magie à votre événement, réservez dès maintenant !',
    available: true
  },
  {
    id: '3',
    name: 'Multiplay Jurassic World',
    category: 'gonflable',
    size: '5m x 5,5m x 4,30m',
    capacity: '12 personnes max',
    age: '3-77 ans',
    price: 200,
    maxWeight: 160,
    services: 'Conforme EN 14960, Livraison 7 jours / 7 jours, Enrouleurs électrique inclus, Structures nettoyées entre chaque location',
    image: 'https://i.imgur.com/dyYum3x.png',
    description: 'Partez à l\'aventure avec la structure gonflable Multiplay Jurassic World\n\nOffrez à vos invités une expérience inoubliable en les plongeant au coeur de l\'ère préhistorique avec la structure gonflable Multiplay Jurassic World. Inspirée de l\'univers fascinant des dinosaures, cette structure gonflable unique vous invite à explorer un monde jurassique peuplé de créatures gigantesques et d\'aventures palpitantes.\n\nImaginez un décor spectaculaire avec des dinosaures en 3D réalistes et des obstacles colorés qui captivent l\'imagination des enfants. Avec son toboggan impressionnant, ses zones de jeu interactives et ses designs inspirants, la structure Multiplay Jurassic World permet aux petits aventuriers de sauter, grimper et glisser tout en découvrant un univers préhistorique excitant.\n\nQue ce soit pour un anniversaire à thème, une fête d\'école ou un événement spécial, cette structure gonflable fera voyager les enfants à travers le temps et les emportera dans une aventure jurassique pleine de rires et de joie.\n\nN\'attendez plus, rendez chaque événement encore plus magique avec cette attraction hors du commun et faites vivre à vos invités un moment d\'évasion inoubliable !',
    available: true
  }
];

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
  const [structures, setStructures] = useState<Structure[]>(initialStructures);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [carouselPhotos, setCarouselPhotos] = useState<CarouselPhoto[]>(initialCarouselPhotos);

  // Charger les données depuis Supabase
  useEffect(() => {
    // Essayer de charger depuis Supabase, mais utiliser les données par défaut si ça échoue
    const loadData = async () => {
      try {
        await fetchCategories();
        await fetchStructures();
        await fetchCarouselPhotos();
      } catch (error) {
        console.log('Utilisation des données par défaut (Supabase non configuré)');
      }
    };
    
    loadData();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.log('Supabase non configuré, utilisation des données par défaut');
        return;
      }

      if (data && data.length > 0) {
        setCategories(data);
      }
    } catch (error) {
      console.log('Supabase non configuré, utilisation des données par défaut');
    }
  };

  const fetchStructures = async () => {
    try {
      const { data, error } = await supabase
        .from('structures')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching structures:', error);
        return;
      }

      // Convertir les données Supabase vers le format attendu
      const formattedStructures: Structure[] = (data || []).map(item => ({
        id: item.id,
        name: item.name,
        category: item.category_id || '',
        size: item.size,
        capacity: item.capacity,
        age: item.age,
        price: item.price,
        price2Days: item.price_2_days || undefined,
        maxWeight: item.max_weight || undefined,
        services: item.services || undefined,
        image: item.image,
        description: item.description,
        available: item.available ?? true
      }));

      setStructures(formattedStructures);
    } catch (error) {
      console.error('Error fetching structures:', error);
    }
  };

  const fetchCarouselPhotos = async () => {
    try {
      const { data, error } = await supabase
        .from('carousel_photos')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) {
        console.error('Error fetching carousel photos:', error);
        return;
      }

      // Convertir les données Supabase vers le format attendu
      const formattedPhotos: CarouselPhoto[] = (data || []).map(item => ({
        id: item.id,
        url: item.url,
        alt: item.alt,
        title: item.title || undefined,
        location: item.location || undefined,
        order: item.order_position
      }));

      setCarouselPhotos(formattedPhotos);
    } catch (error) {
      console.error('Error fetching carousel photos:', error);
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
        console.error('Error adding structure:', error);
        return;
      }

      if (data) {
        const formattedStructure: Structure = {
          id: data.id,
          name: data.name,
          category: data.category_id || '',
          size: data.size,
          capacity: data.capacity,
          age: data.age,
          price: data.price,
          price2Days: data.price_2_days || undefined,
          maxWeight: data.max_weight || undefined,
          services: data.services || undefined,
          image: data.image,
          description: data.description,
          available: data.available ?? true
        };
        setStructures(prev => [...prev, formattedStructure]);
      }
    } catch (error) {
      console.error('Error adding structure:', error);
    }
  };

  const updateStructure = async (id: string, updatedStructure: Partial<Structure>) => {
    try {
      const { data, error } = await supabase
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
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating structure:', error);
        return;
      }

      if (data) {
        const formattedStructure: Structure = {
          id: data.id,
          name: data.name,
          category: data.category_id || '',
          size: data.size,
          capacity: data.capacity,
          age: data.age,
          price: data.price,
          price2Days: data.price_2_days || undefined,
          maxWeight: data.max_weight || undefined,
          services: data.services || undefined,
          image: data.image,
          description: data.description,
          available: data.available ?? true
        };
        setStructures(prev => 
          prev.map(structure => 
            structure.id === id ? formattedStructure : structure
          )
        );
      }
    } catch (error) {
      console.error('Error updating structure:', error);
    }
  };

  const deleteStructure = async (id: string) => {
    try {
      const { error } = await supabase
        .from('structures')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting structure:', error);
        return;
      }

      setStructures(prev => prev.filter(structure => structure.id !== id));
    } catch (error) {
      console.error('Error deleting structure:', error);
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
        console.error('Error adding category:', error);
        return;
      }

      if (data) {
        const formattedCategory: Category = {
          id: data.id,
          label: data.label,
          icon: data.icon
        };
        setCategories(prev => [...prev, formattedCategory]);
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const updateCategory = async (id: string, updatedCategory: Partial<Category>) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .update({
          label: updatedCategory.label,
          icon: updatedCategory.icon
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating category:', error);
        return;
      }

      if (data) {
        const formattedCategory: Category = {
          id: data.id,
          label: data.label,
          icon: data.icon
        };
        setCategories(prev => 
          prev.map(category => 
            category.id === id ? formattedCategory : category
          )
        );
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting category:', error);
        return;
      }

      setCategories(prev => prev.filter(category => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
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
        console.error('Error adding carousel photo:', error);
        return;
      }

      if (data) {
        const formattedPhoto: CarouselPhoto = {
          id: data.id,
          url: data.url,
          alt: data.alt,
          title: data.title || undefined,
          location: data.location || undefined,
          order: data.order_position
        };
        setCarouselPhotos(prev => [...prev, formattedPhoto].sort((a, b) => a.order - b.order));
      }
    } catch (error) {
      console.error('Error adding carousel photo:', error);
    }
  };

  const updateCarouselPhoto = async (id: string, updatedPhoto: Partial<CarouselPhoto>) => {
    try {
      const { data, error } = await supabase
        .from('carousel_photos')
        .update({
          url: updatedPhoto.url,
          alt: updatedPhoto.alt,
          title: updatedPhoto.title,
          location: updatedPhoto.location,
          order_position: updatedPhoto.order
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating carousel photo:', error);
        return;
      }

      if (data) {
        const formattedPhoto: CarouselPhoto = {
          id: data.id,
          url: data.url,
          alt: data.alt,
          title: data.title || undefined,
          location: data.location || undefined,
          order: data.order_position
        };
        setCarouselPhotos(prev => 
          prev.map(photo => 
            photo.id === id ? formattedPhoto : photo
          ).sort((a, b) => a.order - b.order)
        );
      }
    } catch (error) {
      console.error('Error updating carousel photo:', error);
    }
  };

  const deleteCarouselPhoto = async (id: string) => {
    try {
      const { error } = await supabase
        .from('carousel_photos')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting carousel photo:', error);
        return;
      }

      setCarouselPhotos(prev => prev.filter(photo => photo.id !== id));
    } catch (error) {
      console.error('Error deleting carousel photo:', error);
    }
  };

  const reorderCarouselPhotos = async (photos: CarouselPhoto[]) => {
    try {
      // Mettre à jour l'ordre de toutes les photos
      const updates = photos.map((photo, index) => 
        supabase
          .from('carousel_photos')
          .update({ order_position: index + 1 })
          .eq('id', photo.id)
      );

      await Promise.all(updates);
      
      // Mettre à jour l'état local
      const updatedPhotos = photos.map((photo, index) => ({
        ...photo,
        order: index + 1
      }));
      
      setCarouselPhotos(updatedPhotos);
    } catch (error) {
      console.error('Error reordering carousel photos:', error);
    }
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