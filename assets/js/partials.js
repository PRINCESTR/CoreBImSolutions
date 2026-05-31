/**
 * CORE BIM SOLUTIONS — NAV & FOOTER HTML PARTIALS
 * Inject shared nav + footer into every page
 */

(function () {
  'use strict';

  const LOGO_SRC = '../assets/images/logo.png';
  const ROOT = document.currentScript?.dataset.root || '';

  // Resolve paths relative to page depth
  function r(path) { return ROOT + path; }

  /* ─── Navbar HTML ─────────────────────────────────────── */
  const NAV_HTML = `
<div class="cb-nav-wrapper" id="cbNavWrapper">
  <nav class="cb-nav" id="cbNav" role="navigation" aria-label="Main Navigation">
    <a href="${r('index.html')}" aria-label="Core BIM Solutions Home" style="text-decoration:none;display:flex;align-items:center;">
      <img src="${r('assets/images/logo.png')}" alt="Core BIM Solutions" class="cb-nav-logo">
    </a>
    <ul class="cb-nav-links">
      <li><a href="${r('index.html')}">Home</a></li>
      <li>
        <a href="${r('services/index.html')}">Services <span class="cb-nav-dropdown-arrow"></span></a>
        <div class="cb-nav-dropdown">
          <a href="${r('services/bim-modeling.html')}">BIM Modeling</a>
          <a href="${r('services/cad-drafting.html')}">CAD Drafting</a>
          <a href="${r('services/construction-documentation.html')}">Construction Documentation</a>
          <a href="${r('services/pdf-to-cad.html')}">PDF to CAD</a>
          <a href="${r('services/revit-services.html')}">Revit Services</a>
          <a href="${r('services/mep-coordination.html')}">MEP Coordination</a>
          <a href="${r('services/architectural-drafting.html')}">Architectural Drafting</a>
          <a href="${r('services/shop-drawings.html')}">Shop Drawings</a>
          <a href="${r('services/scan-to-bim.html')}">Scan to BIM</a>
        </div>
      </li>
      <li><a href="${r('projects.html')}">Work</a></li>
      <li><a href="${r('workflow.html')}">Process</a></li>
      <li><a href="${r('about.html')}">About</a></li>
      <li><a href="${r('blog.html')}">Insights</a></li>
    </ul>
    <div class="cb-nav-actions">
      <a href="tel:+12345678900" class="cb-nav-ghost">Call Us</a>
      <a href="${r('contact.html')}" class="cb-nav-cta"><span>Get a Quote &rarr;</span></a>
      <button class="cb-nav-hamburger" id="cbHamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </nav>
</div>

<div class="cb-nav-mobile" id="cbMobileMenu" role="menu">
  <div class="cb-nav-mobile-section">Navigation</div>
  <a href="${r('index.html')}">Home</a>
  <a href="${r('about.html')}">About Us</a>
  <a href="${r('projects.html')}">Our Work</a>
  <a href="${r('workflow.html')}">Process</a>
  <a href="${r('blog.html')}">Insights</a>
  <div class="cb-nav-mobile-section">Services</div>
  <a href="${r('services/bim-modeling.html')}">BIM Modeling</a>
  <a href="${r('services/cad-drafting.html')}">CAD Drafting</a>
  <a href="${r('services/construction-documentation.html')}">Construction Docs</a>
  <a href="${r('services/mep-coordination.html')}">MEP Coordination</a>
  <a href="${r('services/scan-to-bim.html')}">Scan to BIM</a>
  <a href="${r('services/index.html')}">All Services &rarr;</a>
  <a href="${r('contact.html')}" class="cb-mobile-cta">Get a Quote &rarr;</a>
</div>`;

  /* ─── Footer HTML ─────────────────────────────────────── */
  const FOOTER_HTML = `
<footer class="cb-section cb-footer">
  <div class="cb-footer-inner">
    <div class="cb-footer-top cb-reveal">
      <div>
        <img src="${r('assets/images/logo.png')}" alt="Core BIM Solutions" class="cb-footer-logo-img">
        <p class="cb-footer-tagline">Precision BIM production services for architecture, engineering and construction firms worldwide. Your extended team, on demand.</p>
        <div class="cb-footer-socials">
          <a href="https://linkedin.com" class="cb-footer-social" aria-label="LinkedIn" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://instagram.com" class="cb-footer-social" aria-label="Instagram" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
          <a href="https://twitter.com" class="cb-footer-social" aria-label="Twitter / X" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a href="https://youtube.com" class="cb-footer-social" aria-label="YouTube" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>
      </div>
      <div class="cb-footer-newsletter">
        <h4>Stay in the Loop</h4>
        <p>BIM insights, project spotlights, and production tips delivered monthly.</p>
        <form class="cb-footer-form" onsubmit="return false;">
          <input type="email" placeholder="your@email.com" aria-label="Email address">
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>

    <div class="cb-footer-links-row cb-reveal cb-delay-100">
      <div class="cb-footer-col">
        <h5>Services</h5>
        <ul>
          <li><a href="${r('services/bim-modeling.html')}">BIM Modeling</a></li>
          <li><a href="${r('services/cad-drafting.html')}">CAD Drafting</a></li>
          <li><a href="${r('services/construction-documentation.html')}">Construction Docs</a></li>
          <li><a href="${r('services/pdf-to-cad.html')}">PDF to CAD</a></li>
          <li><a href="${r('services/mep-coordination.html')}">MEP Coordination</a></li>
          <li><a href="${r('services/revit-services.html')}">Revit Services</a></li>
          <li><a href="${r('services/scan-to-bim.html')}">Scan to BIM</a></li>
          <li><a href="${r('services/shop-drawings.html')}">Shop Drawings</a></li>
        </ul>
      </div>
      <div class="cb-footer-col">
        <h5>Company</h5>
        <ul>
          <li><a href="${r('about.html')}">About Us</a></li>
          <li><a href="${r('projects.html')}">Our Work</a></li>
          <li><a href="${r('case-studies.html')}">Case Studies</a></li>
          <li><a href="${r('workflow.html')}">Process</a></li>
          <li><a href="${r('industries.html')}">Industries</a></li>
          <li><a href="${r('careers.html')}">Careers</a></li>
        </ul>
      </div>
      <div class="cb-footer-col">
        <h5>Resources</h5>
        <ul>
          <li><a href="${r('blog.html')}">Blog & Insights</a></li>
          <li><a href="${r('case-studies.html')}">Case Studies</a></li>
          <li><a href="${r('contact.html')}">Request a Quote</a></li>
          <li><a href="${r('contact.html')}">Book a Consultation</a></li>
        </ul>
      </div>
      <div class="cb-footer-col">
        <h5>Contact</h5>
        <ul>
          <li><a href="mailto:hello@corebimsolutions.com">hello@corebimsolutions.com</a></li>
          <li><a href="tel:+12345678900">+1 (234) 567-8900</a></li>
          <li><a href="${r('contact.html')}">Book a Call</a></li>
          <li><a href="${r('contact.html')}">Project Intake Form</a></li>
        </ul>
      </div>
    </div>

    <div class="cb-footer-bottom cb-reveal cb-delay-200">
      <div class="cb-footer-copy">&copy; 2026 Core BIM Solutions. All rights reserved.</div>
      <div class="cb-footer-legal">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">BIM Standards</a>
      </div>
    </div>
  </div>
</footer>`;

  /* ─── Inject ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    const navTarget = document.getElementById('cb-nav-placeholder');
    if (navTarget) navTarget.outerHTML = NAV_HTML;

    const footerTarget = document.getElementById('cb-footer-placeholder');
    if (footerTarget) footerTarget.outerHTML = FOOTER_HTML;
  });

})();
