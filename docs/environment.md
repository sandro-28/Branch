# Configuration Environnement - Branch

Ce document décrit toutes les variables d'environnement nécessaires pour Branch.

## Vue d'ensemble

| Variable | Requis | Public | Description |
|----------|--------|--------|-------------|
| `DATABASE_URL` | ✅ | ❌ | Connexion PostgreSQL |
| `BETTER_AUTH_SECRET` | ✅ | ❌ | Secret pour tokens auth |
| `BETTER_AUTH_URL` | ✅ | ❌ | URL base pour Better-Auth |
| `NEXT_PUBLIC_APP_URL` | ✅ | ✅ | URL publique de l'application |

---

## Variables Détaillées

### DATABASE_URL

**Description:** Chaîne de connexion PostgreSQL.

**Format:**
```
postgres://USER:PASSWORD@HOST:PORT/DATABASE?sslmode=MODE
```

**Valeurs selon environnement:**

| Environnement | Valeur |
|---------------|--------|
| **Local (Dev)** | `postgres://postgres:PASSWORD@coolify.sandro.click:5432/postgres?sslmode=require` |
| **Production (Coolify)** | `postgres://postgres:PASSWORD@postgresql-database-XXXXX:5432/postgres` |

> ⚠️ **Note:** En production, utiliser le hostname interne Docker (sans SSL car réseau interne).

---

### BETTER_AUTH_SECRET

**Description:** Clé secrète pour signer les tokens JWT de Better-Auth.

**Génération:**
```bash
openssl rand -hex 32
```

**Exemple:**
```
e66f60d5e1d23c8644baadc83419e59a00e32374f203d7fd77160ffcd1a62125
```

> ⚠️ **Sécurité:** Ne jamais partager ou commit cette valeur.

---

### BETTER_AUTH_URL

**Description:** URL de base pour les routes d'authentification.

**Valeurs:**

| Environnement | Valeur |
|---------------|--------|
| **Local** | `http://localhost:3000` |
| **Production** | `https://branch.sandro.click` |

---

### NEXT_PUBLIC_APP_URL

**Description:** URL publique de l'application (accessible côté client).

**Valeurs:**

| Environnement | Valeur |
|---------------|--------|
| **Local** | `http://localhost:3000` |
| **Production** | `https://branch.sandro.click` |

---

## Configuration par Environnement

### Développement Local (`.env.local`)

```env
# Database (connexion externe via SSL)
DATABASE_URL=postgres://postgres:PASSWORD@coolify.sandro.click:5432/postgres?sslmode=require

# Better-Auth
BETTER_AUTH_SECRET=your-secret-here
BETTER_AUTH_URL=http://localhost:3000

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Production (Coolify Environment Variables)

```env
# Database (connexion interne Docker)
DATABASE_URL=postgres://postgres:PASSWORD@postgresql-database-hwksscs8c0sk44sg0s88o8ws:5432/postgres

# Better-Auth
BETTER_AUTH_SECRET=your-production-secret-here
BETTER_AUTH_URL=https://branch.sandro.click

# App
NEXT_PUBLIC_APP_URL=https://branch.sandro.click
```

---

## Configuration Coolify

### Étapes de déploiement

1. **Créer l'application** dans Coolify (type: GitHub)
2. **Connecter le repo:** `sandro-28/Branch`
3. **Branch:** `main`
4. **Build Pack:** Nixpacks (auto-détection Next.js)
5. **Ajouter les variables d'environnement** (section Environment Variables)
6. **Configurer le domaine:** `branch.sandro.click`
7. **Activer SSL:** Let's Encrypt automatique
8. **Deployer**

### Variables à configurer dans Coolify

| Variable | Valeur |
|----------|--------|
| `DATABASE_URL` | `postgres://postgres:PASSWORD@postgresql-database-XXX:5432/postgres` |
| `BETTER_AUTH_SECRET` | *(générer avec openssl)* |
| `BETTER_AUTH_URL` | `https://branch.sandro.click` |
| `NEXT_PUBLIC_APP_URL` | `https://branch.sandro.click` |

---

## Sécurité

### Bonnes Pratiques

- ✅ Ne jamais commit les fichiers `.env.local` ou `.env`
- ✅ Utiliser des secrets différents en dev et prod
- ✅ Générer les secrets avec `openssl rand -hex 32`
- ✅ Vérifier que `.gitignore` contient `.env*`

### Fichiers Ignorés

Le `.gitignore` doit contenir:
```
.env
.env.local
.env.production
.env*.local
```
