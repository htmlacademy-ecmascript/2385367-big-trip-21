import AbstractView from '../../framework/view/abstract-view.js';
import { createTripEventsItemTemplate } from '../../template/main-templates/trip-events-item-template.js';

export default class TripEventsItemView extends AbstractView {
  #point = null;
  #tripDestinations = null;
  #allOffers = null;
  #handleEventRollupClick = null;
  #handleFavoriteClick = null;

  constructor({ point, tripDestinations, allOffers, onEventRollupClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#tripDestinations = tripDestinations;
    this.#allOffers = allOffers;
    this.#handleEventRollupClick = onEventRollupClick;
    this.#handleFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#eventRollupClickHandler);
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteClickHandler);
  }

  get template() {
    return createTripEventsItemTemplate(this.#point, this.#tripDestinations, this.#allOffers);
  }

  #eventRollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEventRollupClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteClick();
  };
}
