// Smooth scroll for navigation links
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

// Add to cart functionality
document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Create notification
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
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 2 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    });
});

// Card interaction effects
document.querySelectorAll('.sneaker-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// CTA Button click effect
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('#collection').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / 500);
    }
});

// Random glitch effect on title
setInterval(() => {
    const glitch = document.querySelector('.glitch');
    if (glitch && Math.random() > 0.95) {
        glitch.style.textShadow = `
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #ff0000,
            ${Math.random() * 10 - 5}px ${Math.random() * 10 - 5}px 0 #00ff41,
            0 0 20px var(--neon-green)
        `;
        
        setTimeout(() => {
            glitch.style.textShadow = `
                0 0 10px var(--neon-green),
                0 0 20px var(--neon-green),
                0 0 30px var(--neon-green),
                0 0 40px var(--cyber-green)
            `;
        }, 50);
    }
}, 100);

console.log('%c🚀 FUTURE KICKS - Next Gen Sneakers', 'color: #00ff41; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00ff41;');
