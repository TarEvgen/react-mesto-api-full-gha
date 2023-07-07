class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: { 'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    }).then((res) => {
      return this._checkRes(res);
    });
  }

  loadDataUser() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: { 'content-type': 'application/json',
       Authorization: `Bearer ${localStorage.getItem('jwt')}` }
      
    }).then((res) => {
      return this._checkRes(res);
    });
  }

  editProfile(inputData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers:  { 'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}` },
      body: JSON.stringify({
        name: inputData.name,
        about: inputData.about,
      }),
    }).then((res) => {
      return this._checkRes(res);
    });
  }

  updateAvatar(dataAvatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers:  { 'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}` },
      body: JSON.stringify({
        avatar: dataAvatar.avatar,
      }),
    }).then((res) => {
      return this._checkRes(res);
    });
  }

  addCard(title, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers:  { 'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}` },
      body: JSON.stringify({ name: title, link: link }),
    }).then((res) => {
      return this._checkRes(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers:  { 'content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('jwt')}` },
    }).then((res) => {
      return this._checkRes(res);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers:  { 'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}` },
      }).then((res) => {
        return this._checkRes(res);
      });
    } else {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers:  { 'content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}` },
      }).then((res) => {
        return this._checkRes(res);
      });
    }
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject('Произошла ошибка');
  } 
}


export const api = new Api({
  url: 'https://api.tarasov.nomoreparties.sbs',
});


