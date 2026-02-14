# IUT Project - API de Gestion de Films

API REST développée avec Hapi.js pour la gestion de films et d'utilisateurs. Cette application permet aux utilisateurs de créer un compte, gérer des films et une liste de favoris avec un système de permissions intégré.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version 14.x ou supérieure)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (recommandé pour MySQL)
- [Git](https://git-scm.com/)

## Installation

### 1. Cloner le projet

```bash
git clone <url-du-repo>
cd iut-project
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Démarrer la base de données MySQL

Le projet inclut un script pour démarrer MySQL via Docker :

```bash
chmod +x mysql.sh
./mysql.sh
```

Ce script va :
- Supprimer tout conteneur MySQL existant nommé `hapi-mysql`
- Créer un nouveau conteneur MySQL 8.0
- Configurer la base de données avec les valeurs par défaut

## Configuration

### Variables d'environnement

Dupliquez le fichier `.env.example` en `.env` et modifiez les variables selon les descriptions ci-dessous :

### Description des variables

#### Serveur
- `NODE_ENV`: Environnement d'exécution (`development`, `production`)
- `PORT`: Port d'écoute du serveur (par défaut: 3000)

#### Base de données
- `DB_HOST`: Hôte de la base de données MySQL
- `DB_PORT`: Port MySQL (par défaut: 3306)
- `DB_USER`: Nom d'utilisateur MySQL
- `DB_PASSWORD`: Mot de passe MySQL
- `DB_DATABASE`: Nom de la base de données

#### JWT (Authentification)
- `JWT_SECRET_KEY`: Clé secrète pour signer les tokens JWT

#### Email (SMTP)
- `MAIL_HOST`: Serveur SMTP (ex: smtp.gmail.com, smtp.mailtrap.io)
- `MAIL_PORT`: Port SMTP (587 pour TLS, 465 pour SSL)
- `MAIL_SECURE`: `true` pour SSL, `false` pour TLS
- `MAIL_USER`: Identifiant SMTP
- `MAIL_PASSWORD`: Mot de passe SMTP
- `MAIL_FROM`: Adresse email d'expéditeur (optionnel, utilise MAIL_USER par défaut)

## Base de données

### Exécuter les migrations

Les migrations créent automatiquement les tables nécessaires dans la base de données.
Pour exécuter manuellement les migrations :

```bash
npx knex migrate:latest
```

Pour annuler la dernière migration :

```bash
npx knex migrate:rollback
```

### État des migrations

Pour vérifier quelles migrations ont été exécutées :

```bash
npx knex migrate:status
```

## Utilisation

### Démarrer le serveur

En mode développement :

```bash
npm start
```

Le serveur démarre sur `http://localhost:3000` (ou le port défini dans `.env`).
Vous pouvez acccéder à `http://localhost:3000` dans votre navigateur.

## API Documentation

### Swagger UI

La documentation interactive de l'API est disponible via Swagger :
```
http://localhost:3000/documentation
```
### Authentification

La plupart des routes nécessitent une authentification JWT. 

#### 1. Créer un compte ou se connecter

```bash
POST /user/create
{
  "username": "john_doe",
  "mail": "john@example.com",
  "password": "secret123",
  "firstName": "John",
  "lastName": "Doe"
}
```

```bash
POST /user/login
{
  "mail": "john@example.com",
  "password": "secret123"
}
```

#### 2. Utiliser le token

Récupérez le token JWT retourné et incluez-le dans le header `Authorization` :

```
Authorization: Bearer <votre-token-jwt>
```