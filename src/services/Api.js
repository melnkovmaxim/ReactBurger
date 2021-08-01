export function fetchByAction(url, method, onSuccess, onFailed, body = null, token = null) {
  const authorization = token ? { "Authorization": token } : null;

  fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json", authorization },
    body: body,
  })
    .then(async (response) => {
      const json = await response.json();

      if (response.ok) {
        return json;
      }

      if (json && json.message) {
        return Promise.reject(json.message);
      }

      return Promise.reject(`Ошибка ${response.status}`);
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
