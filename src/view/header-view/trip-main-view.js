import AbstractView from '../../framework/view/abstract-view.js';
import { createTripMainTemplate } from '../../template/header-templates/trip-main-template.js';
import { humanizeDate } from '../../util/common-tasks.js';
import { sortByDay } from '../../util/trip-sorting.js';
import dayjs from 'dayjs';

export default class TripMainView extends AbstractView {
  #pointsModel = null;

  constructor({ pointsModel }) {
    super();
    this.#pointsModel = pointsModel;
  }

  get template() {
    const points = this.#pointsModel.points.toSorted(sortByDay);
    const totalPrice = this.#calculateTotalPrice();

    const isSameMonth = dayjs(points[0]?.dateFrom).month() === dayjs(points[points.length - 1]?.dateTo).month();
    const initialDate = humanizeDate(points[0]?.dateFrom, `${isSameMonth ? 'MMM D' : 'D MMM'}`);
    const finalDate = humanizeDate(points[points.length - 1]?.dateTo, `${isSameMonth ? 'D' : 'D MMM'}`);

    let date = '';

    if (points.length >= 2) {
      date = `${initialDate}&nbsp;&mdash;&nbsp;${finalDate}`;

    } else if (points.length === 1) {
      date = `${humanizeDate(points[0]?.dateFrom, `${isSameMonth ? 'D MMM' : 'D MMM'}`)}`;
    }

    const initialDestination = this.#pointsModel.destinations.find((destination) => destination.id === points[0]?.destination)?.name;
    const finalDestination = this.#pointsModel.destinations.find((destination) => destination.id === points[points.length - 1]?.destination)?.name;

    let title = '';

    if (points.length > 3) {
      title = `${initialDestination ? initialDestination : ''} &mdash; . . . &mdash; ${finalDestination ? finalDestination : ''}`;
    } else if (points.length > 0 && points.length < 3) {
      const destinations = points.map((point) => this.#pointsModel.destinations.find((destination) => destination.id === point.destination)?.name);

      title = destinations.join(' - ');
    }

    return createTripMainTemplate({ points, totalPrice, date, title });
  }

  #calculateTotalPrice() {
    const points = this.#pointsModel.points;
    let total = 0;

    for (const point of points) {
      total += point.basePrice;
    }
    const offerPriceElements = document.querySelectorAll('.event__offer-price');
    offerPriceElements.forEach((element) => {
      const offerPrice = parseFloat(element.textContent);
      if (!isNaN(offerPrice)) {
        total += offerPrice;
      }
    });

    return total;
  }
}
