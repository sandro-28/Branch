# Epic 4: Features Avancées

**Objectif:** Fonctionnalités avancées pour améliorer la productivité des développeurs.

## Stack Technique

| Composant | Technologie |
|-----------|-------------|
| Type Generation | drizzle-kit |
| Clipboard | navigator.clipboard API |
| Export | JSON/CSV generation |

## Stories

### Story 4.1: Génération TypeScript Types
- **En tant que** Développeur,
- **Je veux** générer les types TypeScript depuis le schéma DB,
- **Afin de** avoir du typage automatique dans mon code.
- **Critères d'Acceptation:**
    1. Bouton "Generate Types" dans l'interface
    2. Exécution de `drizzle-kit introspect`
    3. Affichage des types générés
    4. Copie dans le presse-papier

### Story 4.2: Copy-for-AI Context
- **En tant que** Développeur,
- **Je veux** copier un contexte formaté pour les agents AI,
- **Afin de** démarrer rapidement une session avec Claude/GPT.
- **Critères d'Acceptation:**
    1. Bouton "Copy for AI" dans le header
    2. Génération du contexte avec schéma DB
    3. Format Markdown optimisé pour AI
    4. Warning sur les données sensibles

### Story 4.3: Logs & Monitoring
- **En tant qu'** Admin,
- **Je veux** voir les logs et métriques de l'application,
- **Afin de** diagnostiquer les problèmes.
- **Critères d'Acceptation:**
    1. Page `/logs` avec logs récents
    2. Filtrage par niveau (error, warn, info)
    3. Métriques basiques (requêtes, temps de réponse)

### Story 4.4: Backups & Exports
- **En tant qu'** Admin,
- **Je veux** exporter mes données,
- **Afin de** faire des sauvegardes.
- **Critères d'Acceptation:**
    1. Export table en CSV
    2. Export table en JSON
    3. Dump SQL complet (pg_dump équivalent)

## Dépendances

- Epic 3 complété (SQL Console fonctionnel)