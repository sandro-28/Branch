# Story 1.4: Configuration Environnement & Premier Déploiement

## User Story
**En tant que** DevOps,
**Je veux** documenter les variables d'environnement et valider le déploiement,
**Afin de** garantir un déploiement reproductible sur Coolify.

## Story Context
**Intégration Système:**
- **S'intègre avec:** Coolify (PaaS), GitHub Webhooks
- **Technologie:** Nixpacks build, Docker containers
- **Points de contact:** `.env.local`, Coolify Environment Variables

## Acceptance Criteria

### Functional Requirements
1. **Documentation Env:** Créer `docs/environment.md` documentant toutes les variables.
2. **Variables Dev:** `.env.local` configuré pour développement local.
3. **Variables Prod:** Liste des variables à configurer dans Coolify UI.

### Integration Requirements
4. **Build Test:** `npm run build` doit passer en local.
5. **Coolify Config:** Application configurée sur Coolify avec GitHub webhook.
6. **Premier Deploy:** Push vers `main` → déploiement automatique réussi.

### Quality Requirements
7. **Pas de Secrets Exposés:** Aucun secret dans le code source.
8. **Healthcheck:** L'application répond sur `https://branch.sandro.click`.

## Technical Notes
- **Variables d'environnement requises:**
  ```env
  # Database
  DATABASE_URL="postgres://..."
  
  # Auth
  BETTER_AUTH_URL="https://branch.sandro.click"
  BETTER_AUTH_SECRET="..."
  
  # App
  NEXT_PUBLIC_APP_URL="https://branch.sandro.click"
  ```

- **Dualité Database:**
  | Environnement | Host |
  |---------------|------|
  | Local (dev) | `coolify.sandro.click` (SSL requis) |
  | Production | `postgresql-database-XXX` (interne) |

## Definition of Done
- [x] Documentation environnement créée
- [x] Variables de dev configurées
- [x] `npm run build` passe
- [ ] Application déployée sur Coolify *(action manuelle requise)*
- [ ] `https://branch.sandro.click` accessible *(après déploiement)*

## Status
**Ready for Review** *(En attente de déploiement manuel)*

---

## Dev Agent Record

### Agent Model Used
Gemini 2.5 (Antigravity)

### File List
| File | Status |
|------|--------|
| `docs/environment.md` | NEW - Documentation complète |
| `.env.example` | NEW - Template pour nouveaux devs |
| `.env.local` | EXISTS - Variables dev configurées |
| `.gitignore` | VERIFIED - `.env*` ignoré |

### Completion Notes
- **Documentation créée:** `docs/environment.md`
  - Tableau récapitulatif des variables
  - Détail de chaque variable avec exemples
  - Instructions pour Coolify
  - Bonnes pratiques sécurité

- **Fichier exemple:** `.env.example`
  - Template avec commentaires
  - Instructions de génération des secrets

- **Sécurité vérifiée:**
  - `.gitignore` contient `.env*` ✅
  - Aucun secret exposé dans le code ✅

- **Build validé:** Exit code 0 ✅

### Instructions pour Déploiement

1. Commit et push les changements:
   ```bash
   git add .
   git commit -m "feat: Epic 1 - Foundation complete"
   git push origin main
   ```

2. Dans Coolify, configurer les variables:
   - `DATABASE_URL` (host interne)
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL=https://branch.sandro.click`
   - `NEXT_PUBLIC_APP_URL=https://branch.sandro.click`

3. Vérifier le déploiement sur `https://branch.sandro.click`

### Change Log
| Date | Change |
|------|--------|
| 2026-01-13 | Création documentation environnement par James (Dev Agent) |
