import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ selector, handleSubmit, handleOpen = null, submitBusyText = 'Сохранение...', initValidator }) {
    super(selector);

    this._handleSubmit = handleSubmit;
    this._handleOpen = handleOpen;
    this._submitBusyText = submitBusyText;

    this._formEl = this._popupEl.querySelector('.popup__form');
    this._inputs = Array.from(this._formEl.querySelectorAll('.popup__input'));

    this._captionEl = this._popupEl.querySelector('.popup__view-caption');

    this._validator = initValidator(this._formEl);
  }

  _getInputValues() {
    return Object.fromEntries(this._inputs.map((el) => [el.name, el.value]));
  }

  setEventListeners() {
    super.setEventListeners();

    this._formEl.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._validator.setSubmitBusyState(this._submitBusyText);
      this._handleSubmit(this._getInputValues(), () => this._validator.restoreSubmitState());
    });
  }

  open() {
    if (this._handleOpen) {
      this._handleOpen(this._formEl.elements);
    }
    this._validator.reset();
    super.open();
  }

  close() {
    super.close();
    this._formEl.reset();
  }
}
