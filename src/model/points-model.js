import { tripDestinations, offersByType, getRandomPoint} from '../mock/mock.js';
import { TRIP_POINTS_COUNT } from '../consts.js';

export default class PointsModel {
  #points = Array.from({ length: TRIP_POINTS_COUNT }, getRandomPoint);
  #tripDestinations = tripDestinations;
  #offersByType = offersByType;

  get points() {
    return this.#points;
  }

  get tripDestinations() {
    return this.#tripDestinations;
  }

  get offersByType() {
    return this.#offersByType;
  }
}
