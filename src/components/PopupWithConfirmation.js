import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(selector) {
    super(selector);

    this._handleFinish = null;
  }

  _confirm(isAgreed) {
    if (this._handleFinish) {
      this._handleFinish(isAgreed);
      this._handleFinish = null;
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

  open(handleFinish) {
    this._confirm(false);
    this._handleFinish = handleFinish;
    super.open();
  }

  close() {
    super.close();
    this._confirm(false);
  }
}
