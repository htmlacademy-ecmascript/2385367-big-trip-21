import { createElement } from '../render.js';
import { createEventTypeFormTemplate, createEmptyPoint } from '../template/event-type-form-template.js';

export default class EventTypeFormView {

  constructor({ point = createEmptyPoint(), tripDestinations, allOffers}) {
    this.point = point;
    this.tripDestinations = tripDestinations;
    this.allOffers = allOffers;
  }

  getTemplate() {
    return createEventTypeFormTemplate(this.point, this.tripDestinations, this.allOffers);
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
