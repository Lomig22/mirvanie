# 🤖 Chatbot N8N - Guide d'intégration Mirvanie

## 📋 Vue d'ensemble

Un widget de chat IA personnalisé a été intégré à votre site Mirvanie. Il se connecte à N8N via webhook pour fournir des réponses intelligentes aux questions immobilières de vos visiteurs.

## ✅ Ce qui a été installé

### 1. **Widget de chat flottant** (`index.html`)
- Bouton de chat en bas à droite de la page
- Fenêtre de chat moderne et responsive
- Badge de notification
- Interface utilisateur cohérente avec le design Mirvanie

### 2. **Styles CSS** (`styles.css`)
- Design moderne avec animations fluides
- Responsive (mobile, tablette, desktop)
- Thème cohérent avec votre charte graphique
- Effets de hover et transitions

### 3. **Logique JavaScript** (`script.js`)
- Classe `N8NChatWidget` complète
- Gestion des messages utilisateur/IA
- Connexion au webhook N8N
- Sauvegarde de l'historique dans localStorage
- Mode démo avec réponses simulées

### 4. **Configuration** (`n8n-config.example.js`)
- Fichier d'exemple de configuration
- Documentation des paramètres
- Structure des requêtes/réponses

## 🚀 Configuration N8N

### Étape 1: Créer votre workflow N8N

1. **Créez un nouveau workflow dans N8N**
2. **Ajoutez un node "Webhook"**
   - Method: POST
   - Path: `/webhook/mirvanie-chat` (ou autre)
   - Response Mode: "Respond to Webhook"

3. **Ajoutez votre logique IA**
   - Node OpenAI / ChatGPT
   - Node Custom API
   - Ou tout autre service d'IA

4. **Configurez la réponse**
   - Format JSON attendu:
   ```json
   {
     "response": "Votre réponse IA ici",
     "sessionId": "{{ $json.sessionId }}",
     "metadata": {
       "confidence": 0.95
     }
   }
   ```

### Étape 2: Récupérer l'URL du webhook

1. Activez votre workflow N8N
2. Copiez l'URL du webhook (ex: `https://your-n8n.com/webhook/mirvanie-chat`)

### Étape 3: Configurer le chatbot

**Option A - Configuration directe dans script.js:**

Ouvrez `script.js` et modifiez la ligne 647:

```javascript
window.mirvanieChat = new N8NChatWidget({
    webhookUrl: 'https://your-n8n.com/webhook/mirvanie-chat', // ← Votre URL ici
    apiKey: null, // Optionnel: votre clé API si nécessaire
    welcomeMessage: 'Bonjour ! 👋 Je suis votre assistant IA immobilier.'
});
```

**Option B - Utiliser un fichier de configuration:**

1. Copiez `n8n-config.example.js` → `n8n-config.js`
2. Modifiez les paramètres dans `n8n-config.js`
3. Ajoutez dans `index.html` avant `script.js`:
```html
<script src="n8n-config.js"></script>
<script src="script.js"></script>
```

## 📡 Structure des données

### Requête envoyée à N8N:
```json
{
  "message": "Quelle est la valeur de mon appartement ?",
  "sessionId": "session_1234567890_abc123",
  "timestamp": "2026-04-01T20:44:00.000Z"
}
```

### Réponse attendue de N8N:
```json
{
  "response": "Pour estimer votre appartement, j'aurais besoin de...",
  "sessionId": "session_1234567890_abc123",
  "metadata": {
    "confidence": 0.95,
    "intent": "estimation"
  }
}
```

Le chatbot cherche la réponse dans cet ordre:
1. `data.response`
2. `data.message`
3. `data.output`

## 🎨 Personnalisation

### Modifier le message de bienvenue:
```javascript
welcomeMessage: 'Votre message personnalisé ici'
```

### Ajouter une clé API:
```javascript
apiKey: 'votre-cle-api-secrete'
```

### Modifier les couleurs:
Les couleurs utilisent les variables CSS de votre site dans `styles.css`:
- `--primary-600`: Couleur principale
- `--accent-600`: Couleur d'accent
- `--gradient-primary`: Dégradé

## 🧪 Mode démo

Par défaut, si l'URL du webhook est `'YOUR_N8N_WEBHOOK_URL'`, le chatbot fonctionne en **mode démo** avec des réponses simulées. Cela vous permet de tester l'interface avant de connecter N8N.

## 🔧 Fonctionnalités

✅ **Interface moderne et responsive**
✅ **Animations fluides**
✅ **Indicateur de frappe**
✅ **Sauvegarde de l'historique** (localStorage)
✅ **Gestion des sessions**
✅ **Gestion des erreurs**
✅ **Mode démo intégré**
✅ **Sécurité XSS** (échappement HTML)
✅ **Fermeture au clic extérieur**
✅ **Badge de notification**

## 📱 Responsive

Le widget s'adapte automatiquement:
- **Desktop**: 400px × 600px
- **Mobile**: Plein écran avec marges
- **Tablette**: Adaptatif

## 🔒 Sécurité

- Échappement HTML pour prévenir les attaques XSS
- Support de l'authentification par API Key
- Session ID unique par utilisateur
- Validation des entrées

## 🐛 Débogage

Ouvrez la console du navigateur (F12) pour voir:
- Les erreurs de connexion N8N
- Les requêtes/réponses
- Les messages de débogage

## 📞 Support

Pour toute question sur l'intégration:
1. Vérifiez que l'URL du webhook est correcte
2. Testez votre workflow N8N directement
3. Vérifiez la console pour les erreurs
4. Assurez-vous que CORS est configuré sur N8N

## 🎯 Prochaines étapes

1. ✅ Créer votre workflow N8N
2. ✅ Récupérer l'URL du webhook
3. ✅ Configurer le chatbot avec votre URL
4. ✅ Tester l'intégration
5. ✅ Personnaliser les messages
6. ✅ Déployer en production

---

**Développé pour Mirvanie** - L'expertise immobilière augmentée par l'IA
