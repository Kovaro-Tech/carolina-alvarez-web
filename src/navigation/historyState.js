// Scroll and UI state belong to a history entry, not just a pathname.
const storageKey = 'carolina-navigation-v1'
let entries = {}
try {
  entries = JSON.parse(sessionStorage.getItem(storageKey) || '{}')
} catch { /* Storage may be unavailable in private browsing. */ }

export function readEntry(key) {
  return entries[key]
}

export function saveEntry(key, patch) {
  entries[key] = { ...entries[key], ...patch }
}

export function persistEntries() {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(entries))
  } catch { /* In-memory restoration still works. */ }
}
