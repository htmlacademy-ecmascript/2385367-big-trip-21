import { FilterType } from '../../consts.js';

const messageForFilter = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no upcoming events',
  [FilterType.PRESENT]: 'There are no current events',
  [FilterType.PAST]: 'There are no past events',
};


export function createFilterEventMessageTemplate (filterType) {
  return /*html*/`<p class="trip-events__msg">${messageForFilter[filterType]}</p>`;
}
