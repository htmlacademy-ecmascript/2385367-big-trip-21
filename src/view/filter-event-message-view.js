import { createElement } from '../render.js';
import { createFilterEventMessageTemplate } from '../template/filter-event-message-template.js';

export default class FilterEventMessageView {
  getTemplate() {
    return createFilterEventMessageTemplate();
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
