import { remove, render, RenderPosition } from '../framework/render.js';
import TripEventsListView from '../view/main-view/trip-events-list-view.js';
import SortEventView from '../view/main-view/sort-event-view.js';
import TripEventsView from '../view/main-view/trip-events-view.js';
import FilterEventMessageView from '../view/main-view/filter-event-message-view.js';
import LoadingView from '../view/main-view/loading-view.js';
import ErrorView from '../view/main-view/error-view.js';
import PointPresenter from './point-presenter.js';
import NewPointFormPresenter from './new-point-form-presenter.js';
import { sortByPrice, sortByDay, sortByTime } from '../util/trip-sorting.js';
import { UpdateType, UserAction, FilterType, SortType, TimeLimit } from '../consts.js';
import { filter } from '../util/trip-filters.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class PointsListPresenter {
  #container = null;
  #pointsModel = null;
  #filterModel = null;
  #newPointFormPresenter = null;
  #sortEventView = null;
  #emptyListMessageView = null;

  #tripEventsView = new TripEventsView();
  #tripEventsListView = new TripEventsListView();
  #errorView = new ErrorView();
  #loadingView = new LoadingView();

  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;

  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER,
    upperLimit: TimeLimit.UPPER
  });

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

  init() {
    this.#renderTripEventsView();
  }

  createPoint() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    // if (this.#emptyListMessageView) {
    //   remove(this.#emptyListMessageView);
    // }
    this.#newPointFormPresenter.init({
      tripDestinations: this.#pointsModel.destinations,
      allOffers: this.#pointsModel.offers
    });
  }

  #renderPoint(point) {

    const pointPresenter = new PointPresenter({
      container: this.#tripEventsListView.element,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });

    pointPresenter.init({
      point,
      tripDestinations: this.#pointsModel.destinations,
      allOffers: this.#pointsModel.offers,
    });
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #renderSort() {
    this.#sortEventView = new SortEventView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange
    });
    render(this.#sortEventView, this.#tripEventsView.element, RenderPosition.AFTERBEGIN);
  }

  #renderEmptyPoint () {
    this.#emptyListMessageView = new FilterEventMessageView({
      filterType: this.#filterType
    });
    render(this.#emptyListMessageView, this.#tripEventsView.element);
  }

  #renderList () {
    render(this.#tripEventsListView, this.#tripEventsView.element);
  }

  #renderLoadingMessage() {
    render(this.#loadingView, this.#tripEventsListView.element);
  }

  #renderError() {
    render(this.#errorView, this.#tripEventsListView.element);
  }

  #renderPoints () {
    this.points.forEach((point) => {
      this.#renderPoint(point);
    });
  }

  #renderTripEventsView () {
    this.#renderList();
    render(this.#tripEventsView, this.#container);
    const points = this.points;
    const pointsCount = points.length;

    if (this.#isLoading) {
      this.#renderLoadingMessage();
      return;
    }

    if (!pointsCount && !this.#pointsModel.offers.length && !this.#pointsModel.destinations.length) {
      this.#renderError();
      return;
    }

    if (pointsCount > 0) {
      remove(this.#emptyListMessageView);
      this.#renderSort();

      this.#renderPoints();
    } else {
      this.#renderEmptyPoint();
    }
  }

  #clear({ resetSortType = false } = {}) {
    this.#newPointFormPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();

    remove(this.#sortEventView);
    remove(this.#loadingView);
    remove(this.#emptyListMessageView);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #handleModelEvent = (updateType, point) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#pointPresenters.get(point.id).init({
          point,
          tripDestinations: this.#pointsModel.destinations,
          allOffers: this.#pointsModel.offers,
        });
        break;
      case UpdateType.MINOR:
        this.#clear();
        this.#renderTripEventsView();
        break;
      case UpdateType.MAJOR:
        this.#clear({resetSortType: true});
        this.#renderTripEventsView();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingView);
        this.#renderTripEventsView();
        break;
    }
  };

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointPresenters.get(update.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
      case UserAction.ADD_POINT:
        this.#newPointFormPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, update);
        } catch (err) {
          this.#newPointFormPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_POINT:
        this.#pointPresenters.get(update.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, update);
        } catch (err) {
          this.#pointPresenters.get(update.id).setAborting();
        }
        break;
    }
    this.#uiBlocker.unblock();
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
