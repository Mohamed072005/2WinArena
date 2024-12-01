# 2WinArena

## Aperçu du Projet

Il s'agit d'une application web complète conçue pour rationaliser l'inscription aux événements pour une organisation sportive. La plateforme permet aux organisateurs d'événements de gérer efficacement les événements et les participants, simplifiant l'ensemble du processus d'inscription.

## Contexte du Projet

Une organisation sportive cherche à mettre en place une solution numérique pour la gestion des inscriptions aux événements. L'application offre une interface conviviale pour la gestion des événements, le suivi des participants et des flux d'inscription transparents.

## Pile Technologique

### Frontend
- **React** : Bibliothèque d'interface utilisateur
- **TypeScript** : JavaScript avec typage sécurisé
- **Vite** : Outil de construction et serveur de développement
- **Redux Toolkit** : Gestion d'état
- **React Router** : Routage côté client
- **Tailwind CSS** : Stylisation utilitaire
- **Radix UI** : Composants d'interface utilisateur accessibles et non stylés

### Backend
- **NestJS** : Framework Node.js progressif
- **MongoDB** : Base de données NoSQL
- **Mongoose** : Modélisation d'objets MongoDB
- **JWT** : Authentification
- **Bcrypt** : Hachage de mot de passe

## Prérequis

- Node.js (v18+ recommandé)
- npm
- MongoDB

## Installation

### Cloner le Dépôt
```bash
git clone https://github.com/Mohamed072005/2WinArena.git
cd 2WinArena
```

### Configuration du Backend
```bash
cd server
npm install
```

### Configuration du Frontend
```bash
cd client
npm install
```

## Configuration de l'Environnement

1. Créez des fichiers `.env` dans les répertoires `server` et `client`
2. Ajoutez les variables d'environnement nécessaires :
   - Backend : Connexion à la base de données, secrets JWT
   - Frontend : Points de terminaison API

## Exécution de l'Application

### Mode Développement

#### Backend
```bash
cd server
npm run start:dev
```

#### Frontend
```bash
cd client
npm run dev
```

## Documentation API

Une documentation interactive complète de l'API est disponible via Swagger UI. Après avoir lancé le serveur, visitez :
```
http://localhost:4000/api#/
```

## Tests

### Tests Backend
```bash
cd server
npm run test 
```

## Contribution

1. Forkez le dépôt
2. Créez une branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commitez vos modifications (`git commit -m 'Add some AmazingFeature'`)
4. Poussez la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Ajout de Nouvelles Fonctionnalités

- Suivez la structure et les conventions de code existantes
- Écrivez des tests unitaires pour les nouvelles fonctionnalités
- Mettez à jour la documentation
- Assurez-vous que le code passe les vérifications de linting et de tests

## Dépendances Clés

### Packages Frontend Clés
- `axios` : Requêtes HTTP
- `react-redux` : Gestion d'état
- `react-router-dom` : Routage
- `date-fns` : Utilitaires de date
- `jspdf` : Génération de PDF
- `react-hot-toast` : Notifications

### Packages Backend Clés
- `@nestjs/mongoose` : Intégration MongoDB
- `bcryptjs` : Chiffrement de mot de passe
- `jsonwebtoken` : Authentification
- `class-validator` : Validation des entrées
