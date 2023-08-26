import MainPresenter from './main-presenter.js';
import HeaderPresenter from './header-presenter.js';
import PointsModel from '../model/points-model.js';
import { generateFilter } from '../mock/trip-filters.js';

const pointsModel = new PointsModel();
const tripFilters = generateFilter(pointsModel.points);

const mainPresenter = new MainPresenter({ container: document.querySelector('.page-main__container'), pointsModel });
const headerPresenter = new HeaderPresenter({ container: document.querySelector('.page-header__container'), filters: tripFilters });

export { mainPresenter, headerPresenter };
