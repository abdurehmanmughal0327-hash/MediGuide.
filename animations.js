import { sleep } from './utils.js';

const header = document.getElementById('siteHeader');
const backToTopButton = document.getElementById('backToTop');
const loader = document.getElementById('pageLoader');
const mobileMenu = document.getElementById('mobileMenu');
const menuToggle = document.getElementById('menuToggle');

export function initGlobalUI() {
  if (menuToggle && mobileMenu && menuToggle.dataset.mediwiseMenuBound !== 'true') {
    menuToggle.dataset.mediwiseMenuBound = 'true';
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    });
  }

  if (backToTopButton && backToTopButton.dataset.mediwiseBackToTopBound !== 'true') {
    backToTopButton.dataset.mediwiseBackToTopBound = 'true';
    backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  observeAnimations();
  initLoader();
}

function onScroll() {
  const scrollTop = window.scrollY;
  if (header) {
    header.classList.toggle('scrolled', scrollTop > 18);
  }
  if (backToTopButton) {
    backToTopButton.classList.toggle('visible', scrollTop > 420);
  }
}

function observeAnimations() {
  const nodes = document.querySelectorAll('.animate-up, .animate-left, .animate-right, .animate-scale');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = `${entry.target.dataset.delay || 0}s`;
        entry.target.classList.add('in-view');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translate(0,0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  nodes.forEach((node) => observer.observe(node));
}

async function initLoader() {
  if (!loader) return;
  await sleep(650);
  loader.classList.add('hidden');
  await sleep(300);
  loader.style.display = 'none';
}
