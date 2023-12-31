import { FilterType } from '../../consts.js';

const messageForFilter = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

export function createFilterEventMessageTemplate (filterType) {
  return /*html*/`<p class="trip-events__msg">${messageForFilter[filterType]}</p>`;
}
