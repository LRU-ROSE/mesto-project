// Импорт скриптов
import { validationConfig, initPopup } from './components/utils/utils.js';

import Api from './components/Api.js';
import Card from './components/card.js';
import PopupWithConfirmation from './components/PopupWithConfirmation.js';
import FormValidator from './components/FormValidator.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';

import './pages/index.css';

const initValidator = (formEl) => {
  const fv = new FormValidator(validationConfig, formEl);
  fv.enableValidation();
  return fv;
};

const popupWithImage = new PopupWithImage('.popup_mode_media-view');
popupWithImage.setEventListeners();

const popupWithConfirm = new PopupWithConfirmation('#popup-delete-card');
popupWithConfirm.setEventListeners();

const cardTemplate = document.querySelector('#card-template').content;
const createCard = (data, currentUserId) => {
  const card = new Card({
    data,
    currentUserId,
    handleCardClick(name, link) {
      popupWithImage.open(name, link);
    },
    async handleCardDelete(cardId) {
      const isAgreed = await popupWithConfirm.open();
      if (isAgreed) {
        try {
          await api.sendDeleteCard(cardId);
          card.remove();
          popupWithConfirm.close();
        } catch (error) {
          console.error(`Ошибка при удалении: ${error}`)
        }
      }
    },
    sendCardLike(cardId, likeState) {
      return api.sendLikeCard(cardId, likeState);
    }
  }, cardTemplate);
  return card.render();
}

const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-19',
  headers: {
    authorization: 'fa5cb345-1651-43dc-b82b-65aff8508d21',
    'Content-Type': 'application/json'
  }
});

const userData = await api.getCurrentUser()
  .catch((error) => console.error(`Ошибка получения данных пользователя: ${error}`));
const initialCards = await api.getInitialCards()
  .catch((error) => console.error(`Ошибка получения карточек: ${error}`));

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  descriptionSelector: '.profile__description',
  avatarSelector: '.profile__avatar',
  userInfo: userData,
  async sendUserData(avatar, info) {
    let newData = null;
    if (avatar !== null) {
      newData = await api.sendUpdateAvatar(avatar);
    }
    if (info !== null) {
      newData = await api.sendUpdateUser(info.name, info.desc);
    }
    return newData;
  }
});
userInfo.render();

const cardsSection =  new Section({
  items: initialCards.reverse(),
  renderer(data) {
    cardsSection.addItem(createCard(data, userInfo.getUserInfo()._id));
  }
}, '.cards');
cardsSection.renderItems();

const profileEditPopup = new PopupWithForm({
  selector: '#popup-edit-profile',
  handleSubmit({ username, description }) {
    return userInfo.setUserInfo({ info: { name: username.value, desc: description.value }})
      .then(() => profileEditPopup.close())
      .catch((error) => {
        console.error(`Ошибка обновления данных пользователя: ${error}`);
      });
  },
  handleOpen({ username, description }) {
    const { name, about } = userInfo.getUserInfo();
    username.value = name;
    description.value = about;
  },
  initValidator,
});
initPopup('.profile__button-edit', profileEditPopup);

const avatarEditPopup = new PopupWithForm({
  selector: '#popup-edit-avatar',
  handleSubmit({ avatar }) {
    return userInfo.setUserInfo({ avatar: avatar.value})
      .then(() => avatarEditPopup.close())
      .catch((error) => {
        console.error(`Ошибка обновления аватара: ${error}`);
      });
  },
  initValidator,
});
initPopup('.profile__edit-avatar-btn', avatarEditPopup);

const addCardPopup = new PopupWithForm({
  selector: '#popup-add-card',
  submitBusyText: 'Добавление...',
  handleSubmit({ 'place-name': name, 'place-image': image }) {
    return api.sendNewCard(name.value, image.value)
      .then((newCard) => {
        cardsSection.addItem(createCard(newCard, userInfo.getUserInfo()._id));
        addCardPopup.close();
      })
      .catch((error) => {
        console.error(`Ошибка отправки карточки: ${error}`);
      });
  },
  initValidator,
});
initPopup('.profile__button-add', addCardPopup);
