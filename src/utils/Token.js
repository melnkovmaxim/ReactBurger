export function isAliveToken(token) {
    const parsedToken = token ? JSON.parse(token) : '';
    const result = parsedToken && parsedToken.expires  > new Date().getTime();
    
    return result;
}

export const getTokenWithExpiresDate = (token) => {
  const currentDate = new Date();
  currentDate.setMinutes(currentDate.getMinutes() + 19);
  //currentDate.setSeconds(currentDate.getSeconds() + 5);
  const accessToken = { token: token, expires: currentDate.getTime() }

  return accessToken;
};
