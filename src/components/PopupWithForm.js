import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ selector, handleSubmit, handleOpen = null, submitBusyText = 'Сохранение...', initValidator }) {
    super(selector);

    this._handleSubmit = handleSubmit;
    this._handleOpen = handleOpen;
    this._submitBusyText = submitBusyText;

    this._formEl = this._popupEl.querySelector('.popup__form');

    this._submitEl = this._formEl.querySelector('.popup__submit');
    this._submitText = this._submitEl.textContent;

    this._captionEl = this._popupEl.querySelector('.popup__view-caption');

    this._validator = initValidator(this._formEl);
  }

  /* Отключает кнопку на момент отправки формы */
  _setSubmitBusyState() {
    this._submitText = this._submitEl.textContent;
    this._submitEl.textContent = this._submitBusyText;
    this._submitEl.disabled = true;
  }

  /* Восстанавливает изначальное состояние кнопки после отправки */
  _restoreSubmitState() {
    this._submitEl.textContent = this._submitText;
    this._submitEl.disabled = false;
  }

  _getInputValues() {
    const inputs = this._formEl.querySelectorAll('.popup__input');
    return Object.fromEntries(Array.from(inputs).map((el) => [el.name, el]));
  }

  setEventListeners() {
    super.setEventListeners();

    this._formEl.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._setSubmitBusyState();
      this._handleSubmit(this._getInputValues()).finally(() => this._restoreSubmitState());
    });
  }

  open() {
    if (this._handleOpen) {
      this._handleOpen(this._getInputValues());
    }
    this._validator.reset();
    super.open();
  }

  close() {
    super.close();
    this._formEl.reset();
  }
}
