import PointsListPresenter from './presenter/points-list-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import HeaderPresenter from './presenter/header-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import NewEventButtonView from './view/header-view/new-event-button-view.js';
import { render } from './framework/render.js';
import PointApiService from './api-service.js';

const AUTHORIZATION = 'Basic iv9k487pl12986y';
const END_POINT = 'https://21.objects.pages.academy/big-trip';

const pointsModel = new PointsModel({
  pointsApiService: new PointApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();

const pointsListPresenter = new PointsListPresenter({
  container: document.querySelector('.page-main__container'),
  pointsModel,
  filterModel,
  onNewPointDestroy: handleNewEventFormClose
});

const headerPresenter = new HeaderPresenter({
  container: document.querySelector('.trip-main'),
  pointsModel,
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

pointsModel.init()
  .finally(() => {
    render(newEventButtonView, document.querySelector('.trip-main'));
  });
headerPresenter.init();
filterPresenter.init();
pointsListPresenter.init();
