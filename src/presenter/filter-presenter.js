import { FilterType, UpdateType } from '../consts.js';
import { remove, render, replace } from '../framework/render';
import { filterPointsByType } from '../util/trip-filters.js';
import FilterView from '../view/header-view/filter-view';


export default class FilterPresenter {
  #container = null;
  #filterModel = null;
  #pointsModel = null;

  #filterView = null;

  constructor({ container, filterModel, pointsModel }) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return [
      {
        type: FilterType.EVERYTHING,
        name: FilterType.EVERYTHING.toLowerCase(),
        count: points.length
      },
      {
        type: FilterType.FUTURE,
        name: FilterType.FUTURE.toLowerCase(),
        count: filterPointsByType[FilterType.FUTURE](points).length
      },
      {
        type: FilterType.PRESENT,
        name: FilterType.PRESENT.toLowerCase(),
        count: filterPointsByType[FilterType.PRESENT](points).length
      },
      {
        type: FilterType.PAST,
        name: FilterType.PAST.toLowerCase(),
        count: filterPointsByType[FilterType.PAST](points).length
      }
    ];
  }

  init() {
    const filters = this.filters;
    const prevFilterView = this.#filterView;

    this.#filterView = new FilterView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterView === null) {
      render(this.#filterView, this.#container);
      return;
    }

    replace(this.#filterView, prevFilterView);
    remove(prevFilterView);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
