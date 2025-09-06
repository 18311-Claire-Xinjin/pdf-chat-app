const key = "pdf-chat-session-id";

export function getSessionIdFromLS() {
  return localStorage.getItem(key);
}

export function setSessionIdInLS(sessionId: string) {
  localStorage.setItem(key, sessionId);
}

export function removeSessionIdFromLS() {
  localStorage.removeItem(key);
}
