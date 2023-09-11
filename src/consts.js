const TRIP_POINTS_COUNT = 4;

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING'
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const DurationFormats = {
  DAYS: 'DD[D] HH[H] mm[M]',
  HOURS: 'HH[H] mm[M]',
  MINUTES: 'mm[M]',
};

export { TRIP_POINTS_COUNT, Mode, FilterType, SortType, DurationFormats };
