/**
 * FitChoice – Nitra Isolate Landing Page
 * Vanilla JS only — no frameworks, no external libraries.
 *
 * AFFILIATE URL — single source of truth.
 * Update ONLY this constant if the link ever changes.
 */
const AFFILIATE_URL = 'https://dl.flipkart.com/s/N9hwUPuuuN';

/* ── Open affiliate link safely ─────────────────────── */
function openAffiliate() {
  var a = document.createElement('a');
  a.href   = AFFILIATE_URL;
  a.target = '_blank';
  a.rel    = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/* ── Wire every CTA button to openAffiliate ─────────── */
function initCtaButtons() {
  document.querySelectorAll('.js-cta').forEach(function (el) {
    el.addEventListener('click', openAffiliate);
  });
}

/* ── FAQ accordion ───────────────────────────────────── */
function initFaq() {
  var questions = document.querySelectorAll('.faq-q');

  questions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var isOpen   = btn.getAttribute('aria-expanded') === 'true';
      var panelId  = btn.getAttribute('aria-controls');
      var panel    = document.getElementById(panelId);

      // Close all panels first (accordion behaviour)
      questions.forEach(function (otherBtn) {
        var otherId    = otherBtn.getAttribute('aria-controls');
        var otherPanel = document.getElementById(otherId);
        otherBtn.setAttribute('aria-expanded', 'false');
        if (otherPanel) otherPanel.hidden = true;
      });

      // Open the clicked one if it was closed
      if (!isOpen && panel) {
        btn.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
      }
    });
  });
}

/* ── Scroll-triggered reveal animations ─────────────── */
function initReveal() {
  // Add .reveal class to elements we want to animate
  var selectors = [
    '.stat-card',
    '.benefit-card',
    '.step',
    '.faq-item',
    '.section-header',
    '.details__media',
    '.details__info',
    '.cta-section__inner',
  ];

  selectors.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.add('reveal');
    });
  });

  if (!('IntersectionObserver' in window)) {
    // Fallback: show everything immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        // Stagger siblings inside the same parent
        var siblings = Array.from(
          entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')
        );
        var idx   = siblings.indexOf(entry.target);
        var delay = Math.min(idx * 70, 280);

        setTimeout(function () {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
}

/* ── Sticky header shadow ────────────────────────────── */
function initHeader() {
  var header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });
}

/* ── Mobile hamburger menu ───────────────────────────── */
function initMobileNav() {
  var toggle    = document.querySelector('.nav-toggle');
  var mobileNav = document.querySelector('.mobile-nav');
  if (!toggle || !mobileNav) return;

  toggle.addEventListener('click', function () {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    toggle.classList.toggle('open', !open);
    mobileNav.hidden = open;
  });

  // Close menu when a link is clicked
  mobileNav.querySelectorAll('.mobile-nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.classList.remove('open');
      mobileNav.hidden = true;
    });
  });
}

/* ── Smooth scroll for anchor links ─────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id     = link.getAttribute('href').slice(1);
      var target = id ? document.getElementById(id) : null;
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ── Footer year ─────────────────────────────────────── */
function setYear() {
  var el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── Boot ────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  initCtaButtons();
  initFaq();
  initReveal();
  initHeader();
  initMobileNav();
  initSmoothScroll();
  setYear();
});
