import { createElement } from '../render.js';
import { createEventTypeFormTemplate } from '../template/event-type-form-template.js';

export default class EventTypeFormView {
  getTemplate() {
    return createEventTypeFormTemplate();
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
