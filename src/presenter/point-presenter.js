import { render, replace, remove } from '../framework/render.js';
import { Mode } from '../consts.js';
import EventTypeFormView from '../view/main-view/event-type-form-view.js';
import TripEventsItemView from '../view/main-view/trip-events-item-view.js';

export default class PointPresenter {
  #container = null;
  #pointCardView = null;
  #pointFormView = null;
  #point = null;
  #handleModeChange = null;
  #handlePointChange = null;
  #mode = Mode.DEFAULT;

  constructor({ container, onDataChange, onModeChange }) {
    this.#container = container;
    this.#handlePointChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(point) {
    this.#point = point;

    const priorPointCardView = this.#pointCardView;
    const priorPointFormView = this.#pointFormView;

    this.#pointCardView = new TripEventsItemView({...point,
      onEventRollupClick: this.#handleOpenForm,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointFormView = new EventTypeFormView({...point,
      onFormSubmit: this.#handleSubmitForm,
      onRollupClick: this.#handleCloseForm,
    });

    if (priorPointCardView === null || priorPointFormView === null) {
      render(this.#pointCardView, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointCardView, priorPointCardView);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointFormView, priorPointFormView);
    }

    remove(priorPointCardView);
    remove(priorPointFormView);
  }

  destroy() {
    remove(this.#pointCardView);
    remove(this.#pointFormView);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointFormView.reset(this.#point);
      this.#replaceFormToCard();
    }
  }

  #replaceCardToForm() {
    replace(this.#pointFormView, this.#pointCardView);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#pointCardView, this.#pointFormView);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #handleCloseForm = () => {
    this.resetView();
  };

  #handleSubmitForm = () => {
    this.#replaceFormToCard();
  };

  #handleOpenForm = () => {
    this.#handleModeChange();
    this.#replaceCardToForm();
  };

  #handleFavoriteClick = () => {
    const isFavoriteKey = this.#point.point['isFavorite'] = !this.#point.isFavoriteKey;
    const updatedPoint = { ...this.#point, isFavoriteKey };
    this.#handlePointChange(updatedPoint);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#handleCloseForm();
    }
  };
}
