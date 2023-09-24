import { FilterType } from '../consts';

export const filterPointsByType = {
  [FilterType.EVERYTHING]: (points) => points.slice(),
  [FilterType.FUTURE]: (points) => points.filter((point) => Date.now() < new Date(point.dateTo).getTime()),
  [FilterType.PRESENT]: (points) => points.filter((point) => Date.now() >= new Date(point.dateFrom).getTime() && Date.now() <= new Date(point.dateTo).getTime()),
  [FilterType.PAST]: (points) => points.filter((point) => Date.now() > new Date(point.dateTo).getTime()),
};
