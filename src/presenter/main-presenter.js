import {render, replace} from '../framework/render.js';
import EventTypeFormView from '../view/main-view/event-type-form-view.js';
import TripEventsItemView from '../view/main-view/trip-events-item-view.js';
import TripEventsListView from '../view/main-view/trip-events-list-view.js';
import SortEventView from '../view/main-view/sort-event-view.js';
import TripEventsView from '../view/main-view/trip-events-view.js';
import FilterEventMessageView from '../view/main-view/filter-event-message-view.js';

export default class MainPresenter {
  #container = null;
  #pointsModel = null;

  #tripEventsView = new TripEventsView();
  #tripEventsListView = new TripEventsListView();

  #points = [];
  #pointsDestinations = [];
  #pointsOffersByTypes = [];

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;

  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#pointsDestinations = [...this.#pointsModel.tripDestinations];
    this.#pointsOffersByTypes = [...this.#pointsModel.offersByType];

    if (this.#points.length === 0) {
      render(new FilterEventMessageView(), this.#container);
      return;
    }

    for (const point of this.#points) {
      this.#renderPoint(point);
    }

    render(new SortEventView(), this.#tripEventsView.element);
    render(this.#tripEventsListView, this.#tripEventsView.element);
    render(this.#tripEventsView, this.#container);
  }

  #renderPoint(point) {

    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointCardView = new TripEventsItemView({
      point,
      tripDestinations: this.#pointsDestinations,
      allOffers: this.#pointsOffersByTypes,

      onEventRollupClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointFormView = new EventTypeFormView({
      point,
      tripDestinations: this.#pointsDestinations,
      allOffers: this.#pointsOffersByTypes,

      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      },

      onRollupClick: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(pointFormView, pointCardView);
    }

    function replaceFormToCard() {
      replace(pointCardView, pointFormView);
    }

    render(pointCardView, this.#tripEventsListView.element);
  }
}
