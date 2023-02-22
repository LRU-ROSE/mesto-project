const validationConfig = {
  // Инпут, конопка отправки
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  //Cкрытие кнопки, оформления текста ошибкок и скрытие ошибок
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  showErrorClass: 'popup__input_type_visible',
};

const initPopup = (openBtnSelector, popup) => {
  const button = document.querySelector(openBtnSelector);
  button.addEventListener('click', () => popup.open());
  popup.setEventListeners();
};

export { validationConfig, initPopup };
