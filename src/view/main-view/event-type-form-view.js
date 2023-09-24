import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { createEventTypeFormTemplate, createEmptyPoint, EMPTY_DESTINATION } from '../../template/main-templates/event-type-form-template.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default class EventTypeFormView extends AbstractStatefulView {
  #point = null;
  #tripDestinations = null;
  #allOffers = null;
  #handleFormSubmit = null;
  #handleRollupClick = null;
  #handleResetClick = null;
  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({ point = createEmptyPoint(), tripDestinations, allOffers, onFormSubmit, onRollupClick, onResetClick }) {
    super();
    this._setState(EventTypeFormView.parsePointToState(point, tripDestinations));
    this.#point = point;
    this.#tripDestinations = tripDestinations;
    this.#allOffers = allOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupClick = onRollupClick;
    this.#handleResetClick = onResetClick;
    this._restoreHandlers();
  }

  get template() {
    return createEventTypeFormTemplate(this._state, this.#tripDestinations, this.#allOffers);
  }

  _restoreHandlers() {
    const element = this.element;

    element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerChangeHandler);
    element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#rollupEventClickHandler);
    element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    element.querySelector('.event__type-group').addEventListener('change', this.#pointTypeChangeHandler);
    element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    element.querySelector('.event__reset-btn').addEventListener('click', this.#formResetClickHandler);
    this.#setDatepickers();
  }

  reset(point) {
    this.updateElement(EventTypeFormView.parsePointToState(point));
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }
    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  #setDatepickers() {
    const config = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      'time_24hr': true,
    };
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        ...config,
        defaultDate: this._state.dateFrom ?? new Date(),
        maxDate: this._state.dateTo ?? null,
        onClose: ([date]) => {
          this._setState({ dateFrom: date });
          this.#datepickerTo.config.minDate = date;
        },
      }
    );
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        ...config,
        defaultDate: this._state.dateTo ?? null,
        minDate: this._state.dateFrom ?? null,
        onClose: ([date]) => {
          this._setState({ dateTo: date });
          this.#datepickerFrom.config.maxDate = date;
        },
      }
    );
  }

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: evt.target.valueAsNumber
    });
  };

  #formResetClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleResetClick(EventTypeFormView.parseStateToPoint(this._state));
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventTypeFormView.parseStateToPoint(this._state));
  };

  #rollupEventClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  #pointTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const destinationName = evt.target.value;
    const selectedDestination = this.#tripDestinations.find(({name}) => name === destinationName) ?? EMPTY_DESTINATION;
    this.updateElement({
      destination: selectedDestination.id,
    });
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    evt.target.toggleAttribute('checked');
    let selectedOffers = this._state.offers;
    if (evt.target.hasAttribute('checked')) {
      selectedOffers.push(evt.target.dataset.offerId);
    } else {
      selectedOffers = selectedOffers.filter((id) => id !== (evt.target.dataset.offerId));
    }
    this._setState({
      offers: selectedOffers
    });
  };

  static parsePointToState(point) {
    return { ...point,
      isEdit: Object.hasOwn(point, 'id'),
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
      isFavorite: false
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};
    delete point.isEdit;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }

}
