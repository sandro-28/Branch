# Guide de Réinitialisation du VPS (Remise à Zéro)

Ce guide vous accompagne pas à pas pour désinstaller toute version précédente de **Branch** (ou d'autres conteneurs Docker) sur votre VPS, afin de repartir sur une base 100% propre pour le déploiement.

> [!WARNING]
> **ATTENTION :** Ces commandes sont destructrices. Elles supprimeront **tous** les conteneurs Docker, les volumes (données des bases de données) et les images sur le serveur. Assurez-vous d'avoir sauvegardé les données importantes si nécessaire.

## Étape 1 : Connexion au VPS

Connectez-vous à votre serveur via SSH (remplacez `root` et `votre-ip` par vos infos) :

```bash
ssh root@votre-ip
```

## Étape 2 : Arrêt et Suppression des Conteneurs

Pour tout arrêter proprement et supprimer les conteneurs existants :

1.  **Lister les conteneurs actifs** (pour vérifier) :
    ```bash
    docker ps -a
    ```

2.  **Tout arrêter et supprimer** (commande radicale) :
    ```bash
    # Arrête tous les conteneurs en cours
    docker stop $(docker ps -a -q)
    
    # Supprime tous les conteneurs
    docker rm $(docker ps -a -q)
    ```
    *Si vous avez une erreur "requires at least 1 argument", c'est qu'il n'y avait aucun conteneur. Ignorez et passez à la suite.*

## Étape 3 : Nettoyage Profond (Images, Volumes, Réseaux)

Cette étape supprime les résidus (fichiers de BDD, caches, images disques).

```bash
docker system prune -a --volumes -f
```
*Cette commande peut prendre quelques secondes. Elle va libérer de l'espace disque.*

## Étape 4 : Suppression des Fichiers de Configuration

Si vous aviez cloné le dossier du projet (ex: `branch` ou `stageplanner`), supprimez-le pour réinstaller au propre.

```bash
# Vérifier les dossiers présents
ls -la

# Supprimer le dossier du projet (exemple: 'branch')
rm -rf branch
# OU si c'était 'stageplanner'
rm -rf stageplanner
```

## Étape 5 : Vérification

Vérifiez que Docker est vide :

```bash
docker ps -a
# Doit afficher des colonnes vides (CONTAINER ID, IMAGE...)
```

Votre VPS est maintenant "comme neuf", prêt pour une nouvelle installation.

---

## Prochaine Étape : Réinstallation

Une fois le VPS propre, nous pourrons procéder à la réinstallation.

**État actuel du projet :**
D'après mon analyse, nous sommes au début du développement de cette version (**Branch-v2**).
- Nous avons l'Architecture et les User Stories validées.
- **Le code de l'application (Console, Docker Setup) n'est pas encore créé dans ce dossier.**

Pour "réinstaller", nous devons d'abord **créer** l'application en suivant le plan de développement (Epic 1 : Initialisation). Je suis prêt à commencer dès que vous confirmez le nettoyage.
