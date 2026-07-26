export async function loadJson(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error('Unable to load ' + path);
    return await response.json();
  } catch (error) {
    console.warn('JSON load failed', path, error);
    return [];
  }
}

export function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name) || '';
}

export function getStoredItem(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function setStoredItem(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export function clamp(text, length) {
  return text.length > length ? `${text.slice(0, length).trim()}...` : text;
}

export function createElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.firstElementChild;
}

export function formatArrayList(items) {
  return items.map((item) => `${item}`).join(', ');
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
