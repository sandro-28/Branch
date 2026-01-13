# Epic 3: Gestion des Données

**Objectif:** Permettre la visualisation et manipulation des données de la base de données.

## Stack Technique

| Composant | Technologie |
|-----------|-------------|
| Query Execution | Drizzle ORM raw SQL |
| SQL Editor | Monaco Editor / CodeMirror |
| Tables | Shadcn/UI Data Table |

## Stories

### Story 3.1: Table Explorer (Read-Only)
- **En tant que** Développeur,
- **Je veux** explorer les tables de ma base de données,
- **Afin de** visualiser la structure et les données.
- **Critères d'Acceptation:**
    1. Liste des tables du schéma `public`
    2. Affichage du contenu d'une table sélectionnée
    3. Pagination des résultats
    4. Colonnes avec types de données

### Story 3.2: SQL Console
- **En tant que** Développeur,
- **Je veux** exécuter des requêtes SQL directement dans le navigateur,
- **Afin de** débugger et manipuler les données rapidement.
- **Critères d'Acceptation:**
    1. Éditeur SQL avec coloration syntaxique
    2. Bouton "Run" pour exécuter la requête
    3. Affichage des résultats en table dynamique
    4. Affichage des erreurs SQL
    5. Raccourci `Ctrl+Enter` pour exécuter

### Story 3.3: Historique des Requêtes
- **En tant que** Développeur,
- **Je veux** retrouver mes requêtes précédentes,
- **Afin de** ne pas les retaper.
- **Critères d'Acceptation:**
    1. Sauvegarde automatique des 20 dernières requêtes
    2. Interface d'historique (sidebar ou dropdown)
    3. Clic pour recharger une requête
    4. Stockage en localStorage

## Dépendances

- Epic 2 complété (Dashboard et Projects)