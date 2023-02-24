export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector, userInfo }) {
    this._nameEl = document.querySelector(nameSelector);
    this._descEl = document.querySelector(descriptionSelector);
    this._avatarEl = document.querySelector(avatarSelector);
    this._userInfo = userInfo;
  }

  getId() {
    return this._userInfo._id;
  }

  getUserInfo() {
    return this._userInfo;
  }

  setUserInfo(userData) {
    this._userInfo = userData;
    this.render();
  }

  render() {
    this._nameEl.textContent = this._userInfo.name;
    this._descEl.textContent = this._userInfo.about;
    this._avatarEl.src = this._userInfo.avatar;
  }
}
