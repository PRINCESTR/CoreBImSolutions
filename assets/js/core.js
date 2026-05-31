/**
 * CORE BIM SOLUTIONS — CORE JS
 * Navbar, Scroll Reveal, Cursor, Counters, Parallax,
 * Testimonial Carousel, Accordion, Filters, Slider
 */

(function () {
  'use strict';

  /* ─── Utilities ────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ─── Page Transition ──────────────────────────────────── */
  function initPageTransition() {
    const overlay = document.createElement('div');
    overlay.className = 'cb-page-transition';
    document.body.appendChild(overlay);

    // Fade in on load
    window.addEventListener('pageshow', () => {
      overlay.classList.remove('entering');
    });

    // Fade out on internal link click
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || link.target === '_blank') return;
      if (href.startsWith('http') && !href.includes(window.location.hostname)) return;
      e.preventDefault();
      overlay.classList.add('entering');
      setTimeout(() => { window.location.href = href; }, 340);
    });
  }

  /* ─── Custom Cursor ────────────────────────────────────── */
  function initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;

    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.className  = 'cb-cursor-dot';
    ring.className = 'cb-cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = 0, my = 0, rx = 0, ry = 0;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
    });

    function animRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animRing);
    }
    animRing();

    // Hover effects on interactive elements
    const hoverEls = 'a, button, [role="button"], .cb-service-card, .cb-blog-card, .cb-port-item, .cb-team-card';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverEls)) ring.classList.add('hovering');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverEls)) ring.classList.remove('hovering');
    });
  }

  /* ─── Back to Top ──────────────────────────────────────── */
  function initBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'cb-back-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = `<svg viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>`;
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ─── Scroll Reveal ────────────────────────────────────── */
  function initScrollReveal() {
    const classes = '.cb-reveal, .cb-reveal-left, .cb-reveal-right, .cb-reveal-scale';
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: 0.1 });

    $$(classes).forEach(el => observer.observe(el));

    // Image reveal
    $$('.cb-img-reveal').forEach(el => observer.observe(el));
  }

  /* ─── Navbar ───────────────────────────────────────────── */
  function initNavbar() {
    const navWrapper = $('#cbNavWrapper');
    const nav        = $('#cbNav');
    const hamburger  = $('#cbHamburger');
    const mobileMenu = $('#cbMobileMenu');
    if (!navWrapper || !nav) return;

    let lastY = 0;

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      nav.classList.toggle('nav-scrolled', y > 80);
      if (y > lastY && y > 200) {
        navWrapper.classList.add('nav-hidden');
      } else {
        navWrapper.classList.remove('nav-hidden');
      }
      lastY = y;
    }, { passive: true });

    // Mobile Menu Transform & Logic
    if (mobileMenu) {
      if (!mobileMenu.classList.contains('transformed')) {
        const desktopLogo = $('.cb-nav-logo');
        const logoSrc = desktopLogo ? desktopLogo.getAttribute('src') : 'assets/images/logo.png';
        const originalChildren = Array.from(mobileMenu.children);
        mobileMenu.innerHTML = `
          <img src="${logoSrc}" class="cb-nav-mobile-logo" alt="Logo">
          <div class="cb-nav-mobile-links"></div>
          <div class="cb-nav-mobile-contact">
            <a href="tel:+12345678900">+1 (234) 567-8900</a>
            <a href="mailto:hello@corebimsolutions.com">hello@corebimsolutions.com</a>
          </div>
        `;
        const linksContainer = $('.cb-nav-mobile-links', mobileMenu);
        
        let delayIdx = 1;
        originalChildren.forEach((child) => {
          if (child.tagName === 'A' && !child.classList.contains('cb-mobile-cta')) {
            child.classList.add('cb-nav-mobile-link');
          }
          child.style.setProperty('--stagger-idx', delayIdx);
          delayIdx++;
          linksContainer.appendChild(child);
        });
        mobileMenu.classList.add('transformed');
      }

      if (hamburger) {
        hamburger.addEventListener('click', () => {
          const open = mobileMenu.classList.toggle('open');
          hamburger.setAttribute('aria-expanded', open);
          document.body.style.overflow = open ? 'hidden' : ''; // Lock scroll
          
          const bars = $$('span', hamburger);
          if (open) {
            bars[0].style.transform = 'translateY(5.5px) rotate(45deg)';
            bars[1].style.opacity   = '0';
            bars[2].style.transform = 'translateY(-5.5px) rotate(-45deg)';
          } else {
            bars[0].style.transform = '';
            bars[1].style.opacity   = '1';
            bars[2].style.transform = '';
          }
        });
      }

      $$('a', mobileMenu).forEach(link => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          // Let smooth scroll handle anchors on the same page
          if (href && href.startsWith('#')) {
             mobileMenu.classList.remove('open');
             document.body.style.overflow = '';
             if (hamburger) {
               hamburger.setAttribute('aria-expanded', false);
               const bars = $$('span', hamburger);
               bars[0].style.transform = ''; bars[1].style.opacity = '1'; bars[2].style.transform = '';
             }
             return;
          }

          e.preventDefault();
          // Close menu visually first
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
          if (hamburger) {
            hamburger.setAttribute('aria-expanded', false);
            const bars = $$('span', hamburger);
            bars[0].style.transform = '';
            bars[1].style.opacity   = '1';
            bars[2].style.transform = '';
          }
          
          // Wait for menu animation to finish (<300ms) then navigate
          setTimeout(() => {
            if (href) window.location.href = href;
          }, 250);
        });
      });
    }

    // Active nav link highlight based on current page
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    $$('.cb-nav-links a').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  /* ─── Hero Slider ──────────────────────────────────────── */
  function initHeroSlider() {
    const slider = $('#cbHeroSlider');
    if (!slider) return;

    const slides    = $$('.cb-slide', slider);
    const dots      = $$('.cb-dot', slider);
    const badgeTag  = $('#cbBadgeTag');
    const badgeTitle= $('#cbBadgeTitle');

    if (!slides.length) return;

    const slideData = [
      { tag: 'PROJECT TYPE',     title: 'Architectural BIM — LOD 400' },
      { tag: 'STRUCTURAL WORKS', title: 'Commercial High-Rise Tower'  },
      { tag: 'SITE ENGINEERING', title: 'Structural Steel Detailing'  },
      { tag: 'MEP COORDINATION', title: 'Full MEP Clash Detection'    },
      { tag: 'RESIDENTIAL BIM',  title: 'Custom Home — CD Set'        }
    ];

    let current = 0, timer = null;

    function goTo(index) {
      slides[current].classList.remove('active');
      if (dots[current]) dots[current].classList.remove('active');
      current = ((index % slides.length) + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');

      if (badgeTag && badgeTitle && slideData[current]) {
        badgeTag.style.opacity   = '0';
        badgeTitle.style.opacity = '0';
        setTimeout(() => {
          badgeTag.textContent   = slideData[current].tag;
          badgeTitle.textContent = slideData[current].title;
          badgeTag.style.opacity   = '1';
          badgeTitle.style.opacity = '1';
        }, 300);
      }
    }

    function startAuto() {
      timer = setInterval(() => goTo(current + 1), 4500);
    }
    function resetAuto() { clearInterval(timer); startAuto(); }

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        goTo(parseInt(dot.dataset.index, 10));
        resetAuto();
      });
    });

    startAuto();
  }

  /* ─── Stat Counters ────────────────────────────────────── */
  function initCounters() {
    const counters = $$('.cb-counter');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const duration = 1800;
        const start = performance.now();

        function update(now) {
          const progress = Math.min((now - start) / duration, 1);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = Math.floor(eased * target);
          el.textContent = prefix + value.toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  /* ─── Parallax ─────────────────────────────────────────── */
  function initParallax() {
    const layers = $$('[data-parallax]');
    if (!layers.length) return;

    let ticking = false;

    function updateLayers() {
      const scrollY = window.scrollY;
      layers.forEach(el => {
        const speed  = parseFloat(el.dataset.parallax) || 0.2;
        const rect   = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (window.innerHeight / 2 - center) * speed;
        el.style.setProperty('--parallax-offset', offset + 'px');
      });
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(updateLayers); ticking = true; }
    }, { passive: true });
  }

  /* ─── Testimonial Carousel ─────────────────────────────── */
  function initTestimonialCarousel() {
    const wraps = $$('.cb-testimonial-wrap');
    wraps.forEach(wrap => {
      const track = $('.cb-testimonial-track', wrap);
      const slides = $$('.cb-testimonial-slide', wrap);
      const dots   = $$('.cb-testimonial-dot', wrap);
      const prev   = $('.cb-testimonial-prev', wrap) || wrap.parentElement.querySelector('.cb-testimonial-prev');
      const next   = $('.cb-testimonial-next', wrap) || wrap.parentElement.querySelector('.cb-testimonial-next');
      if (!track || !slides.length) return;

      let current = 0;

      function goTo(i) {
        current = ((i % slides.length) + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        dots.forEach((d, idx) => d.classList.toggle('active', idx === current));
      }

      if (prev) prev.addEventListener('click', () => goTo(current - 1));
      if (next) next.addEventListener('click', () => goTo(current + 1));
      dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

      // Auto-advance
      setInterval(() => goTo(current + 1), 6000);
    });
  }

  /* ─── Accordion / FAQ ──────────────────────────────────── */
  function initAccordion() {
    $$('.cb-accordion-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const item   = trigger.parentElement;
        const body   = $('.cb-accordion-body', item);
        const isOpen = trigger.classList.contains('active');

        // Close all
        $$('.cb-accordion-trigger.active').forEach(t => {
          t.classList.remove('active');
          const b = t.parentElement.querySelector('.cb-accordion-body');
          if (b) b.classList.remove('open');
        });

        if (!isOpen) {
          trigger.classList.add('active');
          if (body) body.classList.add('open');
        }
      });
    });
  }

  /* ─── Filter Tabs ──────────────────────────────────────── */
  function initFilters() {
    $$('.cb-filter-tabs').forEach(tabsEl => {
      const tabs  = $$('.cb-filter-tab', tabsEl);
      const grid  = tabsEl.nextElementSibling;
      if (!grid) return;

      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');

          const filter = tab.dataset.filter;
          const items  = $$('[data-category]', grid);

          items.forEach(item => {
            const show = filter === 'all' || item.dataset.category === filter;
            item.style.opacity    = '0';
            item.style.transform  = 'scale(0.95)';
            setTimeout(() => {
              item.style.display = show ? '' : 'none';
              requestAnimationFrame(() => {
                item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                item.style.opacity    = show ? '1' : '0';
                item.style.transform  = show ? 'scale(1)' : 'scale(0.95)';
              });
            }, 50);
          });
        });
      });
    });
  }

  /* ─── Newsletter Form ──────────────────────────────────── */
  function initNewsletterForm() {
    $$('.cb-footer-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = $('input[type="email"]', form);
        const btn   = $('button', form);
        if (!input || !input.value.trim()) return;

        btn.textContent = '✓ Subscribed';
        btn.style.background = '#27ae60';
        btn.disabled = true;
        input.disabled = true;
        input.value = '';
        input.placeholder = 'Thank you!';
      });
    });
  }

  /* ─── Before/After Slider ──────────────────────────────── */
  function initBeforeAfter() {
    $$('.cb-before-after').forEach(el => {
      const after  = $('.cb-ba-after', el);
      const handle = $('.cb-ba-slider', el);
      if (!after || !handle) return;

      let dragging = false;

      function setPosition(x) {
        const rect   = el.getBoundingClientRect();
        const pct    = Math.max(0, Math.min(100, ((x - rect.left) / rect.width) * 100));
        handle.style.left      = pct + '%';
        after.style.clipPath   = `inset(0 ${100 - pct}% 0 0)`;
      }

      el.addEventListener('mousedown', (e) => { dragging = true; setPosition(e.clientX); });
      el.addEventListener('touchstart', (e) => { dragging = true; setPosition(e.touches[0].clientX); }, { passive: true });
      window.addEventListener('mousemove', (e) => { if (dragging) setPosition(e.clientX); });
      window.addEventListener('touchmove', (e) => { if (dragging) setPosition(e.touches[0].clientX); }, { passive: true });
      window.addEventListener('mouseup', () => { dragging = false; });
      window.addEventListener('touchend', () => { dragging = false; });

      // Init at 50%
      after.style.clipPath = 'inset(0 50% 0 0)';
    });
  }

  /* ─── Progress Bars ────────────────────────────────────── */
  function initProgressBars() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, { threshold: 0.5 });
    $$('.cb-progress-bar').forEach(bar => observer.observe(bar));
  }

  /* ─── Smooth Anchor Scroll ─────────────────────────────── */
  function initSmoothScroll() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 90;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  }

  /* ─── Tilt Effect ──────────────────────────────────────── */
  function initTilt() {
    $$('.cb-tilt').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(8px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ─── File Upload ──────────────────────────────────────── */
  function initFileUploads() {
    $$('.cb-file-drop').forEach(drop => {
      const input   = $('input[type="file"]', drop) || (() => {
        const i = document.createElement('input');
        i.type = 'file'; i.multiple = true; i.style.display = 'none';
        drop.appendChild(i);
        return i;
      })();
      const list = drop.nextElementSibling?.classList.contains('cb-file-list')
        ? drop.nextElementSibling
        : (() => { const l = document.createElement('div'); l.className = 'cb-file-list'; drop.after(l); return l; })();

      drop.addEventListener('click', () => input.click());
      drop.addEventListener('dragover', e => { e.preventDefault(); drop.classList.add('drag-over'); });
      drop.addEventListener('dragleave', () => drop.classList.remove('drag-over'));
      drop.addEventListener('drop', e => {
        e.preventDefault(); drop.classList.remove('drag-over');
        handleFiles(e.dataTransfer.files);
      });
      input.addEventListener('change', () => handleFiles(input.files));

      function handleFiles(files) {
        [...files].forEach(file => {
          const item = document.createElement('div');
          item.className = 'cb-file-item';
          item.innerHTML = `
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            <span>${file.name}</span>
            <span class="cb-file-item-remove">&times;</span>
          `;
          item.querySelector('.cb-file-item-remove').addEventListener('click', () => item.remove());
          list.appendChild(item);
        });
      }
    });
  }

  /* ─── Contact / Project Forms ──────────────────────────── */
  function initContactForms() {
    $$('.cb-contact-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        let valid = true;

        // Clear previous errors
        $$('.cb-form-error', form).forEach(el => el.textContent = '');
        $$('.cb-input, .cb-textarea, .cb-select', form).forEach(el => {
          el.classList.remove('error', 'success');
        });

        // Validate required fields
        $$('[required]', form).forEach(field => {
          if (!field.value.trim()) {
            field.classList.add('error');
            const err = field.parentElement.querySelector('.cb-form-error');
            if (err) err.textContent = 'This field is required.';
            valid = false;
          } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
            field.classList.add('error');
            const err = field.parentElement.querySelector('.cb-form-error');
            if (err) err.textContent = 'Please enter a valid email address.';
            valid = false;
          } else {
            field.classList.add('success');
          }
        });

        if (!valid) return;

        // Success state
        const btn = $('[type="submit"]', form);
        const successMsg = $('.cb-form-success', form);
        const originalText = btn.textContent;

        btn.textContent = 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
          btn.textContent = '✓ Message Sent';
          btn.style.background = '#27ae60';
          if (successMsg) successMsg.classList.add('visible');
          form.reset();
          $$('.cb-input, .cb-textarea, .cb-select', form).forEach(el => el.classList.remove('success'));

          setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
            if (successMsg) successMsg.classList.remove('visible');
          }, 5000);
        }, 1200);
      });
    });
  }

  /* ─── Init All ─────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initPageTransition();
    initCursor();
    initBackToTop();
    initScrollReveal();
    initNavbar();
    initHeroSlider();
    initCounters();
    initParallax();
    initTestimonialCarousel();
    initAccordion();
    initFilters();
    initNewsletterForm();
    initBeforeAfter();
    initProgressBars();
    initSmoothScroll();
    initTilt();
    initFileUploads();
    initContactForms();
  });

})();
