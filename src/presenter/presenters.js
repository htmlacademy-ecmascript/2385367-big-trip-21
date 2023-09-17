import PointsListPresenter from './points-list-presenter.js';
import PointsModel from '../model/points-model.js';
import FilterModel from '../model/filter-model.js';
import FilterPresenter from '../presenter/filter-presenter.js';
import NewEventButtonView from '../view/header-view/new-event-button-view.js';
import { render } from '../framework/render.js';

const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const pointsListPresenter = new PointsListPresenter({
  container: document.querySelector('.page-main__container'),
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewEventFormClose
});

const filterPresenter = new FilterPresenter({
  container: document.querySelector('.trip-controls__filters'),
  filterModel,
  pointsModel
});

const newEventButtonView = new NewEventButtonView ({
  onClick: handleNewEventButtonClick
});

function handleNewEventFormClose() {
  newEventButtonView.setEnable();
}

function handleNewEventButtonClick() {
  pointsListPresenter.createPoint();
  newEventButtonView.setDisable();
}
render(newEventButtonView, document.querySelector('.trip-main'));

export { pointsListPresenter, filterPresenter };
