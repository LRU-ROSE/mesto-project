export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  // Обработка ответа сервера
  static _getJson(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка (${res.status}): ${res.statusText}`);
    }
  }

  // Получения данных пользователя с сервера
  getCurrentUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then((res) => Api._getJson(res));
  }

  // Инициализация карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => Api._getJson(res));
  }

  // Отправка данных пользователя на сервер
  sendNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    })
      .then((res) => Api._getJson(res));
  }

  // Удаление карточки с сервера
  sendDeleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => {
        if (res.status === 200) {
          return;
        } else {
          return Promise.reject(`Ошибка удаления карточки (${res.status}): ${res.statusText}`);
        }
      });
  }

  // Отправки лайка на сервер
  sendLikeCard(cardId, isLike) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLike ? 'PUT' : 'DELETE',
      headers: this._headers,
    })
      .then((res) => Api._getJson(res));
  }

  // Отправка данных пользователя на сервер
  sendUpdateUser(userName, userAbout) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name: userName, about: userAbout }),
    })
      .then((res) => Api._getJson(res));
  }

  // Отправка данных о новом аватаре на сервер
  sendUpdateAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: link }),
    })
      .then((res) => Api._getJson(res));
  }
}
