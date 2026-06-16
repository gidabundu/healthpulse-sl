// ═══════════════════════════════════════════════════════
//  HealthPulse SL — Emergency Hub JavaScript
// ═══════════════════════════════════════════════════════

'use strict';

// ── TAB NAVIGATION ────────────────────────────────────
function initTabs() {
  const tabs = document.querySelectorAll('.hero-tab');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.dataset.tab;

      // Update tab states
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update panel states
      panels.forEach(panel => {
        panel.classList.remove('active');
      });
      const target = document.getElementById('panel-' + targetId);
      if (target) {
        target.classList.add('active');
        // Smooth scroll to content
        target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
}

// ── ACCORDION ─────────────────────────────────────────
function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const accId = header.dataset.acc;
      const body = document.getElementById('acc-body-' + accId);
      const isOpen = header.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        // Close
        header.setAttribute('aria-expanded', 'false');
        header.classList.remove('open');
        body.classList.remove('show');
      } else {
        // Open
        header.setAttribute('aria-expanded', 'true');
        header.classList.add('open');
        body.classList.add('show');
      }
    });
  });
}

// ── DARK MODE SYNC ────────────────────────────────────
function syncDarkMode() {
  // Read dark mode preference set by main site
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.body.classList.add('dark-mode');
  }
}

// ── TOPBAR MOBILE MENU ─────────────────────────────────
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const topbarRight = document.querySelector('.topbar-right');
  if (!hamburger || !topbarRight) return;

  hamburger.addEventListener('click', () => {
    const isOpen = topbarRight.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// ── HOTLINE CLICK TRACKING ────────────────────────────
function initHotlineTracking() {
  const hotlineLinks = document.querySelectorAll('.hotline-number');
  hotlineLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Visual feedback on click
      link.style.background = 'rgba(255,255,255,0.5)';
      setTimeout(() => {
        link.style.background = '';
      }, 500);
    });
  });
}

// ── SCROLL-BASED HOTLINE STICKY VISIBILITY ─────────────
function initStickyHotline() {
  const hotlineBanner = document.querySelector('.hotline-banner');
  if (!hotlineBanner) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY < lastScrollY || currentScrollY < 100) {
      hotlineBanner.style.opacity = '1';
      hotlineBanner.style.transform = 'translateY(0)';
    } else {
      // Still keep it visible on scroll down (it's emergency info)
      hotlineBanner.style.opacity = '0.92';
    }
    lastScrollY = currentScrollY;
  }, { passive: true });
}

// ── GUIDE CARD PRINT HELPERS ──────────────────────────
function initPrintButton() {
  const printBtn = document.querySelector('.print-btn');
  if (!printBtn) return;

  printBtn.addEventListener('click', () => {
    // Open all accordions before printing
    document.querySelectorAll('.accordion-body').forEach(b => b.classList.add('show'));
    document.querySelectorAll('.accordion-header').forEach(h => {
      h.setAttribute('aria-expanded', 'true');
      h.classList.add('open');
    });
    window.print();
  });
}

// ── GUIDE CARD ANIMATION ON SCROLL ────────────────────
function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) return;

  const cards = document.querySelectorAll('.guide-card, .disease-card, .accordion-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(card);
  });
}

// ── HANDLE URL HASH (DEEP LINK TO TAB) ────────────────
function handleHashNavigation() {
  const hash = window.location.hash.replace('#', '');
  const validTabs = ['firstaid', 'malaria', 'diseases', 'fire'];
  
  if (hash && validTabs.includes(hash)) {
    const tab = document.querySelector(`[data-tab="${hash}"]`);
    if (tab) {
      // Slight delay to let page render first
      setTimeout(() => tab.click(), 100);
    }
  }
}

// ── EMERGENCY KEYWORD DETECTION ───────────────────────
// If user navigates from the main site with a specific disease query,
// auto-open the relevant tab or accordion
function handleSearchParams() {
  const params = new URLSearchParams(window.location.search);
  const topic = params.get('topic');

  if (topic === 'malaria') {
    const malariaTab = document.querySelector('[data-tab="malaria"]');
    if (malariaTab) setTimeout(() => malariaTab.click(), 150);
  } else if (topic === 'fire') {
    const fireTab = document.querySelector('[data-tab="fire"]');
    if (fireTab) setTimeout(() => fireTab.click(), 150);
  }
}

// ── STEP NUMBER DYNAMIC COLORING ─────────────────────
function colorStepNumbersBySection() {
  // First aid steps — red
  document.querySelectorAll('#panel-firstaid .step-number').forEach(n => {
    n.style.background = '#C0392B';
  });
  // Malaria steps — green
  document.querySelectorAll('#panel-malaria .treat-step-num').forEach(n => {
    n.style.background = '#1A7A4A';
  });
  // Fire steps — orange
  document.querySelectorAll('#panel-fire .step-number').forEach(n => {
    n.style.background = '#E67E22';
  });
}

// ═══════════════════════════════════════════════════════
//  INITIALISE
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  syncDarkMode();
  initTabs();
  initAccordions();
  initMobileMenu();
  initHotlineTracking();
  initStickyHotline();
  initPrintButton();
  initScrollAnimations();
  handleHashNavigation();
  handleSearchParams();
  colorStepNumbersBySection();

  // Announce page to screen readers
  const main = document.querySelector('main');
  if (main) main.setAttribute('aria-live', 'polite');

  console.log('🚨 HealthPulse SL Emergency Hub loaded');
});
