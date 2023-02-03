//Импорт скриптов
import { classList, initialCards} from './components/untils/utils.js';
import { enableValidation, toggleButtonState } from './components/validation.js';
import { openPopup, closePopup } from './components/modal.js';
import { addCard } from './components/card.js';
//Импорт стилей
import './pages/index.css';
//Редактирование профиля
const buttonEditProfile = document.querySelector('.profile__button-edit');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const userNameProfileInput = popupEditProfile.querySelector('#username-input');
const descProfileInput = popupEditProfile.querySelector('#description-input');
//Добавления карточек с фото
const buttonAddCard = document.querySelector('.profile__button-add');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = popupAddCard.querySelector('.popup__form');
const nameCardInput = popupAddCard.querySelector('#place-name-input');
const imageCardInput = popupAddCard.querySelector('#placesrc-input');
const popupSubmit = popupAddCard.querySelector('.popup__submit');
const cardsSection = document.querySelector('.cards')

//Общие переменные
const popupElements = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__button-close');

//Функционал

//Вызов функции валидации
enableValidation(classList);

//Функция открытия popup редактирования профиля
const openProfilePopup = function () {
  userNameProfileInput.value = profileName.textContent;
  descProfileInput.value = profileDescription.textContent;
  openPopup(popupEditProfile);
};

//Слушатель открытия popup редактирования профиля
buttonEditProfile.addEventListener('click', openProfilePopup);
//Слушатель открытия popup добавления карточки
buttonAddCard.addEventListener('click', function () {
  openPopup(popupAddCard);
});

//Обработчик закрытия всех popup
popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//Обработчик закрытия popup кликом на overlay
popupElements.forEach((popupElement) => {
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popupElement);
    }
  });
});

//Функция сохранения новых данных профиля (Имя, О себе)
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = userNameProfileInput.value;
  profileDescription.textContent = descProfileInput.value;
  closePopup(popupEditProfile);
};
//Обновление данных профиля при нажатии кнопки сохранения
formEditProfile.addEventListener('submit', handleProfileFormSubmit);

//Функция добавления стартовых карточек
const renderInitialCards = function () {
  initialCards.forEach(function (card) {
    cardsSection.append(addCard(card.name, card.link))
  });
};
//Вызов функции добавления стартовых карточек при загрузке страницы
  renderInitialCards()
//Функция сохранения данных карточки
  const generateNewCard = function (evt) {
    evt.preventDefault();
    cardsSection.prepend(addCard(nameCardInput.value, imageCardInput.value));
    evt.target.reset()
    closePopup(popupAddCard);
    //Деактивируем кнопку "Создать" после добавления карточки
    toggleButtonState(formAddCard, popupSubmit, classList);
  };
  //Обновление данных при нажатии кнопки создания карточки
  formAddCard.addEventListener('submit', generateNewCard);
