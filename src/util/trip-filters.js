import dayjs from 'dayjs';

const isFutureFilter = (dateFrom) => dateFrom && dayjs().isBefore(dateFrom, 'D');

const isPresentFilter = (dateFrom, dateTo) =>
  dateFrom && dateTo && dayjs().isSame(dateFrom, 'D') && dayjs().isSame(dateTo, 'D');

const isPastFilter = (dateTo) => dateTo && dayjs().isBefore(dateTo, 'D');

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isFutureFilter(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isPresentFilter(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isPastFilter(point.dateTo)),
};

export { filter };
