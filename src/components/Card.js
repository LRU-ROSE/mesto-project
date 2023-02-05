import { openPopup } from "./modal.js";
import { closePopup } from "./modal.js";

const cardTemplate = document.querySelector('#card-template').content;
//Popup режима просмотра(увеличения) картинки
const modeMediaView = document.querySelector('.popup_mode_media-view');
const viewImage = modeMediaView.querySelector('.popup__view-image');
const viewCaption = modeMediaView.querySelector('.popup__view-caption');

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
    const cardToDelete = evt.target.closest('.card');
    const popupDeletingCard = document.querySelector('#card-delete');

    openPopup(popupDeletingCard);

    popupDeletingCard.querySelector('.popup__submit').addEventListener('click', function (evt) {
      evt.preventDefault();
      cardToDelete.remove();
      closePopup(popupDeletingCard);
    });
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

export { addCard };
