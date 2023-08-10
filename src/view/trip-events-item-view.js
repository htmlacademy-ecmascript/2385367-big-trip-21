import { createElement } from '../render.js';
import { createTripEventsItemTemplate } from '../template/trip-events-item-template.js';

export default class TripEventsItemView {
  getTemplate() {
    return createTripEventsItemTemplate();
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
