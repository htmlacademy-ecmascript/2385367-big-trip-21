import PanelPresenter from '../presenter/panel-presenter.js';
import HeaderPresenter from '../presenter/header-presenter.js';

const pageBody = document.querySelector('.page-body__page-main');
const pageBodyContainer = pageBody.querySelector('.page-body__container');
const pageHeader = document.querySelector('.page-header');
const panelPresenter = new PanelPresenter({ container: pageBodyContainer });
const headerPresenter = new HeaderPresenter({ container: pageHeader });

export { panelPresenter, headerPresenter};
