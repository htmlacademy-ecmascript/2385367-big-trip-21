import { render } from './render.js';
import PanelPresenter from './presenter/panel-presenter.js';
import TripFiltersView from './view/trip-filters-view.js';
import HeaderPresenter from './presenter/header-presenter.js';

const tripControlsFilters = document.querySelector('.trip-controls__filters');
const pageBody = document.querySelector('.page-body__page-main');
const pageBodyContainer = pageBody.querySelector('.page-body__container');
const pageHeader = document.querySelector('.page-header');
const panelPresenter = new PanelPresenter({container: pageBodyContainer});
const headerPresenter = new HeaderPresenter({container: pageHeader});

render(new TripFiltersView(), tripControlsFilters);

headerPresenter.init();
panelPresenter.init();
