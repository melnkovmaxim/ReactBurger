export function fetchByAction(url, method, onSuccess, onFailed, body = null, token = null) {
  fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json", "Authorization": token },
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
