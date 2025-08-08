# 🔐 Pharmacie Ana - Guide de Sécurité Firebase

## 🚀 Installation Rapide

### Étape 1 : Télécharger les fichiers
```bash
# Téléchargez tous les fichiers dans votre dossier de projet
# Vous devriez avoir :
# ├── index.html
# ├── firebase-config.template.js
# ├── .gitignore
# └── README-Sécurité.md
```

### Étape 2 : Créer votre configuration
```bash
# Copiez le template
cp firebase-config.template.js firebase-config.js

# Éditez le fichier avec vos vraies clés
nano firebase-config.js
# OU utilisez votre éditeur préféré
```

### Étape 3 : Remplir vos clés Firebase
Dans `firebase-config.js`, remplacez :
```javascript
window.FIREBASE_CONFIG = {
    apiKey: "AIzaSyBHQSPXwED7W-FQMMs1D-OZcjW-5AP8A-w", // ✅ VOS VRAIES CLÉS
    authDomain: "anapharmo.firebaseapp.com",
    projectId: "anapharmo",
    storageBucket: "anapharmo.appspot.com",
    messagingSenderId: "1097322827362",
    appId: "1:1097322827362:web:fd19a67d9af135dcbf4b3b"
};

window.PHARMACY_CONFIG = {
    societeId: "EhaFrNvLHnXAqnwFMQFK", // ✅ VOTRE ID SOCIÉTÉ
    phoneNumber: "212661112540", // ✅ VOTRE NUMÉRO WHATSAPP
    pharmacyName: "Pharmacie Ana",
    address: "123 Avenue Mohammed V, Agadir"
};
```

### Étape 4 : Tester
```bash
# Ouvrez index.html dans votre navigateur
# Le site devrait fonctionner normalement
```

---

## 🛡️ Sécurité Git

### Configuration Git (OBLIGATOIRE)
```bash
# 1. Initialiser Git si nécessaire
git init

# 2. Ajouter le .gitignore EN PREMIER
git add .gitignore
git commit -m "🔒 Add security gitignore"

# 3. Ajouter les autres fichiers (SANS firebase-config.js)
git add index.html firebase-config.template.js README-Sécurité.md
git commit -m "🚀 Add secure pharmacy application"

# 4. Vérifier que firebase-config.js n'est PAS suivi
git status
# firebase-config.js ne doit PAS apparaître !
```

### Vérification de Sécurité
```bash
# ✅ Vérifier les fichiers ignorés
git status --ignored
# firebase-config.js doit être dans "Ignored files"

# ✅ Vérifier l'historique
git log --name-only | grep firebase-config
# Ne doit rien retourner

# ✅ Simuler un push
git ls-files | grep firebase-config
# Ne doit rien retourner
```

---

## 🔧 Configuration Firebase

### Obtenir vos Clés Firebase
1. **Aller sur Firebase Console** : https://console.firebase.google.com
2. **Sélectionner votre projet** (anapharmo)
3. **Paramètres du projet** > Général
4. **Section "Vos applications"** > Icône Web `</>`
5. **Copier la configuration**

### Règles de Sécurité Firestore Recommandées
```javascript
// Dans Firebase Console > Firestore > Règles
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 👥 Lecture publique du stock pour les clients
    match /societe/{societeId}/stock/{document} {
      allow read: if true;  // Les clients peuvent voir le stock
      allow write: if false; // Seuls les admins peuvent modifier
    }
    
    // 🔒 Autres collections protégées
    match /{document=**} {
      allow read, write: if false; // Accès interdit par défaut
    }
  }
}
```

### Configuration des Domaines Autorisés
1. **Firebase Console** > Authentication > Settings
2. **Authorized domains** > Ajouter votre domaine
3. Exemples : `pharmacie-ana.com`, `localhost`

---

## 📁 Structure du Projet

```
pharmacie-ana/
├── 📄 index.html                    ✅ À commiter (sécurisé)
├── 🔐 firebase-config.js           ❌ NE PAS commiter (secret)
├── 📋 firebase-config.template.js  ✅ À commiter (template)
├── 🛡️ .gitignore                   ✅ À commiter (protection)
├── 📚 README-Sécurité.md           ✅ À commiter (documentation)
└── 🗂️ assets/                      ✅ À commiter (images, etc.)
```

---

## 🚀 Déploiement

### Option 1 : Hébergement Statique Simple
#### GitHub Pages
```bash
# Push uniquement les fichiers sécurisés
git push origin main

# Aller dans Settings > Pages
# Source : Deploy from branch > main
# Le site sera disponible à : https://username.github.io/repo-name
```

#### Netlify
```bash
# 1. Connecter votre repo GitHub
# 2. Build settings : aucun (site statique)
# 3. Publish directory : / (racine)
# 4. Le site est déployé automatiquement !
```

### Option 2 : Variables d'Environnement (Avancé)
#### Avec Netlify
```bash
# Site Settings > Environment variables
FIREBASE_API_KEY=votre_vraie_api_key
FIREBASE_AUTH_DOMAIN=votre_auth_domain
FIREBASE_PROJECT_ID=votre_project_id
# etc...
```

#### Modifier le code pour utiliser les variables
```javascript
// Dans index.html, remplacer la configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY || window.FIREBASE_CONFIG?.apiKey,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || window.FIREBASE_CONFIG?.authDomain,
    // etc...
};
```

---

## ⚠️ Points Critiques de Sécurité

### ✅ TOUJOURS FAIRE :
- [x] Utiliser le fichier `firebase-config.js` séparé
- [x] Ajouter `firebase-config.js` au `.gitignore`
- [x] Configurer les règles Firestore restrictives
- [x] Utiliser HTTPS en production
- [x] Restreindre les domaines autorisés dans Firebase

### ❌ NE JAMAIS FAIRE :
- [ ] Commiter les clés API dans Git
- [ ] Laisser les règles Firestore en mode test
- [ ] Utiliser HTTP en production
- [ ] Partager le fichier `firebase-config.js`
- [ ] Oublier de configurer `.gitignore`

---

## 🆘 En Cas de Problème

### Si vous avez déjà commité vos clés :
```bash
# 🚨 URGENCE : Régénérer immédiatement les clés
# 1. Firebase Console > Paramètres > Général
# 2. Réinitialiser la clé API
# 3. Nettoyer l'historique Git :

git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch firebase-config.js' \
  --prune-empty --tag-name-filter cat -- --all

# 4. Forcer le push
git push origin --force --all
```

### Si le site ne fonctionne pas :
1. **Vérifier la console du navigateur** (F12)
2. **Vérifier que `firebase-config.js` existe**
3. **Vérifier les règles Firestore**
4. **Vérifier les domaines autorisés**

### Messages d'erreur courants :
- `Configuration Firebase manquante` → Créer `firebase-config.js`
- `Permission denied` → Vérifier les règles Firestore
- `API key not valid` → Régénérer la clé API
- `Domain not authorized` → Ajouter le domaine dans Firebase

---

## 🎯 Checklist de Déploiement

### Avant le déploiement :
- [ ] `firebase-config.js` créé avec vraies clés
- [ ] `.gitignore` configuré
- [ ] `firebase-config.js` ne remonte pas dans Git
- [ ] Règles Firestore sécurisées
- [ ] Domaines autorisés configurés
- [ ] Site testé en local

### Après le déploiement :
- [ ] Site accessible publiquement
- [ ] Médicaments s'affichent correctement
- [ ] WhatsApp fonctionne
- [ ] Recherche fonctionne
- [ ] Aucune erreur dans la console

---

## 📞 Support

En cas de problème :
1. **Vérifier ce guide** en premier
2. **Consulter la console du navigateur** (F12)
3. **Vérifier les logs Firebase** dans la console
4. **Tester étape par étape** la configuration

## 🔄 Mise à Jour

Pour mettre à jour vos clés ou configuration :
```bash
# 1. Modifier firebase-config.js (jamais commité)
# 2. Tester en local
# 3. Redéployer si nécessaire
# 4. Aucun git add/commit nécessaire !
```

---

**🎉 Félicitations !** Votre site est maintenant sécurisé et prêt pour la production ! 🚀