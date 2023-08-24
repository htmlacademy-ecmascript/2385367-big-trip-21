import MainPresenter from './main-presenter.js';
import HeaderPresenter from './header-presenter.js';
import PointsModel from '../model/points-model.js';

const pointsModel = new PointsModel();
const mainPresenter = new MainPresenter({ container: [...document.querySelectorAll('.page-body__container')].pop(), pointsModel });
const headerPresenter = new HeaderPresenter({ container: document.querySelector('.page-header') });

export { mainPresenter, headerPresenter};
