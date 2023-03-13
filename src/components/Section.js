export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerEl = document.querySelector(containerSelector);
  }

  renderItems() {
    // Очищаем контейнер от текста с "Загрузка..."
    this._containerEl.innerHTML = '';
    for (const item of this._items) {
      this._renderer(item);
    }
  }

  addItem(itemEl) {
    this._containerEl.prepend(itemEl);
  }
}
