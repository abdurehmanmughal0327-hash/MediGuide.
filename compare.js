import { loadJson, createElement } from './utils.js';

async function initComparePage() {
  const medicines = await loadJson('data/medicines.json');
  const selectA = document.getElementById('compareA');
  const selectB = document.getElementById('compareB');
  const compareButton = document.getElementById('compareButton');
  const compareTable = document.getElementById('compareTable');
  if (!selectA || !selectB || !compareTable) return;

  medicines.forEach((medicine) => {
    selectA.appendChild(createOption(medicine));
    selectB.appendChild(createOption(medicine));
  });

  selectA.value = medicines[0]?.slug || '';
  selectB.value = medicines[1]?.slug || medicines[0]?.slug || '';
  renderComparison();

  compareButton?.addEventListener('click', renderComparison);

  function createOption(medicine) {
    const option = document.createElement('option');
    option.value = medicine.slug;
    option.textContent = `${medicine.brandName} (${medicine.genericName})`;
    return option;
  }

  function renderComparison() {
    const medicineA = medicines.find((item) => item.slug === selectA.value) || medicines[0];
    const medicineB = medicines.find((item) => item.slug === selectB.value) || medicines[1] || medicines[0];
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
      { label: 'Interactions', field: 'interactions' },
    ];
    compareTable.innerHTML = '';
    rows.forEach((row) => {
      const section = createElement(`
        <section class="compare-row animate-up">
          <article class="compare-card">
            <h3>${row.label}</h3>
            <p>${medicineA[row.field]}</p>
          </article>
          <article class="compare-card">
            <h3>${row.label}</h3>
            <p>${medicineB[row.field]}</p>
          </article>
        </section>
      `);
      compareTable.appendChild(section);
    });
  }
}

initComparePage();
