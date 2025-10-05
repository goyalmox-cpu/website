// ========================================
// PERFORMANCE OPTIMIZED ANIMATIONS
// ========================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================================
// SMOOTH SCROLL NAVIGATION
// ========================================

document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// OPTIMIZED ADD TO CART
// ========================================

document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Create notification with hardware acceleration
        const notification = document.createElement('div');
        notification.textContent = 'ADDED TO CART';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: var(--neon-green);
            color: var(--deep-black);
            padding: 20px 40px;
            border-radius: 5px;
            font-weight: 700;
            font-family: 'Orbitron', sans-serif;
            letter-spacing: 2px;
            box-shadow: 0 0 20px var(--neon-green), 0 0 40px var(--neon-green);
            z-index: 1000;
            animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            transform: translate3d(0, 0, 0);
            will-change: transform, opacity;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 2 seconds with smooth animation
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => notification.remove(), 400);
        }, 2000);
    });
});

// ========================================
// SMOOTH 3D CARD INTERACTIONS
// ========================================

document.querySelectorAll('.sneaker-card').forEach(card => {
    let rafId = null;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let targetRotateX = 0;
    let targetRotateY = 0;
    
    const smoothRotate = () => {
        // Smooth interpolation for buttery animation
        currentRotateX += (targetRotateX - currentRotateX) * 0.1;
        currentRotateY += (targetRotateY - currentRotateY) * 0.1;
        
        card.style.transform = `perspective(1000px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) translate3d(0, -10px, 0)`;
        
        // Continue animation if not close enough to target
        if (Math.abs(targetRotateX - currentRotateX) > 0.01 || 
            Math.abs(targetRotateY - currentRotateY) > 0.01) {
            rafId = requestAnimationFrame(smoothRotate);
        }
    };
    
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Calculate rotation with reduced intensity for smoother effect
        targetRotateX = (y - centerY) / 30;
        targetRotateY = (centerX - x) / 30;
        
        // Start smooth animation if not already running
        if (!rafId) {
            rafId = requestAnimationFrame(smoothRotate);
        }
    });
    
    card.addEventListener('mouseleave', () => {
        targetRotateX = 0;
        targetRotateY = 0;
        
        // Animate back to original position
        const animateBack = () => {
            currentRotateX += (0 - currentRotateX) * 0.15;
            currentRotateY += (0 - currentRotateY) * 0.15;
            
            card.style.transform = `perspective(1000px) rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) translate3d(0, 0, 0)`;
            
            if (Math.abs(currentRotateX) > 0.01 || Math.abs(currentRotateY) > 0.01) {
                requestAnimationFrame(animateBack);
            } else {
                card.style.transform = '';
                currentRotateX = 0;
                currentRotateY = 0;
                rafId = null;
            }
        };
        
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
        requestAnimationFrame(animateBack);
    });
});

// ========================================
// CTA BUTTON SMOOTH SCROLL
// ========================================

const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const collection = document.querySelector('#collection');
        if (collection) {
            collection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ========================================
// CSS ANIMATIONS INJECTION
// ========================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translate3d(400px, 0, 0);
            opacity: 0;
        }
        to {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translate3d(0, 0, 0);
            opacity: 1;
        }
        to {
            transform: translate3d(400px, 0, 0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// OPTIMIZED PARALLAX EFFECT
// ========================================

const hero = document.querySelector('.hero');
let ticking = false;
let lastScrollY = 0;

const updateParallax = () => {
    if (hero) {
        const scrolled = lastScrollY;
        const translateY = scrolled * 0.5;
        const opacity = Math.max(0, 1 - (scrolled / 500));
        
        hero.style.transform = `translate3d(0, ${translateY}px, 0)`;
        hero.style.opacity = opacity;
    }
    ticking = false;
};

const onScroll = () => {
    lastScrollY = window.pageYOffset;
    
    if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
    }
};

// Use passive event listener for better scroll performance
window.addEventListener('scroll', onScroll, { passive: true });

// ========================================
// OPTIMIZED GLITCH EFFECT
// ========================================

const glitch = document.querySelector('.glitch');
let glitchInterval;

const applyGlitch = () => {
    if (glitch && Math.random() > 0.95) {
        const offsetX1 = Math.random() * 10 - 5;
        const offsetY1 = Math.random() * 10 - 5;
        const offsetX2 = Math.random() * 10 - 5;
        const offsetY2 = Math.random() * 10 - 5;
        
        glitch.style.textShadow = `
            ${offsetX1}px ${offsetY1}px 0 #ff0000,
            ${offsetX2}px ${offsetY2}px 0 #00ff41,
            0 0 20px var(--neon-green)
        `;
        
        // Reset after 50ms with RAF for smooth transition
        requestAnimationFrame(() => {
            setTimeout(() => {
                requestAnimationFrame(() => {
                    glitch.style.textShadow = `
                        0 0 10px var(--neon-green),
                        0 0 20px var(--neon-green),
                        0 0 30px var(--neon-green),
                        0 0 40px var(--cyber-green)
                    `;
                });
            }, 50);
        });
    }
};

// Use requestAnimationFrame instead of setInterval for smoother animation
const glitchLoop = () => {
    applyGlitch();
    setTimeout(() => {
        glitchInterval = requestAnimationFrame(glitchLoop);
    }, 100);
};

// Start glitch effect
glitchInterval = requestAnimationFrame(glitchLoop);

// ========================================
// PERFORMANCE MONITORING (Optional)
// ========================================

// Log performance metrics
console.log('%c🚀 FUTURE KICKS - Next Gen Sneakers', 'color: #00ff41; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00ff41;');
console.log('%c⚡ Performance Optimizations Active', 'color: #39ff14; font-size: 14px;');
console.log('%c✨ Hardware Acceleration: ENABLED', 'color: #00ff9f; font-size: 12px;');
console.log('%c🎯 Smooth Animations: ENABLED', 'color: #00ff9f; font-size: 12px;');
console.log('%c🔮 60 FPS Target: ACTIVE', 'color: #00ff9f; font-size: 12px;');

// ========================================
// PRELOAD OPTIMIZATION
// ========================================

// Preload critical resources for instant interactions
document.addEventListener('DOMContentLoaded', () => {
    // Force hardware acceleration on all cards
    document.querySelectorAll('.sneaker-card').forEach(card => {
        card.style.transform = 'translate3d(0, 0, 0)';
    });
    
    // Preload hover states
    document.querySelectorAll('.sneaker-img').forEach(img => {
        img.style.transform = 'translate3d(0, 0, 0)';
    });
    
    console.log('%c✅ Initialization Complete', 'color: #00ff41; font-size: 14px; font-weight: bold;');
});

// ========================================
// CLEANUP ON PAGE UNLOAD
// ========================================

window.addEventListener('beforeunload', () => {
    // Cancel any pending animation frames
    if (glitchInterval) {
        cancelAnimationFrame(glitchInterval);
    }
});
