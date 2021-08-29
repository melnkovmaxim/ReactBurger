export function getRefreshToken(): string | null {
  return localStorage.getItem('refresh_token');
}

export function setRefreshToken(refreshToken: string): void {
  localStorage.setItem('refresh_token', refreshToken);
}

export function removeRefreshToken(): void {
  localStorage.removeItem('refresh_token');
}