import EventTypeView from '../view/event-type-view.js';
import {render, RenderPosition} from '../render.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortEventView from '../view/sort-event-view.js';
import TripEventsView from '../view/trip-events-view.js';

const TRIP_POINTS_COUNT = 3;

export default class PanelPresenter {
  TripEventsView = new TripEventsView();
  TripEventsListView = new TripEventsListView();

  constructor({container}) {
    this.container = container;
  }

  init() {

    for (let i = 0; i < TRIP_POINTS_COUNT; i++) {
      render(new TripEventsItemView(), this.TripEventsListView.getElement());
    }
    render(new SortEventView(), this.TripEventsView.getElement());
    render(new EventTypeView(), this.TripEventsListView.getElement(), RenderPosition.AFTERBEGIN);
    render(this.TripEventsListView, this.TripEventsView.getElement());
    render(this.TripEventsView, this.container);
  }
}
