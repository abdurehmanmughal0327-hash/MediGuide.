(function () {
  const STORAGE_KEYS = {
    theme: 'mediwise-theme',
    favorites: 'mediwise-favorites',
    recent: 'mediwise-recent',
    searchHistory: 'mediwise-search-history'
  };

  const FALLBACK_MEDICINES = [
    {
      id: 'mz-01',
      brandName: 'Azulpha',
      genericName: 'Ibuprofen',
      manufacturer: 'Aurora Labs',
      category: 'Painkillers',
      uses: 'Relieves mild to moderate pain, inflammation, and fever.',
      howItWorks: 'Blocks inflammatory signals to reduce pain and swelling.',
      dosage: '200-400 mg every 4-6 hours, not exceeding 1,200 mg per day unless directed.',
      beforeFood: 'Take with food or milk to reduce stomach discomfort.',
      afterFood: 'May be taken after meals if nausea occurs.',
      sideEffects: 'Mild stomach upset, dizziness or headache may occur.',
      warnings: 'For short-term use only. Avoid if you have ulcers or kidney issues.',
      pregnancy: 'Use only after consulting a healthcare professional.',
      breastfeeding: 'May be used with caution while nursing.',
      children: 'Not recommended for children under 12 without medical advice.',
      storage: 'Store in a cool, dry place away from direct sunlight.',
      interactions: 'May interact with blood thinners, diuretics, and certain blood pressure medicines.',
      image: 'images/placeholder-medicine.svg',
      slug: 'azulpha',
      rating: 4.8,
      description: 'A gentle pain relief formula designed for everyday wellness.'
    },
    {
      id: 'mz-02',
      brandName: 'ProbiSure',
      genericName: 'Lactobacillus acidophilus',
      manufacturer: 'VitaCore',
      category: 'Vitamins',
      uses: 'Supports digestive health and maintains gut flora balance.',
      howItWorks: 'Replenishes beneficial probiotics for improved digestion.',
      dosage: 'One capsule daily with food, or as directed by a health practitioner.',
      beforeFood: 'Ideal with breakfast to support digestion.',
      afterFood: 'Can also be taken after meals for comfort.',
      sideEffects: 'Occasional bloating or mild digestive changes may occur.',
      warnings: 'Stop use if you experience persistent discomfort.',
      pregnancy: 'Generally safe during pregnancy but consult your doctor.',
      breastfeeding: 'Suitable with nursing, unless otherwise advised.',
      children: 'Children over 12 may use after medical approval.',
      storage: 'Keep refrigerated after opening for best potency.',
      interactions: 'Avoid concurrent use with strong antibiotics unless directed.',
      image: 'images/placeholder-medicine.svg',
      slug: 'probisure',
      rating: 4.6,
      description: 'A premium probiotic formula for digestive wellness and daily balance.'
    },
    {
      id: 'mz-03',
      brandName: 'CardioCalm',
      genericName: 'Atenolol',
      manufacturer: 'SilverLine Pharma',
      category: 'Heart',
      uses: 'Helps manage high blood pressure and reduce heart rate in hypertension.',
      howItWorks: 'Reduces workload on heart by slowing pulse and lowering blood pressure.',
      dosage: '50 mg once daily. Adjust with physician guidance.',
      beforeFood: 'Can be taken with or without food, but consistently.',
      afterFood: 'Take after a meal to minimize dizziness.',
      sideEffects: 'May cause fatigue, cold extremities, or mild dizziness.',
      warnings: 'Monitor heart rate and avoid abrupt discontinuation.',
      pregnancy: 'Use only under direct medical supervision.',
      breastfeeding: 'Consult your healthcare provider before use.',
      children: 'Not commonly recommended for children without specialist oversight.',
      storage: 'Store at room temperature in a secure place.',
      interactions: 'May interact with other blood pressure agents and allergy medications.',
      image: 'images/placeholder-medicine.svg',
      slug: 'cardiocalm',
      rating: 4.7,
      description: 'Trusted heart support designed for consistent blood pressure control.'
    },
    {
      id: 'mz-04',
      brandName: 'AllerEase',
      genericName: 'Cetirizine',
      manufacturer: 'NaturaHealth',
      category: 'Allergy',
      uses: 'Reduces allergy symptoms such as sneezing, itching and runny nose.',
      howItWorks: 'Blocks histamine activity to calm allergic responses.',
      dosage: 'One tablet daily, preferably at the same time each day.',
      beforeFood: 'May be taken with food to improve tolerance.',
      afterFood: 'No special requirements after meals.',
      sideEffects: 'May cause mild drowsiness in sensitive individuals.',
      warnings: 'Avoid driving if you feel sleepy.',
      pregnancy: 'Use only after consultation during pregnancy.',
      breastfeeding: 'Generally safe, but confirm with a physician.',
      children: 'Child dosing varies; follow pediatric recommendations.',
      storage: 'Store dry and at room temperature.',
      interactions: 'May increase sedation with certain sleep aids or alcohol.',
      image: 'images/placeholder-medicine.svg',
      slug: 'allerease',
      rating: 4.5,
      description: 'Rapid allergy relief with a gentle daily formula.'
    },
    {
      id: 'mz-05',
      brandName: 'GlucoBalance',
      genericName: 'Metformin',
      manufacturer: 'ClearPath Pharmaceuticals',
      category: 'Diabetes',
      uses: 'Helps maintain healthy blood sugar levels in type 2 diabetes.',
      howItWorks: 'Improves insulin sensitivity and reduces glucose production in the liver.',
      dosage: '500 mg twice daily with meals. Titrate carefully.',
      beforeFood: 'Take with breakfast and dinner to reduce stomach upset.',
      afterFood: 'May be tolerated better after meals.',
      sideEffects: 'Possible nausea, mild diarrhea, and metallic taste.',
      warnings: 'Ensure adequate hydration and periodic kidney function checks.',
      pregnancy: 'Discuss alternatives if pregnant or planning pregnancy.',
      breastfeeding: 'Use with medical recommendation during postpartum period.',
      children: 'Approved for pediatric use under specialist care.',
      storage: 'Keep in original packaging at room temperature.',
      interactions: 'Avoid certain contrast dyes and some heart medications.',
      image: 'images/placeholder-medicine.svg',
      slug: 'glucobalance',
      rating: 4.4,
      description: 'A trusted formula for reliable blood sugar management.'
    },
    {
      id: 'mz-06',
      brandName: 'Dermalux',
      genericName: 'Hydrocortisone',
      manufacturer: 'PureCare Labs',
      category: 'Skin',
      uses: 'Relieves itching, redness, and irritation from mild skin conditions.',
      howItWorks: 'Reduces inflammation by calming sensitive skin reactions.',
      dosage: 'Apply a thin layer to affected area 1-2 times daily.',
      beforeFood: 'Topical usage does not require meals.',
      afterFood: 'No food instructions needed.',
      sideEffects: 'Rare skin thinning or irritation with long-term use.',
      warnings: 'Use only as directed and avoid prolonged application.',
      pregnancy: 'Topical use is usually safe but consult your provider.',
      breastfeeding: 'Safe with caution and limited areas of application.',
      children: 'Use pediatric formulations for younger patients.',
      storage: 'Store in a cool dry place away from direct heat.',
      interactions: 'Avoid using with other steroid creams without guidance.',
      image: 'images/placeholder-medicine.svg',
      slug: 'dermalux',
      rating: 4.6,
      description: 'A soothing topical option for mild skin discomfort.'
    }
  ];

  const FALLBACK_DISEASES = [
    {
      id: 'd-01',
      name: 'Seasonal Allergy',
      summary: 'Common allergy symptoms triggered by pollen and environmental irritants.',
      symptoms: ['Sneezing', 'Runny nose', 'Itchy eyes', 'Mild congestion'],
      causes: ['Pollen exposure', 'Dust mites', 'Pet dander'],
      treatment: 'Antihistamines, nasal sprays, and avoidance of triggers.',
      homeCare: 'Keep windows closed, use air filters, and rinse sinuses regularly.',
      emergencySigns: 'Severe swelling, difficulty breathing, or chest tightness.',
      image: 'images/placeholder-disease.svg'
    },
    {
      id: 'd-02',
      name: 'Tension Headache',
      summary: 'A headache pattern caused by muscle tension and stress.',
      symptoms: ['Dull head pain', 'Neck stiffness', 'Scalp sensitivity'],
      causes: ['Stress', 'Poor posture', 'Eye strain'],
      treatment: 'Rest, hydration, gentle massage, and over-the-counter pain relief.',
      homeCare: 'Practice relaxation exercises, improve ergonomics, and sleep well.',
      emergencySigns: 'Sudden severe headache or neurological changes.',
      image: 'images/placeholder-disease.svg'
    },
    {
      id: 'd-03',
      name: 'Acid Reflux',
      summary: 'Heartburn and reflux symptoms caused by stomach acid rising into the esophagus.',
      symptoms: ['Burning chest pain', 'Sour taste', 'Regurgitation'],
      causes: ['Spicy foods', 'Overeating', 'Large meals before bedtime'],
      treatment: 'Diet changes, antacids, and acid reducers.',
      homeCare: 'Elevate head while sleeping and avoid trigger foods.',
      emergencySigns: 'Trouble swallowing, chest pain, or weight loss.',
      image: 'images/placeholder-disease.svg'
    }
  ];

  const FALLBACK_CATEGORIES = [
    { name: 'Painkillers', description: 'Trusted relief for headaches, cramps, and inflammation.' },
    { name: 'Antibiotics', description: 'Support for bacterial infections and recovery.' },
    { name: 'Vitamins', description: 'Everyday nutrient support for energy and immunity.' },
    { name: 'Diabetes', description: 'Blood sugar management and metabolic care.' },
    { name: 'Heart', description: 'Cardiovascular support and blood pressure clarity.' },
    { name: 'Skin', description: 'Gentle formulas for skin comfort and repair.' },
    { name: 'Children', description: 'Child-friendly options for common pediatric concerns.' },
    { name: 'Allergy', description: 'Allergy symptom relief for daily comfort.' }
  ];

  const appState = {
    medicines: FALLBACK_MEDICINES,
    diseases: FALLBACK_DISEASES,
    categories: FALLBACK_CATEGORIES
  };

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function createElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.firstElementChild;
  }

  function clamp(text, length) {
    return text.length > length ? `${text.slice(0, length).trim()}...` : text;
  }

  function readStorage(key, fallback) {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function writeStorage(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // Ignore storage failures.
    }
  }

  function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name) || '';
  }

  async function loadData() {
    const [medicines, diseases, categories] = await Promise.all([
      fetchJson('data/medicines.json').catch(() => FALLBACK_MEDICINES),
      fetchJson('data/diseases.json').catch(() => FALLBACK_DISEASES),
      fetchJson('data/categories.json').catch(() => FALLBACK_CATEGORIES)
    ]);
    appState.medicines = medicines || FALLBACK_MEDICINES;
    appState.diseases = diseases || FALLBACK_DISEASES;
    appState.categories = categories || FALLBACK_CATEGORIES;
  }

  async function fetchJson(path) {
    const response = await fetch(path);
    if (!response.ok) throw new Error('Failed to fetch ' + path);
    return response.json();
  }

  function initTheme() {
    const savedTheme = window.localStorage.getItem(STORAGE_KEYS.theme);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const activeTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(activeTheme);
    const toggle = document.getElementById('themeToggle');
    if (toggle && toggle.dataset.mediwiseThemeBound !== 'true') {
      toggle.dataset.mediwiseThemeBound = 'true';
      toggle.addEventListener('click', () => {
        const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(nextTheme);
      });
    }
  }

  function applyTheme(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem(STORAGE_KEYS.theme, theme);
  }

  function initGlobalUI() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const backToTopButton = document.getElementById('backToTop');
    const header = document.getElementById('siteHeader');
    const loader = document.getElementById('pageLoader');

    if (menuToggle && mobileMenu && menuToggle.dataset.mediwiseMenuBound !== 'true') {
      menuToggle.dataset.mediwiseMenuBound = 'true';
      const toggleMenu = (event) => {
        event.preventDefault();
        const isOpen = mobileMenu.classList.toggle('open');
        mobileMenu.setAttribute('aria-hidden', String(!isOpen));
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Close mobile menu' : 'Open mobile menu');
      };
      ['click', 'touchend', 'pointerup'].forEach((type) => {
        menuToggle.addEventListener(type, toggleMenu, { passive: false });
      });
      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          mobileMenu.classList.remove('open');
          mobileMenu.setAttribute('aria-hidden', 'true');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.setAttribute('aria-label', 'Open mobile menu');
        });
      });
    }

    if (backToTopButton && backToTopButton.dataset.mediwiseBackToTopBound !== 'true') {
      backToTopButton.dataset.mediwiseBackToTopBound = 'true';
      backToTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
      window.addEventListener('scroll', () => {
        backToTopButton.classList.toggle('visible', window.scrollY > 420);
      }, { passive: true });
    }

    if (header) {
      window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 18);
      }, { passive: true });
    }

    document.querySelectorAll('button, .btn, .link-button').forEach((element) => {
      element.addEventListener('click', createRipple);
    });

    if (loader) {
      window.setTimeout(() => {
        loader.classList.add('hidden');
        window.setTimeout(() => {
          loader.style.display = 'none';
        }, 250);
      }, 650);
    }

    observeAnimations();
  }

  function createRipple(event) {
    const element = event.currentTarget;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.2;
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    element.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 700);
  }

  function observeAnimations() {
    const items = document.querySelectorAll('.animate-up, .animate-left, .animate-right, .animate-scale');
    if (!items.length || !('IntersectionObserver' in window)) {
      items.forEach((item) => {
        item.style.opacity = '1';
        item.style.transform = 'translate(0, 0)';
      });
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translate(0, 0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    items.forEach((item) => observer.observe(item));
  }

  function initHomePage() {
    const trendingCards = document.getElementById('trendingCards');
    const categoryGrid = document.getElementById('categoryGrid');
    const diseaseGrid = document.getElementById('diseaseGrid');
    const featuredGrid = document.getElementById('featuredGrid');
    const faqGrid = document.getElementById('faqGrid');

    if (trendingCards) {
      appState.medicines.slice(0, 4).forEach((medicine) => {
        trendingCards.appendChild(createMedicineCard(medicine));
      });
    }
    if (categoryGrid) {
      appState.categories.slice(0, 8).forEach((category) => {
        const article = createElement(`
          <article class="card animate-left">
            <h3>${escapeHtml(category.name)}</h3>
            <p>${escapeHtml(category.description)}</p>
            <a class="link-button" href="search.html?category=${encodeURIComponent(category.name)}">Explore</a>
          </article>
        `);
        categoryGrid.appendChild(article);
      });
    }
    if (diseaseGrid) {
      appState.diseases.forEach((disease) => {
        const article = createElement(`
          <article class="card animate-right">
            <h3>${escapeHtml(disease.name)}</h3>
            <p>${escapeHtml(clamp(disease.summary, 100))}</p>
            <a class="link-button" href="disease.html">Read more</a>
          </article>
        `);
        diseaseGrid.appendChild(article);
      });
    }
    if (featuredGrid) {
      appState.medicines.slice(1, 5).forEach((medicine) => {
        const article = createElement(`
          <article class="card animate-up">
            <span class="pill-badge">${escapeHtml(medicine.category)}</span>
            <h3>${escapeHtml(medicine.brandName)}</h3>
            <p>${escapeHtml(clamp(medicine.uses, 90))}</p>
            <div class="pill-metadata">
              <div><strong>Rating</strong><span>${escapeHtml(medicine.rating)} ★</span></div>
              <div><strong>Brand</strong><span>${escapeHtml(medicine.manufacturer)}</span></div>
            </div>
          </article>
        `);
        featuredGrid.appendChild(article);
      });
    }
    if (faqGrid) {
      const faqItems = [
        { q: 'How do I find the right medicine?', a: 'Start with a symptom or category, compare options, and review side effects and warnings.' },
        { q: 'Can I save medicines for later?', a: 'Yes, favorites and recently viewed medicines are stored locally for quick access.' },
        { q: 'Is this medical advice?', a: 'MediWise is for information only. Always consult a healthcare professional before starting a new treatment.' },
        { q: 'How does dark mode work?', a: 'Your theme preference is saved locally and applied automatically when you return.' }
      ];
      faqItems.forEach((item) => {
        const article = createElement(`
          <article class="card animate-up">
            <h3>${escapeHtml(item.q)}</h3>
            <p>${escapeHtml(item.a)}</p>
          </article>
        `);
        faqGrid.appendChild(article);
      });
    }
  }

  function createMedicineCard(medicine) {
    return createElement(`
      <article class="card animate-scale">
        <div>
          <h3>${escapeHtml(medicine.brandName)}</h3>
          <p>${escapeHtml(medicine.genericName)}</p>
        </div>
        <p>${escapeHtml(clamp(medicine.description, 90))}</p>
        <div class="pill-metadata">
          <div><strong>Category</strong><span>${escapeHtml(medicine.category)}</span></div>
          <div><strong>Manufacturer</strong><span>${escapeHtml(medicine.manufacturer)}</span></div>
        </div>
        <a class="btn btn-secondary" href="medicine.html?slug=${medicine.slug}">View details</a>
      </article>
    `);
  }

  function initSearchPage() {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const suggestionsList = document.getElementById('suggestionsList');
    const searchResults = document.getElementById('searchResults');
    const searchEmpty = document.getElementById('searchEmpty');
    const recentSearches = document.getElementById('recentSearches');
    const filterCategory = document.getElementById('filterCategory');
    const filterManufacturer = document.getElementById('filterManufacturer');
    const filterRating = document.getElementById('filterRating');

    if (!searchResults) return;

    populateFilters();
    renderRecentSearches(readStorage(STORAGE_KEYS.searchHistory, []));
    applyFilterState();

    if (searchForm) {
      searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        doSearch(searchInput.value.trim());
      });
    }
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        renderSuggestions(searchInput.value.trim());
      });
    }
    [filterCategory, filterManufacturer, filterRating].forEach((element) => {
      if (element) element.addEventListener('change', applyFilters);
    });

    function populateFilters() {
      const manufacturers = [...new Set(appState.medicines.map((item) => item.manufacturer))].sort();
      manufacturers.forEach((name) => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        filterManufacturer.appendChild(option);
      });
      appState.categories.forEach((category) => {
        const option = document.createElement('option');
        option.value = category.name;
        option.textContent = category.name;
        filterCategory.appendChild(option);
      });
    }

    function applyFilterState() {
      const category = getQueryParam('category');
      if (category && filterCategory) {
        filterCategory.value = category;
      }
      applyFilters();
    }

    function applyFilters() {
      const categoryValue = filterCategory ? filterCategory.value : '';
      const manufacturerValue = filterManufacturer ? filterManufacturer.value : '';
      const ratingValue = filterRating ? Number(filterRating.value) : 0;
      const filtered = appState.medicines.filter((medicine) => {
        const categoryMatch = !categoryValue || medicine.category === categoryValue;
        const manufacturerMatch = !manufacturerValue || medicine.manufacturer === manufacturerValue;
        const ratingMatch = !ratingValue || medicine.rating >= ratingValue;
        return categoryMatch && manufacturerMatch && ratingMatch;
      });
      renderResults(filtered);
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
              <h3>${escapeHtml(medicine.brandName)}</h3>
              <p>${escapeHtml(medicine.genericName)}</p>
            </div>
            <p>${escapeHtml(clamp(medicine.uses, 100))}</p>
            <div class="pill-metadata">
              <div><strong>Category</strong><span>${escapeHtml(medicine.category)}</span></div>
              <div><strong>Manufacturer</strong><span>${escapeHtml(medicine.manufacturer)}</span></div>
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
      const suggestions = appState.medicines.filter((medicine) => {
        return [medicine.brandName, medicine.genericName, medicine.category, medicine.manufacturer].some((value) => value.toLowerCase().includes(query.toLowerCase()));
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
      const value = (query || '').trim();
      if (!value) {
        applyFilters();
        return;
      }
      const results = appState.medicines.filter((medicine) => {
        return [medicine.brandName, medicine.genericName, medicine.category, medicine.manufacturer, medicine.uses].some((field) => field.toLowerCase().includes(value.toLowerCase()));
      });
      saveRecentSearch(value);
      renderRecentSearches(readStorage(STORAGE_KEYS.searchHistory, []));
      renderResults(results);
    }

    function saveRecentSearch(term) {
      const history = readStorage(STORAGE_KEYS.searchHistory, []);
      const next = [term, ...history.filter((item) => item !== term)].slice(0, 6);
      writeStorage(STORAGE_KEYS.searchHistory, next);
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

  function initMedicinePage() {
    const slug = getQueryParam('slug');
    const medicine = appState.medicines.find((item) => item.slug === slug) || appState.medicines[0];
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
      medicineStorage: medicine.storage
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
              <strong>${escapeHtml(title)}</strong>
              <span>Show details</span>
            </button>
            <div class="accordion-content">
              <p>${escapeHtml(title === 'Interactions' ? medicine.interactions : title === 'Alternative medicines' ? 'Discuss alternatives with your provider and review comparable medicines in the search section.' : 'If you experience severe reactions, seek emergency medical attention immediately.')}</p>
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
      appState.medicines.filter((item) => item.category === medicine.category && item.slug !== medicine.slug).slice(0, 3).forEach((item) => {
        const related = createElement(`
          <article class="card animate-up">
            <h3>${escapeHtml(item.brandName)}</h3>
            <p>${escapeHtml(item.genericName)}</p>
            <div class="pill-metadata">
              <div><strong>Category</strong><span>${escapeHtml(item.category)}</span></div>
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
    return readStorage(STORAGE_KEYS.favorites, []);
  }

  function updateFavoriteLabel(medicine) {
    const favoriteButton = document.getElementById('favoriteButton');
    if (!favoriteButton) return;
    const isSaved = getFavorites().some((item) => item.slug === medicine.slug);
    favoriteButton.textContent = isSaved ? 'Saved to favorites' : 'Add to favorites';
  }

  function toggleFavorite(medicine) {
    const favorites = getFavorites();
    const exists = favorites.find((item) => item.slug === medicine.slug);
    const nextFavorites = exists ? favorites.filter((item) => item.slug !== medicine.slug) : [medicine, ...favorites];
    writeStorage(STORAGE_KEYS.favorites, nextFavorites);
    updateFavoriteLabel(medicine);
    showToast(exists ? 'Removed from favorites' : 'Added to favorites');
  }

  function addRecentlyViewed(medicine) {
    const recent = readStorage(STORAGE_KEYS.recent, []);
    const next = [medicine, ...recent.filter((item) => item.slug !== medicine.slug)].slice(0, 6);
    writeStorage(STORAGE_KEYS.recent, next);
  }

  function initComparePage() {
    const selectA = document.getElementById('compareA');
    const selectB = document.getElementById('compareB');
    const compareButton = document.getElementById('compareButton');
    const compareTable = document.getElementById('compareTable');
    if (!selectA || !selectB || !compareTable) return;

    appState.medicines.forEach((medicine) => {
      selectA.appendChild(createOption(medicine));
      selectB.appendChild(createOption(medicine));
    });
    selectA.value = appState.medicines[0]?.slug || '';
    selectB.value = appState.medicines[1]?.slug || appState.medicines[0]?.slug || '';
    renderComparison();
    compareButton?.addEventListener('click', renderComparison);

    function createOption(medicine) {
      const option = document.createElement('option');
      option.value = medicine.slug;
      option.textContent = `${medicine.brandName} (${medicine.genericName})`;
      return option;
    }

    function renderComparison() {
      const medicineA = appState.medicines.find((item) => item.slug === selectA.value) || appState.medicines[0];
      const medicineB = appState.medicines.find((item) => item.slug === selectB.value) || appState.medicines[1] || appState.medicines[0];
      const rows = [
        { label: 'Brand', field: 'brandName' },
        { label: 'Generic', field: 'genericName' },
        { label: 'Category', field: 'category' },
        { label: 'Manufacturer', field: 'manufacturer' },
        { label: 'Uses', field: 'uses' },
        { label: 'Dosage', field: 'dosage' },
        { label: 'Side effects', field: 'sideEffects' },
        { label: 'Warnings', field: 'warnings' },
        { label: 'Pregnancy', field: 'pregnancy' },
        { label: 'Interactions', field: 'interactions' }
      ];
      compareTable.innerHTML = '';
      rows.forEach((row) => {
        const section = createElement(`
          <section class="compare-row animate-up">
            <article class="compare-card">
              <h3>${escapeHtml(row.label)}</h3>
              <p>${escapeHtml(medicineA[row.field])}</p>
            </article>
            <article class="compare-card">
              <h3>${escapeHtml(row.label)}</h3>
              <p>${escapeHtml(medicineB[row.field])}</p>
            </article>
          </section>
        `);
        compareTable.appendChild(section);
      });
    }
  }

  function initFavoritesPage() {
    const favoriteList = document.getElementById('favoriteList');
    const favoritesCount = document.getElementById('favoritesCount');
    const favoritesEmpty = document.getElementById('favoritesEmpty');
    const recentList = document.getElementById('recentlyViewedList');
    const clearButton = document.getElementById('clearFavoritesButton');
    if (!favoriteList) return;

    const saved = getFavorites();
    const recent = readStorage(STORAGE_KEYS.recent, []);
    if (favoritesCount) favoritesCount.textContent = saved.length;

    if (!saved.length) {
      favoritesEmpty.hidden = false;
    } else {
      favoritesEmpty.hidden = true;
      saved.forEach((item) => {
        const card = createElement(`
          <article class="card favorite-card animate-up">
            <h3>${escapeHtml(item.brandName)}</h3>
            <p>${escapeHtml(item.genericName)}</p>
            <div class="pill-metadata">
              <div><strong>Category</strong><span>${escapeHtml(item.category)}</span></div>
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
              <h3>${escapeHtml(item.brandName)}</h3>
              <p>${escapeHtml(item.genericName)}</p>
              <a class="link-button" href="medicine.html?slug=${item.slug}">Review again</a>
            </article>
          `);
          recentList.appendChild(entry);
        });
      }
    }

    if (clearButton) {
      clearButton.addEventListener('click', () => {
        writeStorage(STORAGE_KEYS.favorites, []);
        window.location.reload();
      });
    }
  }

  function initContactForm() {
    const form = document.getElementById('contactForm');
    const message = document.getElementById('contactMessage');
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (message) {
        message.textContent = 'Thanks for reaching out — our team will respond shortly.';
      }
      form.reset();
      showToast('Message sent successfully');
    });
  }

  function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        showToast('You are subscribed to our health updates');
        form.reset();
      }
    });
  }

  function showToast(message) {
    let toast = document.getElementById('mediwiseToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'mediwiseToast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(showToast.timeout);
    showToast.timeout = window.setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  async function init() {
    initTheme();
    initGlobalUI();
    await loadData();
    if (document.getElementById('trendingCards')) {
      initHomePage();
    }
    if (document.getElementById('searchResults')) {
      initSearchPage();
    }
    if (document.getElementById('detailAccordion') || document.getElementById('medicineImage')) {
      initMedicinePage();
    }
    if (document.getElementById('compareTable')) {
      initComparePage();
    }
    if (document.getElementById('favoriteList')) {
      initFavoritesPage();
    }
    if (document.getElementById('contactForm')) {
      initContactForm();
    }
    if (document.getElementById('newsletterForm')) {
      initNewsletterForm();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
