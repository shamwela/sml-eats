export let sessionId: string | null

if (typeof window === 'undefined') {
  sessionId = null
} else {
  const sessionIdInLocalStorage = localStorage.getItem('sessionId')
  if (sessionIdInLocalStorage) {
    sessionId = sessionIdInLocalStorage
  } else {
    sessionId = sessionStorage.getItem('sessionId')
  }
}
