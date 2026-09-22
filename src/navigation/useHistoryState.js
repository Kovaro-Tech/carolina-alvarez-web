import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { readEntry, saveEntry } from './historyState'

// The route content is keyed by location.key, so POP mounts with its saved UI
// before the scroll controller measures or restores anything.
export function useHistoryState(name, initialValue) {
  const { key } = useLocation()
  const [value, setValue] = useState(() => {
    const saved = readEntry(key)?.ui
    return saved && name in saved ? saved[name] : initialValue
  })
  const update = (nextValue) => {
    saveEntry(key, { ui: { ...readEntry(key)?.ui, [name]: nextValue } })
    setValue(nextValue)
  }
  return [value, update]
}
