import { getRandomArrayItem, getRandomNumber } from '../util/common-tasks.js';
import { nanoid } from 'nanoid';

const offersByType = [
  {
    'type': 'taxi',
    'offers': [{
      'id': 1,
      'title': 'Smoking allowed',
      'price': 50
    },
    {
      'id': 2,
      'title': 'VIP exclusive service',
      'price': 150
    }]
  },
  {
    'type': 'bus',
    'offers': [{
      'id': 1,
      'title': 'Smoking allowed',
      'price': 50
    },
    {
      'id': 2,
      'title': 'VIP exclusive service',
      'price': 150
    }]
  },
  {
    'type': 'train',
    'offers': [{
      'id': 1,
      'title': 'Smoking allowed',
      'price': 50
    },
    {
      'id': 2,
      'title': 'VIP exclusive service',
      'price': 150
    }]
  },
  {
    'type': 'ship',
    'offers': [{
      'id': 1,
      'title': 'Smoking allowed',
      'price': 50
    },
    {
      'id': 2,
      'title': 'VIP exclusive service',
      'price': 150
    }]
  },
  {
    'type': 'drive',
    'offers': [{
      'id': 1,
      'title': 'Smoking allowed',
      'price': 50
    },
    {
      'id': 2,
      'title': 'VIP exclusive service',
      'price': 150
    }]
  },
  {
    'type': 'flight',
    'offers': [{
      'id': 1,
      'title': 'Choose seats',
      'price': 5
    },
    {
      'id': 2,
      'title': 'VIP exclusive service',
      'price': 150
    },
    {
      'id': 3,
      'title': 'Add meal',
      'price': 15
    }]
  },
  {
    'type': 'check-in',
    'offers': [{
      'id': 1,
      'title': 'Choose seats',
      'price': 5
    },
    {
      'id': 2,
      'title': 'Add meal',
      'price': 15
    }]
  },
  {
    'type': 'sightseeing',
    'offers': [{
      'id': 1,
      'title': 'Smoking allowed',
      'price': 50
    },
    {
      'id': 2,
      'title': 'VIP exclusive service',
      'price': 150
    }]
  },
  {
    'type': 'restaurant',
    'offers': [{
      'id': 1,
      'title': 'Smoking allowed',
      'price': 50
    },
    {
      'id': 2,
      'title': 'VIP exclusive service',
      'price': 150
    }]
  }
];

const tripDestinations = [
  {
    id: 1,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    name: 'Chamonix',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1,10)}`,
        description: 'Chamonix Grotte de glace',
      }
    ]
  },
  {
    id: 2,
    description: 'Fusce tristique felis at fermentum pharetra.',
    name: 'Geneve',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1,10)}`,
        description: 'Geneve Brunswick Monument',
      }
    ]
  },
  {
    id: 3,
    description: 'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    name: 'Amsterdam',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1,10)}`,
        description: 'Amsterdam Anne Frank House',
      }
    ]
  },
  {
    id: 4,
    description: 'Cras aliquet varius magna, non porta ligula feugiat eget.',
    name: 'London',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1,10)}`,
        description: 'London Tower Bridge ',
      }
    ]
  },
  {
    id: 5,
    description: 'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    name: 'Saint Petersburg',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomNumber(1,10)}`,
        description: 'Saint Petersburg State Hermitage Museum',
      }
    ]
  }
];

const mockPoints = [
  {
    type: 'taxi',
    offers: [1, 2],
    destination: 2,
    basePrice: 300,
    dateFrom: new Date('2023-10-11:20:35'),
    dateTo: new Date('2023-10-12:11:25'),
    isFavorite: getRandomArrayItem([true, false]),
  },
  {
    type: 'bus',
    offers: [1, 2],
    destination: 1,
    basePrice: 100,
    dateFrom: new Date('2023-10-10:21:50'),
    dateTo: new Date('2023-10-11:22:13'),
    isFavorite: getRandomArrayItem([true, false]),
  },
  {
    type: 'train',
    offers: [1, 2],
    destination: 1,
    basePrice: 300,
    dateFrom: new Date('2023-10-09:22:55'),
    dateTo: new Date('2023-10-10:12:22'),
    isFavorite: getRandomArrayItem([true, false]),
  },
  {
    type: 'ship',
    offers: [1, 2],
    destination: 2,
    basePrice: 120,
    dateFrom: new Date('2023-10-10:22:50'),
    dateTo: new Date('2023-10-11:22:10'),
    isFavorite: getRandomArrayItem([true, false]),
  },
  {
    type: 'drive',
    offers: [1, 2],
    destination: 3,
    basePrice: 70,
    dateFrom: new Date('2023-10-11:10:55'),
    dateTo: new Date('2023-10-11:22:13'),
    isFavorite: getRandomArrayItem([true, false]),
  },
  {
    type: 'flight',
    offers: [1, 2, 3],
    destination: 1,
    basePrice: 250,
    dateFrom: new Date('2023-10-10:22:55'),
    dateTo: new Date('2023-10-10:11:23'),
    isFavorite: getRandomArrayItem([true, false]),
  },
  {
    type: 'check-in',
    offers: [1, 2],
    destination: 3,
    basePrice: 150,
    dateFrom: new Date('2023-10-10:12:55'),
    dateTo: new Date('2023-10-10:22:22'),
    isFavorite: getRandomArrayItem([true, false]),
  },
  {
    type: 'sightseeing',
    offers: [1, 2],
    destination: 2,
    basePrice: 150,
    dateFrom: new Date('2023-10-10:22:55'),
    dateTo: new Date('2023-10-11:11:22'),
    isFavorite: getRandomArrayItem([true, false]),
  },
  {
    type: 'restaurant',
    offers: [1, 2],
    destination: 1,
    basePrice: 80,
    dateFrom: new Date('2023-10-10:22:55'),
    dateTo: new Date('2023-10-11:11:22'),
    isFavorite: getRandomArrayItem([true, false]),
  }
];

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayItem(mockPoints)
  };
}

export { tripDestinations, offersByType, getRandomPoint};
