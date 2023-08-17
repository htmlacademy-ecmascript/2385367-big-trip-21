import { createElement } from '../render.js';
import { createTripEventsItemTemplate } from '../template/trip-events-item-template.js';

export default class TripEventsItemView {

  constructor({ point, tripDestinations, allOffers }) {
    this.point = point;
    this.tripDestinations = tripDestinations;
    this.allOffers = allOffers;
  }

  getTemplate() {
    return createTripEventsItemTemplate(this.point, this.tripDestinations, this.allOffers);
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
