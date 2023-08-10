import { createElement } from '../render.js';
import { createSortEventFormTemplate } from '../template/sort-event-template.js';

export default class SortEventView {
  getTemplate() {
    return createSortEventFormTemplate();
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
