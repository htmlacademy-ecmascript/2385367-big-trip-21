import { humanizeDate, capitalize } from '../../util/common-tasks.js';
import he from 'he';

export const EMPTY_DESTINATION = {
  id: 0,
  name: '',
  description: '',
  pictures: [],
};

const EMPTY_OFFER = {
  type: '',
  offers: [],
};

export function createEmptyPoint() {
  return {
    basePrice: 0,
    dateFrom: new Date(),
    dateTo: new Date(),
    destination: 0,
    offers: [],
    type: 'flight',
  };
}

function createPicturesListTemplate(pictures) {
  return pictures.map(({ src, description }) => `<img class="event__photo" src=${src} alt="${description}">`)
    .join('');
}

function createTripTypeTemplate(allOffers, point) {
  return allOffers.map(({ type, id }) =>
    `<div class="event__type-item">
      <input id="event-type-${type}-${id}" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}" ${point.type === type ? 'checked' : ''}>
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-${id}">${capitalize(type)}</label>
    </div>`).join('');
}

function createOffersTemplate(offers, point) {
  return offers.map(({ title, price, id }) =>
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${title}-${id}" type="checkbox" name="event-offer-${title}" ${point.offers.includes(id) ? 'checked' : ''} data-offer-id="${id}">
        <label class="event__offer-label" for="event-offer-${title}-${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>`).join('');
}

export function createEventTypeFormTemplate (state, tripDestinations, allOffers) {
  const { isEdit, ...point } = state;
  const { basePrice, destination, dateFrom, dateTo, type } = point;

  const { name: descriptionName, description, pictures } = tripDestinations.find((item) => item.id === destination) ?? EMPTY_DESTINATION;
  const offerByType = allOffers.find((offer) => offer.type === type) ?? EMPTY_OFFER;

  const destinationsOptionValueTemplate = tripDestinations.map((item) => `<option value="${item.name}"></option>`).join('');
  const typeOffers = offerByType.offers;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                ${createTripTypeTemplate(allOffers, point)}
              </fieldset>
            </div>
          </div>
          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
            </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${he.encode(descriptionName)}" list="destination-list-1" required>
            <datalist id="destination-list-1">
              ${destinationsOptionValueTemplate}
              </datalist>
          </div>
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanizeDate(dateFrom, 'YY/MM/DD HH:mm')}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanizeDate(dateTo, 'YY/MM/DD HH:mm')}">
          </div>
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" min="1" value="${basePrice}" required>
          </div>
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${isEdit ? 'Delete' : 'Cancel'}</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">
        ${
    typeOffers.length > 0 ?
      `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
            ${createOffersTemplate(typeOffers, point)}
        </section>`
      : ''
    }
    </section>
    ${descriptionName.length > 0 ?
      `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
            <div class="event__photos-container">
            <div class="event__photos-tape">
            ${pictures.length > 0 ? createPicturesListTemplate(pictures) : ''}
            </div>
          </div>
          </div>
          </section>`
      : ''
    }
        </section>
      </form>
    </li>`
  );
}
