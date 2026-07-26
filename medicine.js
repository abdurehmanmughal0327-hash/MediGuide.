import { loadJson, getQueryParam, getStoredItem, setStoredItem, createElement } from './utils.js';

const favoritesKey = 'mediwise-favorites';
const recentKey = 'mediwise-recent';
const slug = getQueryParam('slug');

async function initMedicinePage() {
  const medicines = await loadJson('data/medicines.json');
  const medicine = medicines.find((item) => item.slug === slug) || medicines[0];
  if (!medicine) return;

  const mapping = {
    medicineImage: medicine.image,
    medicineCategory: medicine.category,
    medicineTitle: medicine.brandName,
    medicineSubtitle: medicine.description,
    medicineBrand: medicine.brandName,
    medicineManufacturer: medicine.manufacturer,
    medicineGeneric: medicine.genericName,
    medicineUses: medicine.uses,
    medicineHowItWorks: medicine.howItWorks,
    medicineDosage: medicine.dosage,
    medicineBeforeFood: medicine.beforeFood,
    medicineAfterFood: medicine.afterFood,
    medicineSideEffects: medicine.sideEffects,
    medicineWarnings: medicine.warnings,
    medicinePregnancy: medicine.pregnancy,
    medicineBreastfeeding: medicine.breastfeeding,
    medicineChildren: medicine.children,
    medicineStorage: medicine.storage,
  };

  Object.entries(mapping).forEach(([id, value]) => {
    const element = document.getElementById(id);
    if (!element) return;
    if (element.tagName === 'IMG') {
      element.src = value;
    } else {
      element.textContent = value;
    }
  });

  const accordion = document.getElementById('detailAccordion');
  if (accordion) {
    ['Interactions', 'Alternative medicines', 'Emergency warning'].forEach((title) => {
      const item = createElement(`
        <div class="accordion-item animate-up">
          <button class="accordion-summary" aria-expanded="false">
            <strong>${title}</strong>
            <span>Show details</span>
          </button>
          <div class="accordion-content">
            <p>${title === 'Interactions' ? medicine.interactions : title === 'Alternative medicines' ? 'Discuss alternatives with your provider and review comparable medicines in the search section.' : 'If you experience severe reactions, seek emergency medical attention immediately.'}</p>
          </div>
        </div>
      `);
      const summary = item.querySelector('.accordion-summary');
      const content = item.querySelector('.accordion-content');
      summary.addEventListener('click', () => {
        const expanded = summary.getAttribute('aria-expanded') === 'true';
        summary.setAttribute('aria-expanded', String(!expanded));
        content.style.display = expanded ? 'none' : 'block';
      });
      content.style.display = 'none';
      accordion.appendChild(item);
    });
  }

  const relatedCards = document.getElementById('relatedCards');
  if (relatedCards) {
    medicines.filter((item) => item.category === medicine.category && item.slug !== medicine.slug).slice(0, 3).forEach((item) => {
      const related = createElement(`
        <article class="card animate-up">
          <h3>${item.brandName}</h3>
          <p>${item.genericName}</p>
          <div class="pill-metadata">
            <div><strong>Category</strong><span>${item.category}</span></div>
          </div>
          <a class="btn btn-secondary" href="medicine.html?slug=${item.slug}">Explore</a>
        </article>
      `);
      relatedCards.appendChild(related);
    });
  }

  const favoriteButton = document.getElementById('favoriteButton');
  if (favoriteButton) {
    favoriteButton.addEventListener('click', () => toggleFavorite(medicine));
    updateFavoriteLabel(medicine);
  }

  addRecentlyViewed(medicine);
}

function getFavorites() {
  return getStoredItem(favoritesKey, []);
}

function updateFavoriteLabel(medicine) {
  const favoriteButton = document.getElementById('favoriteButton');
  if (!favoriteButton) return;
  const favorites = getFavorites();
  const isSaved = favorites.some((item) => item.slug === medicine.slug);
  favoriteButton.textContent = isSaved ? 'Saved to favorites' : 'Add to favorites';
}

function toggleFavorite(medicine) {
  const favorites = getFavorites();
  const exists = favorites.find((item) => item.slug === medicine.slug);
  const nextFavorites = exists ? favorites.filter((item) => item.slug !== medicine.slug) : [medicine, ...favorites];
  setStoredItem(favoritesKey, nextFavorites);
  updateFavoriteLabel(medicine);
}

function addRecentlyViewed(medicine) {
  const recent = getStoredItem(recentKey, []);
  const next = [medicine, ...recent.filter((item) => item.slug !== medicine.slug)].slice(0, 6);
  setStoredItem(recentKey, next);
}

initMedicinePage();
