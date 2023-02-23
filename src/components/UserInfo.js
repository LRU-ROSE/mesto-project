export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector, userInfo, sendUserData }) {
    this._nameEl = document.querySelector(nameSelector);
    this._descEl = document.querySelector(descriptionSelector);
    this._avatarEl = document.querySelector(avatarSelector);
    this._sendData = sendUserData;
    this._userInfo = userInfo;
  }

  getUserInfo() {
      return this._userInfo;
  }

  setUserInfo({ avatar = null, info = null }) {
    return this._sendData(avatar, info)
      .then((userData) => {
        this._userInfo = userData;
        this.render();
        return userData;
      });
  }

  render() {
    this._nameEl.textContent = this._userInfo.name;
    this._descEl.textContent = this._userInfo.about;
    this._avatarEl.src = this._userInfo.avatar;
  }
}
