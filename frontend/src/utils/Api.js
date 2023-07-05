class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getAllCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._checkRes(res);
    });
  }

  loadDataUser() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      return this._checkRes(res);
    });
  }

  editProfile(inputData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
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
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: dataAvatar.avatar,
      }),
    }).then((res) => {
      return this._checkRes(res);
    });
  }

  addCard(title, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: title, link: link }),
    }).then((res) => {
      return this._checkRes(res);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkRes(res);
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (!isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then((res) => {
        return this._checkRes(res);
      });
    } else {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then((res) => {
        return this._checkRes(res);
      });
    }
  }

  _checkRes(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Произошла ошибка");
  }
}

export const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    "content-type": "application/json",
    Authorization: "dac2ff7d-9ecf-480c-a9f0-aeb4dc4991bc",
  },
});
