/**
 * ==========================================================================
 * SATYAM MAURYA - 3D MARVEL STARK HUD PORTFOLIO ENGINE (SCRIPT.JS)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. JARVIS LOADER ENGINE
  // --------------------------------------------------------------------------
  const loaderWrapper = document.getElementById('loader-wrapper');
  const loaderBar = document.getElementById('loader-bar');
  const loaderCount = document.getElementById('loader-count');

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 8) + 4;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);

      setTimeout(() => {
        loaderWrapper.classList.add('fade-out');
        document.body.style.overflowY = 'auto';
        initTypingEngine();
        initStatsCounter();
      }, 500);
    }
    if (loaderBar) loaderBar.style.width = `${progress}%`;
    if (loaderCount) loaderCount.textContent = progress;
  }, 40);


  // --------------------------------------------------------------------------
  // 2. THREE.JS 3D PARTICLE UNIVERSE CANVAS
  // --------------------------------------------------------------------------
  const init3DUniverse = () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof Three === 'undefined' && typeof THREE === 'undefined') {
      console.warn('Three.js canvas not found or library pending loading.');
      return;
    }

    const ThreeLib = window.THREE;
    const scene = new ThreeLib.Scene();
    const camera = new ThreeLib.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new ThreeLib.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create 3D Particle Stars Geometry
    const particleCount = 1200;
    const geometry = new ThreeLib.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorCyan = new ThreeLib.Color('#00f0ff');
    const colorRed = new ThreeLib.Color('#ff0055');
    const colorPurple = new ThreeLib.Color('#7000ff');

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;

      // Random color assignment
      const mixedColor = Math.random() > 0.5 ? colorCyan : (Math.random() > 0.5 ? colorRed : colorPurple);
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new ThreeLib.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new ThreeLib.BufferAttribute(colors, 3));

    // Particle Shader Material
    const material = new ThreeLib.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.8
    });

    const particleMesh = new ThreeLib.Points(geometry, material);
    scene.add(particleMesh);

    camera.position.z = 5;

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5;
    });

    // Animation Render Loop
    const clock = new ThreeLib.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      const scrollY = window.scrollY || window.pageYOffset;
      particleMesh.rotation.y = elapsedTime * 0.05 + mouseX + scrollY * 0.0004;
      particleMesh.rotation.x = elapsedTime * 0.03 + mouseY + scrollY * 0.0003;
      camera.position.y = -scrollY * 0.0025;
      camera.position.z = 5 + Math.sin(scrollY * 0.001) * 0.5;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  };

  init3DUniverse();


  // --------------------------------------------------------------------------
  // 3. CUSTOM INTERACTIVE CURSOR ENGINE
  // --------------------------------------------------------------------------
  const cursorDot = document.getElementById('cursor-dot');
  const cursorOutline = document.getElementById('cursor-outline');

  if (cursorDot && cursorOutline) {
    let cursorX = 0, cursorY = 0;
    let outlineX = 0, outlineY = 0;

    window.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      cursorDot.style.left = `${cursorX}px`;
      cursorDot.style.top = `${cursorY}px`;
    });

    const animateCursor = () => {
      outlineX += (cursorX - outlineX) * 0.15;
      outlineY += (cursorY - outlineY) * 0.15;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover effect triggers on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .tilt-card, .filter-btn');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }


  // --------------------------------------------------------------------------
  // 4. DYNAMIC MULTI-ROLE TYPING ENGINE
  // --------------------------------------------------------------------------
  function initTypingEngine() {
    const typingTextEl = document.getElementById('typing-text');
    if (!typingTextEl) return;

    const roles = [
      'AI App Developer',
      'Flutter Mobile Engineer',
      'Frontend Web Developer',
      'Graphic & UI/UX Designer',
      'Power BI Data Enthusiast'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeSpeed = 90;
    const deleteSpeed = 50;
    const pauseTime = 1800;

    function type() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typingTextEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingTextEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let currentSpeed = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentRole.length) {
        currentSpeed = pauseTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        currentSpeed = 400;
      }

      setTimeout(type, currentSpeed);
    }

    type();
  }


  // --------------------------------------------------------------------------
  // 5. STATS COUNTER ANIMATION ENGINE
  // --------------------------------------------------------------------------
  function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;

    const countUp = () => {
      statNumbers.forEach((stat) => {
        const target = +stat.getAttribute('data-target');
        const count = +stat.innerText;
        const speed = target / 30;

        if (count < target) {
          stat.innerText = Math.ceil(count + speed);
          setTimeout(countUp, 40);
        } else {
          stat.innerText = target;
        }
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counted) {
          countUp();
          counted = true;
        }
      });
    }, { threshold: 0.5 });

    const statsStrip = document.querySelector('.hero-stats-strip');
    if (statsStrip) observer.observe(statsStrip);
  }


  // --------------------------------------------------------------------------
  // 6. VANILLA 3D CARD PERSPECTIVE TILT EFFECT
  // --------------------------------------------------------------------------
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });


  // --------------------------------------------------------------------------
  // 7. FILTERABLE PROJECTS SHOWCASE MATRIX
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hide');
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.classList.add('hide');
        }
      });
    });
  });


  // --------------------------------------------------------------------------
  // 8. STICKY NAVBAR & ACTIVE SECTION OBSERVER
  // --------------------------------------------------------------------------
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      if (navbar) navbar.classList.add('scrolled');
      if (backToTopBtn) backToTopBtn.classList.add('visible');
    } else {
      if (navbar) navbar.classList.remove('scrolled');
      if (backToTopBtn) backToTopBtn.classList.remove('visible');
    }
  });

  // Mobile Drawer Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksWrapper = document.querySelector('.nav-links-wrapper');

  if (mobileToggle && navLinksWrapper) {
    mobileToggle.addEventListener('click', () => {
      navLinksWrapper.classList.toggle('open');
    });

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navLinksWrapper.classList.remove('open');
      });
    });
  }

  // Active Link Observer
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach((sec) => navObserver.observe(sec));


  // --------------------------------------------------------------------------
  // 9. COPY EMAIL TO CLIPBOARD & CONTACT FORM ENGINE
  // --------------------------------------------------------------------------
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('aaryasam94@gmail.com').then(() => {
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #27c93f;"></i>';
        setTimeout(() => {
          copyEmailBtn.innerHTML = '<i class="fa-solid fa-copy"></i>';
        }, 2000);
      });
    });
  }

  const contactForm = document.getElementById('contact-form');
  const formAlert = document.getElementById('form-alert');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (formAlert) {
        formAlert.className = 'form-alert success';
        formAlert.innerHTML = '<i class="fa-solid fa-circle-check"></i> TRANSMISSION RECEIVED! Thank you for reaching out, Satyam will reply shortly.';
        contactForm.reset();

        setTimeout(() => {
          formAlert.className = 'form-alert hidden';
        }, 6000);
      }
    });
  }


  // --------------------------------------------------------------------------
  // 10. SCI-FI AMBIENCE SYNTH AUDIO TOGGLE (WEB AUDIO API)
  // --------------------------------------------------------------------------
  const audioToggleBtn = document.getElementById('audio-toggle');
  let audioCtx = null;
  let oscillator = null;
  let gainNode = null;
  let isPlayingSound = false;

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContext();
      }

      if (!isPlayingSound) {
        // Create Sci-Fi Ambient Hum Tone
        oscillator = audioCtx.createOscillator();
        gainNode = audioCtx.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(110, audioCtx.currentTime); // Low 110Hz sci-fi hum
        gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime); // Gentle background volume

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.start();

        isPlayingSound = true;
        audioToggleBtn.style.color = '#ff0055';
        audioToggleBtn.style.borderColor = '#ff0055';
        audioToggleBtn.style.boxShadow = '0 0 15px rgba(255, 0, 85, 0.4)';
      } else {
        if (oscillator) oscillator.stop();
        isPlayingSound = false;
        audioToggleBtn.style.color = '#00f0ff';
        audioToggleBtn.style.borderColor = 'rgba(0, 240, 255, 0.2)';
        audioToggleBtn.style.boxShadow = 'none';
      }
    });
  }


  // --------------------------------------------------------------------------
  // 11. 3D PERSPECTIVE SCROLL REVEAL ENGINE
  // --------------------------------------------------------------------------
  function init3DScrollReveal() {
    const revealTargets = document.querySelectorAll(
      '.section-header, .glass-card, .project-card, .service-card, .skill-category-card, .timeline-item, .certificate-card, .stat-card, .about-bio-card'
    );

    revealTargets.forEach((el, idx) => {
      // Add staggered 3D animation class
      if (idx % 2 === 0) {
        el.classList.add('reveal-3d');
      } else if (idx % 3 === 1) {
        el.classList.add('reveal-3d-left');
      } else {
        el.classList.add('reveal-3d-right');
      }
    });

    const observerOptions = {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Staggered reveal for grid items
          const parentGrid = entry.target.parentElement;
          if (parentGrid && (parentGrid.classList.contains('projects-grid') || 
                             parentGrid.classList.contains('services-grid') || 
                             parentGrid.classList.contains('skills-grid'))) {
            const siblings = Array.from(parentGrid.children);
            const childIdx = siblings.indexOf(entry.target);
            setTimeout(() => {
              entry.target.classList.add('active');
            }, (childIdx % 3) * 110);
          } else {
            entry.target.classList.add('active');
          }
        }
      });
    }, observerOptions);

    revealTargets.forEach((target) => scrollObserver.observe(target));
  }

  init3DScrollReveal();


  // --------------------------------------------------------------------------
  // 12. DYNAMIC MARVEL AVENGERS VISUAL FX ENGINE (SPIDER-MAN, THOR, IRON MAN, HULK, PANTHER)
  // --------------------------------------------------------------------------
  const initAvengersFX = () => {
    const fxCanvas = document.getElementById('avengers-fx-canvas');
    if (!fxCanvas) return;

    const ctx = fxCanvas.getContext('2d');
    let width = (fxCanvas.width = window.innerWidth);
    let height = (fxCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = fxCanvas.width = window.innerWidth;
      height = fxCanvas.height = window.innerHeight;
    });

    // ---------------------------------------------------------
    // A. SPIDER-MAN REAL MOVING SPIDER ENGINE
    // ---------------------------------------------------------
    class Spider {
      constructor() {
        this.x = width * 0.85;
        this.y = height * 0.25;
        this.targetX = width * 0.85;
        this.targetY = height * 0.45;
        this.size = 18;
        this.speed = 2;
        this.angle = 0;
        this.legCycle = 0;
        this.pickNewTarget();
      }

      pickNewTarget() {
        const side = Math.random() > 0.5 ? 'right' : 'left';
        this.targetX = side === 'right' ? width * (0.82 + Math.random() * 0.12) : width * (0.05 + Math.random() * 0.12);
        this.targetY = height * (0.15 + Math.random() * 0.7);
      }

      update() {
        const dx = this.targetX - this.x;
        const dy = this.targetY - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 10) {
          this.pickNewTarget();
        } else {
          this.angle = Math.atan2(dy, dx);
          this.x += Math.cos(this.angle) * this.speed;
          this.y += Math.sin(this.angle) * this.speed;
          this.legCycle += 0.18;
        }
      }

      draw() {
        // Draw Web Line from top of screen to Spider
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.x, 0);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.restore();

        // Draw Spider Body & 8 Jointed Legs
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle + Math.PI / 2);

        ctx.strokeStyle = '#ff0044';
        ctx.shadowColor = '#ff0044';
        ctx.shadowBlur = 8;
        ctx.lineWidth = 2;

        for (let side of [-1, 1]) {
          for (let i = 0; i < 4; i++) {
            const legOffset = (i - 1.5) * 4;
            const swing = Math.sin(this.legCycle + i) * 6;
            ctx.beginPath();
            ctx.moveTo(side * 4, legOffset);
            const jx = side * (12 + Math.abs(legOffset));
            const jy = legOffset + swing;
            ctx.lineTo(jx, jy);
            const tx = side * (20 + Math.abs(legOffset));
            const ty = legOffset + swing * 1.5 + (i > 1 ? 8 : -8);
            ctx.lineTo(tx, ty);
            ctx.stroke();
          }
        }

        // Body
        ctx.beginPath();
        ctx.ellipse(0, 5, 6, 9, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#110206';
        ctx.fill();
        ctx.strokeStyle = '#ff0044';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Head
        ctx.beginPath();
        ctx.arc(0, -5, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ff0044';
        ctx.fill();

        // Glowing Eyes
        ctx.fillStyle = '#00f0ff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 6;
        ctx.fillRect(-2, -7, 1.5, 1.5);
        ctx.fillRect(1, -7, 1.5, 1.5);

        ctx.restore();
      }
    }

    const spider = new Spider();

    // ---------------------------------------------------------
    // B. THOR ELECTRIC THUNDER & LIGHTNING ENGINE
    // ---------------------------------------------------------
    let lightningBolts = [];
    let lightningFlashAlpha = 0;

    function createLightningPath(x1, y1, x2, y2) {
      let segments = [{ x1, y1, x2, y2 }];
      let displacement = 80;

      for (let i = 0; i < 4; i++) {
        let newSegments = [];
        for (let seg of segments) {
          let midX = (seg.x1 + seg.x2) / 2 + (Math.random() - 0.5) * displacement;
          let midY = (seg.y1 + seg.y2) / 2 + (Math.random() - 0.5) * displacement;
          newSegments.push({ x1: seg.x1, y1: seg.y1, x2: midX, y2: midY });
          newSegments.push({ x1: midX, y1: midY, x2: seg.x2, y2: seg.y2 });
          if (Math.random() < 0.3) {
            let branchX = midX + (Math.random() - 0.5) * displacement * 1.5;
            let branchY = midY + Math.random() * displacement;
            newSegments.push({ x1: midX, y1: midY, x2: branchX, y2: branchY });
          }
        }
        segments = newSegments;
        displacement /= 2;
      }
      return segments;
    }

    const triggerThorLightning = (startX = null) => {
      const sx = startX !== null ? startX : Math.random() * width;
      lightningBolts.push({
        segments: createLightningPath(sx, 0, sx + (Math.random() - 0.5) * 300, height * 0.8),
        life: 1,
        maxLife: 15
      });
      lightningFlashAlpha = 0.18;
    };

    setInterval(() => {
      if (Math.random() > 0.3) triggerThorLightning();
    }, 5000);

    // THOR MJOLNIR CLICK EXPLOSION (Correct Scope)
    window.addEventListener('click', (e) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
        const targetX = clickX + Math.cos(angle) * (100 + Math.random() * 80);
        const targetY = clickY + Math.sin(angle) * (100 + Math.random() * 80);
        lightningBolts.push({
          segments: createLightningPath(clickX, clickY, targetX, targetY),
          life: 1,
          maxLife: 12
        });
      }
      lightningFlashAlpha = 0.25;
    });

    // ---------------------------------------------------------
    // C. SPIDER-MAN INTERACTIVE WEB CURSOR TRAIL ENGINE
    // ---------------------------------------------------------
    const webTrail = [];
    window.addEventListener('mousemove', (e) => {
      webTrail.push({
        x: e.clientX,
        y: e.clientY,
        alpha: 0.8
      });
      if (webTrail.length > 18) webTrail.shift();
    });

    const drawWebTrail = () => {
      if (webTrail.length < 2) return;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(webTrail[0].x, webTrail[0].y);
      for (let i = 1; i < webTrail.length; i++) {
        ctx.lineTo(webTrail[i].x, webTrail[i].y);
      }
      ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      for (let i = 0; i < webTrail.length; i += 3) {
        const p = webTrail[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = '#00f0ff';
        ctx.fill();
      }
      ctx.restore();
    };

    // ---------------------------------------------------------
    // D. HULK GAMMA SHOCKWAVES & IRON MAN BEAMS
    // ---------------------------------------------------------
    let gammaShockwaves = [];
    let repulsorBeams = [];

    setInterval(() => {
      gammaShockwaves.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 10,
        alpha: 0.6
      });
    }, 4000);

    setInterval(() => {
      repulsorBeams.push({
        x: Math.random() * width,
        y: Math.random() * height,
        targetR: 35,
        r: 5,
        alpha: 0.7
      });
    }, 3500);

    // ---------------------------------------------------------
    // E. MAIN RENDER LOOP
    // ---------------------------------------------------------
    const renderAvengersFX = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Thor Background Lightning Flash
      if (lightningFlashAlpha > 0) {
        ctx.fillStyle = `rgba(0, 240, 255, ${lightningFlashAlpha})`;
        ctx.fillRect(0, 0, width, height);
        lightningFlashAlpha *= 0.88;
      }

      // 2. Thor Lightning Bolts
      for (let i = lightningBolts.length - 1; i >= 0; i--) {
        const bolt = lightningBolts[i];
        ctx.save();
        ctx.strokeStyle = '#ffffff';
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 25;
        ctx.lineWidth = 2.5;

        ctx.beginPath();
        for (let seg of bolt.segments) {
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
        }
        ctx.stroke();
        ctx.restore();

        bolt.life++;
        if (bolt.life > bolt.maxLife) {
          lightningBolts.splice(i, 1);
        }
      }

      // 3. Hulk Gamma Shockwaves
      for (let i = gammaShockwaves.length - 1; i >= 0; i--) {
        const wave = gammaShockwaves[i];
        ctx.save();
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 102, ${wave.alpha})`;
        ctx.shadowColor = '#00ff66';
        ctx.shadowBlur = 15;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.restore();

        wave.radius += 3;
        wave.alpha -= 0.01;
        if (wave.alpha <= 0) {
          gammaShockwaves.splice(i, 1);
        }
      }

      // 4. Iron Man Repulsors & Reticles
      for (let i = repulsorBeams.length - 1; i >= 0; i--) {
        const beam = repulsorBeams[i];
        ctx.save();
        ctx.beginPath();
        ctx.arc(beam.x, beam.y, beam.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 0, 85, ${beam.alpha})`;
        ctx.shadowColor = '#ff0055';
        ctx.shadowBlur = 12;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(beam.x - beam.r - 5, beam.y);
        ctx.lineTo(beam.x + beam.r + 5, beam.y);
        ctx.moveTo(beam.x, beam.y - beam.r - 5);
        ctx.lineTo(beam.x, beam.y + beam.r + 5);
        ctx.stroke();
        ctx.restore();

        if (beam.r < beam.targetR) beam.r += 1.5;
        beam.alpha -= 0.012;
        if (beam.alpha <= 0) {
          repulsorBeams.splice(i, 1);
        }
      }

      // 5. Spider & Web Trail
      spider.update();
      spider.draw();
      drawWebTrail();

      requestAnimationFrame(renderAvengersFX);
    };

    renderAvengersFX();
  };

  initAvengersFX();


  // --------------------------------------------------------------------------
  // 13. STARK REPULSOR ARCADE COMBAT GAME ENGINE
  // --------------------------------------------------------------------------
  
  // --------------------------------------------------------------------------
  // 13. STARK VECTOR CYBER RUNNER ENDLESS PHYSICS ENGINE
  // --------------------------------------------------------------------------
  function initStarkArcade() {
    const canvas = document.getElementById('arcade-canvas');
    const startBtn = document.getElementById('start-arcade-btn');
    const overlay = document.getElementById('arcade-overlay');
    const scoreEl = document.getElementById('arcade-score');
    const energyEl = document.getElementById('arcade-timer');
    const bestEl = document.getElementById('arcade-accuracy');
    const resultTitle = document.getElementById('arcade-result-title');
    const resultSubtitle = document.getElementById('arcade-result-subtitle');

    if (!canvas || !startBtn || !overlay) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = canvas.parentElement.clientWidth);
    let height = (canvas.height = canvas.parentElement.clientHeight);

    window.addEventListener('resize', () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    });

    let isPlaying = false;
    let distance = 0;
    let bestDistance = localStorage.getItem('stark_best_run') || 0;
    bestEl.textContent = bestDistance + 'm';

    let gameSpeed = 5.5;
    let gravity = 0.65;
    let frameCount = 0;

    // Runner Object
    const runner = {
      x: 80,
      y: height - 120,
      w: 24,
      h: 46,
      vy: 0,
      isGrounded: false,
      isSliding: false,
      slideTimer: 0,
      runFrame: 0,

      jump() {
        if (this.isGrounded) {
          this.vy = -13.5;
          this.isGrounded = false;
          this.isSliding = false;
        }
      },

      slide() {
        if (this.isGrounded && !this.isSliding) {
          this.isSliding = true;
          this.slideTimer = 35;
        }
      },

      update(platforms) {
        this.vy += gravity;
        this.y += this.vy;

        if (this.isSliding) {
          this.slideTimer--;
          if (this.slideTimer <= 0) {
            this.isSliding = false;
          }
        }

        // Platform collision
        this.isGrounded = false;
        const currentH = this.isSliding ? 22 : 46;

        for (let p of platforms) {
          if (
            this.x + this.w > p.x &&
            this.x < p.x + p.w &&
            this.y + currentH >= p.y &&
            this.y + currentH <= p.y + p.vy + 18
          ) {
            this.y = p.y - currentH;
            this.vy = 0;
            this.isGrounded = true;
          }
        }

        this.runFrame += 0.25;
      },

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);

        const currentH = this.isSliding ? 22 : 46;

        // Silhouette Body Shadow Glow
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 12;

        if (this.isSliding) {
          // Sliding Silhouette
          ctx.fillStyle = '#080d19';
          ctx.beginPath();
          ctx.roundRect(0, 0, 38, 22, 6);
          ctx.fill();
          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Visor
          ctx.fillStyle = '#00f0ff';
          ctx.fillRect(28, 4, 8, 3);
        } else if (!this.isGrounded) {
          // Vaulting / Jumping Stance
          ctx.fillStyle = '#080d19';
          ctx.beginPath();
          ctx.roundRect(0, 0, 24, 42, 8);
          ctx.fill();
          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Cyan Cyber Visor
          ctx.fillStyle = '#00f0ff';
          ctx.fillRect(14, 6, 8, 4);

          // Legs tucked
          ctx.strokeStyle = '#ff0055';
          ctx.beginPath();
          ctx.moveTo(6, 42); ctx.lineTo(12, 30);
          ctx.stroke();
        } else {
          // Running Silhouette Gait
          ctx.fillStyle = '#080d19';
          ctx.beginPath();
          ctx.roundRect(0, 0, 22, 46, 6);
          ctx.fill();
          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Visor
          ctx.fillStyle = '#00f0ff';
          ctx.fillRect(12, 6, 8, 4);

          // Animated Vector Running Legs
          const legAngle = Math.sin(this.runFrame) * 14;
          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 2.5;

          ctx.beginPath();
          ctx.moveTo(6, 36); ctx.lineTo(6 - legAngle, 46);
          ctx.moveTo(16, 36); ctx.lineTo(16 + legAngle, 46);
          ctx.stroke();
        }

        ctx.restore();
      }
    };

    // Platforms & Obstacles
    let platforms = [];
    let obstacles = [];
    let coins = [];

    function initMap() {
      platforms = [
        { x: 0, y: height - 60, w: width + 200, vy: 0 }
      ];
      obstacles = [];
      coins = [];
    }

    function spawnNextSegment() {
      const lastP = platforms[platforms.length - 1];
      if (lastP.x + lastP.w < width + 300) {
        const gap = 60 + Math.random() * 90;
        const pWidth = 300 + Math.random() * 400;
        const pY = height - (70 + Math.random() * 80);

        const newP = { x: lastP.x + lastP.w + gap, y: pY, w: pWidth, vy: 0 };
        platforms.push(newP);

        // Spawn Laser Spikes or Overhead Drones
        if (Math.random() > 0.4) {
          const obsType = Math.random() > 0.5 ? 'laser' : 'drone';
          obstacles.push({
            x: newP.x + 120 + Math.random() * (pWidth - 200),
            y: obsType === 'laser' ? pY - 28 : pY - 55,
            w: obsType === 'laser' ? 18 : 45,
            h: obsType === 'laser' ? 28 : 18,
            type: obsType
          });
        }
      }
    }

    function startGame() {
      distance = 0;
      gameSpeed = 5.5;
      isPlaying = true;
      runner.y = height - 120;
      runner.vy = 0;

      initMap();
      overlay.classList.add('hidden');
    }

    function gameOver() {
      isPlaying = false;
      overlay.classList.remove('hidden');

      const finalDist = Math.floor(distance);
      if (finalDist > bestDistance) {
        bestDistance = finalDist;
        localStorage.setItem('stark_best_run', bestDistance);
        bestEl.textContent = bestDistance + 'm';
      }

      resultTitle.textContent = 'STARK RUN COMPLETE!';
      resultSubtitle.textContent = `You ran ${finalDist}m across futuristic rooftops!`;
      startBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> RESTART RUN';
    }

    // Controls
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        if (isPlaying) {
          runner.jump();
          e.preventDefault();
        }
      } else if (e.code === 'ArrowDown') {
        if (isPlaying) {
          runner.slide();
          e.preventDefault();
        }
      }
    });

    canvas.addEventListener('click', () => {
      if (isPlaying) {
        runner.jump();
      }
    });

    startBtn.addEventListener('click', startGame);

    // Main Render & Physics Loop
    function render() {
      ctx.clearRect(0, 0, width, height);

      if (isPlaying) {
        frameCount++;
        distance += gameSpeed * 0.04;
        gameSpeed += 0.0008; // Acceleration

        scoreEl.textContent = Math.floor(distance) + 'm';

        // 1. Draw Parallax Background City Skyline
        ctx.fillStyle = 'rgba(0, 240, 255, 0.03)';
        for (let i = 0; i < 8; i++) {
          const bgX = (i * 180 - (frameCount * 0.8)) % (width + 200);
          ctx.fillRect(bgX, height - 180, 120, 180);
        }

        // 2. Update & Draw Platforms
        spawnNextSegment();

        for (let i = platforms.length - 1; i >= 0; i--) {
          const p = platforms[i];
          p.x -= gameSpeed;

          ctx.fillStyle = '#080d19';
          ctx.fillRect(p.x, p.y, p.w, height - p.y);
          ctx.strokeStyle = '#00f0ff';
          ctx.lineWidth = 2;
          ctx.strokeRect(p.x, p.y, p.w, height - p.y);

          if (p.x + p.w < -200) platforms.splice(i, 1);
        }

        // 3. Update & Draw Obstacles
        for (let i = obstacles.length - 1; i >= 0; i--) {
          const o = obstacles[i];
          o.x -= gameSpeed;

          if (o.type === 'laser') {
            // Red Ground Laser Spike
            ctx.fillStyle = '#ff0055';
            ctx.shadowColor = '#ff0055';
            ctx.shadowBlur = 15;
            ctx.fillRect(o.x, o.y, o.w, o.h);
          } else {
            // Overhead Cyber Drone
            ctx.fillStyle = '#a855f7';
            ctx.shadowColor = '#a855f7';
            ctx.shadowBlur = 15;
            ctx.fillRect(o.x, o.y, o.w, o.h);
          }

          // Collision check
          const currentH = runner.isSliding ? 22 : 46;
          if (
            runner.x + runner.w > o.x &&
            runner.x < o.x + o.w &&
            runner.y + currentH > o.y &&
            runner.y < o.y + o.h
          ) {
            gameOver();
          }

          if (o.x + o.w < -100) obstacles.splice(i, 1);
        }

        // 4. Update & Draw Runner
        runner.update(platforms);
        runner.draw();

        // Fell into gap
        if (runner.y > height + 50) {
          gameOver();
        }
      }

      requestAnimationFrame(render);
    }

    render();
  }

  initStarkArcade();


});
