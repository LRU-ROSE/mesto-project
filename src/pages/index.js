
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
const cardTemplate = document.querySelector('#card-template').content;
//Popup режима просмотра(увеличения) картинки
const modeMediaView = document.querySelector('.popup_mode_media-view');
const viewImage = modeMediaView.querySelector('.popup__view-image');
const viewCaption = modeMediaView.querySelector('.popup__view-caption');

//Общие переменные
const popupElements = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__button-close');

//Функционал
//
//Функция открытия всех popup
const openPopup = function (popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
};

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

//Функция закрытия всех popup
const closePopup = function (popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
};

//Функция закрытия popup на Esc
const closePopupOnEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
};

//Обработчик закрытия всех popup
popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//Обработчик закрытия popup кликом на overlay
popupElements.forEach((popupElements) => {
  popupElements.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popupElements);
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

//Функция добавления карточек
const addCard = function (name, link) {
  const cardElementClone = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElementClone.querySelector('.card__image');
  const cardTitle = cardElementClone.querySelector('.card__title');

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  //Удаление карточек
  cardElementClone.querySelector('.card__button-delete').addEventListener('click', function (evt) {
    evt.target.closest('.card').remove();
  });
  //Лайк карточек
  cardElementClone.querySelector('.card__button-like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__button-like_active');
  });

  //Режим просмотра(увеличения) картинки
  const getModeMediaView = function () {
    viewCaption.textContent = name;
    viewImage.src = link;
    viewImage.alt = name;
    openPopup(modeMediaView);
  };

  cardImage.addEventListener('click', getModeMediaView);

  return cardElementClone;
}
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
  };
  //Обновление данных при нажатии кнопки создания карточки
  formAddCard.addEventListener('submit', generateNewCard);
