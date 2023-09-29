import { RenderPosition, render, remove, replace } from '../framework/render.js';
import TripMainView from '../view/header-view/trip-main-view.js';

export default class HeaderPresenter {
  #container = null;
  #pointsModel = null;
  #tripInfoElement = null;

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  #renderTripInfo() {
    const prevTripInfoElement = this.#tripInfoElement;

    this.#tripInfoElement = new TripMainView({
      pointsModel: this.#pointsModel,
    });

    if (prevTripInfoElement === null) {
      render(this.#tripInfoElement, this.#container, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoElement, prevTripInfoElement);
    remove(prevTripInfoElement);
  }

  #handleModelEvent = () => {
    const points = this.#pointsModel.points;
    const pointsCount = points.length;

    if (pointsCount > 0) {
      this.#renderTripInfo();
    } else {
      remove(this.#tripInfoElement);
    }
  };
}
