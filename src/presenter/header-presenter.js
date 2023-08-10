import { render, RenderPosition } from '../render.js';
import HeaderView from '../view/header-view.js';

const pageHeader = document.querySelector('.page-header');

export default class HeaderPresenter {
  TripBaseView = new HeaderView();


  constructor({ container }) {
    this.container = container;
  }

  init() {
    pageHeader.innerHTML = '';

    render(this.TripBaseView, this.container, RenderPosition.AFTERBEGIN);
  }
}
