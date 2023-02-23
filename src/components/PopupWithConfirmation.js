import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);

    this._handleConfirm = null;
  }

  _confirm(isAgreed) {
    if (this._handleConfirm) {
      this._handleConfirm(isAgreed);
      this._handleConfirm = null;
    }
  }

  setEventListeners() {
    super.setEventListeners();

    const button = this._popupEl.querySelector('.popup__submit');

    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._confirm(true);
    });
  }

  open() {
    this._confirm(false);
    super.open();
    return new Promise((resolve) => {
      this._handleConfirm = resolve;
    });
  }

  close() {
    super.close();
    this._confirm(false);
  }

}
