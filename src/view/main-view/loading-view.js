import AbstractView from '../../framework/view/abstract-view.js';
import { createLoadingTemplate } from '../../template/main-templates/loading-template.js';

export default class LoadingView extends AbstractView {
  get template() {
    return createLoadingTemplate();
  }
}
