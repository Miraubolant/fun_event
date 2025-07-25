# Fun Event - Location de Structures Gonflables

## 🎪 Description
Site web pour Fun Event, spécialiste de la location de structures gonflables premium en Île-de-France.

## 🚀 **Pour Finaliser la Migration**

### **1. Connecter Supabase**
- Cliquez sur "Connect to Supabase" en haut à droite de l'interface Bolt
- Suivez les instructions pour connecter votre projet Supabase

### **2. Exécuter les Migrations**
**IMPORTANT**: Vous devez exécuter les migrations SQL pour créer les tables :

1. **Ouvrez votre Dashboard Supabase** : https://supabase.com/dashboard
2. **Allez dans SQL Editor** (icône </> dans le menu de gauche)
3. **Exécutez le fichier** `supabase/migrations/create_tables.sql` :
   - Copiez tout le contenu du fichier
   - Collez-le dans l'éditeur SQL
   - Cliquez sur "Run" pour exécuter
4. **Vérifiez les tables** : Allez dans "Table Editor" pour voir les tables créées

### **3. Créer le Compte Admin**
Dans votre dashboard Supabase :
1. **Authentication** → **Users** → **Invite user**
2. **Email** : `admin@funevent.fr`
3. **Définir un mot de passe** sécurisé

### **4. Tester l'Admin Panel**
1. **Se connecter** avec `admin@funevent.fr`
2. **Aller sur la page Admin**
3. **Ajouter vos premières données** :
   - Catégories (ex: "Châteaux", "Toboggans")
   - Structures avec images et descriptions
   - Photos d'événements

## ⚠️ **Résolution des Erreurs**

Si vous voyez des erreurs comme "relation does not exist" :
1. **Vérifiez que les migrations sont exécutées** (étape 2 ci-dessus)
2. **Rechargez la page** après avoir créé les tables
3. **Vérifiez la connexion Supabase** dans les variables d'environnement

### Étape 2: Configurer les variables d'environnement
Créez un fichier `.env` à la racine du projet :
```
VITE_SUPABASE_URL=votre_url_supabase
VITE_SUPABASE_ANON_KEY=votre_cle_anonyme
```

### Étape 3: Exécuter les migrations
1. Dans votre dashboard Supabase, allez dans "SQL Editor"
2. Exécutez les fichiers de migration dans l'ordre :
   - `supabase/migrations/create_tables.sql`
   - `supabase/migrations/create_admin_user.sql`

### Étape 4: Créer le compte administrateur
1. Dans Supabase, allez dans "Authentication" > "Users"
2. Cliquez sur "Invite user"
3. Email: `admin@funevent.fr`
4. Envoyez l'invitation ou définissez un mot de passe

## 🔐 Connexion Admin
- **Email**: admin@funevent.fr
- **Accès**: Page `/admin` après connexion
- **Permissions**: Seul ce compte peut modifier les données

## 📊 Fonctionnalités
- ✅ Catalogue de structures gonflables
- ✅ Système de panier
- ✅ Demande de devis
- ✅ Galerie d'événements
- ✅ Panel d'administration sécurisé
- ✅ Base de données Supabase
- ✅ Authentification sécurisée

## 🛠️ Technologies
- React + TypeScript
- Tailwind CSS
- Supabase (Base de données + Auth)
- Vite

## 📱 Déploiement
Le site est optimisé pour le déploiement sur Netlify avec intégration Supabase.