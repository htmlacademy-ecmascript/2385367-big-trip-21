import AbstractView from '../framework/view/abstract-view.js';
import { createEventTypeFormTemplate, createEmptyPoint } from '../template/event-type-form-template.js';

export default class EventTypeFormView extends AbstractView {
  #point = null;
  #tripDestinations = null;
  #allOffers = null;
  #handleFormSubmit = null;
  #handleRollupClick = null;

  constructor({ point = createEmptyPoint(), tripDestinations, allOffers, onFormSubmit, onRollupClick}) {
    super();
    this.#point = point;
    this.#tripDestinations = tripDestinations;
    this.#allOffers = allOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupClick = onRollupClick;

    this.element.querySelector('.event__save-btn')
      .addEventListener('submit', this.#formSubmitHandler);

    if (this.element.querySelector('.event__rollup-btn')) {
      this.element.querySelector('.event__rollup-btn')
        .addEventListener('click', this.#rollupEventClickHandler);
    }
  }

  get template() {
    return createEventTypeFormTemplate(this.#point, this.#tripDestinations, this.#allOffers);
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit();
  };

  #rollupEventClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };
}
