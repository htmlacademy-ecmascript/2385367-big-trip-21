import AbstractView from '../../framework/view/abstract-view.js';
import { createSortEventFormTemplate } from '../../template/main-templates/sort-event-template.js';

export default class SortEventView extends AbstractView {

  #handleSortTypeChange = null;

  constructor({ onSortTypeChange }) {
    super();
    this.#handleSortTypeChange = onSortTypeChange;
    this.element.addEventListener('change', this.#sortTypeChangeHandler);
  }

  get template() {
    return createSortEventFormTemplate();
  }

  #sortTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleSortTypeChange(evt.target.dataset.sortType);
  };

}
