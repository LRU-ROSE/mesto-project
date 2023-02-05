// Импорт скриптов
import { classList } from './components/utils/utils.js';
import { enableValidation, toggleButtonState } from './components/validation.js';
import { openPopup, closePopup } from './components/modal.js';
import { addCard } from './components/card.js';
import {
  getCurrentUser,
  getInitialCards,
  sendNewCard,
  sendUpdateUser,
  sendUpdateAvatar,
} from './components/utils/api.js';
// Импорт стилей
import './pages/index.css';

// Редактирование профиля
const buttonEditProfile = document.querySelector('.profile__button-edit');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__avatar');
const profileEditSubmit = popupEditProfile.querySelector('.popup__submit');
const userNameProfileInput = popupEditProfile.querySelector('#username-input');
const descProfileInput = popupEditProfile.querySelector('#description-input');

// Добавления карточек с фото
const buttonAddCard = document.querySelector('.profile__button-add');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = popupAddCard.querySelector('.popup__form');
const nameCardInput = popupAddCard.querySelector('#place-name-input');
const imageCardInput = popupAddCard.querySelector('#placesrc-input');
const popupSubmit = popupAddCard.querySelector('.popup__submit');
const cardsSection = document.querySelector('.cards');

// Редактирование аватарки
const buttonEditAvatar = document.querySelector('.profile__edit-avatar-btn');
const popupEditAvatar = document.querySelector('#popup-edit-avatar');
const formEditAvatar = popupEditAvatar.querySelector('.popup__form');
const sourceAvatarInput = popupEditAvatar.querySelector('#avatarsrc-input');
const avatarEditSubmit = popupEditAvatar.querySelector('.popup__submit');

// Общие переменные
const popupElements = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__button-close');

// Функционал

// Вызов функции валидации
enableValidation(classList);

// Слушатель открытия popup редактирования аватара
buttonEditAvatar.addEventListener('click', function () {
  openPopup(popupEditAvatar);
});

// Слушатель открытия popup редактирования профиля
buttonEditProfile.addEventListener('click', function () {
  userNameProfileInput.value = profileName.textContent;
  descProfileInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
});

// Слушатель открытия popup добавления карточки
buttonAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
});

// Обработчик закрытия всех popup
popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Обработчик закрытия popup кликом на overlay
popupElements.forEach((popupElement) => {
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popupElement);
    }
  });
});

/*Отключает кнопку на момент отправки формы, возвращает функцию,
 которая при вызове восстанавливает изначальное состояние кнопки*/
const setButtonBusy = (buttonEl, text) => {
  const oldText = buttonEl.textContent;
  buttonEl.textContent = text;
  buttonEl.disabled = true;
  return () => {
    buttonEl.textContent = oldText;
    buttonEl.disabled = false;
  };
};

// Функция загрузки и добавления стартовых карточек
const renderInitialCards = function (myUserId) {
  getInitialCards()
    .then((data) => {
      cardsSection.innerHTML = '';
      data.forEach(function (card) {
        cardsSection.append(addCard(card, myUserId));
      });
    })
    .catch((error) => {
      console.error(`Ошибка получения карточек: ${error}`);
    });
};

// Функция загрузки и добавления данных пользователя
const getUser = function () {
  return getCurrentUser()
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      profileAvatar.src = userData.avatar;
      return userData._id;
    })
    .catch((error) => {
      console.error(`Ошибка получения данных пользователя: ${error}`);
    });
};

getUser().then((myUserId) => {
  renderInitialCards(myUserId);

  //Функция сохранения данных карточки
  const generateNewCard = function (evt) {
    evt.preventDefault();
    const revertButton = setButtonBusy(popupSubmit, 'Создание...');
    sendNewCard(nameCardInput.value, imageCardInput.value)
      .then((newCard) => {
        cardsSection.prepend(addCard(newCard, myUserId));
      })
      .catch((error) => {
        console.error(`Ошибка отправки карточки: ${error}`);
      })
      .finally(() => {
        revertButton();
        closePopup(popupAddCard);
        evt.target.reset()
        //Деактивируем кнопку "Создать" после добавления карточки
        toggleButtonState(formAddCard, popupSubmit, classList);
      });
  };
  //Обновление данных при нажатии кнопки создания карточки
  formAddCard.addEventListener('submit', generateNewCard);
});

//Функция сохранения новых данных профиля (Имя, О себе)
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const revertButton = setButtonBusy(profileEditSubmit, 'Сохранение...');
  sendUpdateUser(userNameProfileInput.value, descProfileInput.value)
  .then((userData) => {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
  })
  .catch((error) => {
    console.error(`Ошибка обновления пользователя: ${error}`);
  })
  .finally(() => {
    revertButton();
    closePopup(popupEditProfile);
  });
};
//Обновление данных профиля при нажатии кнопки сохранения
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//Функция сохранения новой аватарки
function handleEditAvatarSubmit(evt) {
  evt.preventDefault();
  const revertButton = setButtonBusy(avatarEditSubmit, 'Сохранение...');
  sendUpdateAvatar(sourceAvatarInput.value)
  .then((userData) => {
    profileAvatar.src = userData.avatar;
  })
  .catch((error) => {
    console.error(`Ошибка обновления аватара: ${error}`);
  })
  .finally(() => {
    revertButton();
    closePopup(popupEditAvatar);
    evt.target.reset()
  });
};
//Обновление данных профиля при нажатии кнопки сохранения
formEditAvatar.addEventListener('submit', handleEditAvatarSubmit);
