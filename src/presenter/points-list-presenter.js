import { render, RenderPosition } from '../framework/render.js';
import TripEventsListView from '../view/main-view/trip-events-list-view.js';
import SortEventView from '../view/main-view/sort-event-view.js';
import TripEventsView from '../view/main-view/trip-events-view.js';
import FilterEventMessageView from '../view/main-view/filter-event-message-view.js';
import PointPresenter from './point-presenter.js';
import { updatePoint } from '../util/common-tasks.js';

export default class PointsListPresenter {
  #container = null;
  #pointsModel = null;

  #tripEventsView = new TripEventsView();
  #tripEventsListView = new TripEventsListView();
  #sortEventView = new SortEventView();
  #emptyListMessageView = new FilterEventMessageView();

  #points = [];
  #destinations = [];
  #allOffers = [];

  #pointPresenters = new Map ();

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.tripDestinations];
    this.#allOffers = [...this.#pointsModel.offersByType];

    this.#renderTripEventsView();
  }

  #renderSort() {
    render(this.#sortEventView, this.#tripEventsView.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {

    const pointData = {
      point,
      tripDestinations: this.#destinations,
      allOffers: this.#allOffers,
    };

    const mainPresenter = new PointPresenter({
      container: this.#tripEventsListView.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    mainPresenter.init(pointData);
    this.#pointPresenters.set(point.id, mainPresenter);
  }

  #renderEmptyPoint () {
    render(this. #emptyListMessageView, this.#container.element, RenderPosition.AFTERBEGIN);
  }

  #clear() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPoints () {
    for (const point of this.#points) {
      this.#renderPoint(point, this.#destinations, this.#allOffers);
    }
  }

  #renderList () {
    render(this.#tripEventsListView, this.#tripEventsView.element);
  }

  #renderTripEventsView () {
    render(this.#tripEventsView, this.#container);

    if (this.#points.length === 0) {
      this.#renderEmptyPoint();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
    this.#renderList();

  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updatePoint(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.point.id).init(updatedPoint);
  };
}
