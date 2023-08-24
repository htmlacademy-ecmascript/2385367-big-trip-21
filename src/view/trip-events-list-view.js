import AbstractView from '../framework/view/abstract-view.js';
import { createEventListTemplate } from '../template/trip-events-list-template.js';

export default class TripEventsListView extends AbstractView {
  get template() {
    return createEventListTemplate();
  }
}
