export function fetchByAction(url: string, method: string, onSuccess: (json: string) => void, onFailed: (error: string) => void,
                              body: string | null = null, token: string | null = null) {
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set('Content-Type', 'application/json');

  if (token) {
    requestHeaders.set('Authorization', token);
  }

  fetch(url, {
    method: method,
    headers: requestHeaders,
    body: body,
  })
    .then(async (response) => {
      if (response.ok) {
        return await response.json();
      }

      try {
        return Promise.reject((await response.json()).message);
      } catch (e) {
        return Promise.reject(`Произошла ошибка. Статус запроса: ${ response.status }`);
      }
    })
    .then((json) => {
      if (!json.success) {
        return Promise.reject(json.message);
      }

      onSuccess(json);
    })
    .catch((error) => {
      onFailed(error);
    });
}
