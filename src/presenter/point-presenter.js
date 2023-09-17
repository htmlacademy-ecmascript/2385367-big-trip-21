import { render, replace, remove } from '../framework/render.js';
import { Mode, UserAction, UpdateType } from '../consts.js';
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

  init({ point, allOffers, tripDestinations }) {
    this.#point = point;

    const priorPointCardView = this.#pointCardView;
    const priorPointFormView = this.#pointFormView;

    this.#pointCardView = new TripEventsItemView({
      point,
      tripDestinations,
      allOffers,
      onEventRollupClick: this.#handleOpenForm,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointFormView = new EventTypeFormView({
      point,
      tripDestinations,
      allOffers,
      onFormSubmit: this.#handleSubmitForm,
      onRollupClick: this.#handleCloseForm,
      onResetClick: this.#handleResetClick,
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
    this.#handleModeChange();
    replace(this.#pointFormView, this.#pointCardView);
    document.addEventListener('keydown', this.#escKeyDownHandler);
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

  #handleSubmitForm = (point) => {
    this.#handlePointChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      point
    );
    this.#replaceFormToCard();
  };

  #handleOpenForm = () => {
    this.#replaceCardToForm();
  };

  #handleFavoriteClick = () => {
    const updatedPoint = { ...this.#point, isFavorite: !this.#point.isFavorite };
    this.#handlePointChange(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      updatedPoint
    );
  };


  #handleResetClick = (point) => {
    this.#handlePointChange(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#handleCloseForm();
    }
  };
}
