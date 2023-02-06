import { openPopup } from "./modal.js";
import { closePopup } from "./modal.js";
import { sendDeleteCard, sendLikeCard } from "./utils/api.js";

const cardTemplate = document.querySelector('#card-template').content;
// Popup режима просмотра(увеличения) картинки
const modeMediaView = document.querySelector('.popup_mode_media-view');
const viewImage = modeMediaView.querySelector('.popup__view-image');
const viewCaption = modeMediaView.querySelector('.popup__view-caption');
const popupDeletingCard = document.querySelector('#card-delete');

const likeCardHandler = (evt) => {
  const likeButtonEl = evt.target;
  const cardEl = likeButtonEl.closest('.card');
  const cardId = cardEl.getAttribute('card-id');

  const isCurrentlyLiked = likeButtonEl.classList.contains('card__button-like_active');

  sendLikeCard(cardId, !isCurrentlyLiked)
    .then((card) => {
      likeButtonEl.classList.toggle('card__button-like_active');
      const likeCounterEl = cardEl.querySelector('.card__like-counter');
      likeCounterEl.textContent = card.likes.length;
    })
    .catch((error) => {
      console.error(`Не удалось лайкнуть: ${error}`);
    });
};

// Функция добавления карточек
const addCard = function (card, myUserId) {
  const cardElementClone = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElementClone.querySelector('.card__image');
  const cardTitle = cardElementClone.querySelector('.card__title');

  const name = card.name;
  const link = card.link;

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  cardElementClone.setAttribute('card-id', card._id);

  const likeCounterEl = cardElementClone.querySelector('.card__like-counter');
  likeCounterEl.textContent = card.likes.length;

  const likeButtonEl = cardElementClone.querySelector('.card__button-like');
  if (card.likes.some((user) => user._id === myUserId)) {
    likeButtonEl.classList.add('card__button-like_active');
  }

  // Лайк карточек
  likeButtonEl.addEventListener('click', likeCardHandler);

  const deleteEl = cardElementClone.querySelector('.card__button-delete');

  if (card.owner._id === myUserId) {
    // Удаление карточек
    deleteEl.addEventListener('click', function () {
      popupDeletingCard.setAttribute('data-delete-id', card._id);
      openPopup(popupDeletingCard);
    });
  } else {
    deleteEl.remove();
  }

  // Режим просмотра(увеличения) картинки
  const getModeMediaView = function () {
    viewCaption.textContent = name;
    viewImage.src = link;
    viewImage.alt = name;
    openPopup(modeMediaView);
  };

  cardImage.addEventListener('click', getModeMediaView);

  return cardElementClone;
};

// Функция для удаления карточки после того как пользователь подтвердил
popupDeletingCard.querySelector('.popup__submit').addEventListener('click', function (evt) {
  evt.preventDefault();
  const cardId = popupDeletingCard.getAttribute('data-delete-id');
  sendDeleteCard(cardId)
    .then(() => {
      const cardEl = document.querySelector(`.card[card-id="${cardId}"]`);
      cardEl.remove();
      closePopup(popupDeletingCard);
    })
    .catch((e) => {
      console.error(e);
    });
});

export { addCard };
