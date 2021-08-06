export function fetchByAction(url, method, onSuccess, onFailed, body = null, token = null) {
  fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json", "Authorization": token },
    body: body,
  })
    .then(async (response) => {
      const contentType = response.headers.get("content-type");
      const json = contentType === "application/json" 
        ? await response.json() 
        : null;

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
