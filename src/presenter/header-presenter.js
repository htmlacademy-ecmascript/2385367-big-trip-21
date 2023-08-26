import {render} from '../framework/render.js';
import HeaderView from '../view/header-view/header-view.js';
import FilterView from '../view/header-view/filter-view.js';
import NewEventButtonView from '../view/header-view/new-event-button-view.js';
import TripControlsFiltersView from '../view/header-view/trip-control-filter-view.js';

export default class HeaderPresenter {
  #container = null;
  #filters = null;

  #tripBaseView = new HeaderView();
  #tripControlsFiltersView = new TripControlsFiltersView();

  constructor({ container, filters }) {
    this.#container = container;
    this.#filters = filters;
  }

  init() {
    render(new FilterView(this.#filters), this.#tripControlsFiltersView.element);
    render(this.#tripControlsFiltersView, this.#tripBaseView.element);
    render(new NewEventButtonView(), this.#tripBaseView.element);
    render(this.#tripBaseView, this.#container);
  }
}
