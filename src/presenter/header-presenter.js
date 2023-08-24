import {render} from '../framework/render.js';
import HeaderView from '../view/header-view.js';

export default class HeaderPresenter {
  #container = null;

  #tripBaseView = new HeaderView();

  constructor({ container }) {
    this.#container = container;
  }

  init() {
    render(this.#tripBaseView, this.#container);
  }
}
