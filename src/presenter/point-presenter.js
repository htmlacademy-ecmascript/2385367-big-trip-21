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

    const priorCardView = this.#pointCardView;
    const priorCardEditView = this.#pointFormView;

    this.#pointCardView = new TripEventsItemView({... point,
      onEventRollupClick: this.#handleOpenForm,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointFormView = new EventTypeFormView({... point,
      onFormSubmit: this.#handleSubmitForm,
      onRollupClick: this.#handleCloseForm,
    });

    if (priorCardView === null || priorCardEditView === null) {
      render(this.#pointCardView, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointCardView, priorCardView);
      this.#mode = Mode.EDITING;
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointFormView, priorCardEditView);
      this.#mode = Mode.DEFAULT;

    }

    remove(priorCardView);
    remove(priorCardEditView);
  }

  destroy() {
    remove(this.#pointCardView);
    remove(this.#pointFormView);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
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
    this.#replaceFormToCard();
  };

  #handleSubmitForm = () => {
    this.#replaceFormToCard();
  };

  #handleOpenForm = () => {
    this.#handleModeChange();
    this.#replaceCardToForm();
  };

  #handleFavoriteClick = () => {
    const isFavoriteKey = this.#point.point['isFavorite'] = !this.#point.isFavorite;
    const updatedPoint = {...this.#point, isFavoriteKey };
    this.#handlePointChange(updatedPoint);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#handleCloseForm();
    }
  };
}
