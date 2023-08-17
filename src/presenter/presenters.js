import PanelPresenter from './panel-presenter.js';
import HeaderPresenter from './header-presenter.js';
import PointsModel from '../model/points-model.js';

const pageBody = document.querySelector('.page-body__page-main');
const pageBodyContainer = pageBody.querySelector('.page-body__container');
const pageHeaderContainer = document.querySelector('.page-header');


const pointsModel = new PointsModel();
const panelPresenter = new PanelPresenter({ container: pageBodyContainer, pointsModel });
const headerPresenter = new HeaderPresenter({ container: pageHeaderContainer });

export { panelPresenter, headerPresenter};
