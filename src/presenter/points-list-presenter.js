import { remove, render, RenderPosition } from '../framework/render.js';
import TripEventsListView from '../view/main-view/trip-events-list-view.js';
import SortEventView from '../view/main-view/sort-event-view.js';
import TripEventsView from '../view/main-view/trip-events-view.js';
import FilterEventMessageView from '../view/main-view/filter-event-message-view.js';
import PointPresenter from './point-presenter.js';
import { SortType } from '../consts.js';
import { sortByPrice, sortByDay, sortByTime } from '../util/trip-sorting.js';
import { UpdateType, UserAction, FilterType } from '../consts.js';
import { filter } from '../util/trip-filters.js';
import NewPointFormPresenter from './new-point-form-presenter.js';

export default class PointsListPresenter {
  #container = null;
  #pointsModel = null;
  #filterModel = null;
  #newPointFormPresenter = null;
  #sortEventView = null;

  #tripEventsView = new TripEventsView();
  #tripEventsListView = new TripEventsListView();

  #emptyListMessageView = null;

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  #pointPresenters = new Map();

  constructor({ container, pointsModel, filterModel, onNewPointDestroy }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;
    this.#newPointFormPresenter = new NewPointFormPresenter({
      container: this.#tripEventsListView.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewPointDestroy
    });

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#filterType](points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortByTime);
    }
    return filteredPoints.sort(sortByDay);
  }

  get offers() {
    return this.#pointsModel.offersByType;
  }

  get destinations() {
    return this.#pointsModel.tripDestinations;
  }

  init() {
    this.#renderTripEventsView();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    if (this.#emptyListMessageView) {
      remove(this.#emptyListMessageView);
    }
    this.#newPointFormPresenter.init({
      tripDestinations: this.destinations,
      allOffers: this.offers
    });
  }

  #renderSort() {
    this.#sortEventView = new SortEventView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortEventView, this.#tripEventsView.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {

    const pointPresenter = new PointPresenter({
      container: this.#tripEventsListView.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init({
      point,
      tripDestinations: this.destinations,
      allOffers: this.offers,
    });
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderEmptyPoint () {
    this.#emptyListMessageView = new FilterEventMessageView({
      filterType: this.#filterType
    });
    render(this.#emptyListMessageView, this.#tripEventsView.element, RenderPosition.AFTERBEGIN);
  }

  #clear({resetSortType = false} = {}) {
    this.#newPointFormPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortEventView);

    if (this.#emptyListMessageView) {
      remove(this.#emptyListMessageView);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderPoints () {
    for (const point of this.points) {
      this.#renderPoint(point);
    }
  }

  #renderList () {
    render(this.#tripEventsListView, this.#tripEventsView.element);
  }

  #renderTripEventsView () {
    if (this.points.length === 0) {
      this.#renderEmptyPoint();
      return;
    }

    this.#renderSort();
    this.#renderPoints();
    this.#renderList();
    render(this.#tripEventsView, this.#container);
  }

  #handleModelEvent = (updateType, point) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(point.id).init(point);
        break;
      case UpdateType.MINOR:
        this.#clear();
        this.#renderTripEventsView();
        break;
      case UpdateType.MAJOR:
        this.#clear({resetSortType: true});
        this.#renderTripEventsView();
        break;
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModeChange = () => {
    this.#newPointFormPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clear();
    this.#renderTripEventsView();
  };
}
