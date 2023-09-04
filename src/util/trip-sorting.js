import dayjs from 'dayjs';

const sortByTime = (tripPointA, tripPointB) => {
  const periodA = dayjs(tripPointA.dateTo).diff(dayjs(tripPointA.dateFrom));
  const periodB = dayjs(tripPointB.dateTo).diff(dayjs(tripPointB.dateFrom));

  return periodB - periodA;
};

const sortByPrice = (tripPointA, tripPointB) => tripPointB.basePrice - tripPointA.basePrice;


const sortByDay = (tripPointA, tripPointB) => dayjs(tripPointA.dateFrom).diff(dayjs(tripPointB.dateFrom));

export{ sortByTime, sortByPrice, sortByDay};
