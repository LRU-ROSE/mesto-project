const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: 'fa5cb345-1651-43dc-b82b-65aff8508d21',
    'Content-Type': 'application/json'
  }
};

const getJson = function (res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка (${res.status}): ${res.statusText}`);
};

export const getCurrentUser = () => fetch(`${config.baseUrl}/users/me`, {
  headers: config.headers,
})
.then(getJson);

export const getInitialCards = () => fetch(`${config.baseUrl}/cards`, {
  headers: config.headers,
})
.then(getJson);

export const sendNewCard = (name, link) => fetch(`${config.baseUrl}/cards`, {
  method: 'POST',
  headers: config.headers,
  body: JSON.stringify({ name, link }),
})
.then(getJson);

export const sendDeleteCard = (cardId) => fetch(`${config.baseUrl}/cards/${cardId}`, {
  method: 'DELETE',
  headers: config.headers,
})
.then((res) => {
  if (res.status === 200) {
    return;
  } else {
    return Promise.reject(`Ошибка удаления карточки (${res.status}): ${res.statusText}`);
  }
});

export const sendLikeCard = (cardId, isLike) => fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
  method: isLike ? 'PUT' : 'DELETE',
  headers: config.headers,
})
.then(getJson);

export const sendUpdateUser = (userName, userAbout) => fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({ name: userName, about: userAbout }),
})
.then(getJson);

export const sendUpdateAvatar = (link) => fetch(`${config.baseUrl}/users/me/avatar `, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({ avatar: link }),
})
.then(getJson);
