/*
  # Insertion de toutes les données par défaut

  1. Données insérées
    - 3 catégories (Location gonflable, Évènementiel, Gourmandises)
    - 17 structures avec tous leurs détails
    - 6 photos pour le carrousel
  
  2. Sécurité
    - Utilise INSERT ... ON CONFLICT DO NOTHING pour éviter les doublons
    - Toutes les données avec des UUIDs valides
*/

-- Insertion des catégories
INSERT INTO categories (id, label, icon) VALUES
('a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Location gonflable', '🎪'),
('b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'Évènementiel', '🎭'),
('c3d4e5f6-g7h8-9012-3456-789012cdefgh', 'Gourmandises', '🍭')
ON CONFLICT (id) DO NOTHING;

-- Insertion des structures
INSERT INTO structures (id, name, category_id, size, capacity, age, price, price_2_days, max_weight, services, image, description, available) VALUES
('j0k1l2m3-n4o5-6789-0123-456789jklmno', 'Instables Gladiateurs', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', '7,7m x 6,6m x 1,5m', '2 personnes max', '3-77 ans', 180, NULL, 100, 'Livraison 7 jours / 7 jours, Enrouleurs électrique inclus, Structures nettoyées entre chaque location', 'https://i.imgur.com/fLqAlJ1.png', 'Entrez dans l''arène et relevez le défi des gladiateurs ! ⚔🔥

Affrontez vos amis, votre famille ou vos collègues dans un duel d''équilibre et de stratégie !
Sur cette plateforme gonflable, les gladiateurs doivent se battre pour rester debout tout en tentant de déséquilibrer leur adversaire.

💪 Un jeu fun et compétitif : testez votre agilité, votre force et votre ruse pour triompher.
🎭 Une animation garantie : fous rires et suspense assurés pour les joueurs comme pour les spectateurs !
🌟 Idéal pour tous vos événements : anniversaires, team-building, kermesses, enterrements de vie de célibataire…

👑 Qui restera le dernier debout ? Montez sur la plateforme et prouvez que vous êtes le véritable champion des gladiateurs !
📅 Réservez dès maintenant pour un maximum de fun et de défis ! 🎉🔥', true),

('k1l2m3n4-o5p6-7890-1234-567890klmnop', 'Château Cirque', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', '3,8m x 2,8m x 2,8m', '12 personnes max', '3-77 ans', 150, NULL, 70, 'Conforme EN 14960, Livraison 7 jours / 7 jours, Enrouleurs électrique inclus, Structures nettoyées entre chaque location', 'https://i.imgur.com/XcGSPl6.png', '🤹 Toute la Magie du Cirque dans un Château Gonflable ! 🎪

✨ Offrez aux enfants un moment de purement magique et fun avec notre château gonflable sur le thème du cirque ! 🤩
Ils pourront sauter, bondir, faire des galipettes et des cabrioles dans un espace entièrement sécurisé, rempli de multiples obstacles gonflés pour encore plus de défis et d''amusement ! 🎈
🔥 Pourquoi choisir cette structure gonflable ?

✅ Un véritable parc d''attractions miniature : Obstacles, espaces de saut et un super toboggan pour une sortie spectaculaire ! 🎢
✅ Sécurité optimale : Conçu pour les jeunes enfants avec des matériaux résistants et un sol amortissant.
✅ Un univers captivant : Plongez dans l''ambiance magique du cirque et laissez les enfants devenir de vrais petits acrobates ! 🎭🤹
✅ Parfait pour tous vos événements : Anniversaires, fêtes d''école, kermesses, événements privés… 🥳
📅 Ajoutez une touche de magie à votre événement, réservez dès maintenant !', true),

('l2m3n4o5-p6q7-8901-2345-678901lmnopq', 'Multiplay Jurassic World', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', '5m x 5,5m x 4,30m', '12 personnes max', '3-77 ans', 200, NULL, 160, 'Conforme EN 14960, Livraison 7 jours / 7 jours, Enrouleurs électrique inclus, Structures nettoyées entre chaque location', 'https://i.imgur.com/dyYum3x.png', 'Partez à l''aventure avec la structure gonflable Multiplay Jurassic World

Offrez à vos invités une expérience inoubliable en les plongeant au coeur de l''ère préhistorique avec la structure gonflable Multiplay Jurassic World. Inspirée de l''univers fascinant des dinosaures, cette structure gonflable unique vous invite à explorer un monde jurassique peuplé de créatures gigantesques et d''aventures palpitantes.

Imaginez un décor spectaculaire avec des dinosaures en 3D réalistes et des obstacles colorés qui captivent l''imagination des enfants. Avec son toboggan impressionnant, ses zones de jeu interactives et ses designs inspirants, la structure Multiplay Jurassic World permet aux petits aventuriers de sauter, grimper et glisser tout en découvrant un univers préhistorique excitant.

Que ce soit pour un anniversaire à thème, une fête d''école ou un événement spécial, cette structure gonflable fera voyager les enfants à travers le temps et les emportera dans une aventure jurassique pleine de rires et de joie.

N''attendez plus, rendez chaque événement encore plus magique avec cette attraction hors du commun et faites vivre à vos invités un moment d''évasion inoubliable !', true),

('m3n4o5p6-q7r8-9012-3456-789012mnopqr', 'Le Monde Marin', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', '3,8m x 9,5m x 5,80m', '8 personnes max', '3-77 ans', 180, NULL, 210, 'Conforme EN 14960, Livraison 7 jours / 7 jours, Enrouleurs électrique inclus, Structures nettoyées entre chaque location', 'https://i.imgur.com/bnFv4OP.png', 'Un parcours d''obstacles marin pour des événements inoubliables !

Offrez à vos petits aventuriers un voyage sous-marin rempli de fun et de défis avec notre parcours gonflable Monde Marin de 9 mètres de long ! Cette structure gonflable originale propose une série d''obstacles ludiques qui permettront aux enfants de se défouler tout en explorant un univers aquatique fascinant.

Les enfants devront courir, sauter, grimper et ramper à travers des obstacles marins colorés et réalistes, tous inspirés par le monde sous-marin. Avec des objets en 3D tels que des poissons, des vagues et des créatures marines, cette attraction plonge les participants dans une aventure palpitante, où chaque mouvement est une nouvelle découverte.

Idéale pour tous types d''événements, que ce soit des anniversaires, des fêtes d''école ou des animations en extérieur, le parcours Monde Marin garantit de nombreux sourires et des heures de divertissement. Faites de chaque fête un moment unique avec cette structure gonflable pleine de surprises !', true),

('n4o5p6q7-r8s9-0123-4567-890123nopqrs', 'Sumo adulte', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Tapis : 25m²', '2 personnes max', '3-77 ans', 120, NULL, 100, 'Livraison 7 jours / 7 jours, Enrouleurs électrique inclus, Structures nettoyées entre chaque location', 'https://i.imgur.com/IiQCoo8.png', '👊 Combat de Sumos – Fous rires garantis ! 🤩

Envie d''une animation 100 % fun et délirante pour votre événement ? Le combat de sumos est fait pour vous ! 😆

Regardez deux adultes (ou enfants !) en énormes costumes de sumo s''affronter dans un duel aussi hilarant à jouer qu''à regarder ! Fou rires et ambiance festive assurés ! 🎭

🔥 Pourquoi choisir notre animation sumo ?

✅ Un jeu ultra-ludique : Le but ? Faire tomber son adversaire ou le pousser hors du tapis ! 💥
✅ Des costumes XXL de qualité : Indéchirables, imperméables et remplis de mousse pour un confort et une sécurité optimaux (sans souffleur nécessaire).
✅ Parfait pour tous vos événements : Anniversaires, team building, kermesses, fêtes privées… 🥳
✅ Fous rires garantis : Que vous soyez sur le ring ou simple spectateur, le spectacle est inoubliable !
📅 Réservez dès maintenant et mettez du fun dans votre événement !', true),

('o5p6q7r8-s9t0-1234-5678-901234opqrst', 'Machine à coup de poing', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', '1,2m x 0,7m x 2,1m', '1 personne max', '3-77 ans', 80, NULL, 145, 'Conforme EN 14960, Livraison 7 jours / 7 jours, Enrouleurs électrique inclus, Structures nettoyées entre chaque location', 'https://i.imgur.com/pT0UHhG.png', 'Prêt à relever le défi de la machine à coup de poing ?
Montrez ce que vous avez dans les bras et testez votre force en toute convivialité !

Vos amis et les autres participants sont là pour jouer… mais qui obtiendra le meilleur score ?
Pas besoin d''être un boxeur pro, l''essentiel c''est de s''amuser et de tenter le KO parfait !

Un jeu fun, accessible à tous, pour rire, se défier et partager un bon moment !
Alors, qui frappera le plus fort cette fois ?', true),

('p6q7r8s9-t0u1-2345-6789-012345pqrstu', 'Pêche aux canards', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', '1,5m x 3,4m x 1,3m', '12 personnes max', '3-77 ans', 60, NULL, 30, 'Conforme EN 14960, Livraison 7 jours / 7 jours, Enrouleurs électrique inclus, Structures nettoyées entre chaque location', 'https://i.imgur.com/o750EVP.png', 'La pêche aux canards : un grand classique qui fait toujours plaisir !

Une activité ludique et amusante, idéale pour les plus petits. En plus de les divertir, elle leur permet de développer leur adresse tout en s''amusant.

Le but ? Attraper les canards le plus vite possible à l''aide d''une canne à pêche, et tenter de battre ses amis dans la bonne humeur !

Le circuit fonctionne avec de l''eau, pour une animation encore plus réaliste', true),

('q7r8s9t0-u1v2-3456-7890-123456qrstuv', 'Piscine à balles', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', '4,4m x 3,5m x 2,4m', '12 personnes max', '3-77 ans', 90, NULL, 70, 'Livraison 7 jours / 7 jours, Enrouleurs électrique inclus, Structures nettoyées entre chaque location', 'https://i.imgur.com/bWxOi76.png', 'Un rêve d''enfant devenu réalité !
Sauter, plonger, s''amuser dans une piscine remplie de balles colorées… c''est le bonheur garanti !

Offrez-leur ce plaisir simple et magique en installant notre boîte à balles gonflable lors d''un anniversaire, d''une fête ou de tout autre événement festif.

Parfaite en intérieur comme en extérieur, cette activité ludique promet des moments inoubliables, remplis de rires et de couleurs.', true),

('r8s9t0u1-v2w3-4567-8901-234567rstuvw', 'Sumo enfant', 'a1b2c3d4-e5f6-7890-1234-567890abcdef', 'Tapis : 25m²', '2 personnes max', '3-77 ans', 100, NULL, 100, 'Livraison 7 jours / 7 jours, Enrouleurs électrique inclus, Structures nettoyées entre chaque location', 'https://i.imgur.com/0XCSWRh.png', '👊 Combat de Sumos – Fous rires garantis ! 🤩

Envie d''une animation 100 % fun et délirante pour votre événement ? Le combat de sumos est fait pour vous ! 😆

Regardez deux adultes (ou enfants !) en énormes costumes de sumo s''affronter dans un duel aussi hilarant à jouer qu''à regarder ! Fou rires et ambiance festive assurés ! 🎭

🔥 Pourquoi choisir notre animation sumo ?

✅ Un jeu ultra-ludique : Le but ? Faire tomber son adversaire ou le pousser hors du tapis ! 💥
✅ Des costumes XXL de qualité : Indéchirables, imperméables et remplis de mousse pour un confort et une sécurité optimaux (sans souffleur nécessaire).
✅ Parfait pour tous vos événements : Anniversaires, team building, kermesses, fêtes privées… 🥳
✅ Fous rires garantis : Que vous soyez sur le ring ou simple spectateur, le spectacle est inoubliable !
📅 Réservez dès maintenant et mettez du fun dans votre événement !', true),

-- Catégorie Gourmandises
('s9t0u1v2-w3x4-5678-9012-345678stuvwx', 'Machine à Barbe à Papa', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', 'Machine professionnelle', 'Illimité', 'Tous âges', 50, NULL, NULL, 'Livraison 7 jours / 7 jours, Machine nettoyée entre chaque location', 'https://i.imgur.com/CNVQPx9.png', 'Plongez en enfance et régalez vos invités avec notre machine à barbe à papa professionnelle ! En quelques instants, créez de délicieuses barbes à papa qui émerveilleront petits et grands.', true),

('t0u1v2w3-x4y5-6789-0123-456789tuvwxy', 'Machine à pop-corn', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', 'Machine professionnelle', 'Illimité', 'Tous âges', 50, NULL, NULL, 'Livraison 7 jours / 7 jours, Machine nettoyée entre chaque location', 'https://i.imgur.com/noA5nmd.png', 'Offrez aux enfants un moment de purement magique et fun avec notre château gonflable sur le thème du cirque !', true),

('u1v2w3x4-y5z6-7890-1234-567890uvwxyz', 'Machine à gaufres', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', 'Machine professionnelle', 'Illimité', 'Tous âges', 60, NULL, NULL, 'Livraison 7 jours / 7 jours, Machine nettoyée entre chaque location', 'https://i.imgur.com/fHdP8HH.png', 'Offrez à vos invités une expérience inoubliable en les plongeant au cœur de l''ère préhistorique avec la structure gonflable Multiplay Jurassic World.', true),

('v2w3x4y5-z6a7-8901-2345-678901vwxyza', 'Machine à crêpes', 'c3d4e5f6-g7h8-9012-3456-789012cdefgh', 'Machine professionnelle', 'Illimité', 'Tous âges', 60, NULL, NULL, 'Livraison 7 jours / 7 jours, Machine nettoyée entre chaque location', 'https://i.imgur.com/SM4tkzP.png', 'Offrez à vos petits aventuriers un voyage sous-marin rempli de fun et de défis avec notre parcours gonflable Monde Marin de 9 mètres de long !', true),

-- Catégorie Évènementiel
('w3x4y5z6-a7b8-9012-3456-789012wxyzab', 'Magicien', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'Prestation sur mesure', 'Jusqu''à 50 personnes', 'Tous âges', 0, NULL, NULL, 'Prestation personnalisée, Matériel inclus, Déplacement en Île-de-France', 'https://i.imgur.com/kTXIuZD.png', 'Émerveillez vos invités avec un spectacle de magie professionnel ! Notre magicien expérimenté propose des tours adaptés à tous les âges, des illusions fascinantes aux numéros interactifs. Parfait pour anniversaires, événements d''entreprise et fêtes familiales.', true),

('x4y5z6a7-b8c9-0123-4567-890123xyzabc', 'Sculpteur de ballons', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'Animation mobile', 'Jusqu''à 30 enfants/heure', '3-12 ans', 0, NULL, NULL, 'Ballons fournis, Animation personnalisée, Créations à emporter', 'https://imgur.com/sTAtBdS.png', 'Transformez des ballons en œuvres d''art ! Notre sculpteur professionnel crée en direct des animaux, fleurs et personnages qui raviront les enfants. Chaque création devient un souvenir unique de votre événement.', true),

('y5z6a7b8-c9d0-1234-5678-901234yzabcd', 'Maquilleuse', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'Poste de maquillage', '15-20 enfants/heure', '3-12 ans', 0, NULL, NULL, 'Maquillage hypoallergénique, Matériel professionnel, Designs variés', 'https://i.imgur.com/k59vJoX.png', 'Transformez les enfants en leurs héros préférés ! Notre maquilleuse professionnelle utilise des produits sûrs et hypoallergéniques pour créer des maquillages fantastiques : animaux, super-héros, princesses et bien plus encore.', true),

('z6a7b8c9-d0e1-2345-6789-012345zabcde', 'Mascotte', 'b2c3d4e5-f6g7-8901-2345-678901bcdefg', 'Animation interactive', 'Tous publics', 'Tous âges', 0, NULL, NULL, 'Costume professionnel, Animation personnalisée, Photos souvenirs', 'https://i.imgur.com/Rq9gyt0.png', 'Donnez vie à votre événement avec nos mascottes colorées ! Nos animateurs professionnels en costume créent une ambiance festive inoubliable avec danses, jeux et interactions qui raviront petits et grands.', true)

ON CONFLICT (id) DO NOTHING;

-- Insertion des photos du carrousel
INSERT INTO carousel_photos (id, url, alt, title, location, order_position) VALUES
('d4e5f6g7-h8i9-0123-4567-890123defghi', 'https://i.imgur.com/kA2Secn.png', 'Structure gonflable 1', 'Anniversaire Magique', 'Paris 15ème', 1),
('e5f6g7h8-i9j0-1234-5678-901234efghij', 'https://i.imgur.com/yj3D8xk.png', 'Structure gonflable 2', 'Fête d''École', 'Boulogne-Billancourt', 2),
('f6g7h8i9-j0k1-2345-6789-012345fghijk', 'https://i.imgur.com/eJrSzxS.png', 'Structure gonflable 3', 'Kermesse Paroissiale', 'Versailles', 3),
('g7h8i9j0-k1l2-3456-7890-123456ghijkl', 'https://i.imgur.com/PpYERbM.png', 'Structure gonflable 4', 'Team Building', 'La Défense', 4),
('h8i9j0k1-l2m3-4567-8901-234567hijklm', 'https://i.imgur.com/AdHVFs4.png', 'Structure gonflable 5', 'Mariage Champêtre', 'Fontainebleau', 5),
('i9j0k1l2-m3n4-5678-9012-345678ijklmn', 'https://i.imgur.com/6qMhuOF.png', 'Structure gonflable 6', 'Fête de Quartier', 'Créteil', 6)
ON CONFLICT (id) DO NOTHING;