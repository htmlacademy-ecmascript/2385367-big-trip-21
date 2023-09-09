import { render, RenderPosition } from '../framework/render.js';
import TripEventsListView from '../view/main-view/trip-events-list-view.js';
import SortEventView from '../view/main-view/sort-event-view.js';
import TripEventsView from '../view/main-view/trip-events-view.js';
import FilterEventMessageView from '../view/main-view/filter-event-message-view.js';
import PointPresenter from './point-presenter.js';
import { updatePoint } from '../util/common-tasks.js';
import { SortType } from '../consts.js';
import { sortByPrice, sortByDay, sortByTime } from '../util/trip-sorting.js';

export default class PointsListPresenter {
  #container = null;
  #pointsModel = null;
  #sortEventView = null;

  #tripEventsView = new TripEventsView();
  #tripEventsListView = new TripEventsListView();

  #emptyListMessageView = new FilterEventMessageView();

  #points = [];
  #destinations = [];
  #allOffers = [];
  #sortedPoints = [];

  #currentSortType = SortType.DAY;

  #pointPresenters = new Map();

  constructor({ container, pointsModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#destinations = [...this.#pointsModel.tripDestinations];
    this.#allOffers = [...this.#pointsModel.offersByType];
    this.#sortedPoints = [...this.#pointsModel.points];

    this.#renderTripEventsView();
  }

  #renderSort() {
    this.#sortEventView = new SortEventView({
      onSortTypeChange: this.#handleSortTypeChange
    });
    this.#sortPoints(this.#currentSortType);
    render(this.#sortEventView, this.#tripEventsView.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {

    const pointData = {
      point,
      tripDestinations: this.#destinations,
      allOffers: this.#allOffers,
    };

    const pointPresenter = new PointPresenter({
      container: this.#tripEventsListView.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange
    });

    pointPresenter.init(pointData);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderEmptyPoint () {
    render(this.#emptyListMessageView, this.#container, RenderPosition.AFTERBEGIN);
  }

  #clear() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }

  #renderPoints () {
    for (const point of this.#points) {
      this.#renderPoint(point);
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

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.#points.sort(sortByPrice);
        break;
      case SortType.TIME:
        this.#points.sort(sortByTime);
        break;
      default:
        this.#points.sort(sortByDay);
        break;
    }
    this.#currentSortType = sortType;
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updatePoint(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.point.id).init(updatedPoint);
    this.#sortedPoints = updatePoint(this.#sortedPoints, updatedPoint);
  };

  #handleSortTypeChange = (sortType) => {
    this.#sortPoints(sortType);
    this.#clear();
    this.#renderPoints();
  };
}
