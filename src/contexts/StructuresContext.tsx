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

const initialCategories: Category[] = [
  { id: 'a1b2c3d4-e5f6-4890-a234-567890abcdef', label: 'Location gonflable', icon: 'circus' },
  { id: 'b2c3d4e5-f6a7-4801-a345-678901bcdefb', label: 'Évènementiel', icon: 'theater' },
  { id: 'c3d4e5f6-a7b8-4012-a456-789012cdefab', label: 'Gourmandises', icon: 'candy' },
];

const initialCarouselPhotos: CarouselPhoto[] = [
  { id: 'd4e5f6a7-b8c9-4123-a567-890123defabc', url: 'https://i.imgur.com/kA2Secn.png', alt: 'Structure gonflable 1', title: 'Anniversaire Magique', location: 'Paris 15ème', order: 1 },
  { id: 'e5f6a7b8-c9d0-4234-a678-901234efabcd', url: 'https://i.imgur.com/yj3D8xk.png', alt: 'Structure gonflable 2', title: 'Fête d\'École', location: 'Boulogne-Billancourt', order: 2 },
  { id: 'f6a7b8c9-d0e1-4345-a789-012345fabcde', url: 'https://i.imgur.com/eJrSzxS.png', alt: 'Structure gonflable 3', title: 'Kermesse Paroissiale', location: 'Versailles', order: 3 },
  { id: 'a7b8c9d0-e1f2-4456-a890-123456abcdef', url: 'https://i.imgur.com/PpYERbM.png', alt: 'Structure gonflable 4', title: 'Team Building', location: 'La Défense', order: 4 },
  { id: 'b8c9d0e1-f2a3-4567-a901-234567bcdefb', url: 'https://i.imgur.com/AdHVFs4.png', alt: 'Structure gonflable 5', title: 'Mariage Champêtre', location: 'Fontainebleau', order: 5 },
  { id: 'c9d0e1f2-a3b4-4678-a012-345678cdefab', url: 'https://i.imgur.com/6qMhuOF.png', alt: 'Structure gonflable 6', title: 'Fête de Quartier', location: 'Créteil', order: 6 },
];

const initialStructures: Structure[] = [
  {
    id: '10203040-5060-4789-a123-456789abcdef',
    name: 'Instables Gladiateurs',
    category: 'a1b2c3d4-e5f6-4890-a234-567890abcdef',
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
    id: '20304050-6070-4890-a234-567890bcdefb',
    name: 'Château Cirque',
    category: 'a1b2c3d4-e5f6-4890-a234-567890abcdef',
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
    id: '30405060-7080-4901-a345-678901cdefab',
    name: 'Multiplay Jurassic World',
    category: 'a1b2c3d4-e5f6-4890-a234-567890abcdef',
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
    id: '40506070-8090-4012-a456-789012defabc',
    name: 'Le Monde Marin',
    category: 'a1b2c3d4-e5f6-4890-a234-567890abcdef',
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
    id: '50607080-9010-4123-a567-890123efabcd',
    name: 'Sumo adulte',
    category: 'a1b2c3d4-e5f6-4890-a234-567890abcdef',
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
    id: '60708090-1020-4234-a678-901234fabcde',
    name: 'Machine à coup de poing',
    category: 'a1b2c3d4-e5f6-4890-a234-567890abcdef',
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
    id: '70809010-2030-4345-a789-012345abcdef',
    name: 'Pêche aux canards',
    category: 'a1b2c3d4-e5f6-4890-a234-567890abcdef',
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
    id: '80901020-3040-4456-a890-123456bcdefb',
    name: 'Piscine à balles',
    category: 'a1b2c3d4-e5f6-4890-a234-567890abcdef',
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
    id: '90102030-4050-4567-a901-234567cdefab',
    name: 'Sumo enfant',
    category: 'a1b2c3d4-e5f6-4890-a234-567890abcdef',
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
    id: '01020304-0506-4678-a012-345678defabc',
    name: 'Machine à Barbe à Papa',
    category: 'c3d4e5f6-a7b8-4012-a456-789012cdefab',
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
    id: '11213141-5161-4789-a123-456789efabcd',
    name: 'Machine à pop-corn',
    category: 'c3d4e5f6-a7b8-4012-a456-789012cdefab',
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
    id: '21314151-6171-4890-a234-567890fabcde',
    name: 'Machine à gaufres',
    category: 'c3d4e5f6-a7b8-4012-a456-789012cdefab',
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
    id: '31415161-7181-4901-a345-678901abcdef',
    name: 'Machine à crêpes',
    category: 'c3d4e5f6-a7b8-4012-a456-789012cdefab',
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
    id: '41516171-8191-4012-a456-789012bcdefb',
    name: 'Magicien',
    category: 'b2c3d4e5-f6a7-4801-a345-678901bcdefb',
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
    id: '51617181-9101-4123-a567-890123cdefab',
    name: 'Sculpteur de ballons',
    category: 'b2c3d4e5-f6a7-4801-a345-678901bcdefb',
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
    id: '61718191-0111-4234-a678-901234defabc',
    name: 'Maquilleuse',
    category: 'b2c3d4e5-f6a7-4801-a345-678901bcdefb',
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
    id: '71819101-1121-4345-a789-012345efabcd',
    name: 'Mascotte',
    category: 'b2c3d4e5-f6a7-4801-a345-678901bcdefb',
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
  const [loading, setLoading] = useState(true);

  // Charger les données depuis Supabase
  React.useEffect(() => {
    const loadData = async () => {
      try {
        console.log('🔄 Chargement des données depuis Supabase...');
        
        // Charger les catégories
        console.log('📂 Chargement des catégories...');
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('categories')
          .select('*')
          .order('label');

        if (categoriesError) {
          console.error('❌ Erreur chargement catégories:', categoriesError.message);
          setCategories(initialCategories);
        } else {
          console.log('✅ Catégories chargées:', categoriesData?.length || 0);
          if (categoriesData && categoriesData.length > 0) {
            const mappedCategories: Category[] = categoriesData.map(cat => ({
              id: cat.id,
              label: cat.label,
              icon: cat.icon
            }));
            setCategories(mappedCategories);
          } else {
            console.log('⚠️ Aucune catégorie trouvée - Utilisez la migration SQL');
            setCategories(initialCategories);
          }
        }

        // Charger les structures
        console.log('🏗️ Chargement des structures...');
        const { data: structuresData, error: structuresError } = await supabase
          .from('structures')
          .select('*')
          .order('name');

        if (structuresError) {
          console.error('❌ Erreur chargement structures:', structuresError.message);
          setStructures(initialStructures);
        } else {
          console.log('✅ Structures chargées:', structuresData?.length || 0);
          if (structuresData && structuresData.length > 0) {
            const mappedStructures: Structure[] = structuresData.map(struct => ({
              id: struct.id,
              name: struct.name,
              category: struct.category_id,
              size: struct.size,
              capacity: struct.capacity,
              age: struct.age,
              price: struct.price,
              price2Days: struct.price_2_days || undefined,
              maxWeight: struct.max_weight || undefined,
              services: struct.services || undefined,
              image: struct.image,
              description: struct.description,
              available: struct.available
            }));
            setStructures(mappedStructures);
          } else {
            console.log('⚠️ Aucune structure trouvée - Utilisez la migration SQL');
            setStructures(initialStructures);
          }
        }

        // Charger les photos du carrousel
        console.log('📸 Chargement des photos...');
        const { data: photosData, error: photosError } = await supabase
          .from('carousel_photos')
          .select('*')
          .order('order_position');

        if (photosError) {
          console.error('❌ Erreur chargement photos:', photosError.message);
          setCarouselPhotos(initialCarouselPhotos);
        } else {
          console.log('✅ Photos chargées:', photosData?.length || 0);
          if (photosData && photosData.length > 0) {
            const mappedPhotos: CarouselPhoto[] = photosData.map(photo => ({
              id: photo.id,
              url: photo.url,
              alt: photo.alt,
              title: photo.title || undefined,
              location: photo.location || undefined,
              order: photo.order_position
            }));
            setCarouselPhotos(mappedPhotos);
          } else {
            console.log('⚠️ Aucune photo trouvée - Utilisez la migration SQL');
            setCarouselPhotos(initialCarouselPhotos);
          }
        }

      } catch (error) {
        console.error('❌ Erreur générale:', error);
        console.log('📋 Utilisation des données par défaut');
        setCategories(initialCategories);
        setStructures(initialStructures);
        setCarouselPhotos(initialCarouselPhotos);
      } finally {
        console.log('🏁 Chargement terminé');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const addStructure = (newStructure: Omit<Structure, 'id'>) => {
    const addToSupabase = async () => {
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
            price_2_days: newStructure.price2Days || null,
            max_weight: newStructure.maxWeight || null,
            services: newStructure.services || null,
            image: newStructure.image,
            description: newStructure.description,
            available: newStructure.available
          })
          .select()
          .single();

        if (error) throw error;

        const structure: Structure = {
          id: data.id,
          name: data.name,
          category: data.category_id,
          size: data.size,
          capacity: data.capacity,
          age: data.age,
          price: data.price,
          price2Days: data.price_2_days || undefined,
          maxWeight: data.max_weight || undefined,
          services: data.services || undefined,
          image: data.image,
          description: data.description,
          available: data.available
        };
        setStructures(prev => [...prev, structure]);
      } catch (error) {
        console.error('Error adding structure:', error);
      }
    };

    addToSupabase();
  };

  const updateStructure = (id: string, updatedStructure: Partial<Structure>) => {
    const updateInSupabase = async () => {
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
        if (updatedStructure.description !== undefined) updateData.description = updatedStructure.description;
        if (updatedStructure.available !== undefined) updateData.available = updatedStructure.available;

        const { error } = await supabase
          .from('structures')
          .update(updateData)
          .eq('id', id);

        if (error) throw error;

        setStructures(prev => 
          prev.map(structure => 
            structure.id === id ? { ...structure, ...updatedStructure } : structure
          )
        );
      } catch (error) {
        console.error('Error updating structure:', error);
      }
    };

    updateInSupabase();
  };

  const deleteStructure = (id: string) => {
    const deleteFromSupabase = async () => {
      try {
        const { error } = await supabase
          .from('structures')
          .delete()
          .eq('id', id);

        if (error) throw error;

        setStructures(prev => prev.filter(structure => structure.id !== id));
      } catch (error) {
        console.error('Error deleting structure:', error);
      }
    };

    deleteFromSupabase();
  };

  const addCategory = (newCategory: Omit<Category, 'id'>) => {
    const addToSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .insert({
            label: newCategory.label,
            icon: newCategory.icon
          })
          .select()
          .single();

        if (error) throw error;

        const category: Category = {
          id: data.id,
          label: data.label,
          icon: data.icon
        };
        setCategories(prev => [...prev, category]);
      } catch (error) {
        console.error('Error adding category:', error);
      }
    };

    addToSupabase();
  };

  const updateCategory = (id: string, updatedCategory: Partial<Category>) => {
    const updateInSupabase = async () => {
      try {
        const updateData: any = {};
        if (updatedCategory.label !== undefined) updateData.label = updatedCategory.label;
        if (updatedCategory.icon !== undefined) updateData.icon = updatedCategory.icon;

        const { error } = await supabase
          .from('categories')
          .update(updateData)
          .eq('id', id);

        if (error) throw error;

        setCategories(prev => 
          prev.map(category => 
            category.id === id ? { ...category, ...updatedCategory } : category
          )
        );
      } catch (error) {
        console.error('Error updating category:', error);
      }
    };

    updateInSupabase();
  };

  const deleteCategory = (id: string) => {
    const deleteFromSupabase = async () => {
      try {
        const { error } = await supabase
          .from('categories')
          .delete()
          .eq('id', id);

        if (error) throw error;

        setCategories(prev => prev.filter(category => category.id !== id));
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    };

    deleteFromSupabase();
  };

  const addCarouselPhoto = (newPhoto: Omit<CarouselPhoto, 'id'>) => {
    const addToSupabase = async () => {
      try {
        const { data, error } = await supabase
          .from('carousel_photos')
          .insert({
            url: newPhoto.url,
            alt: newPhoto.alt,
            title: newPhoto.title || null,
            location: newPhoto.location || null,
            order_position: newPhoto.order
          })
          .select()
          .single();

        if (error) throw error;

        const photo: CarouselPhoto = {
          id: data.id,
          url: data.url,
          alt: data.alt,
          title: data.title || undefined,
          location: data.location || undefined,
          order: data.order_position
        };
        setCarouselPhotos(prev => [...prev, photo].sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error('Error adding carousel photo:', error);
      }
    };

    addToSupabase();
  };

  const updateCarouselPhoto = (id: string, updatedPhoto: Partial<CarouselPhoto>) => {
    const updateInSupabase = async () => {
      try {
        const updateData: any = {};
        if (updatedPhoto.url !== undefined) updateData.url = updatedPhoto.url;
        if (updatedPhoto.alt !== undefined) updateData.alt = updatedPhoto.alt;
        if (updatedPhoto.title !== undefined) updateData.title = updatedPhoto.title;
        if (updatedPhoto.location !== undefined) updateData.location = updatedPhoto.location;
        if (updatedPhoto.order !== undefined) updateData.order_position = updatedPhoto.order;

        const { error } = await supabase
          .from('carousel_photos')
          .update(updateData)
          .eq('id', id);

        if (error) throw error;

        setCarouselPhotos(prev => 
          prev.map(photo => 
            photo.id === id ? { ...photo, ...updatedPhoto } : photo
          ).sort((a, b) => a.order - b.order)
        );
      } catch (error) {
        console.error('Error updating carousel photo:', error);
      }
    };

    updateInSupabase();
  };

  const deleteCarouselPhoto = (id: string) => {
    const deleteFromSupabase = async () => {
      try {
        const { error } = await supabase
          .from('carousel_photos')
          .delete()
          .eq('id', id);

        if (error) throw error;

        setCarouselPhotos(prev => prev.filter(photo => photo.id !== id));
      } catch (error) {
        console.error('Error deleting carousel photo:', error);
      }
    };

    deleteFromSupabase();
  };

  const reorderCarouselPhotos = (photos: CarouselPhoto[]) => {
    const updateOrderInSupabase = async () => {
      try {
        // Mettre à jour l'ordre de toutes les photos
        const updates = photos.map((photo, index) => 
          supabase
            .from('carousel_photos')
            .update({ order_position: index + 1 })
            .eq('id', photo.id)
        );

        await Promise.all(updates);
        
        // Mettre à jour l'état local avec les nouveaux ordres
        const updatedPhotos = photos.map((photo, index) => ({
          ...photo,
          order: index + 1
        }));
        setCarouselPhotos(updatedPhotos);
      } catch (error) {
        console.error('Error reordering carousel photos:', error);
      }
    };

    updateOrderInSupabase();
  };

  if (loading) {
    return (
      <StructuresContext.Provider value={{ 
        structures: [], 
        categories: [], 
        carouselPhotos: [],
        addStructure: () => {}, 
        updateStructure: () => {}, 
        deleteStructure: () => {},
        addCategory: () => {},
        updateCategory: () => {},
        deleteCategory: () => {},
        addCarouselPhoto: () => {},
        updateCarouselPhoto: () => {},
        deleteCarouselPhoto: () => {},
        reorderCarouselPhotos: () => {}
      }}>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement des données...</p>
          </div>
        </div>
      </StructuresContext.Provider>
    );
  }

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