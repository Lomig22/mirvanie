/**
 * MIRVANY - Landing Page Scripts
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
    '%c MIRVANY %c L\'expertise immobilière augmentée par l\'IA ',
    'background: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%); color: white; padding: 10px 15px; font-size: 16px; font-weight: bold; border-radius: 4px 0 0 4px;',
    'background: #1F2937; color: #9CA3AF; padding: 10px 15px; font-size: 14px; border-radius: 0 4px 4px 0;'
);
