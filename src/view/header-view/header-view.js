import AbstractView from '../../framework/view/abstract-view.js';
import { createHeaderTemplate } from '../../template/header-templates/header-template.js';

export default class HeaderView extends AbstractView {

  get template() {
    return createHeaderTemplate();
  }
}
