// Функция открытия всех popup
const openPopup = function (popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
};

// Функция закрытия всех popup
const closePopup = function (popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
};

// Функция закрытия popup на Esc
const closePopupOnEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

export { openPopup, closePopup };
