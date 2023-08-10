import { createElement } from '../render.js';
import { createHeaderTemplate } from '../template/header-template.js';

export default class HeaderView{
  getTemplate() {
    return createHeaderTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
