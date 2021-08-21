export function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

export function setRefreshToken(refreshToken) {
  localStorage.setItem('refresh_token', refreshToken);
}

export function removeRefreshToken() {
  localStorage.removeItem('refresh_token');
}