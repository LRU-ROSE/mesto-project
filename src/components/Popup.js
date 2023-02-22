export default class Popup {
  constructor(elSelector) {
    this._popupEl = document.querySelector(elSelector);
    this._bindedHandleEscClose = this._handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    // Обработчик закрытия popup кликом на кнопку
    const closeButton = this._popupEl.querySelector('.popup__button-close');
    closeButton.addEventListener('click', () => this.close());

    // Обработчик закрытия popup кликом на overlay
    this._popupEl.addEventListener('mousedown', (evt) => {
      if (evt.target === this._popupEl) {
        this.close();
      }
    });
  }

  open() {
    this._popupEl.classList.add('popup_opened');
    document.addEventListener('keydown', this._bindedHandleEscClose);
  }

  close() {
    this._popupEl.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._bindedHandleEscClose);
  }
}
