import { initTheme } from './theme.js';
import { initGlobalUI } from './animations.js';
import { loadJson, createElement, clamp, getQueryParam, getStoredItem, setStoredItem } from './utils.js';

const favoritesKey = 'mediwise-favorites';
const recentKey = 'mediwise-recent';

async function init() {
  initTheme();
  initGlobalUI();
  await initPage();
}

async function initPage() {
  if (document.getElementById('trendingCards')) {
    await initHome();
  }
  if (document.getElementById('searchResults')) {
    await initSearchLanding();
  }
  if (document.getElementById('favoriteList')) {
    initFavoritesOverview();
  }
  if (document.getElementById('diseaseGrid') && !document.getElementById('trendingCards')) {
    await initDiseasePage();
  }
}

async function initHome() {
  const medicines = await loadJson('data/medicines.json');
  const diseases = await loadJson('data/diseases.json');
  const categories = await loadJson('data/categories.json');
  const trendingCards = document.getElementById('trendingCards');
  const categoryGrid = document.getElementById('categoryGrid');
  const diseaseGrid = document.getElementById('diseaseGrid');
  const featuredGrid = document.getElementById('featuredGrid');
  const faqGrid = document.getElementById('faqGrid');

  if (trendingCards) {
    medicines.slice(0, 4).forEach((medicine) => {
      const card = createElement(`
        <article class="card animate-scale">
          <div>
            <h3>${medicine.brandName}</h3>
            <p>${medicine.genericName}</p>
          </div>
          <p>${clamp(medicine.description, 90)}</p>
          <div class="pill-metadata">
            <div><strong>Category</strong><span>${medicine.category}</span></div>
            <div><strong>Manufacturer</strong><span>${medicine.manufacturer}</span></div>
          </div>
          <a class="btn btn-secondary" href="medicine.html?slug=${medicine.slug}">View details</a>
        </article>
      `);
      trendingCards.appendChild(card);
    });
  }
  if (categoryGrid) {
    categories.slice(0, 8).forEach((category) => {
      const card = createElement(`
        <article class="card animate-left">
          <h3>${category.name}</h3>
          <p>${category.description}</p>
          <a class="link-button" href="search.html?category=${encodeURIComponent(category.name)}">Explore</a>
        </article>
      `);
      categoryGrid.appendChild(card);
    });
  }
  if (diseaseGrid) {
    diseases.forEach((disease) => {
      const card = createElement(`
        <article class="card animate-right">
          <h3>${disease.name}</h3>
          <p>${clamp(disease.summary, 100)}</p>
          <a class="link-button" href="disease.html">Read more</a>
        </article>
      `);
      diseaseGrid.appendChild(card);
    });
  }
  if (featuredGrid) {
    medicines.slice(1, 5).forEach((medicine) => {
      const card = createElement(`
        <article class="card animate-up">
          <span class="pill-badge">${medicine.category}</span>
          <h3>${medicine.brandName}</h3>
          <p>${clamp(medicine.uses, 90)}</p>
          <div class="pill-metadata">
            <div><strong>Rating</strong><span>${medicine.rating} ★</span></div>
            <div><strong>Brand</strong><span>${medicine.manufacturer}</span></div>
          </div>
        </article>
      `);
      featuredGrid.appendChild(card);
    });
  }
  if (faqGrid) {
    const faqItems = [
      { q: 'How do I find the right medicine?', a: 'Start with a symptom or category, compare options, and review side effects and warnings.' },
      { q: 'Can I save medicines for later?', a: 'Yes, favorites and recently viewed medicines are stored locally for quick access.' },
      { q: 'Is this medical advice?', a: 'MediWise is for information only. Always consult a healthcare professional before starting a new treatment.' },
      { q: 'How does dark mode work?', a: 'Your theme preference is saved locally and applied automatically when you return.' },
    ];
    faqItems.forEach((item) => {
      const card = createElement(`
        <article class="card animate-up">
          <h3>${item.q}</h3>
          <p>${item.a}</p>
        </article>
      `);
      faqGrid.appendChild(card);
    });
  }
}

async function initDiseasePage() {
  const diseases = await loadJson('data/diseases.json');
  const diseaseGrid = document.getElementById('diseaseGrid');
  if (!diseaseGrid) return;
  diseases.forEach((disease) => {
    const card = createElement(`
      <article class="card animate-right">
        <h3>${disease.name}</h3>
        <p>${clamp(disease.summary, 110)}</p>
        <div class="pill-metadata">
          <div><strong>Symptoms</strong><span>${disease.symptoms.join(', ')}</span></div>
          <div><strong>Causes</strong><span>${disease.causes.join(', ')}</span></div>
        </div>
        <a class="link-button" href="disease.html">Read more</a>
      </article>
    `);
    diseaseGrid.appendChild(card);
  });
}

async function initSearchLanding() {
  const medicines = await loadJson('data/medicines.json');
  const categories = await loadJson('data/categories.json');
  const filterCategory = document.getElementById('filterCategory');
  const filterManufacturer = document.getElementById('filterManufacturer');
  const filterRating = document.getElementById('filterRating');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const suggestionsList = document.getElementById('suggestionsList');
  const searchResults = document.getElementById('searchResults');
  const searchEmpty = document.getElementById('searchEmpty');
  const recentSearches = document.getElementById('recentSearches');

  const recent = getStoredItem('mediwise-search-history', []);
  renderRecentSearches(recent);
  populateFilters();
  setInitialResults();

  if (searchForm) {
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      doSearch(searchInput.value.trim());
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.trim();
      renderSuggestions(query);
    });
  }

  [filterCategory, filterManufacturer, filterRating].forEach((el) => {
    if (el) el.addEventListener('change', applyFilters);
  });

  function populateFilters() {
    const manufacturers = [...new Set(medicines.map((item) => item.manufacturer))].sort();
    manufacturers.forEach((name) => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      filterManufacturer.appendChild(option);
    });
    categories.forEach((category) => {
      const option = document.createElement('option');
      option.value = category.name;
      option.textContent = category.name;
      filterCategory.appendChild(option);
    });
  }

  function setInitialResults() {
    const presetCategory = getQueryParam('category');
    if (presetCategory && filterCategory) {
      filterCategory.value = presetCategory;
    }
    renderResults(medicines);
  }

  function renderResults(list) {
    searchResults.innerHTML = '';
    if (!list.length) {
      searchEmpty.hidden = false;
      return;
    }
    searchEmpty.hidden = true;
    list.forEach((medicine) => {
      const article = createElement(`
        <article class="card animate-up">
          <div>
            <h3>${medicine.brandName}</h3>
            <p>${medicine.genericName}</p>
          </div>
          <p>${clamp(medicine.uses, 100)}</p>
          <div class="pill-metadata">
            <div><strong>Category</strong><span>${medicine.category}</span></div>
            <div><strong>Manufacturer</strong><span>${medicine.manufacturer}</span></div>
          </div>
          <a class="btn btn-secondary" href="medicine.html?slug=${medicine.slug}">View details</a>
        </article>
      `);
      searchResults.appendChild(article);
    });
  }

  function renderSuggestions(query) {
    suggestionsList.innerHTML = '';
    if (!query) return;
    const suggestions = medicines.filter((medicine) => {
      return [medicine.brandName, medicine.genericName, medicine.category, medicine.manufacturer]
        .some((value) => value.toLowerCase().includes(query.toLowerCase()));
    }).slice(0, 5);
    suggestions.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = `${item.brandName} · ${item.genericName}`;
      li.tabIndex = 0;
      li.addEventListener('click', () => {
        searchInput.value = item.brandName;
        doSearch(item.brandName);
      });
      suggestionsList.appendChild(li);
    });
  }

  function doSearch(query) {
    const value = query || '';
    if (!value) {
      renderResults(medicines);
      return;
    }
    const results = medicines.filter((medicine) => {
      return [medicine.brandName, medicine.genericName, medicine.category, medicine.manufacturer, medicine.uses]
        .some((field) => field.toLowerCase().includes(value.toLowerCase()));
    });
    saveRecentSearch(value);
    renderRecentSearches(getStoredItem('mediwise-search-history', []));
    renderResults(results);
  }

  function applyFilters() {
    const categoryValue = filterCategory.value;
    const manufacturerValue = filterManufacturer.value;
    const ratingValue = Number(filterRating.value);
    const filtered = medicines.filter((medicine) => {
      const categoryMatch = !categoryValue || medicine.category === categoryValue;
      const manufacturerMatch = !manufacturerValue || medicine.manufacturer === manufacturerValue;
      const ratingMatch = !ratingValue || medicine.rating >= ratingValue;
      return categoryMatch && manufacturerMatch && ratingMatch;
    });
    renderResults(filtered);
  }

  function saveRecentSearch(term) {
    if (!term) return;
    const history = getStoredItem('mediwise-search-history', []);
    const next = [term, ...history.filter((item) => item !== term)].slice(0, 6);
    setStoredItem('mediwise-search-history', next);
  }

  function renderRecentSearches(list) {
    recentSearches.innerHTML = '';
    if (!list.length) {
      recentSearches.innerHTML = '<li>Start searching for a medicine or symptom.</li>';
      return;
    }
    list.forEach((item) => {
      const li = document.createElement('li');
      li.textContent = item;
      li.tabIndex = 0;
      li.addEventListener('click', () => {
        searchInput.value = item;
        doSearch(item);
      });
      recentSearches.appendChild(li);
    });
  }
}

function initFavoritesOverview() {
  const favoriteList = document.getElementById('favoriteList');
  const favoritesCount = document.getElementById('favoritesCount');
  const favoritesEmpty = document.getElementById('favoritesEmpty');
  const recentList = document.getElementById('recentlyViewedList');
  const saved = getStoredItem(favoritesKey, []);
  const recent = getStoredItem(recentKey, []);
  favoritesCount.textContent = saved.length;
  if (!saved.length) {
    favoritesEmpty.hidden = false;
  } else {
    favoritesEmpty.hidden = true;
    saved.forEach((item) => {
      const card = createElement(`
        <article class="card favorite-card animate-up">
          <h3>${item.brandName}</h3>
          <p>${item.genericName}</p>
          <div class="pill-metadata">
            <div><strong>Category</strong><span>${item.category}</span></div>
          </div>
          <div class="card-actions">
            <a class="btn btn-secondary" href="medicine.html?slug=${item.slug}">View</a>
          </div>
        </article>
      `);
      favoriteList.appendChild(card);
    });
  }
  if (recentList) {
    recentList.innerHTML = '';
    if (!recent.length) {
      recentList.innerHTML = '<p>No recently viewed medicines yet.</p>';
    } else {
      recent.forEach((item) => {
        const entry = createElement(`
          <article class="card animate-left">
            <h3>${item.brandName}</h3>
            <p>${item.genericName}</p>
            <a class="link-button" href="medicine.html?slug=${item.slug}">Review again</a>
          </article>
        `);
        recentList.appendChild(entry);
      });
    }
  }
}

init();
