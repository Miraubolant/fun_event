import React, { createContext, useContext, useState, ReactNode } from 'react';
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

const initialCategories: Category[] = [
  { id: 'gonflable', label: 'Location gonflable', icon: '🎪' },
  { id: 'evenementiel', label: 'Évènementiel', icon: '🎭' },
  { id: 'gourmandises', label: 'Gourmandises', icon: '🍭' },
];

const initialCarouselPhotos: CarouselPhoto[] = [
  { id: '1', url: 'https://i.imgur.com/kA2Secn.png', alt: 'Structure gonflable 1', order: 1 },
  { id: '2', url: 'https://i.imgur.com/yj3D8xk.png', alt: 'Structure gonflable 2', order: 2 },
  { id: '3', url: 'https://i.imgur.com/eJrSzxS.png', alt: 'Structure gonflable 3', order: 3 },
  { id: '4', url: 'https://i.imgur.com/PpYERbM.png', alt: 'Structure gonflable 4', order: 4 },
  { id: '5', url: 'https://i.imgur.com/AdHVFs4.png', alt: 'Structure gonflable 5', order: 5 },
  { id: '6', url: 'https://i.imgur.com/6qMhuOF.png', alt: 'Structure gonflable 6', order: 6 },
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
  },
  {
    id: '4',
    name: 'Le Monde Marin',
    category: 'gonflable',
    size: '3,8m x 9,5m x 5,80m',
    capacity: '8 personnes max',
    age: '3-77 ans',
    price: 180,
    maxWeight: 210,
    services: 'Conforme EN 14960, Livraison 7 jours / 7 jours, Enrouleurs électrique inclus, Structures nettoyées entre chaque location',
    image: 'https://i.imgur.com/bnFv4OP.png',
    description: 'Un parcours d\'obstacles marin pour des événements inoubliables !\n\nOffrez à vos petits aventuriers un voyage sous-marin rempli de fun et de défis avec notre parcours gonflable Monde Marin de 9 mètres de long ! Cette structure gonflable originale propose une série d\'obstacles ludiques qui permettront aux enfants de se défouler tout en explorant un univers aquatique fascinant.\n\nLes enfants devront courir, sauter, grimper et ramper à travers des obstacles marins colorés et réalistes, tous inspirés par le monde sous-marin. Avec des objets en 3D tels que des poissons, des vagues et des créatures marines, cette attraction plonge les participants dans une aventure palpitante, où chaque mouvement est une nouvelle découverte.\n\nIdéale pour tous types d\'événements, que ce soit des anniversaires, des fêtes d\'école ou des animations en extérieur, le parcours Monde Marin garantit de nombreux sourires et des heures de divertissement. Faites de chaque fête un moment unique avec cette structure gonflable pleine de surprises !',
    available: true
  },
  {
    id: '5',
    name: 'Sumo adulte',
    category: 'gonflable',
    size: 'Tapis : 25m²',
    capacity: '2 personnes max',
    age: '3-77 ans',
    price: 120,
    maxWeight: 100,
    services: 'Livraison 7 jours / 7 jours, Enrouleurs électrique inclus, Structures nettoyées entre chaque location',
    image: 'https://i.imgur.com/IiQCoo8.png',
    description: '👊 Combat de Sumos – Fous rires garantis ! 🤩\n\nEnvie d\'une animation 100 % fun et délirante pour votre événement ? Le combat de sumos est fait pour vous ! 😆\n\nRegardez deux adultes (ou enfants !) en énormes costumes de sumo s\'affronter dans un duel aussi hilarant à jouer qu\'à regarder ! Fou rires et ambiance festive assurés ! 🎭\n\n🔥 Pourquoi choisir notre animation sumo ?\n\n✅ Un jeu ultra-ludique : Le but ? Faire tomber son adversaire ou le pousser hors du tapis ! 💥\n✅ Des costumes XXL de qualité : Indéchirables, imperméables et remplis de mousse pour un confort et une sécurité optimaux (sans souffleur nécessaire).\n✅ Parfait pour tous vos événements : Anniversaires, team building, kermesses, fêtes privées… 🥳\n✅ Fous rires garantis : Que vous soyez sur le ring ou simple spectateur, le spectacle est inoubliable !\n📅 Réservez dès maintenant et mettez du fun dans votre événement !',
    available: true
  },
  {
    id: '6',
    name: 'Machine à coup de poing',
    category: 'gonflable',
    size: '1,2m x 0,7m x 2,1m',
    capacity: '1 personne max',
    age: '3-77 ans',
    price: 80,
    maxWeight: 145,
    services: 'Conforme EN 14960, Livraison 7 jours / 7 jours, Enrouleurs électrique inclus, Structures nettoyées entre chaque location',
    image: 'https://i.imgur.com/pT0UHhG.png',
    description: 'Prêt à relever le défi de la machine à coup de poing ?\nMontrez ce que vous avez dans les bras et testez votre force en toute convivialité !\n\nVos amis et les autres participants sont là pour jouer… mais qui obtiendra le meilleur score ?\nPas besoin d\'être un boxeur pro, l\'essentiel c\'est de s\'amuser et de tenter le KO parfait !\n\nUn jeu fun, accessible à tous, pour rire, se défier et partager un bon moment !\nAlors, qui frappera le plus fort cette fois ?',
    available: true
  },
  {
    id: '7',
    name: 'Pêche aux canards',
    category: 'gonflable',
    size: '1,5m x 3,4m x 1,3m',
    capacity: '12 personnes max',
    age: '3-77 ans',
    price: 60,
    maxWeight: 30,
    services: 'Conforme EN 14960, Livraison 7 jours / 7 jours, Enrouleurs électrique inclus, Structures nettoyées entre chaque location',
    image: 'https://i.imgur.com/o750EVP.png',
    description: 'La pêche aux canards : un grand classique qui fait toujours plaisir !\n\nUne activité ludique et amusante, idéale pour les plus petits. En plus de les divertir, elle leur permet de développer leur adresse tout en s\'amusant.\n\nLe but ? Attraper les canards le plus vite possible à l\'aide d\'une canne à pêche, et tenter de battre ses amis dans la bonne humeur !\n\nLe circuit fonctionne avec de l\'eau, pour une animation encore plus réaliste',
    available: true
  },
  {
    id: '8',
    name: 'Piscine à balles',
    category: 'gonflable',
    size: '4,4m x 3,5m x 2,4m',
    capacity: '12 personnes max',
    age: '3-77 ans',
    price: 90,
    maxWeight: 70,
    services: 'Livraison 7 jours / 7 jours, Enrouleurs électrique inclus, Structures nettoyées entre chaque location',
    image: 'https://i.imgur.com/bWxOi76.png',
    description: 'Un rêve d\'enfant devenu réalité !\nSauter, plonger, s\'amuser dans une piscine remplie de balles colorées… c\'est le bonheur garanti !\n\nOffrez-leur ce plaisir simple et magique en installant notre boîte à balles gonflable lors d\'un anniversaire, d\'une fête ou de tout autre événement festif.\n\nParfaite en intérieur comme en extérieur, cette activité ludique promet des moments inoubliables, remplis de rires et de couleurs.',
    available: true
  },
  {
    id: '9',
    name: 'Sumo enfant',
    category: 'gonflable',
    size: 'Tapis : 25m²',
    capacity: '2 personnes max',
    age: '3-77 ans',
    price: 100,
    maxWeight: 100,
    services: 'Livraison 7 jours / 7 jours, Enrouleurs électrique inclus, Structures nettoyées entre chaque location',
    image: 'https://i.imgur.com/0XCSWRh.png',
    description: '👊 Combat de Sumos – Fous rires garantis ! 🤩\n\nEnvie d\'une animation 100 % fun et délirante pour votre événement ? Le combat de sumos est fait pour vous ! 😆\n\nRegardez deux adultes (ou enfants !) en énormes costumes de sumo s\'affronter dans un duel aussi hilarant à jouer qu\'à regarder ! Fou rires et ambiance festive assurés ! 🎭\n\n🔥 Pourquoi choisir notre animation sumo ?\n\n✅ Un jeu ultra-ludique : Le but ? Faire tomber son adversaire ou le pousser hors du tapis ! 💥\n✅ Des costumes XXL de qualité : Indéchirables, imperméables et remplis de mousse pour un confort et une sécurité optimaux (sans souffleur nécessaire).\n✅ Parfait pour tous vos événements : Anniversaires, team building, kermesses, fêtes privées… 🥳\n✅ Fous rires garantis : Que vous soyez sur le ring ou simple spectateur, le spectacle est inoubliable !\n📅 Réservez dès maintenant et mettez du fun dans votre événement !',
    available: true
  },
  // Catégorie Gourmandises
  {
    id: '10',
    name: 'Machine à Barbe à Papa',
    category: 'gourmandises',
    size: 'Machine professionnelle',
    capacity: 'Illimité',
    age: 'Tous âges',
    price: 50,
    services: 'Livraison 7 jours / 7 jours, Machine nettoyée entre chaque location',
    image: 'https://i.imgur.com/CNVQPx9.png',
    description: 'Plongez en enfance et régalez vos invités avec notre machine à barbe à papa professionnelle ! En quelques instants, créez de délicieuses barbes à papa qui émerveilleront petits et grands.',
    available: true
  },
  {
    id: '11',
    name: 'Machine à pop-corn',
    category: 'gourmandises',
    size: 'Machine professionnelle',
    capacity: 'Illimité',
    age: 'Tous âges',
    price: 50,
    services: 'Livraison 7 jours / 7 jours, Machine nettoyée entre chaque location',
    image: 'https://i.imgur.com/noA5nmd.png',
    description: 'Offrez aux enfants un moment de purement magique et fun avec notre château gonflable sur le thème du cirque !',
    available: true
  },
  {
    id: '12',
    name: 'Machine à gaufres',
    category: 'gourmandises',
    size: 'Machine professionnelle',
    capacity: 'Illimité',
    age: 'Tous âges',
    price: 60,
    services: 'Livraison 7 jours / 7 jours, Machine nettoyée entre chaque location',
    image: 'https://i.imgur.com/fHdP8HH.png',
    description: 'Offrez à vos invités une expérience inoubliable en les plongeant au cœur de l\'ère préhistorique avec la structure gonflable Multiplay Jurassic World.',
    available: true
  },
  {
    id: '13',
    name: 'Machine à crêpes',
    category: 'gourmandises',
    size: 'Machine professionnelle',
    capacity: 'Illimité',
    age: 'Tous âges',
    price: 60,
    services: 'Livraison 7 jours / 7 jours, Machine nettoyée entre chaque location',
    image: 'https://i.imgur.com/SM4tkzP.png',
    description: 'Offrez à vos petits aventuriers un voyage sous-marin rempli de fun et de défis avec notre parcours gonflable Monde Marin de 9 mètres de long !',
    available: true
  },
  // Catégorie Évènementiel
  {
    id: '14',
    name: 'Magicien',
    category: 'evenementiel',
    size: 'Prestation sur mesure',
    capacity: 'Jusqu\'à 50 personnes',
    age: 'Tous âges',
    price: 0, // Sur devis
    services: 'Prestation personnalisée, Matériel inclus, Déplacement en Île-de-France',
    image: 'https://i.imgur.com/kTXIuZD.png',
    description: 'Émerveillez vos invités avec un spectacle de magie professionnel ! Notre magicien expérimenté propose des tours adaptés à tous les âges, des illusions fascinantes aux numéros interactifs. Parfait pour anniversaires, événements d\'entreprise et fêtes familiales.',
    available: true
  },
  {
    id: '15',
    name: 'Sculpteur de ballons',
    category: 'evenementiel',
    size: 'Animation mobile',
    capacity: 'Jusqu\'à 30 enfants/heure',
    age: '3-12 ans',
    price: 0, // Sur devis
    services: 'Ballons fournis, Animation personnalisée, Créations à emporter',
    image: 'https://imgur.com/sTAtBdS.png',
    description: 'Transformez des ballons en œuvres d\'art ! Notre sculpteur professionnel crée en direct des animaux, fleurs et personnages qui raviront les enfants. Chaque création devient un souvenir unique de votre événement.',
    available: true
  },
  {
    id: '16',
    name: 'Maquilleuse',
    category: 'evenementiel',
    size: 'Poste de maquillage',
    capacity: '15-20 enfants/heure',
    age: '3-12 ans',
    price: 0, // Sur devis
    services: 'Maquillage hypoallergénique, Matériel professionnel, Designs variés',
    image: 'https://i.imgur.com/k59vJoX.png',
    description: 'Transformez les enfants en leurs héros préférés ! Notre maquilleuse professionnelle utilise des produits sûrs et hypoallergéniques pour créer des maquillages fantastiques : animaux, super-héros, princesses et bien plus encore.',
    available: true
  },
  {
    id: '17',
    name: 'Mascotte',
    category: 'evenementiel',
    size: 'Animation interactive',
    capacity: 'Tous publics',
    age: 'Tous âges',
    price: 0, // Sur devis
    services: 'Costume professionnel, Animation personnalisée, Photos souvenirs',
    image: 'https://i.imgur.com/Rq9gyt0.png',
    description: 'Donnez vie à votre événement avec nos mascottes colorées ! Nos animateurs professionnels en costume créent une ambiance festive inoubliable avec danses, jeux et interactions qui raviront petits et grands.',
    available: true
  }
];

export const StructuresProvider: React.FC<StructuresProviderProps> = ({ children }) => {
  const [structures, setStructures] = useState<Structure[]>(initialStructures);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [carouselPhotos, setCarouselPhotos] = useState<CarouselPhoto[]>(initialCarouselPhotos);

  const addStructure = (newStructure: Omit<Structure, 'id'>) => {
    const structure: Structure = {
      ...newStructure,
      id: Date.now().toString()
    };
    setStructures(prev => [...prev, structure]);
  };

  const updateStructure = (id: string, updatedStructure: Partial<Structure>) => {
    setStructures(prev => 
      prev.map(structure => 
        structure.id === id ? { ...structure, ...updatedStructure } : structure
      )
    );
  };

  const deleteStructure = (id: string) => {
    setStructures(prev => prev.filter(structure => structure.id !== id));
  };

  const addCategory = (newCategory: Omit<Category, 'id'>) => {
    const category: Category = {
      ...newCategory,
      id: Date.now().toString()
    };
    setCategories(prev => [...prev, category]);
  };

  const updateCategory = (id: string, updatedCategory: Partial<Category>) => {
    setCategories(prev => 
      prev.map(category => 
        category.id === id ? { ...category, ...updatedCategory } : category
      )
    );
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  };

  const addCarouselPhoto = (newPhoto: Omit<CarouselPhoto, 'id'>) => {
    const photo: CarouselPhoto = {
      ...newPhoto,
      id: Date.now().toString()
    };
    setCarouselPhotos(prev => [...prev, photo].sort((a, b) => a.order - b.order));
  };

  const updateCarouselPhoto = (id: string, updatedPhoto: Partial<CarouselPhoto>) => {
    setCarouselPhotos(prev => 
      prev.map(photo => 
        photo.id === id ? { ...photo, ...updatedPhoto } : photo
      ).sort((a, b) => a.order - b.order)
    );
  };

  const deleteCarouselPhoto = (id: string) => {
    setCarouselPhotos(prev => prev.filter(photo => photo.id !== id));
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