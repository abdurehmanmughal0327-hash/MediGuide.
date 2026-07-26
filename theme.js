const THEME_KEY = 'mediwise-theme';

export function initTheme() {
  const saved = window.localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = saved ? saved === 'dark' : prefersDark;
  setTheme(isDark ? 'dark' : 'light');
  const toggle = document.getElementById('themeToggle');
  if (toggle && toggle.dataset.mediwiseThemeBound !== 'true') {
    toggle.dataset.mediwiseThemeBound = 'true';
    toggle.addEventListener('click', () => {
      const next = document.body.classList.contains('dark') ? 'light' : 'dark';
      setTheme(next);
    });
  }
}

function setTheme(value) {
  if (value === 'dark') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  window.localStorage.setItem(THEME_KEY, value);
}
