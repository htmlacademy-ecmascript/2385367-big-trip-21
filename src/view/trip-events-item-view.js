import AbstractView from '../framework/view/abstract-view.js';
import { createTripEventsItemTemplate } from '../template/trip-events-item-template.js';

export default class TripEventsItemView extends AbstractView {
  #point = null;
  #tripDestinations = null;
  #allOffers = null;
  #handleEventRollupClick = null;

  constructor({ point, tripDestinations, allOffers, onEventRollupClick }) {
    super();
    this.#point = point;
    this.#tripDestinations = tripDestinations;
    this.#allOffers = allOffers;
    this.#handleEventRollupClick = onEventRollupClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#eventRollupClickHandler);
  }

  get template() {
    return createTripEventsItemTemplate(this.#point, this.#tripDestinations, this.#allOffers);
  }

  #eventRollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEventRollupClick();
  };
}
