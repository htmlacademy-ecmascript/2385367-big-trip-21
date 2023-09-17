import Observable from '../framework/observable.js';
import { nanoid } from 'nanoid';
import { tripDestinations, offersByType, getRandomPoint} from '../mock/mock.js';
import { TRIP_POINTS_COUNT } from '../consts.js';

export default class PointsModel extends Observable {
  #points = Array.from({ length: TRIP_POINTS_COUNT }, getRandomPoint);
  #tripDestinations = tripDestinations;
  #offersByType = offersByType;

  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can not update non-existent point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1)
    ];
    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    update.id = nanoid();
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can not update non-existent point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  get tripDestinations() {
    return this.#tripDestinations;
  }

  get offersByType() {
    return this.#offersByType;
  }
}
