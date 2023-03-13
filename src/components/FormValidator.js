export default class FormValidator {
  constructor({ inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, showErrorClass }, formEl) {
    this._formEl = formEl;
    this._submitEl = this._formEl.querySelector(submitButtonSelector);
    this._inputErrorClass = inputErrorClass;
    this._showErrorClass = showErrorClass;
    this._inactiveButtonClass = inactiveButtonClass;
    this._inputEls = Array.from(this._formEl.querySelectorAll(inputSelector));

    this._submitText = this._submitEl.textContent;
  }

  _showValidationError(inputEl) {
    const errorEl = this._formEl.querySelector(`.${inputEl.id}-error`)
    inputEl.classList.add(this._inputErrorClass);
    // Текст ошибки
    errorEl.textContent = inputEl.validationMessage;
    // Показываем (visibility) текст ошибки
    errorEl.classList.add(this._showErrorClass);
  }

  _hideValidationError(inputEl) {
    const errorEl = this._formEl.querySelector(`.${inputEl.id}-error`)
    inputEl.classList.remove(this._inputErrorClass);
    // Показываем (visibility) текст ошибки
    errorEl.classList.remove(this._showErrorClass);
    // Текст ошибки
    errorEl.textContent = '';
  }

  _checkInput(inputEl, showError) {
    if (inputEl.validity.patternMismatch) {
      inputEl.setCustomValidity(inputEl.dataset.invalidMessage);
    } else {
      inputEl.setCustomValidity('');
    }

    // showError нужен, чтобы при первом открытии формы сразу  не показывать ошибки
    if (inputEl.validity.valid || !showError) {
      this._hideValidationError(inputEl);
    } else {
      this._showValidationError(inputEl);
    }
  }

  _updateSubmitButton() {
    if (!this._formEl.checkValidity()) {
      // Деактивируем кнопку при ошибке валидации
      this._submitEl.setAttribute('disabled', true);
      this._submitEl.classList.add(this._inactiveButtonClass);
    } else {
      // Активируем кнопку при отсутствии ошибок валидации
      this._submitEl.removeAttribute('disabled');
      this._submitEl.classList.remove(this._inactiveButtonClass);
    }
  }

  _setEventListeners() {
    for (const inputEl of this._inputEls) {
      inputEl.addEventListener('input', () => {
        this._checkInput(inputEl, true);
        this._updateSubmitButton();
      });
    }
  }

  enableValidation() {
    this._setEventListeners();
    this._updateSubmitButton();
  }

  reset() {
    for (const inputEl of this._inputEls) {
      this._checkInput(inputEl, false);
    }
    this._updateSubmitButton();
  }

  /* Отключает кнопку на момент отправки формы */
  setSubmitBusyState(busyText) {
    this._submitText = this._submitEl.textContent;
    this._submitEl.textContent = busyText;
    this._submitEl.disabled = true;
  }

  /* Восстанавливает изначальное состояние кнопки после отправки */
  restoreSubmitState() {
    this._submitEl.textContent = this._submitText;
    this._submitEl.disabled = false;
  }
}
