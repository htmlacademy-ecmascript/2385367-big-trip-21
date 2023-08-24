import AbstractView from '../framework/view/abstract-view.js';
import { createFilterEventMessageTemplate } from '../template/filter-event-message-template.js';

export default class FilterEventMessageView extends AbstractView {

  get template() {
    return createFilterEventMessageTemplate();
  }
}
