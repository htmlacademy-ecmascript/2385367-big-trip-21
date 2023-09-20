import dayjs from 'dayjs';

const sortByTime = (tripPointA, tripPointB) => dayjs(tripPointB.dateTo).diff(tripPointB.dateFrom) - dayjs(tripPointA.dateTo).diff(tripPointA.dateFrom);

const sortByPrice = (tripPointA, tripPointB) => tripPointB.basePrice - tripPointA.basePrice;

const sortByDay = (tripPointA, tripPointB) => dayjs(tripPointA.dateFrom).diff(dayjs(tripPointB.dateFrom));

export{ sortByTime, sortByPrice, sortByDay };
