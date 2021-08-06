import { Cookies } from "react-cookie";

const cookies = new Cookies();

export function getAccessToken() {
    return cookies.get('token');
}

export function setAccessToken(accessToken) {
    const currentDate = new Date();
    //currentDate.setMinutes(currentDate.getMinutes() + 19);
    currentDate.setSeconds(currentDate.getSeconds() + 5);
    cookies.set('token', accessToken, { expires: currentDate })
}

export function removeAccessToken() {
    cookies.remove('token');
}