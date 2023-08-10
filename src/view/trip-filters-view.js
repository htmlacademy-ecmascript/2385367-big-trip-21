import { createElement } from '../render.js';
import { createTripFiltersTemplate } from '../template/trip-filters-template.js';

export default class TripFiltersView {
  getTemplate() {
    return createTripFiltersTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
