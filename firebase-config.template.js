// firebase-config.template.js
// 📋 TEMPLATE POUR LA CONFIGURATION FIREBASE
// ⚠️ Copiez ce fichier vers firebase-config.js et remplissez vos vraies valeurs

window.FIREBASE_CONFIG = {
    apiKey: "VOTRE_API_KEY_ICI",
    authDomain: "votre-projet.firebaseapp.com",
    projectId: "votre-project-id",
    storageBucket: "votre-projet.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};

// Configuration de votre pharmacie
window.PHARMACY_CONFIG = {
    societeId: "VOTRE_SOCIETE_ID_FIRESTORE", // ID de votre société dans Firestore
    phoneNumber: "212661112540", // Votre numéro WhatsApp (format: sans le +)
    pharmacyName: "Nom de votre pharmacie",
    address: "Adresse complète de votre pharmacie"
};

/* 
🔧 INSTRUCTIONS D'INSTALLATION :

1. Copiez ce fichier :
   cp firebase-config.template.js firebase-config.js

2. Éditez firebase-config.js avec vos vraies valeurs Firebase

3. IMPORTANT : Ne commitez JAMAIS firebase-config.js dans Git !
   Le fichier .gitignore s'en charge automatiquement.

4. Pour obtenir vos clés Firebase :
   - Allez sur https://console.firebase.google.com
   - Sélectionnez votre projet
   - Paramètres du projet > Général > Vos applications
   - Copiez la configuration

📚 Pour plus d'aide, consultez README-Sécurité.md
*/