import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(elSelector) {
    super(elSelector);
    this._imgEl = this._popupEl.querySelector('.popup__view-image');
    this._captionEl = this._popupEl.querySelector('.popup__view-caption');
  }

  open(name, link) {
    this._captionEl.textContent = name;
    this._imgEl.src = link;
    this._imgEl.alt = name;
    super.open();
  }
}
