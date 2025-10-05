# SneakerVerse - Premium Sneaker Website

A modern, responsive sneaker website featuring smooth scroll-triggered animations and transitions.

## Features

✨ **Cool Scroll Animations**
- Sneakers fade in and slide from left/right as you scroll
- 3D rotation effects on sneakers based on scroll position
- Parallax scrolling effects on sneaker images
- Smooth reveal animations for all content sections

🎨 **Modern Design**
- Beautiful gradient backgrounds
- SVG-based sneaker illustrations
- Responsive layout that works on all devices
- Hover effects and interactive elements

⚡ **Interactive Elements**
- Smooth scrolling navigation
- Animated buy buttons with ripple effects
- Newsletter subscription form
- Social media links

## How to Run

### Option 1: Open Directly in Browser
Simply open `index.html` in your web browser:
```bash
# On Linux/Mac
open index.html

# Or just double-click the index.html file
```

### Option 2: Use a Local Server (Recommended)
For the best experience, use a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Then open http://localhost:8000 in your browser
```

**Using Node.js (if you have it installed):**
```bash
npx serve
```

**Using PHP:**
```bash
php -S localhost:8000
```

## File Structure

```
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── script.js       # Scroll animations and interactivity
└── README.md       # This file
```

## Scroll Animation Features

1. **Intersection Observer**: Detects when elements enter the viewport
2. **Staggered Animations**: Cards appear one after another with delays
3. **Direction-based Slides**: Elements slide from different directions
4. **3D Rotations**: Sneakers rotate based on scroll position
5. **Parallax Effect**: Sneakers move at different speeds while scrolling
6. **Smooth Transitions**: All animations use easing functions for natural movement

## Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #e74c3c;
}
```

### Add More Sneakers
Copy a sneaker card in `index.html` and modify the:
- Sneaker name and description
- Price
- SVG design (change colors and shapes)
- Background gradient class

### Adjust Animation Speed
In `styles.css`, modify transition durations:
```css
.sneaker-card {
    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Performance

- Uses Intersection Observer API for efficient scroll detection
- RequestAnimationFrame for smooth animations
- Respects user's "prefers-reduced-motion" setting
- Optimized with throttling for scroll events

## Credits

Designed and developed with ❤️ for sneaker enthusiasts

Enjoy your new sneaker website! 👟✨
