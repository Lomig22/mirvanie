/**
 * MIRVANIE - Landing Page Scripts
 * Premium SaaS Animation & Interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    initNavbar();
    initRevealAnimations();
    initCounterAnimations();
    initMobileNav();
    initSmoothScroll();
    initTypingAnimation();
});

/**
 * Navbar scroll behavior
 */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    function handleScroll() {
        const currentScroll = window.scrollY;
        
        // Add scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
}

/**
 * Mobile navigation toggle
 */
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    
    if (!navToggle || !navLinks) return;
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

/**
 * Reveal animations on scroll
 */
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index within viewport
                const delay = Array.from(reveals).indexOf(entry.target) % 4 * 100;
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });
}

/**
 * Counter animations for statistics
 */
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepDuration);
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Typing animation for the chat mockup
 */
function initTypingAnimation() {
    const typingIndicator = document.querySelector('.typing-indicator');
    const aiResponse = document.querySelector('.ai-response');
    
    if (!typingIndicator || !aiResponse) return;
    
    // Initial state: hide response, show typing
    aiResponse.style.opacity = '0';
    aiResponse.style.display = 'none';
    typingIndicator.style.display = 'flex';
    
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Start typing animation after delay
                setTimeout(() => {
                    typingIndicator.style.display = 'none';
                    aiResponse.style.display = 'block';
                    
                    // Fade in response
                    requestAnimationFrame(() => {
                        aiResponse.style.transition = 'opacity 0.5s ease';
                        aiResponse.style.opacity = '1';
                    });
                }, 2000);
                
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
}

/**
 * Add parallax effect to hero orbs
 */
document.addEventListener('mousemove', function(e) {
    const orbs = document.querySelectorAll('.hero-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

/**
 * Add hover effect to feature cards
 */
document.querySelectorAll('.feature-card, .problem-card, .audience-card, .trust-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

/**
 * Preloader (optional - can be enabled)
 */
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-logo">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="10" fill="url(#gradientPreload)"/>
                    <path d="M20 8L32 18V32H24V24H16V32H8V18L20 8Z" fill="white"/>
                    <circle cx="20" cy="20" r="3" fill="url(#gradientPreload)"/>
                    <defs>
                        <linearGradient id="gradientPreload" x1="0" y1="0" x2="40" y2="40">
                            <stop stop-color="#4F46E5"/>
                            <stop offset="1" stop-color="#7C3AED"/>
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div class="preloader-spinner"></div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .preloader {
            position: fixed;
            inset: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #FFFFFF;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        .preloader.hidden {
            opacity: 0;
            visibility: hidden;
        }
        .preloader-content {
            text-align: center;
        }
        .preloader-logo {
            width: 60px;
            height: 60px;
            margin-bottom: 20px;
        }
        .preloader-logo svg {
            width: 100%;
            height: 100%;
            animation: pulse 1.5s ease-in-out infinite;
        }
        .preloader-spinner {
            width: 40px;
            height: 40px;
            margin: 0 auto;
            border: 3px solid #E5E7EB;
            border-top-color: #4F46E5;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.prepend(preloader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            setTimeout(() => {
                preloader.remove();
                style.remove();
            }, 500);
        }, 500);
    });
}

// Uncomment to enable preloader
// initPreloader();

/**
 * Performance: Lazy load images (if any)
 */
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Add dynamic gradient to cards on hover
 */
const addGradientHover = () => {
    const cards = document.querySelectorAll('.feature-card, .audience-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = `
                radial-gradient(
                    400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
                    rgba(79, 70, 229, 0.06),
                    transparent 40%
                ),
                #FFFFFF
            `;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = '#FFFFFF';
        });
    });
};

// Initialize gradient hover effect
addGradientHover();

/**
 * Console branding
 */
console.log(
    '%c MIRVANIE %c L\'expertise immobilière augmentée par l\'IA ',
    'background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); color: white; padding: 10px 15px; font-size: 16px; font-weight: bold; border-radius: 4px 0 0 4px;',
    'background: #1F2937; color: #9CA3AF; padding: 10px 15px; font-size: 14px; border-radius: 0 4px 4px 0;'
);

/**
 * ===================================
 * N8N CHAT WIDGET
 * ===================================
 */

class N8NChatWidget {
    constructor(config = {}) {
        this.config = {
            webhookUrl: config.webhookUrl || 'YOUR_N8N_WEBHOOK_URL',
            apiKey: config.apiKey || null,
            welcomeMessage: config.welcomeMessage || 'Bonjour ! 👋 Je suis votre assistant IA immobilier. Comment puis-je vous aider aujourd\'hui ?',
            ...config
        };
        
        this.isOpen = false;
        this.messages = [];
        
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.attachEventListeners();
        this.loadChatHistory();
    }
    
    cacheElements() {
        this.chatToggle = document.getElementById('chat-toggle');
        this.chatWindow = document.getElementById('chat-window');
        this.chatMinimize = document.getElementById('chat-minimize');
        this.chatForm = document.getElementById('chat-form');
        this.chatInput = document.getElementById('chat-input');
        this.chatMessages = document.getElementById('chat-messages');
        this.chatBadge = document.getElementById('chat-badge');
    }
    
    attachEventListeners() {
        this.chatToggle.addEventListener('click', () => this.toggleChat());
        this.chatMinimize.addEventListener('click', () => this.closeChat());
        this.chatForm.addEventListener('submit', (e) => this.handleSubmit(e));
        
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.chatWindow.contains(e.target) && 
                !this.chatToggle.contains(e.target)) {
                this.closeChat();
            }
        });
    }
    
    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }
    
    openChat() {
        this.isOpen = true;
        this.chatToggle.classList.add('active');
        this.chatWindow.classList.add('active');
        this.chatBadge.classList.add('hidden');
        this.chatInput.focus();
    }
    
    closeChat() {
        this.isOpen = false;
        this.chatToggle.classList.remove('active');
        this.chatWindow.classList.remove('active');
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const message = this.chatInput.value.trim();
        if (!message) return;
        
        this.addMessage(message, 'user');
        this.chatInput.value = '';
        
        this.showTypingIndicator();
        
        try {
            const response = await this.sendToN8N(message);
            this.hideTypingIndicator();
            this.addMessage(response, 'ai');
        } catch (error) {
            this.hideTypingIndicator();
            this.addMessage('Désolé, une erreur s\'est produite. Veuillez réessayer.', 'ai');
            console.error('N8N Chat Error:', error);
        }
        
        this.saveChatHistory();
    }
    
    async sendToN8N(message) {
        if (this.config.webhookUrl === 'YOUR_N8N_WEBHOOK_URL') {
            return this.getMockResponse(message);
        }
        
        const headers = {
            'Content-Type': 'application/json'
        };
        
        if (this.config.apiKey) {
            headers['Authorization'] = `Bearer ${this.config.apiKey}`;
        }
        
        const response = await fetch(this.config.webhookUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                chatInput: message,
                sessionId: this.getSessionId()
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.output || data.response || data.message || data.text || 'Réponse reçue';
    }
    
    getMockResponse(message) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const responses = [
                    'Je peux vous aider avec l\'estimation de votre bien immobilier. Pouvez-vous me donner plus de détails sur votre propriété ?',
                    'Pour une analyse précise, j\'aurais besoin de connaître la localisation, la surface et le type de bien.',
                    'Excellente question ! Laissez-moi analyser cela pour vous...',
                    'D\'après les données du marché, je peux vous fournir une estimation détaillée. Quelle est l\'adresse du bien ?'
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                resolve(randomResponse);
            }, 1500);
        });
    }
    
    addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message-${type}`;
        
        const ouestLogo = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#1AABAA"/><circle cx="50" cy="50" r="38" stroke="white" stroke-width="8" fill="none" stroke-dasharray="210 30" stroke-dashoffset="-8" stroke-linecap="round"/><circle cx="50" cy="50" r="25" stroke="white" stroke-width="7" fill="none" stroke-dasharray="135 25" stroke-dashoffset="-6" stroke-linecap="round"/><circle cx="50" cy="50" r="12" stroke="white" stroke-width="6" fill="none" stroke-dasharray="60 18" stroke-dashoffset="-5" stroke-linecap="round"/><circle cx="73" cy="22" r="9" fill="#E8178A"/></svg>`;

        if (type === 'ai') {
            messageDiv.innerHTML = `
                <div class="message-avatar">${ouestLogo}</div>
                <div class="message-content">
                    <p>${this.formatMessage(text)}</p>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                    </svg>
                </div>
                <div class="message-content">
                    <p>${this.escapeHtml(text)}</p>
                </div>
            `;
        }
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        
        this.messages.push({ text, type, timestamp: Date.now() });
    }
    
    showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message-ai typing-message';
        typingDiv.innerHTML = `
            <div class="message-avatar">
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#1AABAA"/><circle cx="50" cy="50" r="38" stroke="white" stroke-width="8" fill="none" stroke-dasharray="210 30" stroke-dashoffset="-8" stroke-linecap="round"/><circle cx="50" cy="50" r="25" stroke="white" stroke-width="7" fill="none" stroke-dasharray="135 25" stroke-dashoffset="-6" stroke-linecap="round"/><circle cx="50" cy="50" r="12" stroke="white" stroke-width="6" fill="none" stroke-dasharray="60 18" stroke-dashoffset="-5" stroke-linecap="round"/><circle cx="73" cy="22" r="9" fill="#E8178A"/></svg>
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>
        `;
        
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingMessage = this.chatMessages.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    formatMessage(text) {
        let escaped = this.escapeHtml(text);
        
        escaped = escaped.replace(
            /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
        );
        
        escaped = escaped.replace(
            /(?<!href=")(https?:\/\/[^\s<]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );
        
        escaped = escaped.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        
        escaped = escaped.replace(/\n/g, '<br>');
        
        return escaped;
    }
    
    getSessionId() {
        let sessionId = localStorage.getItem('n8n_chat_session');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('n8n_chat_session', sessionId);
        }
        return sessionId;
    }
    
    saveChatHistory() {
        try {
            localStorage.setItem('n8n_chat_history', JSON.stringify(this.messages));
        } catch (e) {
            console.warn('Could not save chat history:', e);
        }
    }
    
    loadChatHistory() {
        try {
            const history = localStorage.getItem('n8n_chat_history');
            if (history) {
                this.messages = JSON.parse(history);
                const recentMessages = this.messages.slice(-10);
                
                this.chatMessages.innerHTML = '';
                
                this.addMessage(this.config.welcomeMessage, 'ai');
            }
        } catch (e) {
            console.warn('Could not load chat history:', e);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.mirvanieChat = new N8NChatWidget({
        webhookUrl: 'https://n8n.srv1525833.hstgr.cloud/webhook/d835658f-ebb3-438f-8e82-09dcea8f2e67/chat',
        apiKey: null,
        welcomeMessage: 'Bonjour ! 👋 Je suis l\'assistant IA Ouestelio. Comment puis-je vous aider aujourd\'hui ?'
    });
});
