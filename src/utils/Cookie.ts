import { Cookies } from "react-cookie";

const cookies: Cookies = new Cookies();

export function getAccessToken(): string {
  return cookies.get('token');
}

export function setAccessToken(accessToken: string): void {
  const currentDate: Date = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + 19);
  cookies.set('token', accessToken, { expires: currentDate })
}

export function removeAccessToken(): void {
  cookies.remove('token');
}