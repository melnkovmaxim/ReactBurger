import { IResponse } from "../interfaces/api/IResponse";

export function fetchByAction<TResponse>(url: string, method: string, onSuccess: (response: TResponse) => void, onFailed: (error: string) => void,
                              body: string | null = null, token: string | null = null): void {
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
      try {
        if (response.ok) {
          return await response.json() as IResponse & TResponse;
        }
        return Promise.reject((await response.json()).message);
      } catch (e) {
        return Promise.reject(`Произошла ошибка. Статус запроса: ${ response.status }`);
      }
    })
    .then((object: IResponse & TResponse) => {
      if (!object.success) {
        return Promise.reject(object.message);
      }

      onSuccess(object);
    })
    .catch((error: string) => {
      onFailed(error);
    });
}
