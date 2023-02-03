const showValidationError = function (formItem, inputItem, errorMessage, settings) {
  const errorItem = formItem.querySelector(`.${inputItem.id}-error`)
  inputItem.classList.add(settings.inputErrorClass);
  //Текст ошибки
  errorItem.textContent = errorMessage;
  //Показываем (visibility) текст ошибки
  errorItem.classList.add(settings.errorClass);
};

//Скрытие ошибок валидации
const hideValidationError = function (formItem, inputItem, settings) {
  const errorItem = formItem.querySelector(`.${inputItem.id}-error`)
  inputItem.classList.remove(settings.inputErrorClass);
  //Скрываем (visibility) текст ошибок
  errorItem.classList.remove(settings.errorClass);
  //Сброс ошибки
  errorItem.textContent = '';
};

//Функция проверки валидации форм
const checkInputValidity = function (formItem, inputItem, settings) {
    if (inputItem.validity.patternMismatch) {
    inputItem.setCustomValidity(inputItem.dataset.invalidMessage);
  } else {
    inputItem.setCustomValidity("");
  }

  if (!inputItem.validity.valid) {
    showValidationError(formItem, inputItem, inputItem.validationMessage, settings);
  } else {
    hideValidationError(formItem, inputItem, settings);
  }
};

//Функция проверки input на ошибки
const hasInvalidInput = function (inputList) {
  return inputList.some((item) => {
    return !item.validity.valid;
  });
};

//Функция состояния кнопки submit
const toggleButtonState = function (formItem, buttonItem, settings) {
  const inputList = Array.from(formItem.querySelectorAll(settings.inputSelector));
  if (hasInvalidInput(inputList)) {
    //Диактивируем кнопку при ошибке валидации
    buttonItem.setAttribute('disabled', true);
    buttonItem.classList.add(settings.inactiveButtonClass);
  } else {
    //Активируем кнопку при отсутствии ошибок валидации
    buttonItem.removeAttribute('disabled');
    buttonItem.classList.remove(settings.inactiveButtonClass);
  }
};

//Функция добаления обработчиков input
const setEventListeners = function (formItem, settings) {
  const inputList = Array.from(formItem.querySelectorAll(settings.inputSelector));
  const buttonItem = formItem.querySelector(settings.submitButtonSelector);

  toggleButtonState(formItem, buttonItem, settings);

  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', function () {
      checkInputValidity(formItem, inputItem, settings);
      toggleButtonState(formItem, buttonItem, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formItem) => {
    setEventListeners(formItem, settings);
  });
};

export { enableValidation, toggleButtonState };
