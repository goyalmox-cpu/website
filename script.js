/* Sneaker Lab - scroll-driven transitions */
(function() {
  const stageElement = document.getElementById('stage');
  const gallerySection = document.getElementById('gallery');
  const productNameElement = document.getElementById('productName');
  const productDescElement = document.getElementById('productDesc');
  const yearElement = document.getElementById('year');
  if (yearElement) yearElement.textContent = String(new Date().getFullYear());

  const sneakers = [
    {
      title: 'Velocity X',
      desc: 'Featherweight runner with spring-loaded rebound.',
      primaryHue: 350, // red-magenta
      svg: getSneakerSvg({ hue: 350, accentHex: '#FF416C' })
    },
    {
      title: 'Aero Knit',
      desc: 'Ultra-breathable knit with precise lockdown.',
      primaryHue: 205, // blue-cyan
      svg: getSneakerSvg({ hue: 205, accentHex: '#3DB8FF' })
    },
    {
      title: 'Phantom Pro',
      desc: 'Responsive cushioning for explosive multidirectional moves.',
      primaryHue: 110, // lime-green
      svg: getSneakerSvg({ hue: 110, accentHex: '#A6FF3D' })
    }
  ];

  // Create frames
  const frameElements = sneakers.map((model, index) => {
    const frame = document.createElement('div');
    frame.className = 'frame';
    frame.dataset.index = String(index);

    const wrapper = document.createElement('div');
    wrapper.className = 'sneaker';
    wrapper.innerHTML = model.svg;

    frame.appendChild(wrapper);
    stageElement.appendChild(frame);
    return frame;
  });

  // Establish scrollable height based on frames
  const scrollMultiplier = 140; // vh per frame for nice pacing
  function updateGalleryHeight() {
    const totalVh = Math.max(260, sneakers.length * scrollMultiplier);
    gallerySection.style.height = totalVh + 'vh';
  }
  updateGalleryHeight();

  // Mouse-based parallax tilt
  let tiltX = 0, tiltY = 0;
  window.addEventListener('pointermove', (ev) => {
    const { innerWidth, innerHeight } = window;
    const nx = (ev.clientX / innerWidth) * 2 - 1; // -1..1
    const ny = (ev.clientY / innerHeight) * 2 - 1; // -1..1
    tiltX = ny * -6; // invert Y for natural tilt
    tiltY = nx * 6;
  });

  // Scroll-driven animation
  let rafPending = false;
  let lastProgress = 0;

  function onScrollRaf() {
    rafPending = false;

    const viewportHeight = window.innerHeight;
    const rect = gallerySection.getBoundingClientRect();
    const start = rect.top;
    const end = rect.bottom - viewportHeight;

    const raw = (0 - start) / Math.max(1, end - start);
    const progress = clamp(raw, 0, 1);

    if (Math.abs(progress - lastProgress) < 0.0005) return;
    lastProgress = progress;

    // Update background hue for subtle ambiance
    const hue = lerp(sneakers[0].primaryHue, sneakers[sneakers.length - 1].primaryHue, progress);
    document.documentElement.style.setProperty('--bgHue', String(Math.round(hue)));

    // Determine active frame float index
    const frameFloatIndex = progress * (frameElements.length - 1);

    // Update copy on hard index change
    const nearestIndex = Math.round(frameFloatIndex);
    const activeModel = sneakers[nearestIndex];
    if (productNameElement && productNameElement.textContent !== activeModel.title) {
      productNameElement.textContent = activeModel.title;
      productDescElement.textContent = activeModel.desc;
    }

    // Animate frames: crossfade + depth + rotation
    frameElements.forEach((frameEl, i) => {
      const sneakerEl = frameEl.firstElementChild;
      const distance = i - frameFloatIndex; // negative: past; positive: upcoming
      const absDistance = Math.abs(distance);

      // Opacity: strong on current, blend to neighbors within 1.0
      const opacity = 1 - clamp(absDistance, 0, 1);

      // Depth and motion: translateZ for presence, Y drift and slight rotation
      const translateZ = (1 - absDistance) * 220 - 140; // -140..~80
      const translateY = distance * 46; // px
      const rotationZ = distance * -10; // deg
      const scale = 0.86 + (1 - clamp(absDistance, 0, 1)) * 0.16; // 0.86..1.02

      // Tilt from pointer
      const tiltXLocal = tiltX * (1 - clamp(absDistance, 0, 1));
      const tiltYLocal = tiltY * (1 - clamp(absDistance, 0, 1));

      frameEl.style.opacity = String(opacity);
      frameEl.style.transform = `translateZ(0)`; // create a new compositing layer
      if (sneakerEl) {
        sneakerEl.style.transform = `
          translate3d(0, ${translateY.toFixed(2)}px, ${translateZ.toFixed(2)}px)
          rotateZ(${rotationZ.toFixed(2)}deg)
          rotateX(${tiltXLocal.toFixed(2)}deg)
          rotateY(${tiltYLocal.toFixed(2)}deg)
          scale(${scale.toFixed(3)})
        `;
      }

      // Adjust per-model accent glow strength
      const glowStrength = 0.25 + (1 - clamp(absDistance, 0, 1)) * 0.35;
      if (sneakerEl) {
        sneakerEl.style.filter = `drop-shadow(0 40px 70px rgba(0,0,0,0.65)) drop-shadow(0 0 24px rgba(255,255,255,${glowStrength.toFixed(3)}))`;
      }
    });
  }

  function onScroll() {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(onScrollRaf);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { updateGalleryHeight(); onScroll(); });

  // Initial paint
  onScroll();

  // Utilities
  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }
  function lerp(a, b, t) { return a + (b - a) * t; }

  // SVG factory for a stylized sneaker silhouette
  function getSneakerSvg({ hue = 205, accentHex = '#3DB8FF' } = {}) {
    const soleHue = hue;
    const upperHue = (hue + 20) % 360;
    const accentHue = (hue + 60) % 360;

    return `
<svg viewBox="0 0 1200 700" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="soleGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${soleHue} 70% 92%)" />
      <stop offset="100%" stop-color="hsl(${soleHue} 60% 82%)" />
    </linearGradient>
    <linearGradient id="upperGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="hsl(${upperHue} 90% 60%)" />
      <stop offset="100%" stop-color="hsl(${upperHue} 80% 46%)" />
    </linearGradient>
    <linearGradient id="shadowGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(0,0,0,0.2)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0)" />
    </linearGradient>
    <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
      <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .35 0" />
      <feBlend in="SourceGraphic" mode="normal" />
    </filter>
  </defs>

  <!-- sole -->
  <g transform="translate(40,420)">
    <path d="M40,120 C220,80 380,30 600,40 C780,48 910,90 1040,120 C1060,124 1080,140 1080,160 C1080,200 1020,220 980,230 C720,290 300,270 120,220 C60,204 20,180 20,160 C20,140 30,128 40,120 Z" fill="url(#soleGrad)" />
    <path d="M60,150 C260,120 360,120 580,135 C760,148 930,168 1010,180" stroke="rgba(0,0,0,.2)" stroke-width="18" stroke-linecap="round" filter="url(#soft)" />
  </g>

  <!-- upper -->
  <g transform="translate(90,90)">
    <path d="M120,300 C180,180 260,120 420,100 C640,72 800,120 980,220 C1010,236 1040,270 1040,310 C1040,360 980,420 880,440 C680,480 440,460 300,430 C200,410 140,380 120,340 C110,320 112,310 120,300 Z" fill="url(#upperGrad)" />

    <!-- collar -->
    <path d="M340,160 C420,120 520,110 640,120 C700,124 760,140 820,168 C760,150 700,144 640,142 C520,138 420,146 340,160 Z" fill="rgba(255,255,255,.25)" />

    <!-- laces -->
    <g stroke="#f7f7f7" stroke-width="16" stroke-linecap="round">
      <path d="M420,230 L720,220" />
      <path d="M410,270 L730,260" />
      <path d="M400,310 L740,300" />
      <path d="M395,350 L745,340" />
    </g>

    <!-- accent mark -->
    <path d="M520,360 C640,320 740,290 840,300 C800,320 720,352 640,380 C580,402 520,410 480,408 C494,392 506,376 520,360 Z" fill="${accentHex}" opacity=".85" />

    <!-- vent pattern -->
    <g opacity=".25" fill="#000">
      <circle cx="820" cy="330" r="6" />
      <circle cx="840" cy="324" r="6" />
      <circle cx="860" cy="318" r="6" />
      <circle cx="880" cy="312" r="6" />
      <circle cx="900" cy="306" r="6" />
    </g>
  </g>

  <!-- under shadow -->
  <ellipse cx="600" cy="610" rx="360" ry="40" fill="rgba(0,0,0,.55)" filter="url(#soft)" />
</svg>
    `;
  }
})();
