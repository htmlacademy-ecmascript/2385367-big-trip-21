import AbstractView from '../../framework/view/abstract-view.js';
import { createTripControlFilterTemplate } from '../../template/header-templates/trip-control-filter-template.js';

export default class TripControlsFiltersView extends AbstractView {

  get template() {
    return createTripControlFilterTemplate();
  }
}
