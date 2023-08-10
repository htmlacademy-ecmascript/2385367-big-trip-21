import { createElement } from '../render.js';
import { createEventListTemplate } from '../template/trip-events-list-template.js';

export default class TripEventsListView {
  getTemplate() {
    return createEventListTemplate();
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
