import AbstractView from '../../framework/view/abstract-view.js';
import { createFilterEventMessageTemplate } from '../../template/main-templates/filter-event-message-template.js';
import { FilterType } from '../../consts.js';

export default class FilterEventMessageView extends AbstractView {

  #filterType = FilterType.EVERYTHING;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createFilterEventMessageTemplate(this.#filterType);
  }
}
