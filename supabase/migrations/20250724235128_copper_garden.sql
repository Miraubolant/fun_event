-- Migration sans emojis pour éviter les problèmes d'encodage
-- Nettoyage des données existantes
DELETE FROM structures;
DELETE FROM categories;
DELETE FROM carousel_photos;

-- Insertion des catégories
INSERT INTO categories (id, label, icon) VALUES
(gen_random_uuid(), 'Location gonflable', 'circus'),
(gen_random_uuid(), 'Evenementiel', 'theater'),
(gen_random_uuid(), 'Gourmandises', 'candy')
ON CONFLICT DO NOTHING;

-- Insertion des structures
INSERT INTO structures (id, name, category_id, size, capacity, age, price, price_2_days, max_weight, services, image, description, available)
SELECT 
  gen_random_uuid(),
  'Instables Gladiateurs',
  c.id,
  '7,7m x 6,6m x 1,5m',
  '2 personnes max',
  '3-77 ans',
  180,
  NULL,
  100,
  'Livraison 7 jours / 7 jours, Enrouleurs electrique inclus, Structures nettoyees entre chaque location',
  'https://i.imgur.com/fLqAlJ1.png',
  'Entrez dans l''arene et relevez le defi des gladiateurs ! Affrontez vos amis, votre famille ou vos collegues dans un duel d''equilibre et de strategie ! Sur cette plateforme gonflable, les gladiateurs doivent se battre pour rester debout tout en tentant de desequilibrer leur adversaire. Un jeu fun et competitif : testez votre agilite, votre force et votre ruse pour triompher. Une animation garantie : fous rires et suspense assures pour les joueurs comme pour les spectateurs ! Ideal pour tous vos evenements : anniversaires, team-building, kermesses, enterrements de vie de celibataire... Qui restera le dernier debout ? Montez sur la plateforme et prouvez que vous etes le veritable champion des gladiateurs ! Reservez des maintenant pour un maximum de fun et de defis !',
  true
FROM categories c 
WHERE c.label = 'Location gonflable';

INSERT INTO structures (id, name, category_id, size, capacity, age, price, price_2_days, max_weight, services, image, description, available)
SELECT 
  gen_random_uuid(),
  'Chateau Cirque',
  c.id,
  '3,8m x 2,8m x 2,8m',
  '12 personnes max',
  '3-77 ans',
  150,
  NULL,
  70,
  'Conforme EN 14960, Livraison 7 jours / 7 jours, Enrouleurs electrique inclus, Structures nettoyees entre chaque location',
  'https://i.imgur.com/XcGSPl6.png',
  'Toute la Magie du Cirque dans un Chateau Gonflable ! Offrez aux enfants un moment de purement magique et fun avec notre chateau gonflable sur le theme du cirque ! Ils pourront sauter, bondir, faire des galipettes et des cabrioles dans un espace entierement securise, rempli de multiples obstacles gonfles pour encore plus de defis et d''amusement ! Un veritable parc d''attractions miniature : Obstacles, espaces de saut et un super toboggan pour une sortie spectaculaire ! Securite optimale : Concu pour les jeunes enfants avec des materiaux resistants et un sol amortissant. Un univers captivant : Plongez dans l''ambiance magique du cirque et laissez les enfants devenir de vrais petits acrobates ! Parfait pour tous vos evenements : Anniversaires, fetes d''ecole, kermesses, evenements prives... Ajoutez une touche de magie a votre evenement, reservez des maintenant !',
  true
FROM categories c 
WHERE c.label = 'Location gonflable';

INSERT INTO structures (id, name, category_id, size, capacity, age, price, price_2_days, max_weight, services, image, description, available)
SELECT 
  gen_random_uuid(),
  'Multiplay Jurassic World',
  c.id,
  '5m x 5,5m x 4,30m',
  '12 personnes max',
  '3-77 ans',
  200,
  NULL,
  160,
  'Conforme EN 14960, Livraison 7 jours / 7 jours, Enrouleurs electrique inclus, Structures nettoyees entre chaque location',
  'https://i.imgur.com/dyYum3x.png',
  'Partez a l''aventure avec la structure gonflable Multiplay Jurassic World. Offrez a vos invites une experience inoubliable en les plongeant au coeur de l''ere prehistorique avec la structure gonflable Multiplay Jurassic World. Inspiree de l''univers fascinant des dinosaures, cette structure gonflable unique vous invite a explorer un monde jurassique peuple de creatures gigantesques et d''aventures palpitantes. Imaginez un decor spectaculaire avec des dinosaures en 3D realistes et des obstacles colores qui captivent l''imagination des enfants. Avec son toboggan impressionnant, ses zones de jeu interactives et ses designs inspirants, la structure Multiplay Jurassic World permet aux petits aventuriers de sauter, grimper et glisser tout en decouvrant un univers prehistorique excitant.',
  true
FROM categories c 
WHERE c.label = 'Location gonflable';

INSERT INTO structures (id, name, category_id, size, capacity, age, price, price_2_days, max_weight, services, image, description, available)
SELECT 
  gen_random_uuid(),
  'Le Monde Marin',
  c.id,
  '3,8m x 9,5m x 5,80m',
  '8 personnes max',
  '3-77 ans',
  180,
  NULL,
  210,
  'Conforme EN 14960, Livraison 7 jours / 7 jours, Enrouleurs electrique inclus, Structures nettoyees entre chaque location',
  'https://i.imgur.com/bnFv4OP.png',
  'Un parcours d''obstacles marin pour des evenements inoubliables ! Offrez a vos petits aventuriers un voyage sous-marin rempli de fun et de defis avec notre parcours gonflable Monde Marin de 9 metres de long ! Cette structure gonflable originale propose une serie d''obstacles ludiques qui permettront aux enfants de se defouler tout en explorant un univers aquatique fascinant. Les enfants devront courir, sauter, grimper et ramper a travers des obstacles marins colores et realistes, tous inspires par le monde sous-marin. Avec des objets en 3D tels que des poissons, des vagues et des creatures marines, cette attraction plonge les participants dans une aventure palpitante, ou chaque mouvement est une nouvelle decouverte.',
  true
FROM categories c 
WHERE c.label = 'Location gonflable';

INSERT INTO structures (id, name, category_id, size, capacity, age, price, price_2_days, max_weight, services, image, description, available)
SELECT 
  gen_random_uuid(),
  'Sumo adulte',
  c.id,
  'Tapis : 25m²',
  '2 personnes max',
  '3-77 ans',
  120,
  NULL,
  100,
  'Livraison 7 jours / 7 jours, Enrouleurs electrique inclus, Structures nettoyees entre chaque location',
  'https://i.imgur.com/IiQCoo8.png',
  'Combat de Sumos - Fous rires garantis ! Envie d''une animation 100% fun et delirante pour votre evenement ? Le combat de sumos est fait pour vous ! Regardez deux adultes (ou enfants !) en enormes costumes de sumo s''affronter dans un duel aussi hilarant a jouer qu''a regarder ! Fou rires et ambiance festive assures ! Un jeu ultra-ludique : Le but ? Faire tomber son adversaire ou le pousser hors du tapis ! Des costumes XXL de qualite : Indechirables, impermeables et remplis de mousse pour un confort et une securite optimaux (sans souffleur necessaire). Parfait pour tous vos evenements : Anniversaires, team building, kermesses, fetes privees... Fous rires garantis : Que vous soyez sur le ring ou simple spectateur, le spectacle est inoubliable ! Reservez des maintenant et mettez du fun dans votre evenement !',
  true
FROM categories c 
WHERE c.label = 'Location gonflable';

INSERT INTO structures (id, name, category_id, size, capacity, age, price, price_2_days, max_weight, services, image, description, available)
SELECT 
  gen_random_uuid(),
  'Machine a coup de poing',
  c.id,
  '1,2m x 0,7m x 2,1m',
  '1 personne max',
  '3-77 ans',
  80,
  NULL,
  145,
  'Conforme EN 14960, Livraison 7 jours / 7 jours, Enrouleurs electrique inclus, Structures nettoyees entre chaque location',
  'https://i.imgur.com/pT0UHhG.png',
  'Pret a relever le defi de la machine a coup de poing ? Montrez ce que vous avez dans les bras et testez votre force en toute convivialite ! Vos amis et les autres participants sont la pour jouer... mais qui obtiendra le meilleur score ? Pas besoin d''etre un boxeur pro, l''essentiel c''est de s''amuser et de tenter le KO parfait ! Un jeu fun, accessible a tous, pour rire, se defier et partager un bon moment ! Alors, qui frappera le plus fort cette fois ?',
  true
FROM categories c 
WHERE c.label = 'Location gonflable';

INSERT INTO structures (id, name, category_id, size, capacity, age, price, price_2_days, max_weight, services, image, description, available)
SELECT 
  gen_random_uuid(),
  'Peche aux canards',
  c.id,
  '1,5m x 3,4m x 1,3m',
  '12 personnes max',
  '3-77 ans',
  60,
  NULL,
  30,
  'Conforme EN 14960, Livraison 7 jours / 7 jours, Enrouleurs electrique inclus, Structures nettoyees entre chaque location',
  'https://i.imgur.com/o750EVP.png',
  'La peche aux canards : un grand classique qui fait toujours plaisir ! Une activite ludique et amusante, ideale pour les plus petits. En plus de les divertir, elle leur permet de developper leur adresse tout en s''amusant. Le but ? Attraper les canards le plus vite possible a l''aide d''une canne a peche, et tenter de battre ses amis dans la bonne humeur ! Le circuit fonctionne avec de l''eau, pour une animation encore plus realiste',
  true
FROM categories c 
WHERE c.label = 'Location gonflable';

INSERT INTO structures (id, name, category_id, size, capacity, age, price, price_2_days, max_weight, services, image, description, available)
SELECT 
  gen_random_uuid(),
  'Piscine a balles',
  c.id,
  '4,4m x 3,5m x 2,4m',
  '12 personnes max',
  '3-77 ans',
  90,
  NULL,
  70,
  'Livraison 7 jours / 7 jours, Enrouleurs electrique inclus, Structures nettoyees entre chaque location',
  'https://i.imgur.com/bWxOi76.png',
  'Un reve d''enfant devenu realite ! Sauter, plonger, s''amuser dans une piscine remplie de balles colorees... c''est le bonheur garanti ! Offrez-leur ce plaisir simple et magique en installant notre boite a balles gonflable lors d''un anniversaire, d''une fete ou de tout autre evenement festif. Parfaite en interieur comme en exterieur, cette activite ludique promet des moments inoubliables, remplis de rires et de couleurs.',
  true
FROM categories c 
WHERE c.label = 'Location gonflable';

INSERT INTO structures (id, name, category_id, size, capacity, age, price, price_2_days, max_weight, services, image, description, available)
SELECT 
  gen_random_uuid(),
  'Sumo enfant',
  c.id,
  'Tapis : 25m²',
  '2 personnes max',
  '3-77 ans',
  100,
  NULL,
  100,
  'Livraison 7 jours / 7 jours, Enrouleurs electrique inclus, Structures nettoyees entre chaque location',
  'https://i.imgur.com/0XCSWRh.png',
  'Combat de Sumos - Fous rires garantis ! Envie d''une animation 100% fun et delirante pour votre evenement ? Le combat de sumos est fait pour vous ! Regardez deux adultes (ou enfants !) en enormes costumes de sumo s''affronter dans un duel aussi hilarant a jouer qu''a regarder ! Fou rires et ambiance festive assures ! Un jeu ultra-ludique : Le but ? Faire tomber son adversaire ou le pousser hors du tapis ! Des costumes XXL de qualite : Indechirables, impermeables et remplis de mousse pour un confort et une securite optimaux (sans souffleur necessaire). Parfait pour tous vos evenements : Anniversaires, team building, kermesses, fetes privees... Fous rires garantis : Que vous soyez sur le ring ou simple spectateur, le spectacle est inoubliable ! Reservez des maintenant et mettez du fun dans votre evenement !',
  true
FROM categories c 
WHERE c.label = 'Location gonflable';

-- Structures Gourmandises
INSERT INTO structures (id, name, category_id, size, capacity, age, price, price_2_days, max_weight, services, image, description, available)
SELECT 
  gen_random_uuid(),
  'Machine a Barbe a Papa',
  c.id,
  'Machine professionnelle',
  'Illimite',
  'Tous ages',
  50,
  NULL,
  NULL,
  'Livraison 7 jours / 7 jours, Machine nettoyee entre chaque location',
  'https://i.imgur.com/CNVQPx9.png',
  'Plongez en enfance et regalez vos invites avec notre machine a barbe a papa professionnelle ! En quelques instants, creez de delicieuses barbes a papa qui emerveilleront petits et grands.',
  true
FROM categories c 
WHERE c.label = 'Gourmandises';

INSERT INTO structures (id, name, category_id, size, capacity, age, price, price_2_days, max_weight, services, image, description, available)
SELECT 
  gen_random_uuid(),
  'Machine a pop-corn',
  c.id,
  'Machine professionnelle',
  'Illimite',
  'Tous ages',
  50,
  NULL,
  NULL,
  'Livraison 7 jours / 7 jours, Machine nettoyee entre chaque location',
  'https://i.imgur.com/noA5nmd.png',
  'Offrez aux enfants un moment de purement magique et fun avec notre machine a pop-corn professionnelle !',
  true
FROM categories c 
WHERE c.label = 'Gourmandises';

INSERT INTO structures (id, name, category_id, size, capacity, age, price, price_2_days, max_weight, services, image, description, available)
SELECT 
  gen_random_uuid(),
  'Machine a gaufres',
  c.id,
  'Machine professionnelle',
  'Illimite',
  'Tous ages',
  60,
  NULL,
  NULL,
  'Livraison 7 jours / 7 jours, Machine nettoyee entre chaque location',
  'https://i.imgur.com/fHdP8HH.png',
  'Offrez a vos invites une experience inoubliable avec notre machine a gaufres professionnelle.',
  true
FROM categories c 
WHERE c.label = 'Gourmandises';

INSERT INTO structures (id, name, category_id, size, capacity, age, price, price_2_days, max_weight, services, image, description, available)
SELECT 
  gen_random_uuid(),
  'Machine a crepes',
  c.id,
  'Machine professionnelle',
  'Illimite',
  'Tous ages',
  60,
  NULL,
  NULL,
  'Livraison 7 jours / 7 jours, Machine nettoyee entre chaque location',
  'https://i.imgur.com/SM4tkzP.png',
  'Offrez a vos petits aventuriers un voyage culinaire avec notre machine a crepes professionnelle !',
  true
FROM categories c 
WHERE c.label = 'Gourmandises';

-- Structures Evenementiel
INSERT INTO structures (id, name, category_id, size, capacity, age, price, price_2_days, max_weight, services, image, description, available)
SELECT 
  gen_random_uuid(),
  'Magicien',
  c.id,
  'Prestation sur mesure',
  'Jusqu''a 50 personnes',
  'Tous ages',
  0,
  NULL,
  NULL,
  'Prestation personnalisee, Materiel inclus, Deplacement en Ile-de-France',
  'https://i.imgur.com/kTXIuZD.png',
  'Emerveillez vos invites avec un spectacle de magie professionnel ! Notre magicien experimente propose des tours adaptes a tous les ages, des illusions fascinantes aux numeros interactifs. Parfait pour anniversaires, evenements d''entreprise et fetes familiales.',
  true
FROM categories c 
WHERE c.label = 'Evenementiel';

INSERT INTO structures (id, name, category_id, size, capacity, age, price, price_2_days, max_weight, services, image, description, available)
SELECT 
  gen_random_uuid(),
  'Sculpteur de ballons',
  c.id,
  'Animation mobile',
  'Jusqu''a 30 enfants/heure',
  '3-12 ans',
  0,
  NULL,
  NULL,
  'Ballons fournis, Animation personnalisee, Creations a emporter',
  'https://imgur.com/sTAtBdS.png',
  'Transformez des ballons en oeuvres d''art ! Notre sculpteur professionnel cree en direct des animaux, fleurs et personnages qui raviront les enfants. Chaque creation devient un souvenir unique de votre evenement.',
  true
FROM categories c 
WHERE c.label = 'Evenementiel';

INSERT INTO structures (id, name, category_id, size, capacity, age, price, price_2_days, max_weight, services, image, description, available)
SELECT 
  gen_random_uuid(),
  'Maquilleuse',
  c.id,
  'Poste de maquillage',
  '15-20 enfants/heure',
  '3-12 ans',
  0,
  NULL,
  NULL,
  'Maquillage hypoallergenique, Materiel professionnel, Designs varies',
  'https://i.imgur.com/k59vJoX.png',
  'Transformez les enfants en leurs heros preferes ! Notre maquilleuse professionnelle utilise des produits surs et hypoallergeniques pour creer des maquillages fantastiques : animaux, super-heros, princesses et bien plus encore.',
  true
FROM categories c 
WHERE c.label = 'Evenementiel';

INSERT INTO structures (id, name, category_id, size, capacity, age, price, price_2_days, max_weight, services, image, description, available)
SELECT 
  gen_random_uuid(),
  'Mascotte',
  c.id,
  'Animation interactive',
  'Tous publics',
  'Tous ages',
  0,
  NULL,
  NULL,
  'Costume professionnel, Animation personnalisee, Photos souvenirs',
  'https://i.imgur.com/Rq9gyt0.png',
  'Donnez vie a votre evenement avec nos mascottes colorees ! Nos animateurs professionnels en costume creent une ambiance festive inoubliable avec danses, jeux et interactions qui raviront petits et grands.',
  true
FROM categories c 
WHERE c.label = 'Evenementiel';

-- Insertion des photos carrousel
INSERT INTO carousel_photos (id, url, alt, title, location, order_position) VALUES
(gen_random_uuid(), 'https://i.imgur.com/kA2Secn.png', 'Structure gonflable 1', 'Anniversaire Magique', 'Paris 15eme', 1),
(gen_random_uuid(), 'https://i.imgur.com/yj3D8xk.png', 'Structure gonflable 2', 'Fete d''Ecole', 'Boulogne-Billancourt', 2),
(gen_random_uuid(), 'https://i.imgur.com/eJrSzxS.png', 'Structure gonflable 3', 'Kermesse Paroissiale', 'Versailles', 3),
(gen_random_uuid(), 'https://i.imgur.com/PpYERbM.png', 'Structure gonflable 4', 'Team Building', 'La Defense', 4),
(gen_random_uuid(), 'https://i.imgur.com/AdHVFs4.png', 'Structure gonflable 5', 'Mariage Champetre', 'Fontainebleau', 5),
(gen_random_uuid(), 'https://i.imgur.com/6qMhuOF.png', 'Structure gonflable 6', 'Fete de Quartier', 'Creteil', 6)
ON CONFLICT DO NOTHING;

-- Verification des insertions
SELECT 'Categories inserees:' as info, COUNT(*) as count FROM categories
UNION ALL
SELECT 'Structures inserees:' as info, COUNT(*) as count FROM structures
UNION ALL
SELECT 'Photos inserees:' as info, COUNT(*) as count FROM carousel_photos;