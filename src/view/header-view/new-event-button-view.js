import AbstractView from '../../framework/view/abstract-view.js';
import { createNewEventButtonTemplate } from '../../template/header-templates/new-event-button-template.js';

export default class NewEventButtonView extends AbstractView {

  #handleClick = null;

  constructor({ onClick }) {
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('click', this.#clickHandler);
  }

  get template() {
    return createNewEventButtonTemplate();
  }

  setDisable() {
    this.element.disabled = true;
  }

  setEnable() {
    this.element.disabled = false;
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
