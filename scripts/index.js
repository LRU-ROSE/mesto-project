//ОБЪВЛЕНИЕ ПЕРЕМЕННЫХ
//Редактирование профиля
const editProfileButton = document.querySelector('.profile__button-edit');
const editProfilePopup = document.querySelector('.popup_type_edit-profile');
const editProfileForm = editProfilePopup.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const userNameProfileInput = editProfilePopup.querySelector('#userName-input');
const descProfileInput = editProfilePopup.querySelector('#description-input');
//Добавления карточек с фото
const addCardButton = document.querySelector('.profile__button-add');
const addCardPopup = document.querySelector('.popup_type_add-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const nameCardInput = addCardPopup.querySelector('#placeName-input');
const imageCardInput = addCardPopup.querySelector('#placeSrc-input');
const popupSubmit = addCardPopup.querySelector('.popup__button-save');
const cardsSection = document.querySelector('.cards')
const cardTemplate = document.querySelector('#card-template').content;
//Popup режима просмотра(увеличения) картинки
const modeMediaView = document.querySelector('.popup_mode_media-view');
const viewImage = modeMediaView.querySelector('.popup__view-image');
const viewCaption = modeMediaView.querySelector('.popup__view-caption');

//Общие переменные
const popupElements = document.querySelectorAll('.popup');
const closePopupButton = document.querySelectorAll('.popup__button-close');

//Функционал
//
//Функция открытия всех popup
const openPopup = function (popupName) {
  popupName.classList.add('popup_opened');
};

//Функция открытия popup редактирования профиля
const openProfilePopup = function () {
  userNameProfileInput.value = profileName.textContent;
  descProfileInput.value = profileDescription.textContent;
  openPopup(editProfilePopup);
};

//Слушатель открытия popup редактирования профиля
editProfileButton.addEventListener('click', openProfilePopup);
//Слушатель открытия popup добавления карточки
addCardButton.addEventListener('click', function () {
  openPopup(addCardPopup);
});

//Функция закрытия всех popup
const closePopup = function (popupName) {
  popupName.classList.remove('popup_opened');
};
//Обработчик закрытия всех popup
closePopupButton.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

//Функция сохранения новых данных профиля (Имя, О себе)
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = userNameProfileInput.value;
  profileDescription.textContent = descProfileInput.value;
  closePopup(editProfilePopup);
};
//Обновление данных профиля при нажатии кнопки сохранения
editProfileForm.addEventListener('submit', handleProfileFormSubmit);

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
    closePopup(addCardPopup);
  };
  //Обновление данных при нажатии кнопки создания карточки
  addCardForm.addEventListener('submit', generateNewCard);
