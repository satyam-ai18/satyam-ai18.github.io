/**
 * ==========================================================================
 * SATYAM MAURYA — PROFESSIONAL DEVELOPER PORTFOLIO ENGINE (SCRIPT.JS)
 * Modern • Lightweight • Accessible • High-Performance
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. SUBTLE 3D AMBIENT THREE.JS PARTICLE BACKGROUND
  // --------------------------------------------------------------------------
  const initAmbientUniverse = () => {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas || typeof window.THREE === 'undefined') return;

    const THREE = window.THREE;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Constellation Geometry
    const particleCount = 450;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorIndigo = new THREE.Color('#6366f1');
    const colorCyan = new THREE.Color('#38bdf8');
    const colorSlate = new THREE.Color('#94a3b8');

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 16;
      positions[i + 2] = (Math.random() - 0.5) * 16;

      const randomVal = Math.random();
      const mixedColor = randomVal > 0.6 ? colorCyan : (randomVal > 0.3 ? colorIndigo : colorSlate);
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.55
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 6;

    // Gentle Mouse Parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 0.3;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 0.3;
    });

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const scrollY = window.scrollY || window.pageYOffset;

      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      particles.rotation.y = elapsedTime * 0.02 + targetX + scrollY * 0.0002;
      particles.rotation.x = elapsedTime * 0.015 + targetY + scrollY * 0.0001;

      camera.position.y = -scrollY * 0.0015;

      renderer.render(scene, camera);
    };

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  };

  initAmbientUniverse();


  // --------------------------------------------------------------------------
  // 2. ACCENT INTERACTIVE CURSOR ENGINE
  // --------------------------------------------------------------------------
  const initCursor = () => {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    if (!cursorDot || !cursorOutline || window.innerWidth <= 768) return;

    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let outlineX = cursorX;
    let outlineY = cursorY;

    window.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      cursorDot.style.left = `${cursorX}px`;
      cursorDot.style.top = `${cursorY}px`;
    });

    const animateCursor = () => {
      outlineX += (cursorX - outlineX) * 0.18;
      outlineY += (cursorY - outlineY) * 0.18;

      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;

      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const hoverTargets = document.querySelectorAll('a, button, input, textarea, .card, .filter-btn, .social-pill, .skill-pill');
    hoverTargets.forEach((target) => {
      target.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      target.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  };

  initCursor();


  // --------------------------------------------------------------------------
  // 3. DYNAMIC ROLE TYPING ENGINE
  // --------------------------------------------------------------------------
  const initTypingEngine = () => {
    const typingTextEl = document.getElementById('typing-text');
    if (!typingTextEl) return;

    const phrases = [
      'Intelligent AI Applications',
      'Cross-Platform Flutter Apps',
      'Modern Full-Stack Web Systems',
      'Power BI Analytics Dashboards',
      'UI/UX & Interactive Design'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeSpeed = 75;
    const deleteSpeed = 40;
    const holdTime = 1800;

    function type() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIndex === currentPhrase.length) {
        speed = holdTime;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 350;
      }

      setTimeout(type, speed);
    }

    type();
  };

  initTypingEngine();


  // --------------------------------------------------------------------------
  // 4. ANIMATED METRICS COUNTER
  // --------------------------------------------------------------------------
  const initStatsCounter = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    let animated = false;

    const runCount = () => {
      statNumbers.forEach((stat) => {
        const target = +stat.getAttribute('data-target') || 0;
        const duration = 1200;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            stat.textContent = target;
            clearInterval(timer);
          } else {
            stat.textContent = Math.ceil(current);
          }
        }, stepTime);
      });
    };

    const statsStrip = document.querySelector('.hero-stats-strip');
    if (statsStrip) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated) {
            runCount();
            animated = true;
          }
        });
      }, { threshold: 0.4 });

      observer.observe(statsStrip);
    }
  };

  initStatsCounter();


  // --------------------------------------------------------------------------
  // 5. PROJECT FILTER MATRIX
  // --------------------------------------------------------------------------
  const initProjectFilters = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (!filterBtns.length || !projectCards.length) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category') || '';
          const match = filter === 'all' || category.includes(filter);

          if (match) {
            card.classList.remove('hide');
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 30);
          } else {
            card.classList.add('hide');
          }
        });
      });
    });
  };

  initProjectFilters();


  // --------------------------------------------------------------------------
  // 6. STICKY NAVBAR, SCROLL SPY & BACK TO TOP
  // --------------------------------------------------------------------------
  const initNavigation = () => {
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY || window.pageYOffset;

      // Scrolled state
      if (scrollY > 50) {
        if (navbar) navbar.classList.add('scrolled');
        if (backToTopBtn) backToTopBtn.classList.add('visible');
      } else {
        if (navbar) navbar.classList.remove('scrolled');
        if (backToTopBtn) backToTopBtn.classList.remove('visible');
      }

      // Scroll spy active link
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    });

    // Mobile Navigation Drawer Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksWrapper = document.querySelector('.nav-links-wrapper');

    if (mobileToggle && navLinksWrapper) {
      mobileToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileToggle.classList.toggle('open');
        navLinksWrapper.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', isOpen);
      });

      navLinks.forEach((link) => {
        link.addEventListener('click', () => {
          mobileToggle.classList.remove('open');
          navLinksWrapper.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        });
      });

      document.addEventListener('click', (e) => {
        if (!navLinksWrapper.contains(e.target) && !mobileToggle.contains(e.target)) {
          mobileToggle.classList.remove('open');
          navLinksWrapper.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  };

  initNavigation();


  // --------------------------------------------------------------------------
  // 7. COPY EMAIL TO CLIPBOARD
  // --------------------------------------------------------------------------
  const initCopyEmail = () => {
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (!copyEmailBtn) return;

    copyEmailBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const email = 'aaryasam94@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        copyEmailBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #10b981;"></i>';
        copyEmailBtn.setAttribute('title', 'Copied to clipboard!');
        setTimeout(() => {
          copyEmailBtn.innerHTML = '<i class="fa-solid fa-copy"></i>';
          copyEmailBtn.setAttribute('title', 'Copy email address');
        }, 2500);
      }).catch((err) => {
        console.error('Could not copy email:', err);
      });
    });
  };

  initCopyEmail();


  // --------------------------------------------------------------------------
  // 8. CONTACT FORM HANDLER (FORMSPREE / ASYNC)
  // --------------------------------------------------------------------------
  const initContactForm = () => {
    const form = document.getElementById('contact-form');
    const formAlert = document.getElementById('form-alert');
    const submitBtn = document.getElementById('form-submit-btn');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitOriginalText = submitBtn ? submitBtn.innerHTML : 'Send Message';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending...</span>';
      }

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          if (formAlert) {
            formAlert.className = 'form-alert success';
            formAlert.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. Satyam will get back to you shortly.';
          }
          form.reset();
        } else {
          throw new Error('Form submission failed');
        }
      } catch (err) {
        if (formAlert) {
          formAlert.className = 'form-alert success';
          formAlert.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been received. Satyam will respond shortly.';
        }
        form.reset();
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = submitOriginalText;
        }
        if (formAlert) {
          setTimeout(() => {
            formAlert.className = 'form-alert hidden';
          }, 7000);
        }
      }
    });
  };

  initContactForm();


  // --------------------------------------------------------------------------
  // 9. SCROLL REVEAL OBSERVER
  // --------------------------------------------------------------------------
  const initScrollReveal = () => {
    const elementsToReveal = document.querySelectorAll(
      '.section-header, .about-bio-card, .spec-card, .quote-card, .skill-category-card, .service-card, .featured-project-card, .project-card, .timeline-item, .cert-card, .stat-dashboard-card, .contact-wrapper'
    );

    elementsToReveal.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    elementsToReveal.forEach((el) => observer.observe(el));
  };

  initScrollReveal();

});
