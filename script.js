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

});
