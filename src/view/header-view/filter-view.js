import AbstractView from '../../framework/view/abstract-view.js';
import { createTemplateFilterItems } from '../../template/header-templates/filter-template.js';

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createTemplateFilterItems(this.#filters);
  }
}
