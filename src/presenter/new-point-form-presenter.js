import { remove, render, RenderPosition } from '../framework/render.js';
import { UserAction, UpdateType } from '../consts.js';
import EventTypeFormView from '../view/main-view/event-type-form-view.js';

export default class NewPointFormPresenter {
  #container = null;
  #handleDataChange = null;
  #handleDestroy = null;

  #newPointFormView = null;

  constructor({ container, onDataChange, onDestroy }) {
    this.#container = container;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init({ tripDestinations, allOffers }) {
    if (this.#newPointFormView !== null) {
      return;
    }

    this.#newPointFormView = new EventTypeFormView({
      onFormSubmit: this.#handleFormSubmit,
      onResetClick: this.#handleResetClick,
      tripDestinations,
      allOffers
    });

    render(this.#newPointFormView, this.#container, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#newPointFormView === null) {
      return;
    }
    this.#handleDestroy();

    remove(this.#newPointFormView);
    this.#newPointFormView = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      {...point},
    );
    this.destroy();
  };

  #handleResetClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
