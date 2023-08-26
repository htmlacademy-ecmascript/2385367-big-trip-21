import AbstractView from '../../framework/view/abstract-view.js';
import { createNewEventButtonTemplate } from '../../template/header-templates/new-event-button-template.js';

export default class NewEventButtonView extends AbstractView {

  get template() {
    return createNewEventButtonTemplate();
  }
}
