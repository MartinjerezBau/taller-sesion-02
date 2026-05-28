const TOKEN_KEY = 'ps_access_token';
const REFRESH_KEY = 'ps_refresh_token';
const USERNAME_KEY = 'ps_username';

export function getAccessToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
  return sessionStorage.getItem(REFRESH_KEY);
}

export function getUsername() {
  return sessionStorage.getItem(USERNAME_KEY);
}

export function saveSession(accessToken, refreshToken, username) {
  sessionStorage.setItem(TOKEN_KEY, accessToken);
  if (refreshToken) sessionStorage.setItem(REFRESH_KEY, refreshToken);
  if (username) sessionStorage.setItem(USERNAME_KEY, username);
}

export function clearSession() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_KEY);
  sessionStorage.removeItem(USERNAME_KEY);
}

export function isAuthenticated() {
  return Boolean(getAccessToken());
}

export async function login(username, password) {
  const response = await fetch('/api/auth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Invalid username or password');
  }

  const data = await response.json();
  saveSession(data.access_token, data.refresh_token, username);
  return data;
}
