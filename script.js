// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
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

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add staggered animation for sneaker cards
            if (entry.target.classList.contains('sneaker-card')) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
            
            // Add staggered animation for feature cards
            if (entry.target.classList.contains('feature-card')) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.section-title, .sneaker-card, .feature-card, .about-text, .about-visual');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Animate section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
    
    // Animate sneaker cards with stagger
    const sneakerCards = document.querySelectorAll('.sneaker-card');
    sneakerCards.forEach(card => {
        observer.observe(card);
    });
    
    // Animate feature cards with stagger
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroSneaker = document.querySelector('.hero-sneaker');
    
    if (hero && heroSneaker) {
        const rate = scrolled * -0.5;
        heroSneaker.style.transform = `translateY(${rate}px)`;
    }
    
    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    if (scrolled > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// 3D rotation effect on mouse move for main sneaker
const mainSneaker = document.getElementById('main-sneaker');
if (mainSneaker) {
    document.addEventListener('mousemove', (e) => {
        const rect = mainSneaker.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        
        const rotateX = (deltaY / rect.height) * 20;
        const rotateY = (deltaX / rect.width) * 20;
        
        mainSneaker.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    // Reset rotation when mouse leaves
    mainSneaker.addEventListener('mouseleave', () => {
        mainSneaker.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
}

// Sneaker card hover effects
document.querySelectorAll('.sneaker-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const sneaker3D = card.querySelector('.sneaker-3d-mini');
        if (sneaker3D) {
            sneaker3D.style.transform = 'rotateY(15deg) rotateX(5deg) scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const sneaker3D = card.querySelector('.sneaker-3d-mini');
        if (sneaker3D) {
            sneaker3D.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
        }
    });
});

// CTA button interactions
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        // Add ripple effect
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles
const style = document.createElement('style');
style.textContent = `
    .cta-button {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll progress indicator
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #e74c3c, #f39c12);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Initialize scroll progress
createScrollProgress();

// Floating animation for about section sneakers
const floatingSneakers = document.querySelectorAll('.floating-sneaker');
floatingSneakers.forEach((sneaker, index) => {
    sneaker.style.animationDelay = `${index * 0.5}s`;
});

// Intersection Observer for more complex animations
const createAdvancedObserver = () => {
    const advancedObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add specific animations based on element type
                if (entry.target.classList.contains('sneaker-card')) {
                    entry.target.style.animation = 'slideInUp 0.8s ease forwards';
                }
                
                if (entry.target.classList.contains('feature-card')) {
                    entry.target.style.animation = 'fadeInScale 0.8s ease forwards';
                }
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all animated elements
    document.querySelectorAll('.sneaker-card, .feature-card').forEach(el => {
        advancedObserver.observe(el);
    });
};

// Add additional keyframes for advanced animations
const advancedStyles = document.createElement('style');
advancedStyles.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    .sneaker-card {
        opacity: 0;
        transform: translateY(50px);
    }
    
    .feature-card {
        opacity: 0;
        transform: scale(0.8);
    }
`;
document.head.appendChild(advancedStyles);

// Initialize advanced observer
createAdvancedObserver();

// Performance optimization: Throttle scroll events
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
};

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Parallax and other scroll-based animations
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroSneaker = document.querySelector('.hero-sneaker');
    
    if (hero && heroSneaker) {
        const rate = scrolled * -0.3;
        heroSneaker.style.transform = `translateY(${rate}px)`;
    }
}, 16)); // ~60fps

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButton = document.querySelector('.cta-button');
        
        if (heroTitle) heroTitle.style.animation = 'slideInUp 1s ease 0.5s forwards';
        if (heroSubtitle) heroSubtitle.style.animation = 'slideInUp 1s ease 0.7s forwards';
        if (heroButton) heroButton.style.animation = 'slideInUp 1s ease 0.9s forwards';
    }, 100);
});

// Add smooth reveal animation for sections
const revealSections = () => {
    const sections = document.querySelectorAll('section');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.15
    });
    
    sections.forEach(section => {
        section.classList.add('reveal-section');
        revealObserver.observe(section);
    });
};

// Add reveal animation styles
const revealStyles = document.createElement('style');
revealStyles.textContent = `
    .reveal-section {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    .reveal-section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(revealStyles);

// Initialize reveal animations
revealSections();