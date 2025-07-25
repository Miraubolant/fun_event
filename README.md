# Fun Event - Location de Structures Gonflables

## 🎪 Description
Site web pour Fun Event, spécialiste de la location de structures gonflables premium en Île-de-France.

## 🚀 Configuration Supabase

### Étape 1: Créer un compte Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un compte et un nouveau projet
3. Notez votre URL et votre clé API anonyme

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