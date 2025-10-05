// Scroll Animation Observer
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

// Create intersection observer for scroll animations
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all scroll-reveal elements
document.addEventListener('DOMContentLoaded', () => {
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    scrollRevealElements.forEach(element => {
        scrollObserver.observe(element);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
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

    // Enhanced sneaker card animations
    const sneakerCards = document.querySelectorAll('.sneaker-card');
    
    const sneakerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });

    sneakerCards.forEach(card => {
        sneakerObserver.observe(card);
    });

    // Parallax effect for sneaker images on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        sneakerCards.forEach((card, index) => {
            const cardTop = card.offsetTop;
            const cardHeight = card.offsetHeight;
            const windowHeight = window.innerHeight;
            
            if (scrolled > cardTop - windowHeight && scrolled < cardTop + cardHeight) {
                const sneakerVisual = card.querySelector('.sneaker-visual');
                const offset = (scrolled - (cardTop - windowHeight)) * 0.1;
                
                if (sneakerVisual) {
                    sneakerVisual.style.transform = `translateY(${offset}px) scale(1.05)`;
                }
            }
        });
    });

    // Add hover effect to sneaker SVGs
    sneakerCards.forEach(card => {
        const sneakerVisual = card.querySelector('.sneaker-visual');
        
        card.addEventListener('mouseenter', () => {
            sneakerVisual.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
        });
        
        card.addEventListener('mouseleave', () => {
            sneakerVisual.style.transition = 'transform 0.3s ease';
        });
    });

    // Buy button interactions
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create a ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
            
            // Show added to cart message
            const originalText = button.textContent;
            button.textContent = 'Added! ✓';
            button.style.background = 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            }, 2000);
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const button = newsletterForm.querySelector('button');
            
            const originalButtonText = button.textContent;
            button.textContent = 'Subscribed! ✓';
            button.style.background = '#2ecc71';
            
            setTimeout(() => {
                button.textContent = originalButtonText;
                button.style.background = 'white';
                input.value = '';
            }, 3000);
        });
    }

    // Add stagger animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200);
            }
        });
    }, {
        threshold: 0.3
    });

    featureCards.forEach(card => {
        featureObserver.observe(card);
    });

    // Cursor trail effect (optional cool effect)
    let mouseX = 0;
    let mouseY = 0;
    let trails = [];
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Animate scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const opacity = 1 - (window.scrollY / 500);
            scrollIndicator.style.opacity = opacity > 0 ? opacity : 0;
        });
    }

    // Add rotation effect to sneakers based on scroll position
    const addSneakerRotation = () => {
        const sneakerVisuals = document.querySelectorAll('.sneaker-visual');
        
        sneakerVisuals.forEach((visual, index) => {
            const card = visual.closest('.sneaker-card');
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + rect.height / 2;
            const windowCenter = window.innerHeight / 2;
            const distance = cardCenter - windowCenter;
            const maxRotation = 15;
            const rotation = (distance / windowCenter) * maxRotation;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                visual.style.transform = `rotateY(${rotation}deg) scale(1.05)`;
            }
        });
    };

    // Throttle scroll event for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                addSneakerRotation();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initialize on load
    addSneakerRotation();
});

// Add CSS for ripple animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.scroll-reveal, .sneaker-card, .feature-card').forEach(element => {
        element.style.transition = 'none';
    });
}
