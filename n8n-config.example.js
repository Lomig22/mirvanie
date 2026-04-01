/**
 * Configuration N8N pour le chatbot Mirvanie
 * 
 * Instructions:
 * 1. Copiez ce fichier et renommez-le en 'n8n-config.js'
 * 2. Remplacez 'YOUR_N8N_WEBHOOK_URL' par l'URL de votre webhook N8N
 * 3. (Optionnel) Ajoutez votre clé API si votre webhook est sécurisé
 * 4. Importez ce fichier dans index.html avant script.js
 */

const N8N_CONFIG = {
    // URL du webhook N8N (OBLIGATOIRE)
    // Exemple: 'https://your-n8n-instance.com/webhook/chat'
    webhookUrl: 'YOUR_N8N_WEBHOOK_URL',
    
    // Clé API pour sécuriser les appels (OPTIONNEL)
    // Si votre workflow N8N nécessite une authentification
    apiKey: null,
    
    // Message de bienvenue personnalisé (OPTIONNEL)
    welcomeMessage: 'Bonjour ! 👋 Je suis votre assistant IA immobilier. Comment puis-je vous aider aujourd\'hui ?',
    
    // Autres paramètres personnalisables
    settings: {
        // Activer/désactiver la sauvegarde de l'historique
        saveHistory: true,
        
        // Nombre maximum de messages à sauvegarder
        maxHistoryMessages: 50,
        
        // Délai de simulation de frappe (en ms) pour le mode démo
        typingDelay: 1500
    }
};

/**
 * Structure attendue de la réponse N8N:
 * 
 * {
 *   "response": "Texte de la réponse de l'IA",
 *   "sessionId": "session_id_optionnel",
 *   "metadata": {
 *     "confidence": 0.95,
 *     "intent": "estimation_immobiliere"
 *   }
 * }
 * 
 * Le chatbot cherchera la réponse dans cet ordre:
 * 1. data.response
 * 2. data.message
 * 3. data.output
 */

/**
 * Structure de la requête envoyée à N8N:
 * 
 * {
 *   "message": "Question de l'utilisateur",
 *   "sessionId": "session_unique_id",
 *   "timestamp": "2026-04-01T20:44:00.000Z"
 * }
 */
