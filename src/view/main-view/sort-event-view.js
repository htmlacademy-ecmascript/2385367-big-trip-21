import AbstractView from '../../framework/view/abstract-view.js';
import { createSortEventFormTemplate } from '../../template/main-templates/sort-event-template.js';

export default class SortEventView extends AbstractView {
  get template() {
    return createSortEventFormTemplate();
  }
}
