import VanillaTilt from 'vanilla-tilt';

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const closeModal = document.querySelector('.close');
const ctaButton = document.querySelector('.cta-button');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeTilt();
    initializeScrollAnimations();
    initializeGallery();
    initializeModal();
    initializeSmoothScroll();
});

// Navigation functionality
function initializeNavigation() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Handle navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(30, 42, 74, 0.98)';
        } else {
            navbar.style.background = 'rgba(30, 42, 74, 0.95)';
        }
    });
}

// Initialize Vanilla Tilt
function initializeTilt() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    
    VanillaTilt.init(tiltElements, {
        max: 12,
        speed: 300,
        glare: true,
        'max-glare': 0.3,
        perspective: 1000,
        scale: 1.05,
        gyroscope: true,
        'reset-to-start': false,
        'glare-prerender': false
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Stagger gallery items animation
                if (entry.target.classList.contains('gallery')) {
                    const items = entry.target.querySelectorAll('.gallery-item');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('animate');
                        }, index * 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe elements for animation
    document.querySelectorAll('.section-title, .section-subtitle, .gallery, .gallery-item').forEach(el => {
        observer.observe(el);
    });
}

// Gallery functionality
function initializeGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        
        // Image loading
            // 画像がすでにロード済みの場合も対応
            if (img.complete && img.naturalWidth !== 0) {
                img.setAttribute('data-loaded', 'true');
            } else {
                img.setAttribute('data-loaded', 'false');
                img.onload = () => {
                    img.setAttribute('data-loaded', 'true');
                };
            }
        
        // Click handler for modal
        item.addEventListener('click', () => {
            openModal(item);
        });
        
        // Enhanced hover effects
        item.addEventListener('mouseenter', () => {
            item.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transition = 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
    });
}

// Modal functionality
function initializeModal() {
    closeModal.addEventListener('click', closeModalHandler);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalHandler();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModalHandler();
        }
    });
}

function openModal(galleryItem) {
    const img = galleryItem.querySelector('img');
    const title = galleryItem.querySelector('.overlay h3').textContent;
    const description = galleryItem.querySelector('.overlay p').textContent;
    
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Animate modal appearance
    setTimeout(() => {
        modal.style.opacity = '1';
        modalImg.style.transform = 'scale(1)';
    }, 10);
}

function closeModalHandler() {
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Smooth scroll for CTA button
function initializeSmoothScroll() {
    ctaButton.addEventListener('click', () => {
        document.getElementById('logo').scrollIntoView({
            behavior: 'smooth'
        });
    });
}

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    const rate = scrolled * -0.5;
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});

// Dynamic background particles effect
function createParticles() {
    const hero = document.querySelector('.hero');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(96, 165, 250, 0.6);
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(particle);
    }
}

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.8;
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize particles
createParticles();

// Performance optimization for scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = requestAnimationFrame(() => {
        // Your scroll-based animations here
    });
});

// Preload images for better performance
function preloadImages() {
    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
        const imagePreloader = new Image();
        imagePreloader.src = img.src;
    });
}

preloadImages();

// Add loading state for gallery items
function handleImageLoading() {
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    galleryImages.forEach(img => {
        img.addEventListener('load', () => {
            img.parentElement.classList.add('loaded');
        });
    });
}

handleImageLoading();

// Touch device optimizations
function optimizeForTouch() {
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // Adjust tilt settings for mobile
        const tiltElements = document.querySelectorAll('[data-tilt]');
        VanillaTilt.init(tiltElements, {
            max: 8,
            speed: 800,
            glare: false,
            scale: 1.01,
            gyroscope: false
        });
    }
}

optimizeForTouch();

// Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        triggerEasterEgg();
        konamiCode = [];
    }
});

function triggerEasterEgg() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'rainbow 2s ease-in-out';
        }, index * 100);
    });
    
    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(rainbowStyle);
}