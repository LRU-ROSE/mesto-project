export default class Card {
  constructor({ data, handleCardClick, handleCardDelete, handleCardLike, currentUserId }, templateEl) {
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._currentUserId = currentUserId;
    this._templateEl = templateEl;
    // Инициализируем в конструкторе поля, которые будут позже записаны в render,
    // чтобы не менять форму объекта почём зря
    this._cardEl = null;
    this._cardImageEl = null;
    this._likeButtonEl = null;
    this._likeCounterEl = null;
    this._deleteButtonEl = null;
  }

  updateLikes(cardData) {
    if (cardData.likes.some((user) => user._id === this._currentUserId)) {
      this._likeButtonEl.classList.add('card__button-like_active');
    } else {
      this._likeButtonEl.classList.remove('card__button-like_active');
    }
    this._likeCounterEl.textContent = cardData.likes.length;
  }

  _setEventListeners() {
    this._cardImageEl.addEventListener('click', () => this._handleCardClick(this._data.name, this._data.link));
    this._likeButtonEl.addEventListener('click', () => {
      const isCurrentlyLiked = this._likeButtonEl.classList.contains('card__button-like_active');

      this._handleCardLike(this._data._id, !isCurrentlyLiked)
    });
    if (this._deleteButtonEl) {
      this._deleteButtonEl.addEventListener('click', () => this._handleCardDelete(this._data._id));
    }
  }

  remove() {
    this._cardEl.remove();
    this._cardEl = null;
  }

  render() {
    this._cardEl = this._templateEl.querySelector('.card').cloneNode(true);

    const { name, link, owner: { _id: ownerId } } = this._data;

    this._cardImageEl = this._cardEl.querySelector('.card__image');
    const cardTitle = this._cardEl.querySelector('.card__title');

    cardTitle.textContent = name;
    this._cardImageEl.src = link;
    this._cardImageEl.alt = name;

    this._likeCounterEl = this._cardEl.querySelector('.card__like-counter');
    this._likeButtonEl = this._cardEl.querySelector('.card__button-like');
    this.updateLikes(this._data);

    const deleteButtonEl = this._cardEl.querySelector('.card__button-delete');
    if (ownerId !== this._currentUserId) {
      deleteButtonEl.remove();
    } else {
      this._deleteButtonEl = deleteButtonEl;
    }

    this._setEventListeners();

    return this._cardEl;
  }
}
